import React, { useState, useEffect } from 'react';
import { validateGuestId, loadGuestData } from '../services/guestService';

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [error, setError] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load guest data on component mount
  useEffect(() => {
    const initializeData = async () => {
      await loadGuestData();
      setIsLoading(false);
    };
    initializeData();
  }, []);

  // Check if GuestID exists in URL on component mount
  useEffect(() => {
    const checkUrlGuestId = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const guestIdFromUrl = urlParams.get('GuestID');
      
      if (guestIdFromUrl) {
        // Validate the GuestID from URL
        const isValid = await validateGuestId(guestIdFromUrl);
        if (isValid) {
          setIsOpening(true);
        } else {
          // If invalid, show modal to enter correct ID
          setError('Invalid Guest ID in URL. Please enter a valid Guest ID.');
          setShowModal(true);
        }
      }
    };
    
    if (!isLoading) {
      checkUrlGuestId();
    }
  }, [isLoading]);

  const handleInvitationClick = () => {
    // Don't show modal if envelope is already opening
    if (!isOpening) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGuestId('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    
    // Only allow alphabetic characters and limit to 5 characters
    if (/^[A-Z]*$/.test(value) && value.length <= 5) {
      setGuestId(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guestId.length !== 5) {
      setError('Guest ID must be exactly 5 letters');
      return;
    }
    
    setIsValidating(true);
    setError('');
    
    // Validate the GuestID against the CSV
    const isValid = await validateGuestId(guestId);
    
    if (!isValid) {
      setIsValidating(false);
      setError('Invalid Guest ID. Please check your invitation and try again.');
      return;
    }
    
    // Valid GuestID - Close modal and start opening animation
    setShowModal(false);
    setIsValidating(false);
    setIsOpening(true);
    
    console.log('🎬 Valid Guest ID! Starting invitation animation...');
    
    // Wait 5 seconds to show the invitation, then redirect with Guest ID
    setTimeout(() => {
      console.log('🔄 Redirecting to main website with Guest ID...');
      window.location.href = `${window.location.origin}${window.location.pathname}?GuestID=${guestId}`;
    }, 5000);
  };

  return (
    <>
      <header className={`header ${isOpening ? 'header-with-nav' : ''}`}>
        {/* Floating Photo - Left Side (Desktop) */}
        <div className="floating-photo left desktop-only">
          <div className="photo-frame">
            <img src="/Gallery/Photo2.jpg" alt="Enchong" />
            <p className="photo-caption">Celebrating 50 Years!</p>
          </div>
        </div>
        
        {/* Floating Photo - Right Side (Desktop) */}
        <div className="floating-photo right desktop-only">
          <div className="photo-frame">
            <img src="/Gallery/Photo10.jpg" alt="Enchong" />
            <p className="photo-caption">Golden Milestone</p>
          </div>
        </div>
        
        <div className="header-content">
          <div className="celebration-badge">50th</div>
          <h1>ENCHONG</h1>
          <p className="header-subtitle">Golden Birthday Celebration</p>
          <p className="header-date">05.01.2026</p>
          
          {/* Mobile Photos Container */}
          <div className="mobile-photos">
            <div className="photo-frame left-tilt">
              <img src="/Gallery/Photo2.jpg" alt="Enchong" />
              <p className="photo-caption">Celebrating 50 Years!</p>
            </div>
            <div className="photo-frame right-tilt">
              <img src="/Gallery/Photo10.jpg" alt="Enchong" />
              <p className="photo-caption">Golden Milestone</p>
            </div>
          </div>
          
          <div className="invitation-container">
            <div className="invitation-wrapper">
              {/* Closed Invitation Card */}
              <div 
                className={`invitation-card-closed ${isOpening ? 'hide' : ''}`}
                onClick={handleInvitationClick}
                style={{ cursor: isOpening ? 'default' : 'pointer' }}
              >
                <div className="card-decoration top-left">✨</div>
                <div className="card-decoration top-right">🤍</div>
                <div className="card-content">
                  <span className="tap-text">Tap to Open</span>
                  <div className="summer-icon">🎂</div>
                </div>
                <div className="card-decoration bottom-left">🤍</div>
                <div className="card-decoration bottom-right">✨</div>
              </div>
              
              {/* Open Invitation Contents */}
              {isOpening && (
                <div className="invitation-contents">
                  <div className="invitation-objects">
                    <div className="party-elements">
                      <span className="party-icon sun">✨</span>
                      <span className="party-icon palm">🎉</span>
                      <span className="party-icon flower">🎂</span>
                      <span className="party-icon umbrella">🥂</span>
                    </div>
                    <div className="invitation-message">
                      <p>You're Invited!</p>
                      <p className="event-date">May 1, 2026</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal for Guest ID Input */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            
            <h2 style={{ 
              color: '#20B2AA', 
              fontFamily: 'TAN Angleton, Lora, serif', 
              fontSize: '2.5rem', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Enter Your Guest ID
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#2F4F4F', 
              marginBottom: '2rem',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Please enter your 5-letter Guest ID to access your invitation.
            </p>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <input
                type="text"
                value={guestId}
                onChange={handleInputChange}
                placeholder="ABCDE"
                maxLength={5}
                autoFocus
                style={{ 
                  textAlign: 'center', 
                  fontSize: '2rem',
                  fontFamily: 'TAN Angleton, Lora, serif',
                  letterSpacing: '0.5rem',
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid rgba(32, 178, 170, 0.3)',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#2F4F4F',
                  marginBottom: '0.5rem',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
              />
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#708090', 
                textAlign: 'center',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                5 letters only (A-Z)
              </p>

              {error && (
                <p style={{ 
                  color: '#FF6B6B', 
                  textAlign: 'center', 
                  marginBottom: '1rem',
                  fontSize: '0.95rem'
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={guestId.length !== 5 || isValidating}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: guestId.length === 5 
                    ? 'linear-gradient(135deg, #20B2AA, #48D1CC)' 
                    : 'linear-gradient(135deg, #ccc, #ddd)',
                  color: guestId.length === 5 ? 'white' : '#999',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: guestId.length === 5 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
              >
                {isValidating ? 'Validating...' : 'Open Invitation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
