import { useEffect } from "react";

const requestNotificationPermission = () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
};

const useNotification = (
  message: string,
  options?: NotificationOptions
): void => {
  useEffect(() => {
    if (message && Notification.permission === "granted") {
      const notification = new Notification(message, options);
      return () => notification.close();
    }
  }, [message, options]);
};

export { useNotification, requestNotificationPermission };
