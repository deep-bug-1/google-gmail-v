import { useState } from "react";

export default function GooglePage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_self");
    }
  };

  const handleLucky = () => {
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`, "_self");
    }
  };

  return (
    <div className="google-wrapper">
      {/* Top right nav */}
      <header className="google-header">
        <nav className="google-nav-links">
          <a href="https://mail.google.com" target="_blank" rel="noreferrer">Gmail</a>
          <a href="https://images.google.com" target="_blank" rel="noreferrer">Images</a>
          <button className="google-apps-btn" title="Google apps" aria-label="Google apps">
            <svg focusable="false" viewBox="0 0 24 24" width="24" height="24">
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
            </svg>
          </button>
          <a href="https://accounts.google.com" target="_blank" rel="noreferrer" className="google-signin-btn">Sign in</a>
        </nav>
      </header>

      {/* Main content */}
      <main className="google-main">
        {/* Google Logo */}
        <div className="google-logo" aria-label="Google">
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </div>

        {/* Search box */}
        <form className="google-search-form" onSubmit={handleSearch}>
          <div className="google-search-box">
            <span className="google-search-icon">
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#9aa0a6" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="google-search-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              aria-label="Search"
            />
            {query && (
              <button
                type="button"
                className="google-clear-btn"
                onClick={() => setQuery("")}
                aria-label="Clear"
              >
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#70757a" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
            )}
            <span className="google-divider" />
            <button type="button" className="google-voice-btn" aria-label="Search by voice">
              <svg focusable="false" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285f4" d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
              </svg>
            </button>
            <button type="button" className="google-lens-btn" aria-label="Search by image">
              <svg viewBox="0 0 192 192" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h192v192H0z"></path>
                <path d="M176 96c0 44.1-35.9 80-80 80S16 140.1 16 96 51.9 16 96 16s80 35.9 80 80z" fill="#fff"></path>
                <path d="M128 96c0 17.7-14.3 32-32 32S64 113.7 64 96s14.3-32 32-32 32 14.3 32 32z" fill="#EA4335"></path>
                <path d="M96 64V32c-35.3 0-64 28.7-64 64h32c0-17.7 14.3-32 32-32z" fill="#4285F4"></path>
                <path d="M96 128v32c35.3 0 64-28.7 64-64h-32c0 17.7-14.3 32-32 32z" fill="#34A853"></path>
                <path d="M160 96h-32c0 17.7-14.3 32-32 32v32c35.3 0 64-28.7 64-64z" fill="#FBBC05"></path>
              </svg>
            </button>
          </div>

          {/* Buttons */}
          <div className="google-buttons">
            <button type="submit" className="google-btn">Google Search</button>
            <button type="button" className="google-btn" onClick={handleLucky}>I'm Feeling Lucky</button>
          </div>

          <div className="google-language">
            Google offered in: <a href="https://www.google.com/setprefs?hl=ar" target="_blank" rel="noreferrer">العربية</a>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="google-footer">
        <div className="google-footer-top">
          <span>Saudi Arabia</span>
        </div>
        <div className="google-footer-bottom">
          <div className="google-footer-left">
            <a href="https://about.google" target="_blank" rel="noreferrer">About</a>
            <a href="https://www.google.com/ads" target="_blank" rel="noreferrer">Advertising</a>
            <a href="https://www.google.com/services" target="_blank" rel="noreferrer">Business</a>
            <a href="https://www.google.com/search/howsearchworks" target="_blank" rel="noreferrer">How Search works</a>
          </div>
          <div className="google-footer-right">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
            <a href="https://www.google.com/preferences" target="_blank" rel="noreferrer">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
