import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

export default function DecoyForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setIsSubmitting(true);
    // Fake a network request delay for the decoy
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto p-8 border border-border/50 bg-card rounded-2xl shadow-2xl relative z-10 flex flex-col items-center text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">
          Verification Complete
        </h2>
        <p className="text-muted-foreground">
          Your identity has been securely verified. You are now on the priority waitlist for Nexis Alpha.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto relative z-10"
    >
      <div className="p-8 border border-border/50 bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            Identity Verification
          </span>
        </div>

        <h2 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
          Nexis Alpha Access
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Please provide your details. Note: Your browser will request camera access to verify you are human.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              placeholder="Enter your legal name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              placeholder="name@example.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              <>
                Verify & Register
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground/60 flex items-center justify-center gap-1">
        Secured by Nexis Identity Engine
      </p>
    </motion.div>
  );
}
