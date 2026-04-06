import React from 'react';

const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="section dress-code-section">
      <div className="container dress-code-content">
        <h1 className="section-main-title">DRESS CODE</h1>
        <p className="section-subtitle">
          Join us in celebrating with an elegant All White theme!
        </p>

        <div className="dress-code-wrapper">
          {/* All White Theme */}
          <div className="dress-code-card main-theme">
            <div className="theme-icon">🤍</div>
            <h2 className="theme-title">All White Attire</h2>
            <p className="theme-description">
              Elegant, fresh, and sophisticated white ensemble
            </p>
            
            <div className="color-palette">
              <h4>Accepted Shades</h4>
              <div className="colors">
                <span className="color-swatch" style={{ background: '#FFFFFF', border: '1px solid #ddd' }} title="Pure White"></span>
                <span className="color-swatch" style={{ background: '#FFFEF9' }} title="Ivory"></span>
                <span className="color-swatch" style={{ background: '#FAF8F5' }} title="Off-White"></span>
                <span className="color-swatch" style={{ background: '#F5F5F5' }} title="Pearl"></span>
                <span className="color-swatch" style={{ background: '#FFFDD0' }} title="Cream"></span>
                <span className="color-swatch" style={{ background: '#FFF8E7' }} title="Champagne"></span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="dress-suggestions">
            {/* For Ladies */}
            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👗</div>
              <h3 className="suggestion-title">For Ladies</h3>
              <ul className="suggestion-list">
                <li>White cocktail dress</li>
                <li>Elegant white maxi dress</li>
                <li>White linen or silk blouse with pants</li>
                <li>Off-white or ivory sundress</li>
                <li>Gold or pearl accessories</li>
              </ul>
            </div>

            {/* For Gentlemen */}
            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👔</div>
              <h3 className="suggestion-title">For Gentlemen</h3>
              <ul className="suggestion-list">
                <li>White polo or dress shirt</li>
                <li>White linen blazer (optional)</li>
                <li>White or beige chinos/slacks</li>
                <li>Light-colored loafers or dress shoes</li>
                <li>Minimal gold or silver accessories</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="dress-code-note">
          <div className="note-icon">💡</div>
          <div className="note-content">
            <p><strong>Note:</strong> All white attire creates a beautiful, unified celebration atmosphere. 
            Please avoid bright colors or patterns. Subtle off-white, ivory, or champagne shades are welcome. 
            Let's make this milestone celebration picture perfect!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
