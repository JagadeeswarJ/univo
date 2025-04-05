import Home from "./Home";
import AuthForm from "./AuthForm";
import Dashboard from "./Dashboard";

const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/dashboard", component: Dashboard },
];

export default router;
