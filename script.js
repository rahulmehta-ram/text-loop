// DOM Element References
const textInput = document.getElementById('textInput');
const bgColor = document.getElementById('bgColor');
const textColor = document.getElementById('textColor');
const modeSelect = document.getElementById('modeSelect');
const fontSelect = document.getElementById('fontSelect');
const speedSelect = document.getElementById('speedSelect');
const sizeSelect = document.getElementById('sizeSelect');
const bannerScreen = document.getElementById('bannerScreen');
const marqueeRotator = document.getElementById('marqueeRotator');
const marqueeTrack = document.getElementById('marqueeTrack');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');

const controlsBar = document.getElementById('controlsBar');
const hidePanelBtn = document.getElementById('hidePanelBtn');
const floatingEyeBtn = document.getElementById('floatingEyeBtn');
const glowToggleBtn = document.getElementById('glowToggleBtn');

let isGlowActive = false;

// HTML escaping helper
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Determine Effective Orientation Mode
// If set to 'auto': detects portrait orientation (height > width) and uses 'rotate90' for mobile
function getEffectiveMode() {
  const selectedMode = modeSelect ? modeSelect.value : 'auto';
  if (selectedMode === 'auto') {
    const isPortrait = window.innerHeight > window.innerWidth;
    return isPortrait ? 'rotate90' : 'horizontal';
  }
  return selectedMode;
}

// Automatic Sizing, Layout, and Animation Calculation
function autoFitBanner() {
  const screenHeight = bannerScreen.clientHeight;
  const screenWidth = bannerScreen.clientWidth;
  if (screenHeight <= 0 || screenWidth <= 0) return;

  const effectiveMode = getEffectiveMode();
  const fontType = fontSelect.value;
  const sizeMultiplier = parseFloat(sizeSelect.value) / 100;
  const speedMultiplier = parseFloat(speedSelect.value);

  // Update screen container mode class
  bannerScreen.className = 'banner-screen mode-' + effectiveMode;

  // Font height ratio presets
  let heightRatio = 0.72; // Default ~72% fill
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

  const rawText = textInput.value || ' ';

  if (effectiveMode === 'rotate90' || effectiveMode === 'rotate270') {
    // Rotated mode: The rotator element's width is the screen height, and height is the screen width.
    marqueeRotator.style.width = screenHeight + 'px';
    marqueeRotator.style.height = screenWidth + 'px';

    const effectiveHeight = screenWidth;
    const effectiveWidth = screenHeight;

    const baseFontSize = Math.max(16, Math.floor(effectiveHeight * heightRatio));
    const finalFontSize = Math.round(baseFontSize * sizeMultiplier);

    item1.style.fontSize = finalFontSize + 'px';
    item2.style.fontSize = finalFontSize + 'px';

    // Populate content
    item1.textContent = rawText;
    item2.textContent = rawText;

    // Ensure content spans at least effectiveWidth so loop is gapless
    const singleWidth = item1.offsetWidth;
    if (singleWidth > 0 && singleWidth < effectiveWidth) {
      const repeats = Math.max(1, Math.ceil(effectiveWidth / singleWidth));
      const chunk = rawText + '\u00A0\u00A0\u00A0\u00A0';
      item1.textContent = chunk.repeat(repeats);
      item2.textContent = chunk.repeat(repeats);
    }

    const trackWidth = item1.offsetWidth;
    const baseSpeed = Math.max(160, effectiveWidth * 0.35);
    const effectiveSpeed = baseSpeed * speedMultiplier;
    const duration = trackWidth / effectiveSpeed;
    marqueeTrack.style.animationDuration = Math.max(1, duration) + 's';

  } else if (effectiveMode === 'vertical') {
    // Vertical Mode: Marquee scrolls upward bottom-to-top
    marqueeRotator.style.width = '100%';
    marqueeRotator.style.height = '100%';

    // Sizing font based on longest word fitting screen width
    const words = rawText.trim().split(/\s+/);
    const longestWord = words.reduce((max, w) => (w.length > max.length ? w : max), '');
    const longestWordLen = Math.max(1, longestWord.length);
    const charWidthRatio = fontType === 'font-pixel' ? 0.85 : 0.65;
    const fitWidthSize = Math.floor((screenWidth * 0.88) / (longestWordLen * charWidthRatio));
    const maxVerticalHeight = Math.floor(screenHeight * 0.22);
    const baseFontSize = Math.max(24, Math.min(maxVerticalHeight, fitWidthSize));
    const finalFontSize = Math.round(baseFontSize * sizeMultiplier);

    item1.style.fontSize = finalFontSize + 'px';
    item2.style.fontSize = finalFontSize + 'px';

    // Initial single block
    item1.innerHTML = `<div class="vertical-msg-block">${escapeHtml(rawText)}</div>`;
    item2.innerHTML = `<div class="vertical-msg-block">${escapeHtml(rawText)}</div>`;

    // Ensure content spans at least screenHeight so upward loop is continuous
    const singleHeight = item1.offsetHeight;
    if (singleHeight > 0 && singleHeight < screenHeight) {
      const repeats = Math.max(1, Math.ceil((screenHeight * 1.2) / singleHeight));
      const htmlBlock = `<div class="vertical-msg-block">${escapeHtml(rawText)}</div>`.repeat(repeats);
      item1.innerHTML = htmlBlock;
      item2.innerHTML = htmlBlock;
    }

    const trackHeight = item1.offsetHeight;
    const baseSpeed = Math.max(100, screenHeight * 0.28);
    const effectiveSpeed = baseSpeed * speedMultiplier;
    const duration = trackHeight / effectiveSpeed;
    marqueeTrack.style.animationDuration = Math.max(1, duration) + 's';

  } else {
    // Horizontal Mode: Standard left-to-right desktop/landscape layout
    marqueeRotator.style.width = '100%';
    marqueeRotator.style.height = '100%';

    const baseFontSize = Math.max(16, Math.floor(screenHeight * heightRatio));
    const finalFontSize = Math.round(baseFontSize * sizeMultiplier);

    item1.style.fontSize = finalFontSize + 'px';
    item2.style.fontSize = finalFontSize + 'px';

    item1.textContent = rawText;
    item2.textContent = rawText;

    // Check if short text needs repetition to fill screen
    const singleWidth = item1.offsetWidth;
    if (singleWidth > 0 && singleWidth < screenWidth) {
      const repeats = Math.max(1, Math.ceil(screenWidth / singleWidth));
      const chunk = rawText + '\u00A0\u00A0\u00A0\u00A0';
      item1.textContent = chunk.repeat(repeats);
      item2.textContent = chunk.repeat(repeats);
    }

    const trackWidth = item1.offsetWidth;
    const baseSpeed = Math.max(160, screenWidth * 0.35);
    const effectiveSpeed = baseSpeed * speedMultiplier;
    const duration = trackWidth / effectiveSpeed;
    marqueeTrack.style.animationDuration = Math.max(1, duration) + 's';
  }
}

// Update Display Content, Color, Font and Glow Styles
function updateBanner() {
  const bgVal = bgColor.value;
  const textColVal = textColor.value;
  const fontVal = fontSelect.value;

  // Update Colors
  bannerScreen.style.backgroundColor = bgVal;
  item1.style.color = textColVal;
  item2.style.color = textColVal;

  // Update Font & Glow Classes
  const glowClass = isGlowActive ? ' glow-effect' : '';
  item1.className = 'marquee-item ' + fontVal + glowClass;
  item2.className = 'marquee-item ' + fontVal + glowClass;

  // Recalculate Layout & Scroll Duration
  autoFitBanner();

  // Save preferences to localStorage
  savePreferences();
}

// Save User Preferences
function savePreferences() {
  try {
    const prefs = {
      text: textInput.value,
      bg: bgColor.value,
      textCol: textColor.value,
      mode: modeSelect.value,
      font: fontSelect.value,
      speed: speedSelect.value,
      size: sizeSelect.value,
      glow: isGlowActive
    };
    localStorage.setItem('led_banner_prefs', JSON.stringify(prefs));
  } catch (e) {
    // Ignore storage errors in restricted contexts
  }
}

// Load User Preferences
function loadPreferences() {
  try {
    const saved = localStorage.getItem('led_banner_prefs');
    if (!saved) return;
    const prefs = JSON.parse(saved);
    if (prefs.text !== undefined) textInput.value = prefs.text;
    if (prefs.bg) bgColor.value = prefs.bg;
    if (prefs.textCol) textColor.value = prefs.textCol;
    if (prefs.mode && modeSelect.querySelector(`option[value="${prefs.mode}"]`)) {
      modeSelect.value = prefs.mode;
    }
    if (prefs.font && fontSelect.querySelector(`option[value="${prefs.font}"]`)) {
      fontSelect.value = prefs.font;
    }
    if (prefs.speed && speedSelect.querySelector(`option[value="${prefs.speed}"]`)) {
      speedSelect.value = prefs.speed;
    }
    if (prefs.size && sizeSelect.querySelector(`option[value="${prefs.size}"]`)) {
      sizeSelect.value = prefs.size;
    }
    if (prefs.glow !== undefined) {
      isGlowActive = !!prefs.glow;
      glowToggleBtn.classList.toggle('active', isGlowActive);
    }
  } catch (e) {
    // Fall back to default markup values
  }
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
            // Fallback: If native fullscreen is rejected by browser policy, hide controls
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
if (modeSelect) modeSelect.addEventListener('change', updateBanner);
fontSelect.addEventListener('change', updateBanner);
speedSelect.addEventListener('change', updateBanner);
sizeSelect.addEventListener('change', updateBanner);

// Orientation, Fullscreen & Window Resize Handlers
window.addEventListener('resize', autoFitBanner);
document.addEventListener('fullscreenchange', () => setTimeout(autoFitBanner, 100));
document.addEventListener('webkitfullscreenchange', () => setTimeout(autoFitBanner, 100));
window.addEventListener('orientationchange', () => setTimeout(autoFitBanner, 100));
if (screen.orientation) {
  screen.orientation.addEventListener('change', () => setTimeout(autoFitBanner, 100));
}

// Ensure web fonts are fully loaded before calculating dimensions
document.fonts.ready.then(() => {
  loadPreferences();
  updateBanner();
});

// Initial Execution
loadPreferences();
updateBanner();

