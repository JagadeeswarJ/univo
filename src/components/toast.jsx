import { Slide, toast } from "react-toastify";

export const t = (msg) => {
  toast(msg, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};
