/* ==========================================
   DIGA — Shop & Catalog Interactive Controller
   ========================================== */

function initShopPage() {
  renderShopGrid('all');
  initMoodFilterTabs();
  initHeaderScroll();
}

// Immediate or DOMContentLoaded execution safety check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShopPage);
} else {
  initShopPage();
}

function renderShopGrid(filterCategory = 'all') {
  const gridContainer = document.getElementById('shop-grid');
  const countEl = document.getElementById('product-count');
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);

  if (!gridContainer || !dataset) return;

  gridContainer.innerHTML = '';

  const filteredProducts = filterCategory === 'all'
    ? dataset
    : dataset.filter(p => p.moodCategory === filterCategory);

  if (countEl) {
    countEl.textContent = `${filteredProducts.length} SILHOUETTES`;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement('article');
    card.className = 'shop-product-card';
    if (card.setAttribute) card.setAttribute('data-id', product.id);
    if (card.style && card.style.setProperty) {
      card.style.setProperty('--card-accent', product.accentColor || 'var(--accent-secondary)');
      card.style.setProperty('--card-glow', `${product.accentColor || 'var(--accent-secondary)'}66`);
    }

    card.innerHTML = `
      <div class="card-media-wrap">
        <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy">
        <div class="card-veil-scrim"></div>
        <div class="card-overlay"></div>
      </div>
      
      <div class="card-content">
        <span class="card-mood-tag">&bull; ${product.moodSignature}</span>
        
        <div class="card-bottom-info">
          <div>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-desc-snippet">"${product.description}"</p>
          </div>
          <span class="card-price">&dollar;${product.price}</span>
        </div>
      </div>
    `;

    // Click handler to open Product Detail with unique product query param
    card.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${encodeURIComponent(product.id)}`;
    });

    if (gridContainer.appendChild) {
      gridContainer.appendChild(card);
    }
  });
}

function initMoodFilterTabs() {
  const tabs = document.querySelectorAll('.mood-tab-btn');
  if (!tabs) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      renderShopGrid(category);
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.shop-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
