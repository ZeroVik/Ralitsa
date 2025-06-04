document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Количката е празна.</p>';
      return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${item.name} x${item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2)} лв.</span>
      </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartItemsDiv.innerHTML += `
      <hr>
      <div class="d-flex justify-content-between fw-bold">
        <span>Общо:</span>
        <span>${totalPrice.toFixed(2)} лв.</span>
      </div>
    `;
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      updateCart();
    });
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert("Количката е празна.");
        return;
      }
      alert("Благодарим за поръчката!");
      cart.length = 0;
      updateCart();
    });
  }

  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      if (confirm("Сигурни ли сте, че искате да изчистите количката?")) {
        cart.length = 0;
        updateCart();
      }
    });
  }

  updateCart();
});
