/* ==========================================
   DIGA — Checkout & Final Fitting Controller
   ========================================== */

const CART_STORAGE_KEY = 'diga_cart';
let currentStep = 1;
let checkoutFormData = {
  info: {},
  shipping: {},
  payment: {}
};

document.addEventListener('DOMContentLoaded', () => {
  initCheckout();
});

function getCartData() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart for checkout:', e);
    return [];
  }
}

function initCheckout() {
  const cart = getCartData();
  const emptyState = document.getElementById('checkout-empty-state');
  const mainGrid = document.getElementById('checkout-grid-container');

  if (!cart || !cart.length) {
    if (emptyState) emptyState.style.display = 'block';
    if (mainGrid) mainGrid.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (mainGrid) mainGrid.style.display = 'grid';

  renderOrderSummary(cart);
  initFormControls();
}

/**
 * Dynamically renders the Order Summary ("Your Capsule")
 */
function renderOrderSummary(cart) {
  const summaryContainer = document.getElementById('summary-items-scroll');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);

  if (!summaryContainer) return;

  summaryContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const product = dataset.find(p => p.id === item.productId || p.aliasId === item.productId);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'summary-item-row';
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="summary-item-img">
      <div class="summary-item-info">
        <h4 class="summary-item-name">${product.name}</h4>
        <span class="summary-item-meta">SIZE: ${item.size} &bull; QTY: ${item.quantity}</span>
      </div>
      <span class="summary-item-price">&dollar;${itemTotal}</span>
    `;

    if (summaryContainer.appendChild) summaryContainer.appendChild(row);
  });

  if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
  if (totalEl) totalEl.textContent = `$${subtotal}`;
}

/**
 * Multi-Step Form Navigation & Input Validation
 */
function initFormControls() {
  const btnNext1 = document.getElementById('btn-step1-next');
  const btnNext2 = document.getElementById('btn-step2-next');
  const btnBack2 = document.getElementById('btn-step2-back');
  const btnSubmitPayment = document.getElementById('btn-submit-payment');
  const btnBack3 = document.getElementById('btn-step3-back');

  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      if (validateStep(1)) {
        goToStep(2);
      }
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      if (validateStep(2)) {
        goToStep(3);
      }
    });
  }

  if (btnBack2) {
    btnBack2.addEventListener('click', () => goToStep(1));
  }

  if (btnBack3) {
    btnBack3.addEventListener('click', () => goToStep(2));
  }

  if (btnSubmitPayment) {
    btnSubmitPayment.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateStep(3)) {
        simulatePaymentProcessing();
      }
    });
  }
}

function goToStep(stepNum) {
  currentStep = stepNum;

  // Toggle Panel Active State
  document.querySelectorAll('.form-step-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const targetPanel = document.getElementById(`step-panel-${stepNum}`);
  if (targetPanel) targetPanel.classList.add('active');

  // Update Progress Bar Indicators
  document.querySelectorAll('.step-indicator').forEach(ind => {
    const s = parseInt(ind.getAttribute('data-step'), 10);
    ind.classList.remove('active', 'completed');
    if (s === stepNum) ind.classList.add('active');
    if (s < stepNum) ind.classList.add('completed');
  });
}

function validateStep(stepNum) {
  let isValid = true;
  
  if (stepNum === 1) {
    const name = document.getElementById('cust-name');
    const email = document.getElementById('cust-email');
    const phone = document.getElementById('cust-phone');

    if (!name || !name.value.trim()) { markError(name); isValid = false; } else unmarkError(name);
    if (!email || !email.value.trim() || !email.value.includes('@')) { markError(email); isValid = false; } else unmarkError(email);
    if (!phone || !phone.value.trim()) { markError(phone); isValid = false; } else unmarkError(phone);

    if (isValid) {
      checkoutFormData.info = { name: name.value, email: email.value, phone: phone.value };
    }
  }

  if (stepNum === 2) {
    const address = document.getElementById('ship-address');
    const city = document.getElementById('ship-city');
    const country = document.getElementById('ship-country');
    const postal = document.getElementById('ship-postal');

    if (!address || !address.value.trim()) { markError(address); isValid = false; } else unmarkError(address);
    if (!city || !city.value.trim()) { markError(city); isValid = false; } else unmarkError(city);
    if (!country || !country.value.trim()) { markError(country); isValid = false; } else unmarkError(country);
    if (!postal || !postal.value.trim()) { markError(postal); isValid = false; } else unmarkError(postal);

    if (isValid) {
      checkoutFormData.shipping = { address: address.value, city: city.value, country: country.value, postal: postal.value };
    }
  }

  if (stepNum === 3) {
    const cardName = document.getElementById('pay-name');
    const cardNumber = document.getElementById('pay-number');
    const cardExpiry = document.getElementById('pay-expiry');
    const cardCvv = document.getElementById('pay-cvv');

    if (!cardName || !cardName.value.trim()) { markError(cardName); isValid = false; } else unmarkError(cardName);
    if (!cardNumber || !cardNumber.value.trim()) { markError(cardNumber); isValid = false; } else unmarkError(cardNumber);
    if (!cardExpiry || !cardExpiry.value.trim()) { markError(cardExpiry); isValid = false; } else unmarkError(cardExpiry);
    if (!cardCvv || !cardCvv.value.trim()) { markError(cardCvv); isValid = false; } else unmarkError(cardCvv);

    if (isValid) {
      checkoutFormData.payment = { cardName: cardName.value };
    }
  }

  return isValid;
}

function markError(el) {
  if (el && el.classList) el.classList.add('error');
}

function unmarkError(el) {
  if (el && el.classList) el.classList.remove('error');
}

/**
 * Simulated Payment Processing & Confirmation Reveal
 */
function simulatePaymentProcessing() {
  const btn = document.getElementById('btn-submit-payment');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>PROCESSING ORDER...</span>`;
  }

  setTimeout(() => {
    // Generate Order Number
    const mockOrderNum = `DIGA-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // Read purchased cart items before clearing
    const cart = getCartData();
    const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);

    // Clear cart from localStorage
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      console.log('Cart cleared from localStorage after successful payment.');
    } catch(e) {
      console.error('Error clearing cart:', e);
    }

    // Hide Main Grid & Header Progress Bar
    const mainGrid = document.getElementById('checkout-grid-container');
    const stepsBar = document.getElementById('checkout-steps-bar');
    const confirmationScreen = document.getElementById('confirmation-screen');

    if (mainGrid) mainGrid.style.display = 'none';
    if (stepsBar) stepsBar.style.display = 'none';
    if (confirmationScreen) {
      confirmationScreen.style.display = 'block';

      // Populate Confirmation Elements
      const orderNumEl = document.getElementById('conf-order-num');
      const custNameEl = document.getElementById('conf-cust-name');
      const custEmailEl = document.getElementById('conf-cust-email');
      const acquiredContainer = document.getElementById('acquired-items-container');

      if (orderNumEl) orderNumEl.textContent = mockOrderNum;
      if (custNameEl) custNameEl.textContent = checkoutFormData.info.name || 'Valued Atelier Guest';
      if (custEmailEl) custEmailEl.textContent = checkoutFormData.info.email || '';

      if (acquiredContainer && cart.length) {
        acquiredContainer.innerHTML = '';
        cart.forEach(item => {
          const product = dataset.find(p => p.id === item.productId || p.aliasId === item.productId);
          if (!product) return;

          const card = document.createElement('div');
          card.className = 'acquired-card';
          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="acquired-img">
            <div>
              <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--off-white);">${product.name}</h4>
              <span style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--accent-secondary); text-transform: uppercase;">SIZE: ${item.size} &bull; QTY: ${item.quantity}</span>
            </div>
          `;
          if (acquiredContainer.appendChild) acquiredContainer.appendChild(card);
        });
      }
    }

    // Scroll to top cleanly
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }, 1200);
}
