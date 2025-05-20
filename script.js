// Grab elements
const cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartElement = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutForm = document.getElementById('checkout-form');

cartIcon.addEventListener('click', toggleCart);

function toggleCart() {
  if (cartElement.style.display === 'block') {
    cartElement.style.display = 'none';
  } else {
    cartElement.style.display = 'block';
  }
}

function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => {
      cart.splice(i, 1);
      updateCartUI();
    };
    
    li.appendChild(removeBtn);
    cartItemsList.appendChild(li);
  });
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartUI();
}

// Buy Now triggers checkout with one item
function buyNow(name, price) {
  cart.length = 0; // Clear cart
  cart.push({ name, price, quantity: 1 });
  updateCartUI();
  openCheckout();
}

// Stripe integration
const stripe = Stripe('pk_test_51MYKEYYOURSTRIPEKEYGOESHERE'); // <-- Replace with your own Stripe public key

checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const name = checkoutForm.querySelector('input[placeholder="Name"]').value;
  const address = checkoutForm.querySelector('input[placeholder="Shipping Address"]').value;
  const email = checkoutForm.querySelector('input[placeholder="Email"]').value;

  // Normally, you'd create a session on your backend, but since GitHub Pages can't do that,
  // this example simulates a checkout session by redirecting to Stripe Checkout using a prebuilt link.

  // You NEED to build a backend or use a service like Netlify Functions or Firebase Functions
  // to create real Stripe Checkout Sessions dynamically for production.

  alert(`Thanks for your order, ${name}! This is a demo. You'll need a backend to complete payment.`);

  // Clear cart & form
  cart.length = 0;
  updateCartUI();
  checkoutForm.reset();
});

function openCheckout() {
  alert('This demo site can’t process payments yet. You’d need a backend server to do that.');
}
