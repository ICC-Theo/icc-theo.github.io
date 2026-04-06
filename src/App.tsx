import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Venue from './components/Venue';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

function App() {
  const [hasGuestId, setHasGuestId] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Check for GuestID parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('GuestID');
    
    console.log('🔍 App: Checking for GuestID parameter...');
    console.log('🎫 GuestID found:', guestId ? guestId : 'None');
    
    if (guestId && guestId.trim() !== '') {
      // Validate Guest ID format: exactly 5 alphabetic characters
      const isValidFormat = /^[A-Za-z]{5}$/.test(guestId.trim());
      
      if (isValidFormat) {
        setHasGuestId(true);
        console.log('✅ App: Valid GuestID format found, showing full website');
      } else {
        console.log('❌ App: Invalid GuestID format, redirecting to landing page');
        // Invalid format - redirect to landing page immediately
        const baseUrl = process.env.PUBLIC_URL || window.location.origin;
        window.location.href = baseUrl;
        return;
      }
    } else {
      setHasGuestId(false);
      console.log('❌ App: No GuestID parameter, showing landing page');
    }
    
    setIsLoading(false);
  }, []);

  // Show loading state briefly while checking URL parameters
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #87CEEB 0%, #20B2AA 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
      </div>
    );
  }

  // Show landing page if no valid GuestID parameter
  if (!hasGuestId) {
    return <LandingPage />;
  }

  // Show full birthday website if valid GuestID parameter exists
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Home />
      <Schedule />
      <Venue />
      <DressCode />
      <RSVP />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
