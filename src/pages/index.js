import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";
import Event from "./Event";
import RegistrationForm from "./RegistrationForm";
import { path } from "framer-motion/client";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
  { path: "/events/:eventname", component: Event },
  { path: "/events/:eventname/register", component: RegistrationForm },
];

export default router;
