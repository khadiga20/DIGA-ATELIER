/* ==========================================
   DIGA — About / Manifesto Controller
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initOpeningManifestoReveal();
  initPillarLightBleed();
  initClosingTaglineReveal();
  initHeaderScroll();
});

/**
 * 1. Scroll-linked Progressive Word Reveal for Opening Manifesto
 */
function initOpeningManifestoReveal() {
  const manifestoTextEl = document.getElementById('opening-manifesto-text');
  const openingSection = document.getElementById('opening-hero');

  if (!manifestoTextEl || !openingSection) return;

  // Raw Manifesto Quote Text
  const rawText = "Clothing doesn't just cover the body — it speaks the mood underneath it.";
  const words = rawText.split(' ');

  // Wrap words in reveal spans
  manifestoTextEl.innerHTML = words.map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const isHighlight = clean === 'speaks' || clean === 'mood' || clean === 'underneath';
    return `<span class="reveal-word ${isHighlight ? 'highlight' : ''}">${word}</span>`;
  }).join(' ');

  const wordSpans = manifestoTextEl.querySelectorAll('.reveal-word');

  // Scroll listener to reveal words progressively based on scroll position
  window.addEventListener('scroll', () => {
    const rect = openingSection.getBoundingClientRect();
    const sectionHeight = openingSection.offsetHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight * 0.6)));

    const visibleCount = Math.floor(progress * wordSpans.length);

    wordSpans.forEach((span, idx) => {
      if (idx <= visibleCount) {
        span.classList.add('visible');
      } else {
        span.classList.remove('visible');
      }
    });
  }, { passive: true });
}

/**
 * 2. Philosophy Pillar Accent Light Bleed on Intersection
 */
function initPillarLightBleed() {
  const pillars = document.querySelectorAll('.pillar-card');
  if (!pillars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.35
  });

  pillars.forEach(p => observer.observe(p));
}

/**
 * 3. Closing Tagline Blur-to-Focus Reveal
 */
function initClosingTaglineReveal() {
  const tagline = document.getElementById('closing-tagline');
  if (!tagline) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tagline.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.4
  });

  observer.observe(tagline);
}

/**
 * 4. Header Scroll State
 */
function initHeaderScroll() {
  const header = document.querySelector('.about-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
