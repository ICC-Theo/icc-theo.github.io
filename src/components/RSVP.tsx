import React, { useState, useEffect } from 'react';
import { saveRSVPResponse, checkExistingRSVP, RSVPData } from '../services/guestService';

const RSVP: React.FC = () => {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [attendeeNames, setAttendeeNames] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showDeclineConfirmation, setShowDeclineConfirmation] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [responseType, setResponseType] = useState<'attending' | 'declined' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExistingResponse = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('GuestID');
      if (id) {
        setGuestId(id);
        
        // Check if already responded (from localStorage or Google Sheets)
        const storedResponse = await checkExistingRSVP(id);
        if (storedResponse) {
          setHasResponded(true);
          setResponseType(storedResponse.attending === 'Yes' ? 'attending' : 'declined');
          if (storedResponse.attendeeNames && storedResponse.attendeeNames.length > 0) {
            setAttendeeNames(storedResponse.attendeeNames);
            setAdultCount(storedResponse.adultCount || storedResponse.attendeeNames.length);
            setKidsCount(storedResponse.kidsCount || 0);
          }
        }
      }
      setIsLoading(false);
    };
    
    loadExistingResponse();
  }, []);

  // Calculate total attendees
  const totalAttendees = adultCount + kidsCount;

  // Update attendee names array when counts change
  useEffect(() => {
    const newNames = [...attendeeNames];
    while (newNames.length < totalAttendees) {
      newNames.push('');
    }
    while (newNames.length > totalAttendees) {
      newNames.pop();
    }
    setAttendeeNames(newNames);
  }, [totalAttendees]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...attendeeNames];
    newNames[index] = value;
    setAttendeeNames(newNames);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attendeeNames.some(name => !name.trim())) {
      alert('Please fill in all attendee names');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create RSVP data
      const rsvpData: RSVPData = {
        guestId: guestId || '',
        guestName: attendeeNames[0] || 'Guest',
        attendeeNames: attendeeNames.filter(name => name.trim()),
        adultCount: adultCount,
        kidsCount: kidsCount,
        attending: 'Yes',
        timestamp: new Date().toLocaleString()
      };
      
      // Save using the guest service (now async)
      await saveRSVPResponse(rsvpData);
      
      setSubmitSuccess(true);
      setHasResponded(true);
      setResponseType('attending');
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Error submitting RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    
    try {
      const rsvpData: RSVPData = {
        guestId: guestId || '',
        guestName: 'Guest',
        attendeeNames: [],
        adultCount: 0,
        kidsCount: 0,
        attending: 'No',
        timestamp: new Date().toLocaleString()
      };
      
      await saveRSVPResponse(rsvpData);
      
      setHasResponded(true);
      setResponseType('declined');
      setShowDeclineConfirmation(false);
    } catch (error) {
      console.error('Error declining RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section id="rsvp" className="section rsvp-section">
        <div className="container rsvp-container">
          <h1 className="section-main-title">RSVP</h1>
          <p className="section-subtitle">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="section rsvp-section">
      <div className="container rsvp-container">
        <h1 className="section-main-title">RSVP</h1>
        <p className="section-subtitle">
          We'd love to celebrate this special milestone with you!<br />
          Please let us know if you can make it to the party.
        </p>

        {submitSuccess && (
          <div className="rsvp-message success">
            <span className="message-icon">✅</span>
            <p>Thank you! Your RSVP has been submitted successfully!</p>
          </div>
        )}

        {hasResponded && responseType === 'attending' && !submitSuccess && (
          <div className="rsvp-confirmed">
            <div className="confirmed-icon">🎉</div>
            <h3>You're on the guest list!</h3>
            <p>We're excited to celebrate with you!</p>
            <div className="confirmed-details">
              <strong>Attendees ({adultCount} adults{kidsCount > 0 ? `, ${kidsCount} kids` : ''}):</strong>
              <br />
              {attendeeNames.join(', ')}
            </div>
            <button 
              className="rsvp-update-btn"
              onClick={() => setHasResponded(false)}
            >
              Update Response
            </button>
          </div>
        )}

        {hasResponded && responseType === 'declined' && (
          <div className="rsvp-declined-info">
            <div className="declined-icon">💔</div>
            <h3>We'll miss you!</h3>
            <p>Thank you for letting us know. We hope to celebrate with you another time!</p>
            <button 
              className="rsvp-update-btn"
              onClick={() => {
                setHasResponded(false);
                setResponseType(null);
              }}
            >
              Change My Response
            </button>
          </div>
        )}

        {!hasResponded && (
          <div className="rsvp-form-container">
            <form onSubmit={handleSubmit} className="rsvp-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="adultCount">Number of Adults</label>
                  <select 
                    id="adultCount" 
                    value={adultCount} 
                    onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="kidsCount">Number of Kids</label>
                  <select 
                    id="kidsCount" 
                    value={kidsCount} 
                    onChange={(e) => setKidsCount(parseInt(e.target.value))}
                    className="form-select"
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Kid' : 'Kids'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Guest Names ({totalAttendees} total)</label>
                {attendeeNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={index < adultCount 
                      ? `Adult ${index + 1} Full Name` 
                      : `Kid ${index - adultCount + 1} Full Name`}
                    className="form-input"
                    required
                  />
                ))}
              </div>

              <div className="rsvp-buttons">
                <button 
                  type="submit" 
                  className="rsvp-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : '🎉 Yes, Count Me In!'}
                </button>
                
                <button 
                  type="button"
                  className="rsvp-decline-btn"
                  onClick={() => setShowDeclineConfirmation(true)}
                  disabled={isSubmitting}
                >
                  Sorry, I can't make it
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Decline Confirmation Modal */}
        {showDeclineConfirmation && (
          <div className="modal-overlay" onClick={() => setShowDeclineConfirmation(false)}>
            <div className="modal-content decline-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Are you sure?</h3>
              <p>We would really love to have you at the celebration! Are you sure you can't make it?</p>
              <div className="modal-buttons">
                <button 
                  className="btn-cancel"
                  onClick={() => setShowDeclineConfirmation(false)}
                >
                  Let me think again
                </button>
                <button 
                  className="btn-confirm-decline"
                  onClick={handleDecline}
                >
                  Yes, I can't attend
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVP;
