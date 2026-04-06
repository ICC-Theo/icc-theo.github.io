import React, { useState, useEffect } from 'react';

const RSVP: React.FC = () => {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [attendeeNames, setAttendeeNames] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showDeclineConfirmation, setShowDeclineConfirmation] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [responseType, setResponseType] = useState<'attending' | 'declined' | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('GuestID');
    if (id) {
      setGuestId(id);
      
      // Check if already responded (from localStorage)
      const storedResponse = localStorage.getItem(`rsvp_${id}`);
      if (storedResponse) {
        const response = JSON.parse(storedResponse);
        setHasResponded(true);
        setResponseType(response.attending === 'Yes' ? 'attending' : 'declined');
        if (response.attendeeNames) {
          setAttendeeNames(response.attendeeNames);
          setAttendeeCount(response.attendeeNames.length);
        }
      }
    }
  }, []);

  const handleAttendeeCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setAttendeeCount(count);
    // Adjust attendee names array
    const newNames = [...attendeeNames];
    while (newNames.length < count) {
      newNames.push('');
    }
    while (newNames.length > count) {
      newNames.pop();
    }
    setAttendeeNames(newNames);
  };

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
      // Store in localStorage
      const response = {
        guestId: guestId,
        attendeeNames: attendeeNames.filter(name => name.trim()),
        attending: 'Yes',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(`rsvp_${guestId}`, JSON.stringify(response));
      
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
      const response = {
        guestId: guestId,
        attendeeNames: [],
        attending: 'No',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(`rsvp_${guestId}`, JSON.stringify(response));
      
      setHasResponded(true);
      setResponseType('declined');
      setShowDeclineConfirmation(false);
    } catch (error) {
      console.error('Error declining RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <strong>Attendees:</strong> {attendeeNames.join(', ')}
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
              <div className="form-group">
                <label htmlFor="attendeeCount">Number of Guests Attending</label>
                <select 
                  id="attendeeCount" 
                  value={attendeeCount} 
                  onChange={handleAttendeeCountChange}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Guest Names</label>
                {attendeeNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Guest ${index + 1} Full Name`}
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
