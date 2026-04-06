import React from 'react';

const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="section dress-code-section">
      <div className="container dress-code-content">
        <h1 className="section-main-title">DRESS CODE</h1>
        <p className="section-subtitle">
          Get ready for a Summer Party! Here's what to wear:
        </p>

        <div className="dress-code-wrapper">
          {/* Summer Casual Theme */}
          <div className="dress-code-card main-theme">
            <div className="theme-icon">☀️</div>
            <h2 className="theme-title">Summer Party Attire</h2>
            <p className="theme-description">
              Bright, comfortable, and festive summer wear
            </p>
            
            <div className="color-palette">
              <h4>Suggested Colors</h4>
              <div className="colors">
                <span className="color-swatch" style={{ background: '#FF6B6B' }} title="Coral"></span>
                <span className="color-swatch" style={{ background: '#20B2AA' }} title="Teal"></span>
                <span className="color-swatch" style={{ background: '#FFD93D' }} title="Sunny Yellow"></span>
                <span className="color-swatch" style={{ background: '#6BCB77' }} title="Fresh Green"></span>
                <span className="color-swatch" style={{ background: '#4D96FF' }} title="Ocean Blue"></span>
                <span className="color-swatch" style={{ background: '#FF8FB1' }} title="Pink"></span>
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
                <li>Floral sundresses</li>
                <li>Flowy maxi dresses</li>
                <li>Comfortable sandals</li>
                <li>Light, breathable fabrics</li>
                <li>Summer accessories (hats, sunglasses)</li>
              </ul>
            </div>

            {/* For Gentlemen */}
            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👔</div>
              <h3 className="suggestion-title">For Gentlemen</h3>
              <ul className="suggestion-list">
                <li>Tropical/Hawaiian shirts</li>
                <li>Light polo shirts</li>
                <li>Khaki or chino shorts/pants</li>
                <li>Comfortable loafers or sandals</li>
                <li>Summer accessories optional</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="dress-code-note">
          <div className="note-icon">💡</div>
          <div className="note-content">
            <p><strong>Note:</strong> Since we'll be at a resort with pool access, feel free to bring your swimwear! 
            But please remember to have your party outfit for the program and dinner. Let's make it colorful and fun!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
