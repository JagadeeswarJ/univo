import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";
import About from "./about";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
  { path: "/about", component: About },
];

export default router;
