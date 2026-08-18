/* ==========================================
   DIGA — Shopping Cart / Mood Capsule Store Controller
   ========================================== */

const CART_STORAGE_KEY = 'diga_cart';

/**
 * Gets cart items array from localStorage
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage:', e);
    return [];
  }
}

/**
 * Saves cart items array to localStorage
 */
function saveCart(cartArray) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
    updateCartHeaderBadge();
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

/**
 * Adds an item to cart (Treating different sizes as separate cart items)
 */
function addToCart(productId, size = 'S', quantity = 1) {
  const cart = getCart();
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);
  
  const product = dataset.find(p => p.id === productId || p.aliasId === productId);
  const targetId = product ? product.id : productId;

  // Check if item with exact same productId AND size exists
  const existingIndex = cart.findIndex(item => item.productId === targetId && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      productId: targetId,
      size: size,
      quantity: quantity
    });
  }

  saveCart(cart);
  console.log(`Added to Mood Capsule: ${targetId} (Size: ${size}, Qty: ${quantity})`);
}

/**
 * Updates item quantity
 */
function updateItemQuantity(productId, size, newQty) {
  let cart = getCart();
  
  if (newQty <= 0) {
    cart = cart.filter(item => !(item.productId === productId && item.size === size));
  } else {
    const item = cart.find(item => item.productId === productId && item.size === size);
    if (item) {
      item.quantity = newQty;
    }
  }

  saveCart(cart);
  renderCartUI();
}

/**
 * Removes an item from cart
 */
function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.productId === productId && item.size === size));
  saveCart(cart);
  renderCartUI();
}

/**
 * Calculates total count of all items in cart
 */
function getCartTotalCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Updates header nav cart badge count
 */
function updateCartHeaderBadge() {
  const totalCount = getCartTotalCount();
  const cartBadges = document.querySelectorAll('.nav-cart-link, .cart-count-badge');

  cartBadges.forEach(badge => {
    if (badge.tagName === 'A') {
      badge.textContent = `CART (${totalCount})`;
    } else {
      badge.textContent = totalCount;
    }
  });
}

/**
 * Renders the Cart Page UI
 */
function renderCartUI() {
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const cartGrid = document.getElementById('cart-grid-wrapper');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-grand-total');

  if (!itemsContainer) return;

  const cart = getCart();
  const dataset = (typeof window !== 'undefined' && window.DIGA_PRODUCTS) ? window.DIGA_PRODUCTS : (typeof DIGA_PRODUCTS !== 'undefined' ? DIGA_PRODUCTS : []);

  updateCartHeaderBadge();

  if (!cart.length) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartGrid) cartGrid.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartGrid) cartGrid.style.display = 'grid';

  itemsContainer.innerHTML = '';
  let calculatedSubtotal = 0;

  cart.forEach(item => {
    const product = dataset.find(p => p.id === item.productId || p.aliasId === item.productId);

    if (!product) return;

    const itemTotal = product.price * item.quantity;
    calculatedSubtotal += itemTotal;

    const card = document.createElement('article');
    card.className = 'cart-item-card';

    card.innerHTML = `
      <div class="cart-item-img-wrap">
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
        </a>
      </div>

      <div class="cart-item-details">
        <span class="cart-item-mood">&bull; ${product.moodSignature}</span>
        <a href="product-detail.html?id=${product.id}" class="cart-item-title">${product.name}</a>
        <span class="cart-item-size-badge">SELECTED SILHOUETTE SIZE: <strong>${item.size}</strong></span>
        
        <div class="cart-item-actions-row">
          <div class="qty-control">
            <button class="qty-btn btn-minus" data-id="${product.id}" data-size="${item.size}">&minus;</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn btn-plus" data-id="${product.id}" data-size="${item.size}">&plus;</button>
          </div>

          <button class="btn-remove-item" data-id="${product.id}" data-size="${item.size}">&times; Remove Item</button>
        </div>
      </div>

      <div class="cart-item-price-col">
        <span class="cart-item-total-price">&dollar;${itemTotal}</span>
        <span class="cart-item-unit-price">&dollar;${product.price} each</span>
      </div>
    `;

    // Attach Event Listeners to Quantity and Remove buttons
    const btnMinus = card.querySelector('.btn-minus');
    const btnPlus = card.querySelector('.btn-plus');
    const btnRemove = card.querySelector('.btn-remove-item');

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        updateItemQuantity(item.productId, item.size, item.quantity - 1);
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        updateItemQuantity(item.productId, item.size, item.quantity + 1);
      });
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        removeFromCart(item.productId, item.size);
      });
    }

    itemsContainer.appendChild(card);
  });

  if (subtotalEl) subtotalEl.textContent = `$${calculatedSubtotal}`;
  if (totalEl) totalEl.textContent = `$${calculatedSubtotal}`;
}

// Auto Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateCartHeaderBadge();
    renderCartUI();
  });
} else {
  updateCartHeaderBadge();
  renderCartUI();
}
