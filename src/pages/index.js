import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";
import Event from "./Event";
import RegistrationForm from "./RegistrationForm";
import { path } from "framer-motion/client";
import TempForm from "./TempForm";
import Success from "./Success";
import Failure from "./Failure";
import About from "./About";
import Feature from "./Feature";
import Pricing from "./Pricing";
import CreateAnPage from "./EventCalender";
import OrganizerDashboard from "./OrganizerDashboard";
import Test from "./Test";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
  { path: "/form", component: TempForm },
  { path: "/success", component: Success },
  { path: "/failure", component: Failure },
  { path: "/events/:eventname", component: Event },
  { path: "/events/:eventname/register", component: RegistrationForm },
  { path: "/about", component: About },
  { path: "/features", component: Feature },
  { path: "/calendar", component: CreateAnPage },
  { path: "/pricing", component: Pricing },
  { path: "/event/orgdsh", component: OrganizerDashboard },
  { path: "/event/studsh", component: Test },
];

export default router;
