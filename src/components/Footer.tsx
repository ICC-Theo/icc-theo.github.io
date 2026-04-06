import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-celebration">
          <span className="footer-emoji">🌺</span>
          <h3>Enchong's 50th Birthday Celebration</h3>
          <span className="footer-emoji">🌺</span>
        </div>
        <p className="footer-date">May 1, 2026 • Villa Katharina Resort</p>
        <p className="footer-tagline">"50 Years of Memories"</p>
        <div className="footer-divider">
          <span>🌴</span>
          <span>☀️</span>
          <span>🌊</span>
        </div>
        <p className="footer-credits">Made with ❤️ for a special celebration</p>
      </div>
    </footer>
  );
};

export default Footer;
