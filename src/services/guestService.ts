// Guest Service - Handles GuestID validation and RSVP data with Google Sheets integration

// Configuration
const CONFIG = {
  // Your Google Sheet ID (from the URL)
  spreadsheetId: '1cJLcTNayGgeI_rfKCTMHvBsLbVRZcmV2dzF57CtJzVI',
  
  // Google Apps Script Web App URL for saving RSVP responses
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbyoyWO-C3r09zDrnCfYeTF6d7jPqW1GnX5g5wK0l4jjb2nFtO8u4oONUyZo_Y5b5QGs/exec',
  
  // Enable Google Sheets integration
  useGoogleSheets: true,
};

export interface GuestData {
  mainGuest: string;
  adult: string;
  kids: string;
  guestId: string;
  tableNo: string;
}

export interface RSVPData {
  guestId: string;
  guestName?: string;
  attendeeNames: string[];
  adultCount: number;
  kidsCount: number;
  attending: 'Yes' | 'No';
  timestamp: string;
}

// Cache for guest IDs
let guestIdsCache: string[] | null = null;
let guestDataCache: GuestData[] | null = null;

/**
 * Load guest data from Google Sheets (using public CSV export - no API key needed)
 */
const loadGuestDataFromGoogleSheets = async (): Promise<GuestData[]> => {
  try {
    // Use the public CSV export URL (works for public sheets without API key)
    const url = `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/export?format=csv&gid=0`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Google Sheets export error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      console.warn('No data found in Google Sheet');
      return [];
    }
    
    // Parse CSV (skip header row)
    const guests: GuestData[] = [];
    for (let i = 1; i < lines.length; i++) {
      // Handle CSV with possible quoted values
      const values = parseCSVLine(lines[i]);
      if (values.length >= 4 && values[3]) { // Ensure GuestID exists
        guests.push({
          mainGuest: values[0] || '',
          adult: values[1] || '',
          kids: values[2] || '',
          guestId: values[3] || '',
          tableNo: values[4] || '',
        });
      }
    }
    
    console.log(`Loaded ${guests.length} guests from Google Sheets`);
    return guests;
  } catch (error) {
    console.error('Error loading from Google Sheets:', error);
    throw error;
  }
};

/**
 * Parse a CSV line handling quoted values
 */
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

/**
 * Load guest data from local CSV file
 */
const loadGuestDataFromCSV = async (): Promise<GuestData[]> => {
  try {
    const response = await fetch('/Event Invitation.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n').filter(line => line.trim());
    
    const data: GuestData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= 4 && values[3]) { // Ensure GuestID exists
        data.push({
          mainGuest: values[0] || '',
          adult: values[1] || '',
          kids: values[2] || '',
          guestId: values[3] || '',
          tableNo: values[4] || '',
        });
      }
    }
    
    console.log(`Loaded ${data.length} guest records from CSV`);
    return data;
  } catch (error) {
    console.error('Error loading guest data from CSV:', error);
    return [];
  }
};

/**
 * Load and parse guest data (from Google Sheets or CSV)
 */
export const loadGuestData = async (): Promise<GuestData[]> => {
  if (guestDataCache) {
    return guestDataCache;
  }

  try {
    let data: GuestData[];
    
    if (CONFIG.useGoogleSheets && CONFIG.spreadsheetId) {
      data = await loadGuestDataFromGoogleSheets();
    } else {
      data = await loadGuestDataFromCSV();
    }
    
    guestDataCache = data;
    guestIdsCache = data.map(g => g.guestId.toUpperCase());
    
    return data;
  } catch (error) {
    console.error('Error loading guest data:', error);
    // Fallback to CSV if Google Sheets fails
    if (CONFIG.useGoogleSheets) {
      console.log('Falling back to CSV...');
      return loadGuestDataFromCSV();
    }
    return [];
  }
};

/**
 * Validate if a GuestID exists in the CSV
 */
export const validateGuestId = async (guestId: string): Promise<boolean> => {
  if (!guestIdsCache) {
    await loadGuestData();
  }
  
  const normalizedId = guestId.toUpperCase().trim();
  return guestIdsCache?.includes(normalizedId) || false;
};

/**
 * Get guest data by GuestID
 */
export const getGuestById = async (guestId: string): Promise<GuestData | null> => {
  if (!guestDataCache) {
    await loadGuestData();
  }
  
  const normalizedId = guestId.toUpperCase().trim();
  return guestDataCache?.find(g => g.guestId.toUpperCase() === normalizedId) || null;
};

/**
 * Save RSVP response to localStorage and Google Sheets
 */
export const saveRSVPResponse = async (data: RSVPData): Promise<boolean> => {
  // Always save to localStorage first (for immediate feedback)
  localStorage.setItem(`rsvp_${data.guestId}`, JSON.stringify(data));
  
  // Also save to a master list for easy retrieval
  const allRsvps = getAllRSVPs();
  const existingIndex = allRsvps.findIndex(r => r.guestId === data.guestId);
  
  if (existingIndex >= 0) {
    allRsvps[existingIndex] = data;
  } else {
    allRsvps.push(data);
  }
  
  localStorage.setItem('all_rsvps', JSON.stringify(allRsvps));
  
  console.log('RSVP saved to localStorage:', data);
  
  // Send to Google Sheets via Apps Script if configured
  if (CONFIG.rsvpEndpoint && CONFIG.rsvpEndpoint.includes('script.google.com')) {
    try {
      const payload = {
        guestId: data.guestId,
        guestName: data.guestName || data.attendeeNames[0] || 'Guest',
        attendeeNames: data.attendeeNames.join(' | '),
        adults: data.adultCount,
        kids: data.kidsCount,
        attending: data.attending,
        timestamp: data.timestamp
      };
      
      await fetch(CONFIG.rsvpEndpoint, {
        method: 'POST',
        mode: 'no-cors', // Required for Apps Script
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      console.log('✅ RSVP submitted to Google Sheets:', payload);
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      // Still return true since we saved locally
      return true;
    }
  } else {
    console.log('ℹ️ Google Sheets endpoint not configured. RSVP saved locally only.');
    console.log('To save to Google Sheets, see GOOGLE_SHEETS_SETUP.md');
    return true;
  }
};

/**
 * Check for existing RSVP in localStorage
 * Note: RSVP data from Google Sheets is write-only via Apps Script
 * Local responses are cached in localStorage for the user's convenience
 */
export const checkExistingRSVP = async (guestId: string): Promise<RSVPData | null> => {
  // Check localStorage
  const localData = getRSVPResponse(guestId);
  if (localData) {
    return localData;
  }
  
  return null;
};

/**
 * Get RSVP response for a specific guest
 */
export const getRSVPResponse = (guestId: string): RSVPData | null => {
  const stored = localStorage.getItem(`rsvp_${guestId}`);
  return stored ? JSON.parse(stored) : null;
};

/**
 * Get all RSVP responses
 */
export const getAllRSVPs = (): RSVPData[] => {
  const stored = localStorage.getItem('all_rsvps');
  return stored ? JSON.parse(stored) : [];
};

/**
 * Export RSVPs as CSV for download
 */
export const exportRSVPsAsCSV = (): string => {
  const rsvps = getAllRSVPs();
  
  if (rsvps.length === 0) {
    return '';
  }
  
  const headers = ['Guest ID', 'Attendee Names', 'Adults', 'Kids', 'Attending', 'Timestamp'];
  const rows = rsvps.map(r => [
    r.guestId,
    r.attendeeNames.join('; '),
    r.adultCount.toString(),
    r.kidsCount.toString(),
    r.attending,
    r.timestamp
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
};
