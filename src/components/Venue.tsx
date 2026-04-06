import React from 'react';

const Venue: React.FC = () => {
  const googleMapsLink = 'https://www.google.com/maps/contrib/110654608546292414045/photos/@14.1033915,121.0668659,17z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D';
  
  const handleVenueClick = () => {
    window.open(googleMapsLink, '_blank');
  };

  return (
    <section id="venue" className="section venue-section">
      <div className="container venue-content">
        <h1 className="section-main-title">VENUE</h1>
        <p className="section-subtitle">
          Join us at this beautiful resort for an unforgettable celebration!
        </p>
        
        <div className="venue-card">
          {/* Google Maps Embed */}
          <div className="venue-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.3456789012345!2d121.0668659!3d14.1033915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA2JzEyLjIiTiAxMjHCsDA0JzAwLjciRQ!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Katharina Resort Location"
            ></iframe>
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
            <button className="venue-directions-btn" onClick={handleVenueClick}>
              📍 View on Google Maps
            </button>
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
