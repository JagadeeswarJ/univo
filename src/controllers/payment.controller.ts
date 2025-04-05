import { Request, Response } from "express";
import { db } from "../config/db.config";
import { env } from "../config/env";
import { razorpay } from "../config/razorpay.config";
import { transporter } from "../config/nodemailer.config";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

interface RegistrationRequest extends Request {
  body: {
    amount: number;
    eventId: string;
    userId: string;
  };
}

interface SuccessRequest extends Request {
  body: {
    order_id: string;
    payment_id: string;
    payment_signature: string;
    category: string;
  };
}

function generateCompactTimestamp(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `rt_${timestamp}_${random}`;
}

export const register = async (req: RegistrationRequest, res: Response): Promise<void> => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: generateCompactTimestamp(),
  };

  try {
    const registerations = db.collection(env.REGISTRATIONS_COLLECTION);
    razorpay.orders.create(options, async (err: Error, order: any) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: false, data: req.body });
        return;
      }
      try {
        await registerations.add({
          ...req.body,
          payment_status: false,
          order_id: order.id,
        });

        res.status(201).json({
          status: true,
          order_id: order.id,
          eventId: req.body.eventId,
        });
      } catch (error) {
        console.error("Error adding document:", error);
        res.status(400).json({
          status: false,
          data: req.body,
          message: "Error registering your payment, please try later",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: false,
      data: req.body,
      message: "Error registering your payment, please try later",
    });
  }
};

// export const success = async (req: SuccessRequest, res: Response): Promise<void> => {
//   const { response, category, order_id, payment_id, payment_signature } = req.body;

//   if (!order_id || !payment_id || !payment_signature || !category) {
//     res.status(400).json({ status: false, message: "Missing required payment verification parameters" });
//     return;
//   }

//   // Validate Razorpay signature
//   const isValid = validatePaymentVerification(
//     {
//       order_id,
//       payment_id,
//     },
//     payment_signature,
//     process.env.RAZORPAY_SECRET_KEY!
//   );

//   if (!isValid) {
//     res.status(400).json({ status: false, message: "Invalid Razorpay signature" });
//     return;
//   }

//   try {
//     const categoryCollection = db.collection(category);
//     const snapshot = await categoryCollection.where("order_id", "==", order_id).get();

//     if (snapshot.empty) {
//       res.status(404).json({ status: false, message: "No registration found for this order_id" });
//       return;
//     }

//     let registrationData: any;
//     let regId = "";

//     // There should be only one matching doc
//     snapshot.forEach(doc => {
//       regId = doc.id;
//       registrationData = doc.data();
//     });

//     await categoryCollection.doc(regId).update({
//       payment_status: true,
//       payment_id: payment_id,
//     });

//     // Update stats if needed
//     const regType = category === "Accommodation" ? "accommodation" : "sports";
//     await updateStats(registrationData, regType);

//     // Send confirmation mail
//     await mailer(
//       registrationData.payersContact.email,
//       payment_id,
//       registrationData.payersContact.name,
//       registrationData.amount
//     );

//     res.status(200).json({
//       status: true,
//       message: "Payment successful, data updated and mail sent",
//       reg_id: regId,
//     });
//   } catch (error) {
//     console.error("Error processing payment success:", error);
//     res.status(500).json({ status: false, message: "Internal server error" });
//   }
// }