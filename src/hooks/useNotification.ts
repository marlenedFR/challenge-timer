import { useEffect } from "react";

const useNotification = (
  message: string,
  options?: NotificationOptions
): void => {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile && message) {
      const notification = new Notification(message, options);
      return () => notification.close();
    }
  }, [message, options]);
};

export default useNotification;
