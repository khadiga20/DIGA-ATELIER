/* ==========================================
   DIGA — Wear Your Mood
   Living Mood Engine Interactive Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMoodEngine();
  initFabricWordmark();
  initHorizontalGallery();
  initVeilLiftObserver();
  initSpectrumSlider();
  initKineticTypography();
  initHeaderScroll();
  initMoodSubscriptionForm();
});

/* ------------------------------------------
   1. MOOD ENGINE — Real-time Visual Tuning
   ------------------------------------------ */
const MOOD_PROFILES = {
  fierce: {
    accentColor: '#C2185B',
    accentSecondary: '#FF1744',
    accentGlow: 'rgba(194, 24, 91, 0.45)',
    accentGlowIntense: 'rgba(255, 23, 68, 0.65)',
    bgColor: '#080406',
    bgSurface: '#12080c',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(255, 23, 68, 0.25), transparent 70%)',
    overlayOpacity: 0.22,
    heroFilter: 'grayscale(60%) contrast(125%) brightness(90%)'
  },
  fluid: {
    accentColor: '#7A22C4',
    accentSecondary: '#E0247D',
    accentGlow: 'rgba(122, 34, 196, 0.45)',
    accentGlowIntense: 'rgba(224, 36, 125, 0.6)',
    bgColor: '#060508',
    bgSurface: '#0e0c12',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(122, 34, 196, 0.2), transparent 70%)',
    overlayOpacity: 0.15,
    heroFilter: 'grayscale(75%) contrast(110%) brightness(85%)'
  },
  quiet: {
    accentColor: '#8C857B',
    accentSecondary: '#D4CEB8',
    accentGlow: 'rgba(140, 133, 123, 0.3)',
    accentGlowIntense: 'rgba(212, 206, 184, 0.45)',
    bgColor: '#070707',
    bgSurface: '#111110',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(212, 206, 184, 0.1), transparent 70%)',
    overlayOpacity: 0.08,
    heroFilter: 'grayscale(90%) contrast(100%) brightness(80%)'
  },
  electric: {
    accentColor: '#536DFE',
    accentSecondary: '#00E5FF',
    accentGlow: 'rgba(83, 109, 254, 0.5)',
    accentGlowIntense: 'rgba(0, 229, 255, 0.7)',
    bgColor: '#03050a',
    bgSurface: '#080c16',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.25), transparent 70%)',
    overlayOpacity: 0.25,
    heroFilter: 'grayscale(40%) contrast(130%) brightness(95%)'
  },
  tender: {
    accentColor: '#D81B60',
    accentSecondary: '#F48FB1',
    accentGlow: 'rgba(216, 27, 96, 0.35)',
    accentGlowIntense: 'rgba(244, 143, 177, 0.55)',
    bgColor: '#080506',
    bgSurface: '#140c0e',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(244, 143, 177, 0.18), transparent 70%)',
    overlayOpacity: 0.14,
    heroFilter: 'grayscale(50%) contrast(105%) brightness(90%)'
  },
  rebel: {
    accentColor: '#D50000',
    accentSecondary: '#FF5252',
    accentGlow: 'rgba(213, 0, 0, 0.5)',
    accentGlowIntense: 'rgba(255, 82, 82, 0.75)',
    bgColor: '#080303',
    bgSurface: '#140707',
    tempOverlay: 'radial-gradient(circle at 50% 50%, rgba(213, 0, 0, 0.28), transparent 70%)',
    overlayOpacity: 0.28,
    heroFilter: 'grayscale(70%) contrast(135%) brightness(90%)'
  }
};

function initMoodEngine() {
  const moodNodes = document.querySelectorAll('.mood-node');
  const activeMoodText = document.getElementById('active-mood-name');
  const atmosphereOverlay = document.getElementById('mood-atmosphere');
  const heroBgImg = document.querySelector('.hero-bg-img');

  moodNodes.forEach(node => {
    node.addEventListener('click', () => {
      const moodKey = node.getAttribute('data-mood');
      if (!MOOD_PROFILES[moodKey]) return;

      // Update UI active state
      moodNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      if (activeMoodText) {
        activeMoodText.textContent = moodKey.toUpperCase();
      }

      applyMoodTheme(moodKey);
    });
  });

  function applyMoodTheme(key) {
    const profile = MOOD_PROFILES[key];
    const root = document.documentElement;

    root.style.setProperty('--accent-color', profile.accentColor);
    root.style.setProperty('--accent-secondary', profile.accentSecondary);
    root.style.setProperty('--accent-glow', profile.accentGlow);
    root.style.setProperty('--accent-glow-intense', profile.accentGlowIntense);
    root.style.setProperty('--bg-color', profile.bgColor);
    root.style.setProperty('--bg-surface', profile.bgSurface);

    if (atmosphereOverlay) {
      atmosphereOverlay.style.background = profile.tempOverlay;
      atmosphereOverlay.style.opacity = profile.overlayOpacity;
    }

    if (heroBgImg) {
      heroBgImg.style.filter = profile.heroFilter;
    }
  }
}

/* ------------------------------------------
   2. FABRIC WORDMARK LOGO — Wind Separation
   ------------------------------------------ */
function initFabricWordmark() {
  const logoContainer = document.querySelector('.logo-container');
  const layer1 = document.querySelector('.wordmark-layer-1');
  const layer2 = document.querySelector('.wordmark-layer-2');
  const layer3 = document.querySelector('.wordmark-layer-3');

  if (!logoContainer || !layer1) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  logoContainer.addEventListener('mousemove', (e) => {
    const rect = logoContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    targetX = deltaX;
    targetY = deltaY;
  });

  logoContainer.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function renderFabric() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (layer1) layer1.style.transform = `translate(${currentX * -12}px, ${currentY * -8}px) rotate(${currentX * 1.5}deg)`;
    if (layer2) layer2.style.transform = `translate(${currentX * 18}px, ${currentY * 14}px) rotate(${currentX * -2}deg)`;
    if (layer3) layer3.style.transform = `translate(${currentX * -25}px, ${currentY * 22}px) rotate(${currentX * 2.5}deg)`;

    requestAnimationFrame(renderFabric);
  }

  renderFabric();
}

/* ------------------------------------------
   3. SECTION 2 — Horizontal Magazine Scroll
   ------------------------------------------ */
function initHorizontalGallery() {
  const wrapper = document.querySelector('.gallery-section-wrapper');
  const track = document.querySelector('.gallery-track');

  if (!wrapper || !track) return;

  let currentTranslateX = 0;
  let targetTranslateX = 0;

  function updateGalleryPosition() {
    // Only map on desktop (>768px)
    if (window.innerWidth > 768) {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight - window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / wrapperHeight));

      const maxScrollX = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
      targetTranslateX = -scrollProgress * maxScrollX;

      currentTranslateX += (targetTranslateX - currentTranslateX) * 0.08;
      track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
    } else {
      track.style.transform = 'none';
    }

    requestAnimationFrame(updateGalleryPosition);
  }

  updateGalleryPosition();
}

/* ------------------------------------------
   4. SECTION 3 — Veil Lift Reveal Observer
   ------------------------------------------ */
function initVeilLiftObserver() {
  const collectionItems = document.querySelectorAll('.collection-item');
  if (!collectionItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.25
  });

  collectionItems.forEach(item => observer.observe(item));
}

/* ------------------------------------------
   5. SECTION 4 — Spectrum Color Slider
   ------------------------------------------ */
function initSpectrumSlider() {
  const bar = document.getElementById('spectrum-bar');
  const handle = document.getElementById('spectrum-handle');
  const cards = document.querySelectorAll('.spectrum-card');

  if (!bar || !handle) return;

  let isDragging = false;

  function updateSpectrum(clientX) {
    const rect = bar.getBoundingClientRect();
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage));

    handle.style.left = `${percentage * 100}%`;

    // Map 0 to 1 -> Hue Shift (-40deg to +60deg)
    const hueShift = (percentage - 0.5) * 120;
    const saturation = 1 + (percentage * 0.5);

    cards.forEach((card, idx) => {
      const cardImg = card.querySelector('.spectrum-card-img');
      const offsetHue = hueShift + (idx * 25);
      if (cardImg) {
        cardImg.style.filter = `hue-rotate(${offsetHue}deg) saturate(${saturation})`;
      }

      // Glow effect based on position
      const glowAlpha = 0.3 + (percentage * 0.4);
      card.style.borderColor = `rgba(224, 36, 125, ${glowAlpha})`;
    });
  }

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateSpectrum(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  bar.addEventListener('click', (e) => {
    updateSpectrum(e.clientX);
  });

  // Touch Support
  handle.addEventListener('touchstart', () => { isDragging = true; });
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) updateSpectrum(e.touches[0].clientX);
  });
  window.addEventListener('touchend', () => { isDragging = false; });
}

/* ------------------------------------------
   6. SECTION 5 — Kinetic Typography
   ------------------------------------------ */
function initKineticTypography() {
  const words = document.querySelectorAll('.kinetic-word');
  if (!words.length) return;

  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;
  }, { passive: true });

  function animateKineticWords() {
    // Smooth decay
    scrollVelocity *= 0.9;

    const stretch = Math.min(scrollVelocity * 0.08, 0.35);
    const tracking = Math.min(scrollVelocity * 0.05, 0.2);

    words.forEach((word, index) => {
      const dir = index % 2 === 0 ? 1 : -1;
      const scaleX = 1 + (stretch * dir * 0.5);
      const letterSpacing = `${tracking * 0.3}em`;

      word.style.transform = `scaleX(${scaleX})`;
      word.style.letterSpacing = letterSpacing;
    });

    requestAnimationFrame(animateKineticWords);
  }

  animateKineticWords();
}

/* ------------------------------------------
   7. HEADER & UTILS
   ------------------------------------------ */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMoodSubscriptionForm() {
  const form = document.getElementById('mood-sub-form');
  const input = document.getElementById('mood-sub-email');
  const btn = document.getElementById('mood-sub-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value) return;

    btn.textContent = 'MOOD DELIVERED ✓';
    btn.style.background = 'var(--accent-secondary)';
    btn.style.color = '#fff';
    input.value = '';

    setTimeout(() => {
      btn.textContent = 'SUBSCRIBE';
      btn.style.background = '';
      btn.style.color = '';
    }, 4000);
  });
}
