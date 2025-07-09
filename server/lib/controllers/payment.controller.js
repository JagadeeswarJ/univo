"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.register = void 0;
const db_config_1 = require("../config/db.config");
const razorpay_config_1 = require("../config/razorpay.config");
const mailer_service_1 = require("../services/mailer.service");
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
function generateCompactTimestamp() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `rt_${timestamp}_${random}`;
}
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const registrations = db_config_1.db.collection("registrations");
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            razorpay_config_1.razorpay.orders.create(options, (err, order) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield registrations.add(docData);
                    res.status(201).json({
                        status: true,
                        order_id: order.id,
                    });
                }
                catch (error) {
                    console.error("Error saving registration:", error);
                    res.status(500).json({
                        status: false,
                        message: "Error saving registration",
                    });
                }
            }));
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                status: false,
                message: "Server error",
            });
        }
    }
});
exports.register = register;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id, payment_id, payment_signature, userId } = req.body;
    console.log(order_id, payment_id, payment_signature);
    if (!order_id || !payment_id || !payment_signature) {
        res.status(400).json({
            status: false,
            message: "Missing required payment verification parameters",
        });
    }
    else {
        const isValid = (0, razorpay_utils_1.validatePaymentVerification)({ order_id, payment_id }, payment_signature, process.env.RAZORPAY_SECRET_KEY);
        if (!isValid) {
            res
                .status(400)
                .json({ status: false, message: "Invalid Signature" });
        }
        else {
            const registrations = db_config_1.db.collection("registrations");
            try {
                const snapshot = yield registrations.where("order_id", "==", order_id).get();
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
                    yield registrations.doc(regId).update({
                        payment_status: true,
                        payment_id: req.body.payment_id,
                    });
                    // const userData = await db.collection("users").where("userId", "==", userId).get();
                    yield (0, mailer_service_1.mailer)("sparkscj110@gmail.com", payment_id, "Jagadeeswar", registrationData.amount);
                    res.status(200).json({
                        status: true,
                        message: "Payment verified and registration updated.",
                        reg_id: regId,
                    });
                }
            }
            catch (error) {
                console.error("Error during success handler:", error);
                res.status(500).json({
                    status: false,
                    message: "Server error",
                });
            }
        }
    }
});
exports.success = success;
