import React from 'react';
import Header from './Header';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{
      background: 'linear-gradient(135deg, #87CEEB 0%, #20B2AA 50%, #98D8C8 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      {/* Summer-themed decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontSize: '3rem',
        opacity: 0.6,
        animation: 'floatSummer 3s ease-in-out infinite'
      }}>🌴</div>
      
      <div style={{
        position: 'absolute',
        top: '100px',
        right: '40px',
        fontSize: '2.5rem',
        opacity: 0.5,
        animation: 'floatSummer 4s ease-in-out infinite 0.5s'
      }}>☀️</div>
      
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50px',
        fontSize: '2rem',
        opacity: 0.5,
        animation: 'floatSummer 3.5s ease-in-out infinite 1s'
      }}>🌺</div>
      
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '30px',
        fontSize: '2.5rem',
        opacity: 0.6,
        animation: 'floatSummer 4s ease-in-out infinite 0.3s'
      }}>⛱️</div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        fontSize: '2rem',
        opacity: 0.4,
        animation: 'floatSummer 3s ease-in-out infinite 0.7s'
      }}>🌊</div>
      
      {/* Use the existing header component */}
      <Header />
    </div>
  );
};

export default LandingPage;
