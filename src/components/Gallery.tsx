import React, { useState } from 'react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gallery photos of Enchong
  const galleryItems = [
    { id: 1, src: '/Gallery/Photo1.jpg', caption: 'Memory 1' },
    { id: 2, src: '/Gallery/Photo2.jpg', caption: 'Memory 2' },
    { id: 3, src: '/Gallery/Photo3.jpg', caption: 'Memory 3' },
    { id: 4, src: '/Gallery/Photo4.jpg', caption: 'Memory 4' },
    { id: 5, src: '/Gallery/Photo5.jpg', caption: 'Memory 5' },
    { id: 6, src: '/Gallery/Photo6.jpg', caption: 'Memory 6' },
    { id: 7, src: '/Gallery/Photo7.jpg', caption: 'Memory 7' },
    { id: 8, src: '/Gallery/Photo8.jpg', caption: 'Memory 8' },
    { id: 9, src: '/Gallery/Photo9.jpg', caption: 'Memory 9' },
    { id: 10, src: '/Gallery/Photo10.jpg', caption: 'Memory 10' },
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
              onClick={() => setSelectedImage(item.src)}
            >
              <img 
                src={item.src} 
                alt={item.caption}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="view-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta">
          <p>✨ Celebrating 50 years of beautiful memories! ✨</p>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="Gallery" className="gallery-modal-image" />
            <div className="gallery-modal-nav">
              <button 
                className="nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryItems.findIndex(item => item.src === selectedImage);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
                  setSelectedImage(galleryItems[prevIndex].src);
                }}
              >
                ❮
              </button>
              <button 
                className="nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = galleryItems.findIndex(item => item.src === selectedImage);
                  const nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
                  setSelectedImage(galleryItems[nextIndex].src);
                }}
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
