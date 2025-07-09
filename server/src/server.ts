import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "./config/env";
import registerRoute from "./routes/register.route";
import loginRoute from "./routes/login.route";
import EventRoute from "./routes/Event.route";
import PaymentRoute from "./routes/Payment.route";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/event", EventRoute);
app.use("/payment", PaymentRoute);
//new routes
app.use("/", (req, res) => {
  res.send("Univo Server")
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ success: false, message: err.message });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
