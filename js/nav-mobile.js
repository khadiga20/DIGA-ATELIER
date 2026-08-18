/* ==========================================
   DIGA — Universal Responsive Mobile Navigation Controller
   ========================================== */

(function () {
  function initMobileNav() {
    // Locate Page Header
    const header = document.querySelector('header');
    if (!header) return;

    // 1. Inject Hamburger Button if not already present
    if (!document.querySelector('.mobile-menu-btn')) {
      const btn = document.createElement('button');
      btn.className = 'mobile-menu-btn';
      btn.setAttribute('aria-label', 'Open Navigation Menu');
      btn.innerHTML = `
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      `;
      header.appendChild(btn);
    }

    // 2. Inject Backdrop & Drawer Overlay if not present
    if (!document.querySelector('.mobile-nav-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    if (!document.querySelector('.mobile-nav-drawer')) {
      const drawer = document.createElement('div');
      drawer.className = 'mobile-nav-drawer';
      drawer.setAttribute('aria-hidden', 'true');

      // Get Cart Count if cart script exists
      let cartCount = 0;
      try {
        const rawCart = localStorage.getItem('diga_cart');
        if (rawCart) {
          const parsed = JSON.parse(rawCart);
          cartCount = parsed.reduce((sum, i) => sum + (i.quantity || 1), 0);
        }
      } catch (e) {}

      drawer.innerHTML = `
        <div class="mobile-drawer-header">
          <span class="mobile-brand">DIGA</span>
          <button class="mobile-drawer-close" aria-label="Close Menu">&times;</button>
        </div>

        <div class="mobile-drawer-body">
          <div class="mobile-nav-section">
            <span class="mobile-nav-label">MAIN NAVIGATION</span>
            <ul class="mobile-nav-list">
              <li><a href="shop.html">SHOP</a></li>
              <li><a href="lookbook.html">LOOKBOOK</a></li>
              <li><a href="mood-finder.html">MOOD FINDER</a></li>
              <li><a href="about.html">ABOUT</a></li>
            </ul>
          </div>

          <div class="mobile-nav-divider"></div>

          <div class="mobile-nav-section">
            <span class="mobile-nav-label">DIGA HOME</span>
            <ul class="mobile-nav-list">
              <li><a href="index.html#read-the-room">READ THE ROOM</a></li>
              <li><a href="index.html#spectrum">SPECTRUM</a></li>
              <li><a href="index.html#manifesto">MANIFESTO</a></li>
            </ul>
          </div>

          <div class="mobile-nav-divider"></div>

          <div class="mobile-nav-section">
            <ul class="mobile-nav-list">
              <li><a href="cart.html" class="mobile-cart-link">CAPSULE (<span class="cart-count-badge">${cartCount}</span>)</a></li>
            </ul>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);
    }

    // Bind Event Handlers
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const closeBtn = document.querySelector('.mobile-drawer-close');

    function openMenu() {
      if (drawer) {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
      }
      if (backdrop) backdrop.classList.add('open');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      if (drawer) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
      }
      if (backdrop) backdrop.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // Close on navigation link click
    if (drawer) {
      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    // Escape Key Handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
