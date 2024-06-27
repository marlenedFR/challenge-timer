import { useEffect } from "react";

const useNotification = (hasEnded) => {
  useEffect(() => {
    if (hasEnded) {
      showNotification();
      playSound();
    }
  }, [hasEnded]);

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Timer terminé !", {
        body: "Votre timer est terminé 😎",
      });
    }
  };

  const playSound = () => {
    const audio = new Audio(
      "/src/assets/household_clock_cuckoo_strike_001.mp3"
    );
    audio.play();
  };

  return { requestNotificationPermission };
};

export default useNotification;
