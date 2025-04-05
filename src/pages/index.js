import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";
import TempForm from "./TempForm";
import Success from "./Success";
import Failure from "./Failure";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
  { path: "/form", component: TempForm },
  { path: "/success", component: Success },
  { path: "/failure", component: Failure },
];

export default router;
