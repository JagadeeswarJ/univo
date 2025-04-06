import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const t = (msg, type = "info") => {
  toast(msg, {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
    type, // info | success | warning | error
    icon: type === "success" ? "✅" : type === "error" ? "❌" : "💬",
    style: {
      borderRadius: "10px",
      padding: "12px 16px",
      fontSize: "0.95rem",
      fontWeight: 500,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  });
};
