import { toast } from "react-toastify";

export const displayToast = (
  message: string,
  type: "success" | "info" | "warning" | "error"
) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const displayToastPernament = (
  message: string,
  type: "success" | "info" | "warning" | "error"
) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
