# Text Loop — LED Banner & Digital Marquee Display

An interactive, responsive **Web Application** that transforms any web browser, smartphone, tablet, or external monitor into a digital LED marquee banner display.

Built with clean Vanilla HTML5, modern CSS3 (featuring glassmorphism, dynamic viewport units, and hardware-accelerated keyframe animations), and lightweight JavaScript (ES6+). Zero build steps or external dependencies required.

---

## ⚡ Features

- **Live Real-Time Text Input**: Instantaneous marquee text updates as you type with automatic short-text repetition to prevent empty voids.
- **Multiple Display & Orientation Modes**:
  - **Auto 📱 (Mobile Auto-Detect)**: Automatically senses portrait orientation on mobile devices and enables 90° rotated display; switches to horizontal marquee on landscape and desktop screens.
  - **Rotate 90° ↻ (Portrait Hold)**: Rotates the banner 90° clockwise along the long vertical edge of smartphones, creating a giant billboard-style sign when holding the phone upright in one hand (ideal for concerts, airport pickups, and sports events).
  - **Vertical ↕ (Upward Marquee)**: Continuous bottom-to-top vertical scrolling marquee with dynamic word-width fitting.
  - **Horizontal ↔ (Classic Marquee)**: Continuous left-to-right scrolling marquee across the screen width.
  - **Rotate 270° ↺ (Reverse Portrait Hold)**: Rotates 270° (-90°) counter-clockwise for holding the phone with the opposite hand.
- **Curated Typography Presets**:
  - **Bold** (Inter 900)
  - **Cyber Tech** (Orbitron 900)
  - **Neon Stripe** (Monoton)
  - **Heavy Impact** (Russo One)
  - **Synthwave** (Righteous)
  - **Normal** (Inter 400)
  - **Retro** (Bungee)
  - **Pixel** (Press Start 2P)
- **Dynamic Viewport Auto-Fitting**: Automatically scales font size and line height proportionally to the active screen dimensions and orientation presets to prevent clipping.
- **Custom Color Palette**: Integrated native color pickers for background and text colors.
- **Speed Multiplier**: Selectable scroll speeds from `0.5x` (slow) up to `2.0x` (fast).
- **Text Scaling**: Adjustable text size from `50%` to `200%`.
- **LED Neon Aura Glow Effect**: Toggleable multi-layered neon glow effect (`text-shadow`) that syncs with your selected text color.
- **Mobile Screen Optimizations**:
  - `100dvh` dynamic viewport unit support to eliminate mobile browser URL bar jitter.
  - Safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`) for iPhone notch and home indicators.
  - 16px input font sizes preventing iOS Safari automatic focus zooming.
  - Touch-optimized compact glassmorphic controls.
- **Preference Persistence**: Automatically preserves your customized banner message, colors, font, mode, speed, and size in `localStorage`.
- **Minimalist Presentation Mode**:
  - Hide controls with the eye button to enter a distraction-free display.
  - Floating trigger button to restore the control bar anytime.
- **Fullscreen Mode & Mobile Double-Tap**:
  - Double-click (desktop) or double-tap (mobile/touch) anywhere on the banner to toggle native fullscreen.
  - Graceful fallback to pseudo-fullscreen on browsers restricting automatic fullscreen.

---

## 🚀 Quick Start / Setup

Because this is a pure client-side web application, no compilation or bundler is required.

### Option 1: Open Directly in Browser
Simply double-click [`index.html`](index.html) or drag it into any modern web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local Development Server (Recommended)

Using **Node.js**:
```bash
npx serve .
# or if dependencies are installed:
npm start
```

Using **Python 3**:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🖥️ Usage Guide

| Control | Action | Description |
| :--- | :--- | :--- |
| **Message Input** | Type into the text bar | Changes the looping banner message in real time. |
| **BG** | Color Picker | Sets the background display color. |
| **Text** | Color Picker | Sets the marquee text color. |
| **Mode** | Dropdown Selector | Toggles between Auto 📱, Rotate 90° ↻, Vertical ↕, Horizontal ↔, and Rotate 270° ↺. |
| **Font** | Dropdown Selector | Switches between 8 trending and retro font styles. |
| **Speed** | Dropdown Selector | Adjusts scrolling speed multiplier (0.5x - 2.0x). |
| **Size** | Dropdown Selector | Scales font size percentage (50% - 200%). |
| **⚡ Glow** | Button Toggle | Toggles neon aura glow filter on and off. |
| **Hide (Eye Icon)** | Button Click | Hides the top control panel for clean display. |
| **Show (Floating Eye)** | Button Click | Restores the top control bar. |
| **Banner Screen** | Double-Click / Double-Tap | Enters or exits native Fullscreen mode. |

---

## 🛠️ Project Structure

```text
loop_text/
├── index.html        # Semantic HTML5 markup, Google Fonts links, layout
├── style.css         # Glassmorphism control panel, responsive marquee, font styles, 100dvh
├── script.js         # Reactive DOM bindings, orientation geometry, font scaling, persistence
├── package.json      # Project metadata and convenience npm scripts
├── .gitignore        # Git ignore rules for OS and environment files
└── README.md         # Documentation and usage guide
```

---

## 🔒 Permissions & Configuration

- **API Keys / Secrets**: None required.
- **Network Permissions**: Google Fonts are loaded from Google's CDN (`fonts.googleapis.com` and `fonts.gstatic.com`). Once cached, the app operates offline.
- **Browser Permissions**: Fullscreen API (`requestFullscreen`) requires user gesture interaction (handled automatically on double-click/double-tap).

---

## 🧪 Testing & Validation

Run the asset validation script:
```bash
npm test
```
Or check JavaScript syntax:
```bash
node -c script.js
```

---

## 📄 License

This project is open source and available under the [MIT License](package.json).
