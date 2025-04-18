import { X } from "lucide-react";
import { toast } from "sonner";

interface ToastProps {
  id: string | number;
  message: string;

  bgColor: string;
}

const ToastContent = ({ id, message, bgColor }: ToastProps) => (
  <div
    className={`flex items-start justify-between ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg w-full max-w-sm`}
  >
    <div className="flex items-start gap-2">
      <span className="text-sm font-medium">{message}</span>
    </div>
    <button
      onClick={() => toast.dismiss(id)}
      className="ml-4 hover:bg-white/10 rounded p-1"
    >
      <X size={16} />
    </button>
  </div>
);

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION = "top-right" as const;

export const notifySuccess = (
  message: string,
  duration = DEFAULT_DURATION,
  position = DEFAULT_POSITION
) => {
  toast.custom(
    (t) => <ToastContent id={t} message={message} bgColor="bg-green" />,
    { duration, position }
  );
};

export const notifyError = (
  message: string,
  duration = DEFAULT_DURATION,
  position = DEFAULT_POSITION
) => {
  toast.custom(
    (t) => <ToastContent id={t} message={message} bgColor="bg-red" />,
    { duration, position }
  );
};

export const notifyInfo = (
  message: string,
  duration = DEFAULT_DURATION,
  position = DEFAULT_POSITION
) => {
  toast.custom(
    (t) => <ToastContent id={t} message={message} bgColor="bg-blue" />,
    { duration, position }
  );
};
