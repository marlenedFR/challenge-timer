import { useEffect } from "react";

const useNotification = (
  message: string,
  options?: NotificationOptions
): void => {
  useEffect(() => {
    if (message) {
      const notification = new Notification(message, options);
      return () => notification.close();
    }
  }, [message, options]);
};

export default useNotification;
