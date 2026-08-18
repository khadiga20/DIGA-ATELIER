/* ==========================================
   DIGA — Lookbook & Editorial Story Controller
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initShopTags();
  initParallaxScroll();
  initHeaderScroll();
  initChapterColorTuning();
});

/* 1. Floating Shop Tags & Slideout Preview Cards */
function initShopTags() {
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);
  const tagContainers = document.querySelectorAll('.shop-tag-container');

  tagContainers.forEach(container => {
    const productId = container.getAttribute('data-product-id');
    const dot = container.querySelector('.shop-tag-dot');
    const previewCard = container.querySelector('.shop-preview-card');

    if (!productId || !previewCard || !dataset) return;

    // Find product details
    const product = dataset.find(p => p.id === productId || p.aliasId === productId);
    if (product) {
      const img = previewCard.querySelector('.preview-card-img');
      const title = previewCard.querySelector('.preview-card-title');
      const mood = previewCard.querySelector('.preview-card-mood');
      const price = previewCard.querySelector('.preview-card-price');
      const link = previewCard.querySelector('.preview-card-link');

      if (img) img.src = product.image;
      if (title) title.textContent = product.name;
      if (mood) mood.textContent = product.moodSignature;
      if (price) price.textContent = `$${product.price}`;
      if (link) link.href = `product-detail.html?id=${product.id}`;
    }

    // Toggle Preview Card on Click/Tap
    if (dot) {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = container.classList.contains('active');

        // Close all other tags
        tagContainers.forEach(c => c.classList.remove('active'));

        if (!isActive) {
          container.classList.add('active');
        }
      });
    }
  });

  // Close tag popups when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.shop-tag-container')) {
      tagContainers.forEach(c => c.classList.remove('active'));
    }
  });
}

/* 2. Cinematic Parallax Scroll on Editorial Frames */
function initParallaxScroll() {
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  if (!parallaxImgs.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    parallaxImgs.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.08;
        const yOffset = (rect.top - window.innerHeight / 2) * speed;
        img.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
    });
  }, { passive: true });
}

/* 3. Header Scroll State */
function initHeaderScroll() {
  const header = document.querySelector('.lookbook-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 4. Chapter Color Temperature Tuning on Scroll */
function initChapterColorTuning() {
  const chapters = document.querySelectorAll('.chapter-section');
  if (!chapters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const accent1 = entry.target.getAttribute('data-chapter-accent-1');
        const accent2 = entry.target.getAttribute('data-chapter-accent-2');

        if (accent1 && accent2) {
          document.documentElement.style.setProperty('--accent-color', accent1);
          document.documentElement.style.setProperty('--accent-secondary', accent2);
          document.documentElement.style.setProperty('--accent-glow', `${accent2}66`);
        }
      }
    });
  }, {
    threshold: 0.3
  });

  chapters.forEach(ch => observer.observe(ch));
}
