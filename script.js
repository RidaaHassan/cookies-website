// Local Image Mapping matching your exact folder filenames
const FLAVOR_DATA = {
  chocolate: {
    name: "Classic Chocolate Chunk",
    image: "cookie.webp"
  },
  coffee: {
    name: "Espresso Coffee Crunch",
    image: "coffee-cookie.webp"
  },
  caramel: {
    name: "Salted Caramel Pecan",
    image: "salted-caramel.webp"
  },
  dark: {
    name: "Double Dark Chocolate",
    image: "dark-cookie.webp"
  }
};

const UNIT_PRICE = 4.50;
const SHIPPING_FEE = 2.50;

function getOrderState() {
  const saved = localStorage.getItem('cookieOrder');
  return saved ? JSON.parse(saved) : { flavor: 'chocolate', quantity: 1 };
}

function saveOrderState(state) {
  localStorage.setItem('cookieOrder', JSON.stringify(state));
}

document.addEventListener('DOMContentLoaded', () => {
  const state = getOrderState();

  const mainImg = document.getElementById('main-product-img');
  const flavorBtns = document.querySelectorAll('.flavor-btn');
  const flavorThumbs = document.querySelectorAll('.flavor-thumb');
  const qtyInput = document.getElementById('qty');
  const btnMinus = document.getElementById('btn-minus');
  const btnPlus = document.getElementById('btn-plus');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  if (mainImg) {
    updateProductUI(state.flavor, state.quantity);

    flavorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        state.flavor = btn.dataset.flavor;
        saveOrderState(state);
        updateProductUI(state.flavor, state.quantity);
      });
    });

    flavorThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        state.flavor = thumb.dataset.flavor;
        saveOrderState(state);
        updateProductUI(state.flavor, state.quantity);
      });
    });

    if (btnMinus && btnPlus) {
      btnMinus.addEventListener('click', () => {
        if (state.quantity > 1) {
          state.quantity--;
          saveOrderState(state);
          if (qtyInput) qtyInput.value = state.quantity;
        }
      });

      btnPlus.addEventListener('click', () => {
        if (state.quantity < 50) {
          state.quantity++;
          saveOrderState(state);
          if (qtyInput) qtyInput.value = state.quantity;
        }
      });
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        window.location.href = 'order.html';
      });
    }
  }

  function updateProductUI(flavorKey, qty) {
    if (FLAVOR_DATA[flavorKey]) {
      mainImg.src = FLAVOR_DATA[flavorKey].image;
    }
    if (qtyInput) qtyInput.value = qty;

    flavorBtns.forEach(b => b.classList.toggle('active', b.dataset.flavor === flavorKey));
    flavorThumbs.forEach(t => t.classList.toggle('active', t.dataset.flavor === flavorKey));
  }

  // Order Page
  const summaryFlavor = document.getElementById('summary-flavor');
  const summaryQty = document.getElementById('summary-qty');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');
  const checkoutForm = document.getElementById('checkout-form');

  if (summaryFlavor) {
    const selectedFlavorInfo = FLAVOR_DATA[state.flavor] || FLAVOR_DATA['chocolate'];
    const subtotal = state.quantity * UNIT_PRICE;
    const grandTotal = subtotal + SHIPPING_FEE;

    summaryFlavor.textContent = selectedFlavorInfo.name;
    summaryQty.textContent = state.quantity;
    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTotal.textContent = `$${grandTotal.toFixed(2)}`;

    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value;
      alert(`Thank you for your order, ${name}! Your fresh ${selectedFlavorInfo.name} cookies are being prepared.`);
      localStorage.removeItem('cookieOrder');
      window.location.href = 'index.html';
    });
  }
});