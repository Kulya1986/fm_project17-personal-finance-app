import { useEffect, useRef } from "react";

export function useEscPress(onEscape, listenCapturing = true) {
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        onEscape();
      }
    }

    document.addEventListener("keydown", handleEsc, listenCapturing);

    return () =>
      document.removeEventListener("keydown", handleEsc, listenCapturing);
  }, [onEscape]);
}
