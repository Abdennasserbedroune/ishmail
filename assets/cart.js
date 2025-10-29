// Cart page functionality
class Cart extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', debounce(this.onChange.bind(this), 300));
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value);
  }

  updateQuantity(line, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line, quantity })
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  }
}

customElements.define('cart-items', Cart);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
