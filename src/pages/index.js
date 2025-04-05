import Home from "./Home";
import AuthForm from "./AuthForm";
import Events from "./Events";
import CreateAnPage from "./EventCalender";


const router = [
  { path: "/", component: Home },
  { path: "/login", component: AuthForm },
  { path: "/events", component: Events },
  {path:"/orgdet",component:CreateAnPage}
  // Lazy load the Emoji component

];

export default router;
