import { useEffect, useRef } from "react";
import clockSound from "../assets/Clock.mp3"; // Vérifiez bien que le chemin est correct

const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(clockSound);
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing sound:", error));
    }
  };

  return play;
};

export default useSound;
