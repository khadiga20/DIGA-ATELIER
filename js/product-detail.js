/* ==========================================
   DIGA — Product Detail Dynamic Routing Controller
   ========================================== */

let currentProduct = null;

function initProductDetailPage() {
  currentProduct = loadProductFromQuery();
  initSizeSelector();
  initAddToCartMicroInteraction();
  initScrollScrubMotion();
  initStickyCartBar();
  initHeaderScroll();
}

// Immediate or DOMContentLoaded execution safety check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
  initProductDetailPage();
}

/**
 * Finds matching product in DIGA_PRODUCTS dataset
 */
function findProductById(rawId) {
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);
  
  if (!dataset || !dataset.length) {
    return null;
  }

  if (!rawId || typeof rawId !== 'string') {
    return dataset[0];
  }

  const cleanId = rawId.trim().toLowerCase();

  // 1. Exact ID or aliasId match
  let match = dataset.find(p => 
    (p.id && p.id.toLowerCase() === cleanId) || 
    (p.aliasId && p.aliasId.toLowerCase() === cleanId)
  );
  if (match) return match;

  // 2. Slugified Name match (e.g. "ablaze-kinetic-silk-dress")
  match = dataset.find(p => {
    const slugName = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return slugName === cleanId || cleanId.includes(slugName) || slugName.includes(cleanId);
  });

  // 3. Fallback to first product in dataset if no match
  return match || dataset[0];
}

/**
 * Reads product ID from URL query param and populates ALL UI elements dynamically
 */
function loadProductFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const product = findProductById(productId);

  // Step 8: Required Debug Console Logging
  console.log("Selected Product ID:", productId);
  console.log("Selected Product:", product);

  // Step 5: Update Temporary Fixed Debug Indicator
  const debugSelectedIdEl = document.getElementById('debug-selected-id');
  const debugLoadedProductEl = document.getElementById('debug-loaded-product');

  if (debugSelectedIdEl) debugSelectedIdEl.textContent = productId ? productId : '(none - default used)';
  if (debugLoadedProductEl) debugLoadedProductEl.textContent = product ? product.name : '(none)';

  if (!product) return null;

  // Set Product ID attributes on container & body
  if (document.body && document.body.setAttribute) {
    document.body.setAttribute('data-product-id', product.id);
  }
  const heroSplit = document.getElementById('hero-split');
  if (heroSplit && heroSplit.setAttribute) {
    heroSplit.setAttribute('data-product-id', product.id);
  }

  // 1. Update Page Title
  document.title = `${product.name} — DIGA`;

  // 2. Update Hero Info Elements
  const heroImg = document.querySelector('.hero-img');
  const moodBadge = document.querySelector('.mood-tag-badge');
  const titleEl = document.querySelector('.product-title');
  const priceEl = document.querySelector('.product-price');
  const descEl = document.querySelector('.product-evocative-desc');

  if (heroImg) {
    heroImg.src = product.image;
    heroImg.alt = product.name;
  }
  if (moodBadge) moodBadge.textContent = `• MOOD SIGNATURE: ${product.moodSignature.toUpperCase()}`;
  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price}`;
  if (descEl) descEl.textContent = `"${product.description}"`;

  // 3. Update Ambient Mood Accent Colors
  if (product.accentColor && document.documentElement && document.documentElement.style) {
    document.documentElement.style.setProperty('--mood-accent', product.accentColor);
    document.documentElement.style.setProperty('--mood-accent-glow', `${product.accentColor}66`);
  }

  // 4. Update Available Sizes
  const sizeContainer = document.querySelector('.size-options');
  const stickySelect = document.getElementById('sticky-size-select');

  if (sizeContainer) {
    sizeContainer.innerHTML = '';
    if (stickySelect) stickySelect.innerHTML = '';

    product.sizes.forEach((size, idx) => {
      // Main size selector button
      const btn = document.createElement('button');
      btn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('data-size', size);
      btn.textContent = size;
      if (sizeContainer.appendChild) sizeContainer.appendChild(btn);

      // Sticky bar select dropdown option
      if (stickySelect) {
        const opt = document.createElement('option');
        opt.value = size;
        opt.textContent = `SIZE: ${size}`;
        if (idx === 0) opt.selected = true;
        if (stickySelect.appendChild) stickySelect.appendChild(opt);
      }
    });
  }

  // 5. Update Secondary / Detail Images
  const editorialImgs = document.querySelectorAll('.editorial-img');
  if (editorialImgs && editorialImgs.length >= 2) {
    editorialImgs[0].src = product.secondaryImage || product.image;
    editorialImgs[0].alt = `${product.name} Detail 1`;
    editorialImgs[1].src = product.image;
    editorialImgs[1].alt = `${product.name} Detail 2`;
  }

  // 6. Update "How It Moves" Motion Frame Image
  const movesImg = document.getElementById('moves-frame-img');
  if (movesImg) {
    movesImg.src = product.image;
    movesImg.alt = `${product.name} Motion`;
  }

  // 7. Update Fabric & Craft Details
  if (product.fabricDetails) {
    const specVals = document.querySelectorAll('.spec-val');
    if (specVals && specVals.length >= 5) {
      specVals[0].textContent = product.fabricDetails.composition;
      specVals[1].textContent = product.fabricDetails.seams;
      specVals[2].textContent = `${product.moodSignature} Pigment`;
      specVals[3].textContent = product.fabricDetails.origin;
      specVals[4].textContent = product.fabricDetails.care;
    }
  }

  // 8. Update Sticky Cart Bar Meta
  const stickyThumb = document.querySelector('.sticky-thumb');
  const stickyTitle = document.querySelector('.sticky-title');
  const stickyPrice = document.querySelector('.sticky-price');

  if (stickyThumb) {
    stickyThumb.src = product.image;
    stickyThumb.alt = product.name;
  }
  if (stickyTitle) stickyTitle.textContent = product.name;
  if (stickyPrice) stickyPrice.textContent = `$${product.price}`;

  // 9. Update "Style It Your Way" Pairing Products
  const styleTrack = document.querySelector('.style-track');
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);
  
  if (styleTrack && product.pairingIds && typeof dataset !== 'undefined') {
    styleTrack.innerHTML = '';

    const pairings = dataset.filter(p => 
      product.pairingIds.includes(p.id) || product.pairingIds.includes(p.aliasId)
    );

    pairings.forEach(pair => {
      const card = document.createElement('article');
      card.className = 'style-card';
      card.style.cursor = 'pointer';
      card.setAttribute('data-pairing-id', pair.id);
      
      card.addEventListener('click', () => {
        window.location.href = `product-detail.html?id=${pair.id}`;
      });

      card.innerHTML = `
        <img src="${pair.image}" alt="${pair.name}" class="style-card-img">
        <div class="style-card-content">
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--off-white);">${pair.name}</h4>
            <span style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--text-muted); text-transform: uppercase;">${pair.moodSignature}</span>
          </div>
          <span style="font-weight: 700; color: var(--cream);">&dollar;${pair.price}</span>
        </div>
      `;
      if (styleTrack.appendChild) styleTrack.appendChild(card);
    });
  }

  return product;
}

/* Size Selector Fabric-Lift Selection */
function initSizeSelector() {
  const sizeBtns = document.querySelectorAll('.size-btn');
  const stickySizeSelect = document.getElementById('sticky-size-select');

  if (sizeBtns) {
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedSize = btn.getAttribute('data-size');
        if (stickySizeSelect) stickySizeSelect.value = selectedSize;
      });
    });
  }

  if (stickySizeSelect) {
    stickySizeSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (sizeBtns) {
        sizeBtns.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-size') === val);
        });
      }
    });
  }
}

/* Add To Cart Button Ripple & Fabric Tag Toast */
function initAddToCartMicroInteraction() {
  const atcBtns = document.querySelectorAll('.btn-add-to-cart, .sticky-btn-atc');
  const toast = document.getElementById('fabric-tag-toast');

  if (atcBtns) {
    atcBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Determine active size
        const activeSizeBtn = document.querySelector('.size-btn.active');
        const stickySizeSelect = document.getElementById('sticky-size-select');
        const selectedSize = activeSizeBtn 
          ? activeSizeBtn.getAttribute('data-size') 
          : (stickySizeSelect ? stickySizeSelect.value : 'S');

        const targetId = currentProduct ? currentProduct.id : 'ablaze-kinetic-silk-dress';

        // Save item & size to localStorage cart
        if (typeof addToCart === 'function') {
          addToCart(targetId, selectedSize, 1);
        } else {
          try {
            const raw = localStorage.getItem('diga_cart');
            const cart = raw ? JSON.parse(raw) : [];
            const idx = cart.findIndex(item => item.productId === targetId && item.size === selectedSize);
            if (idx > -1) {
              cart[idx].quantity += 1;
            } else {
              cart.push({ productId: targetId, size: selectedSize, quantity: 1 });
            }
            localStorage.setItem('diga_cart', JSON.stringify(cart));
          } catch(err) {
            console.error('Error writing to cart:', err);
          }
        }

        // Ripple Effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        if (btn.appendChild) btn.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3500);
        }
      });
    });
  }
}

/* "How It Moves" Section — Scroll Scrubbing Simulation */
function initScrollScrubMotion() {
  const section = document.getElementById('how-it-moves');
  const movesImg = document.getElementById('moves-frame-img');
  const scrubText = document.getElementById('moves-scrub-text');

  if (!section || !movesImg || !currentProduct) return;

  const frames = [
    currentProduct.image,
    currentProduct.secondaryImage || currentProduct.image,
    currentProduct.image
  ];

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;

    if (rect.top <= 0 && Math.abs(rect.top) <= sectionHeight) {
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

      const frameIdx = Math.min(frames.length - 1, Math.floor(progress * frames.length));
      if (movesImg.src !== frames[frameIdx]) {
        movesImg.src = frames[frameIdx];
      }

      movesImg.style.transform = `scale(${1.05 + (progress * 0.1)}) translateY(${progress * -20}px)`;

      if (scrubText) {
        const scrubPct = Math.round(progress * 100);
        scrubText.textContent = `SCRUBBING MOTION ${scrubPct}%`;
      }
    }
  }, { passive: true });
}

/* Sticky Add to Cart Bar Observer */
function initStickyCartBar() {
  const heroSection = document.getElementById('hero-split');
  const stickyBar = document.getElementById('sticky-atc-bar');

  if (!heroSection || !stickyBar || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(heroSection);
}

/* Header Scroll State */
function initHeaderScroll() {
  const header = document.querySelector('.pdp-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
