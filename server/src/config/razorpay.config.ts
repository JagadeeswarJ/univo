import Razorpay from "razorpay"
import { env } from "./env";

var razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET_KEY,
});

export { razorpay } 