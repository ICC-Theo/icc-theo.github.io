# Google Sheets Integration Setup Guide

Your website is already configured to read guest IDs from your public Google Sheet!

**Your Sheet:** https://docs.google.com/spreadsheets/d/1cJLcTNayGgeI_rfKCTMHvBsLbVRZcmV2dzF57CtJzVI

## Current Status

✅ **Reading Guest IDs** - Working! (Sheet is public)  
⏳ **Saving RSVP Responses** - Needs Apps Script setup (see below)

---

## Setup RSVP Saving to Google Sheets

To save RSVP responses directly to your spreadsheet, follow these steps:

### Step 1: Open Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. This opens the script editor

### Step 2: Add the Script Code

1. Delete any existing code in the editor
2. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create RSVP Response sheet
    let sheet = ss.getSheetByName('RSVP Response');
    if (!sheet) {
      sheet = ss.insertSheet('RSVP Response');
      sheet.appendRow(['GuestID', 'Guest Name', 'Attendee Names', 'Adults', 'Kids', 'Attending', 'Timestamp']);
      // Format header row
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Check if guest already responded (update instead of duplicate)
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.guestId) {
        rowIndex = i + 1;
        break;
      }
    }
    
    const rowData = [
      data.guestId,
      data.guestName || '',
      data.attendeeNames || '',
      data.adults || 0,
      data.kids || 0,
      data.attending || 'Yes',
      data.timestamp || new Date().toLocaleString()
    ];
    
    if (rowIndex > 0) {
      // Update existing row
      sheet.getRange(rowIndex, 1, 1, 7).setValues([rowData]);
    } else {
      // Add new row
      sheet.appendRow(rowData);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'RSVP API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (Ctrl+S or Cmd+S)
4. Name the project: **"Birthday RSVP"**

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure:
   - **Description:** RSVP Handler
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Sign in with your Google account
8. Click **Advanced** → **Go to Birthday RSVP (unsafe)**
9. Click **Allow**
10. **Copy the Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`)

### Step 4: Add the URL to Your Website

1. Create a file named `.env` in your project root folder
2. Add this line (replace with YOUR copied URL):

```
REACT_APP_RSVP_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart the development server (`npm start`)

### Step 5: For Production (GitHub Pages)

Since GitHub Pages can't read `.env` files, update the endpoint directly in the code:

1. Open `src/services/guestService.ts`
2. Find this line:
   ```typescript
   rsvpEndpoint: process.env.REACT_APP_RSVP_ENDPOINT || '',
   ```
3. Replace it with your actual URL:
   ```typescript
   rsvpEndpoint: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
   ```

---

## Testing

1. Run your website locally: `npm start`
2. Enter a valid Guest ID (e.g., QWDAT)
3. Fill out the RSVP form and submit
4. Check your Google Sheet - a new **"RSVP Response"** tab should appear with the data!

---

## Sheet Structure

### Sheet 1 (Your Guest List) - Columns:
| A | B | C | D | E |
|---|---|---|---|---|
| Main Guest | Adult | Kids | GuestID | Table No. |

### Sheet 2 "RSVP Response" (Auto-created) - Columns:
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| GuestID | Guest Name | Attendee Names | Adults | Kids | Attending | Timestamp |

---

## Troubleshooting

**RSVP not saving?**
- Check browser console (F12) for errors
- Verify the Apps Script URL is correct
- Check Apps Script logs: Extensions → Apps Script → View → Executions

**Guest ID not validating?**
- Make sure your sheet is shared publicly (Anyone with link = Viewer)
- Check the GuestID column (Column D) has valid IDs

**Changes not showing on deployed site?**
- Rebuild and redeploy: commit changes and push to GitHub
- Clear browser cache or try incognito mode
