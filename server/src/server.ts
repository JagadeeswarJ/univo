import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import registerRoute from "./routes/register.route";
import loginRoute from "./routes/login.route";
import EventRoute from "./routes/Event.route";
import PaymentRoute from "./routes/Payment.route";

const app = express();
const PORT = 3000;
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

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🔧 Local server running at http://localhost:${PORT}`);
  });
}

export default app;