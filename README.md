# Enchong's 50th Birthday Celebration Website 🎉🌴

A summer-themed 50th birthday celebration website built with React and TypeScript.

## Event Details

- **Celebrant**: Enchong
- **Date**: May 1, 2026
- **Time**: 3:00 PM
- **Venue**: Villa Katharina Resort, Brgy Maugat, Tanauan City, Batangas
- **Theme**: Summer Party - "50 Years of Memories"

## Features

- 🎨 Summer-themed design with tropical colors
- 📱 Fully responsive (works on mobile, tablet, and desktop)
- 🔐 Guest ID authentication system
- 📅 Event schedule display
- 🗺️ Venue information with directions
- 👗 Dress code guide (Summer Party Attire)
- ✅ RSVP system with local storage
- 📸 Photo gallery (ready for images)
- ⏰ Countdown timer to the celebration

## Tech Stack

- React 19
- TypeScript
- CSS3 (no external UI libraries)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/icc-theo/icc-theo.github.io.git
   cd icc-theo.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── index.tsx               # React entry point
├── index.css               # Global styles (Summer theme)
└── components/
    ├── Header.tsx          # Header with guest ID modal
    ├── LandingPage.tsx     # Landing page wrapper
    ├── Navbar.tsx          # Navigation bar
    ├── Home.tsx            # Home section with invitation cards
    ├── Schedule.tsx        # Party schedule
    ├── Countdown.tsx       # Countdown timer component
    ├── Venue.tsx           # Venue information
    ├── DressCode.tsx       # Dress code guidelines
    ├── RSVP.tsx            # RSVP form
    ├── Gallery.tsx         # Photo gallery
    └── Footer.tsx          # Footer
```

## Adding Photos

To add photos to the gallery:

1. Place your images in the `src/images/gallery/` folder
2. Update the `Gallery.tsx` component to import and display the images

## Customization

### Colors

The Summer theme uses these primary colors (defined in `index.css`):

- Primary Teal: `#20B2AA`
- Coral: `#FF6B6B`
- Sunny Yellow: `#FFD93D`
- Ocean Blue: `#4D96FF`
- Fresh Green: `#6BCB77`

### Fonts

- Headings: Playfair Display, Pacifico
- Body: Poppins

## License

This project is open source and available under the [ISC License](LICENSE).

## Credits

Made with ❤️ for a special 50th birthday celebration.
