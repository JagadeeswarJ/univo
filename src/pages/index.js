import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
];

export default router;
