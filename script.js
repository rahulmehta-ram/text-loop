// DOM Element References
const textInput = document.getElementById('textInput');
const bgColor = document.getElementById('bgColor');
const textColor = document.getElementById('textColor');
const fontSelect = document.getElementById('fontSelect');
const speedSelect = document.getElementById('speedSelect');
const sizeSelect = document.getElementById('sizeSelect');
const bannerScreen = document.getElementById('bannerScreen');
const marqueeTrack = document.getElementById('marqueeTrack');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');

const controlsBar = document.getElementById('controlsBar');
const hidePanelBtn = document.getElementById('hidePanelBtn');
const floatingEyeBtn = document.getElementById('floatingEyeBtn');
const glowToggleBtn = document.getElementById('glowToggleBtn');

let isGlowActive = false;

// Automatic Font Sizing & Speed Adjustment
function autoFitBanner() {
  const screenHeight = bannerScreen.clientHeight;
  const screenWidth = bannerScreen.clientWidth;
  if (screenHeight <= 0) return;

  const fontType = fontSelect.value;
  let heightRatio = 0.72; // Default ~72% screen height fill

  if (fontType === 'font-pixel') {
    heightRatio = 0.55;
  } else if (fontType === 'font-retro') {
    heightRatio = 0.65;
  } else if (fontType === 'font-neon') {
    heightRatio = 0.60;
  } else if (fontType === 'font-cyber') {
    heightRatio = 0.65;
  } else if (fontType === 'font-synth') {
    heightRatio = 0.68;
  } else if (fontType === 'font-russo') {
    heightRatio = 0.70;
  }

  // Calculate Base Font Size in Pixels
  const baseFontSize = Math.max(16, Math.floor(screenHeight * heightRatio));
  
  // Apply Text Size % Multiplier
  const sizeMultiplier = parseFloat(sizeSelect.value) / 100;
  const finalFontSize = Math.round(baseFontSize * sizeMultiplier);

  item1.style.fontSize = finalFontSize + 'px';
  item2.style.fontSize = finalFontSize + 'px';

  // Dynamic animation duration calculation
  const trackWidth = item1.offsetWidth;
  const baseSpeedPixelsPerSecond = Math.max(160, screenWidth * 0.35);
  
  // Apply Speed Multiplier (1.0x default, 0.5x is slower = longer duration)
  const speedMultiplier = parseFloat(speedSelect.value);
  const effectiveSpeed = baseSpeedPixelsPerSecond * speedMultiplier;
  
  const duration = trackWidth / effectiveSpeed;
  marqueeTrack.style.animationDuration = Math.max(1, duration) + 's';
}

// Update Display Content and Color Styles
function updateBanner() {
  const textVal = textInput.value || ' ';
  const bgVal = bgColor.value;
  const textColVal = textColor.value;
  const fontVal = fontSelect.value;

  // Update Text
  item1.textContent = textVal;
  item2.textContent = textVal;

  // Update Colors
  bannerScreen.style.backgroundColor = bgVal;
  item1.style.color = textColVal;
  item2.style.color = textColVal;

  // Update Font & Glow Classes
  const glowClass = isGlowActive ? ' glow-effect' : '';
  item1.className = 'marquee-item ' + fontVal + glowClass;
  item2.className = 'marquee-item ' + fontVal + glowClass;

  // Recalculate Font Fit & Scroll Duration
  autoFitBanner();
}

// LED Glow Effect Toggle
glowToggleBtn.addEventListener('click', () => {
  isGlowActive = !isGlowActive;
  glowToggleBtn.classList.toggle('active', isGlowActive);
  updateBanner();
});

// Robust Cross-Browser Fullscreen Toggle with Fallback
function toggleFullscreen() {
  const doc = document;
  const docEl = document.documentElement;

  const requestFS = docEl.requestFullscreen || 
                    docEl.webkitRequestFullscreen || 
                    docEl.mozRequestFullScreen || 
                    docEl.msRequestFullscreen;

  const exitFS = doc.exitFullscreen || 
                 doc.webkitExitFullscreen || 
                 doc.mozCancelFullScreen || 
                 doc.msExitFullscreen;

  const isFS = doc.fullscreenElement || 
               doc.webkitFullscreenElement || 
               doc.mozFullScreenElement || 
               doc.msFullscreenElement;

  if (!isFS) {
    if (requestFS) {
      try {
        const promise = requestFS.call(docEl);
        if (promise && promise.catch) {
          promise.catch(() => {
            // Fallback: If native fullscreen is rejected by browser policy, hide controls for pseudo-fullscreen
            hideControls();
          });
        }
      } catch (err) {
        hideControls();
      }
    } else {
      hideControls();
    }
  } else {
    if (exitFS) {
      exitFS.call(doc).catch(() => {});
    }
  }
}

// Double-Click / Double-Tap Listener on Display Banner
bannerScreen.addEventListener('dblclick', (e) => {
  e.preventDefault();
  toggleFullscreen();
});

let lastTapTime = 0;
function handleDoubleTap(e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTapTime;
  if (tapLength < 350 && tapLength > 0) {
    e.preventDefault();
    toggleFullscreen();
  }
  lastTapTime = currentTime;
}

bannerScreen.addEventListener('touchend', handleDoubleTap);

// Hide Control Panel
function hideControls() {
  controlsBar.classList.add('hidden');
  floatingEyeBtn.classList.remove('hidden');
  setTimeout(autoFitBanner, 50);
}

// Show Control Panel
function showControls() {
  controlsBar.classList.remove('hidden');
  floatingEyeBtn.classList.add('hidden');
  setTimeout(autoFitBanner, 50);
}

// Event Listeners for Controls Toggle
hidePanelBtn.addEventListener('click', hideControls);
floatingEyeBtn.addEventListener('click', showControls);

// Event Listeners for Instant Input Updates
textInput.addEventListener('input', updateBanner);
bgColor.addEventListener('input', updateBanner);
textColor.addEventListener('input', updateBanner);
fontSelect.addEventListener('change', updateBanner);
speedSelect.addEventListener('change', updateBanner);
sizeSelect.addEventListener('change', updateBanner);

// Orientation, Fullscreen & Window Resize Handlers
window.addEventListener('resize', autoFitBanner);
document.addEventListener('fullscreenchange', () => setTimeout(autoFitBanner, 100));
document.addEventListener('webkitfullscreenchange', () => setTimeout(autoFitBanner, 100));
window.addEventListener('orientationchange', () => setTimeout(autoFitBanner, 100));

// Ensure web fonts are fully loaded before calculating dimensions
document.fonts.ready.then(updateBanner);

// Initial Execution
updateBanner();
