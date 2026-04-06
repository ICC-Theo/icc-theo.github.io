import React, { useState } from 'react';

const DressCode: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const womenOutfits = [
    { src: '/Images/Sample_Women_Outfit1.jpg', alt: 'Women White Outfit 1' },
    { src: '/Images/Sample_Women_Outfit2.jpg', alt: 'Women White Outfit 2' },
  ];

  const menOutfits = [
    { src: '/Images/Sample_Men_Outfit1.jpg', alt: 'Men White Outfit 1' },
    { src: '/Images/Sample_Men_Outfit2.jpg', alt: 'Men White Outfit 2' },
  ];

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
              </div>
            </div>
          </div>

          {/* Outfit Examples with Images */}
          <div className="dress-suggestions">
            {/* For Ladies */}
            <div className="dress-code-card suggestion-card">
              <div className="suggestion-icon">👗</div>
              <h3 className="suggestion-title">For Ladies</h3>
              <div className="outfit-images">
                {womenOutfits.map((outfit, index) => (
                  <div 
                    key={index} 
                    className="outfit-image-container"
                    onClick={() => setSelectedImage(outfit.src)}
                  >
                    <img 
                      src={outfit.src} 
                      alt={outfit.alt} 
                      className="outfit-image"
                    />
                  </div>
                ))}
              </div>
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
              <div className="outfit-images">
                {menOutfits.map((outfit, index) => (
                  <div 
                    key={index} 
                    className="outfit-image-container"
                    onClick={() => setSelectedImage(outfit.src)}
                  >
                    <img 
                      src={outfit.src} 
                      alt={outfit.alt} 
                      className="outfit-image"
                    />
                  </div>
                ))}
              </div>
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

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedImage(null)}>×</button>
              <img src={selectedImage} alt="Outfit Example" className="modal-image" />
            </div>
          </div>
        )}

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
