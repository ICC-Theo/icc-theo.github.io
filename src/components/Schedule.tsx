import React from 'react';
import Countdown from './Countdown';

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="section schedule-section">
      <div className="container schedule-content">
        <h1 className="section-main-title">PARTY SCHEDULE</h1>
        <p className="section-subtitle">
          Join us for a day of summer fun, great food, and wonderful memories!
        </p>
        
        <div className="schedule-wrapper">
          {/* Welcome & Reception */}
          <div className="schedule-card">
            <div className="schedule-icon">🍹</div>
            <div className="schedule-time">3:00 PM</div>
            <h3 className="schedule-title">Welcome & Reception</h3>
            <p className="schedule-description">
              Arrive, settle in, and enjoy refreshing summer drinks by the pool
            </p>
          </div>

          {/* Games & Activities */}
          <div className="schedule-card">
            <div className="schedule-icon">🎮</div>
            <div className="schedule-time">4:00 PM</div>
            <h3 className="schedule-title">Games & Activities</h3>
            <p className="schedule-description">
              Fun summer games and activities for all ages
            </p>
          </div>

          {/* Dinner & Program */}
          <div className="schedule-card">
            <div className="schedule-icon">🍽️</div>
            <div className="schedule-time">6:00 PM</div>
            <h3 className="schedule-title">Dinner & Program</h3>
            <p className="schedule-description">
              Delicious feast and special program celebrating 50 years
            </p>
          </div>

          {/* Celebration & Party */}
          <div className="schedule-card">
            <div className="schedule-icon">🎉</div>
            <div className="schedule-time">8:00 PM</div>
            <h3 className="schedule-title">Party & Dancing</h3>
            <p className="schedule-description">
              Dance the night away and create more beautiful memories
            </p>
          </div>
        </div>

        {/* Countdown Section */}
        <Countdown />
      </div>
    </section>
  );
};

export default Schedule;
