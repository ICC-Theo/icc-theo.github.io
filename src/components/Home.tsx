import React from 'react';

const Home: React.FC = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <div className="invitation-cards-wrapper">
          {/* Main Celebration Card */}
          <div className="celebration-card">
            <div className="summer-decoration top">🌺 ☀️ 🌺</div>
            <p className="celebration-header">You are cordially invited to</p>
            <h1 className="celebrant-name">ENCHONG'S</h1>
            <div className="age-badge">
              <span className="age-number">50</span>
              <span className="age-text">th</span>
            </div>
            <p className="celebration-type">Birthday Celebration</p>
            <p className="celebration-theme">
              "50 Years of Memories"
            </p>
            <div className="summer-decoration bottom">🌴 🌊 🌴</div>
          </div>
          
          {/* Save the Date Card */}
          <div className="celebration-card save-date-card">
            <h1 className="std-header">Save the Date</h1>
            <div className="summer-icon-header">☀️</div>
            <h2 className="std-month">May</h2>
            <div className="std-datetime">
              <span className="std-day">Thursday</span>
              <span className="std-date">01</span>
              <span className="std-time">3:00 PM</span>
            </div>
            <h2 className="std-year">2026</h2>
            <p className="std-venue-label">Celebration at</p>
            <p className="std-location">Villa Katharina Resort</p>
            <p className="std-address">Brgy Maugat, Tanauan City, Batangas</p>
            <div className="summer-footer">
              <span>🌺</span>
              <span>Summer Party Theme</span>
              <span>🌺</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
