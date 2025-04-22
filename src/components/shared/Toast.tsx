// components/shared/Toast.tsx
import { toast } from "sonner";

interface ToastOptions {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const showToast = ({
  message,
  type = "info",
  duration = 3000,
  position = "top-right",
}: ToastOptions) => {
  const baseOptions = {
    duration,
    position,
    dismissible: true,
  };

  switch (type) {
    case "success":
      toast.success(message, {
        ...baseOptions,
        style: { backgroundColor: "#22c55e", color: "white" }, // green
      });
      break;
    case "error":
      toast.error(message, {
        ...baseOptions,
        style: { backgroundColor: "#ef4444", color: "white" }, // red
      });
      break;
    default:
      toast(message, {
        ...baseOptions,
        style: { backgroundColor: "#3b82f6", color: "white" }, // blue/info
      });
      break;
  }
};
