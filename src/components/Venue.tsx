import React from 'react';

const Venue: React.FC = () => {
  const handleVenueClick = () => {
    window.open('https://maps.app.goo.gl/Villa-Katharina-Tanauan', '_blank');
  };

  return (
    <section id="venue" className="section venue-section">
      <div className="container venue-content">
        <h1 className="section-main-title">VENUE</h1>
        <p className="section-subtitle">
          Join us at this beautiful summer resort for an unforgettable celebration!
        </p>
        
        <div className="venue-card" onClick={handleVenueClick} style={{ cursor: 'pointer' }}>
          <div className="venue-image-placeholder">
            <div className="venue-icon">🏝️</div>
            <p className="click-hint">Click to view on Google Maps</p>
          </div>
          
          <div className="venue-info">
            <h2 className="venue-name">Villa Katharina Resort</h2>
            <p className="venue-address">
              <span className="address-icon">📍</span>
              Brgy Maugat, Tanauan City, Batangas
            </p>
            <div className="venue-features">
              <span className="feature">🏊 Pool</span>
              <span className="feature">🌳 Garden</span>
              <span className="feature">🎉 Event Hall</span>
              <span className="feature">🅿️ Parking</span>
            </div>
          </div>
        </div>

        <div className="venue-directions">
          <h3>How to Get There</h3>
          <div className="directions-content">
            <div className="direction-item">
              <span className="direction-icon">🚗</span>
              <div className="direction-text">
                <strong>By Car</strong>
                <p>Take STAR Tollway, exit at Tanauan. Drive through the city and follow signs to Brgy Maugat.</p>
              </div>
            </div>
            <div className="direction-item">
              <span className="direction-icon">🚌</span>
              <div className="direction-text">
                <strong>By Public Transport</strong>
                <p>Take a bus to Tanauan City from Manila, then take a tricycle to Villa Katharina Resort.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
