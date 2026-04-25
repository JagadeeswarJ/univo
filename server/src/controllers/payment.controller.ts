import { Request, Response } from "express";
import { db } from "../config/db.config";
import { razorpay } from "../config/razorpay.config";
import { mailer, adminRegistrationMailer } from "../services/mailer.service";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

interface PaymentRegisterBody {
  userId: string;
  eventId: string;
  amount: number;
}

interface PaymentSuccessBody {
  order_id: string;
  payment_id: string;
  payment_signature: string;
}

function generateCompactTimestamp(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `rt_${timestamp}_${random}`;
}

export const register = async (
  req: Request<{}, {}, PaymentRegisterBody>,
  res: Response
): Promise<void> => {
  const { userId, eventId, amount } = req.body;

  if (!userId || !eventId || !amount) {
    res.status(400).json({ status: false, message: "Missing fields" });
  }
  else {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: generateCompactTimestamp(),
    };

    const registrations = db.collection("registrations");

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      razorpay.orders.create(options, async (err: any, order: any) => {
        if (err) {
          console.error(err);
          res
            .status(400)
            .json({ status: false, message: "Razorpay error" });
        }

        const docData = {
          userId,
          eventId,
          amount,
          payment_status: false,
          order_id: order.id,
          createdAt: new Date(),
        };

        try {
          await registrations.add(docData);
          res.status(201).json({
            status: true,
            order_id: order.id,
          });
        } catch (error) {
          console.error("Error saving registration:", error);
          res.status(500).json({
            status: false,
            message: "Error saving registration",
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  }

};

export const success = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { order_id, payment_id, payment_signature, userId } = req.body;
  console.log(order_id, payment_id, payment_signature);
  if (!order_id || !payment_id || !payment_signature) {
    res.status(400).json({
      status: false,
      message: "Missing required payment verification parameters",
    });
  }
  else {

    const isValid = validatePaymentVerification(
      { order_id, payment_id },
      payment_signature,
      process.env.RAZORPAY_SECRET_KEY as string
    );

    if (!isValid) {
      res
        .status(400)
        .json({ status: false, message: "Invalid Signature" });
    }
    else {

      const registrations = db.collection("registrations");

      try {
        const snapshot = await registrations.where("order_id", "==", order_id).get();
        if (snapshot.empty) {
          res.status(404).json({
            status: false,
            message: "No registration found for this order ID",
          });
        }
        else {
          const doc = snapshot.docs[0];
          const regId = doc.id;
          const registrationData = doc.data();

          await registrations.doc(regId).update({
            payment_status: true,
            payment_id: req.body.payment_id,
          });

          const userDoc = await db.collection("users").doc(userId).get();
          const userData = userDoc.data() ?? {};

          const eventDoc = await db.collection("events").doc(registrationData.eventId).get();
          const eventData = eventDoc.data() ?? {};

          await Promise.all([
            mailer(
              userData.email ?? userId,
              payment_id,
              userData.fullName ?? userId,
              registrationData.amount
            ),
            adminRegistrationMailer(
              { ...userData, username: userId },
              eventData,
              payment_id,
              order_id,
              registrationData.amount
            ),
          ]);
          res.status(200).json({
            status: true,
            message: "Payment verified and registration updated.",
            reg_id: regId,
          });
        }
      } catch (error) {
        console.error("Error during success handler:", error);
        res.status(500).json({
          status: false,
          message: "Server error",
        });
      }
    }

  }

};
