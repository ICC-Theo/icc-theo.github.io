import React, { useState } from 'react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery items - can be replaced with actual images later
  const galleryItems = [
    { id: 1, placeholder: '🌅', caption: 'Memory 1' },
    { id: 2, placeholder: '🎂', caption: 'Memory 2' },
    { id: 3, placeholder: '👨‍👩‍👧‍👦', caption: 'Memory 3' },
    { id: 4, placeholder: '🎉', caption: 'Memory 4' },
    { id: 5, placeholder: '🌴', caption: 'Memory 5' },
    { id: 6, placeholder: '❤️', caption: 'Memory 6' },
  ];

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container gallery-content">
        <h1 className="section-main-title">50 YEARS OF MEMORIES</h1>
        <p className="section-subtitle">
          A glimpse through the years of laughter, love, and unforgettable moments
        </p>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="gallery-placeholder">
                <span className="placeholder-emoji">{item.placeholder}</span>
                <p className="placeholder-text">Photo Coming Soon</p>
              </div>
              <div className="gallery-caption">{item.caption}</div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <p>📸 More photos will be added here soon!</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
