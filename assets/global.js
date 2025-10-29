/**
 * Theme: Ishmail Apparel
 * Global JavaScript
 */

// Utility functions
const debounce = (fn, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
};

const fetchConfig = (type = 'json') => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
};

// Cart functionality
class CartManager {
  constructor() {
    this.cart = null;
    this.init();
  }

  async init() {
    await this.getCart();
    this.updateCartCount();
  }

  async getCart() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      return this.cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  async addItem(id, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        ...fetchConfig(),
        body: JSON.stringify({ id, quantity })
      });
      
      if (response.ok) {
        await this.getCart();
        this.updateCartCount();
        this.showCartDrawer();
        return await response.json();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async updateItem(line, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        ...fetchConfig(),
        body: JSON.stringify({ line, quantity })
      });
      
      if (response.ok) {
        await this.getCart();
        this.updateCartCount();
        return await response.json();
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  updateCartCount() {
    const countElements = document.querySelectorAll('[data-cart-count]');
    countElements.forEach(el => {
      el.textContent = this.cart ? this.cart.item_count : 0;
    });
  }

  showCartDrawer() {
    const cartDrawer = document.querySelector('[data-cart-drawer]');
    if (cartDrawer && typeof cartDrawer.open === 'function') {
      cartDrawer.open();
    }
  }
}

// Initialize cart manager
window.cartManager = new CartManager();

// Quantity selector
class QuantitySelector extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input[type="number"]');
    this.decreaseButton = this.querySelector('[data-quantity-button="decrease"]');
    this.increaseButton = this.querySelector('[data-quantity-button="increase"]');

    if (this.decreaseButton) {
      this.decreaseButton.addEventListener('click', () => this.changeQuantity(-1));
    }
    
    if (this.increaseButton) {
      this.increaseButton.addEventListener('click', () => this.changeQuantity(1));
    }
  }

  changeQuantity(change) {
    const currentValue = Number(this.input.value);
    const newValue = Math.max(1, currentValue + change);
    this.input.value = newValue;
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

customElements.define('quantity-selector', QuantitySelector);

// Variant selector
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.variants = JSON.parse(this.querySelector('[data-product-json]').textContent);
    this.currentVariant = this.variants.find(v => v.available) || this.variants[0];

    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.updateURL();
    this.updateVariantInput();
    
    if (!this.currentVariant) {
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updatePrice();
      this.updatePickupAvailability();
    }
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map(fieldset => {
      return Array.from(fieldset.querySelectorAll('input')).find(radio => radio.checked).value;
    });
  }

  updateMasterId() {
    this.currentVariant = this.variants.find(variant => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
    productForms.forEach(productForm => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updateMedia() {
    if (!this.currentVariant || !this.currentVariant.featured_media) return;
    
    const mediaGallery = document.querySelector(`[data-media-id="${this.currentVariant.featured_media.id}"]`);
    if (mediaGallery) {
      mediaGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  updatePrice() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
      .then(response => response.text())
      .then(responseText => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const priceElement = html.querySelector('.product__price');
        if (priceElement) {
          document.querySelector('.product__price').innerHTML = priceElement.innerHTML;
        }
      });
  }

  updatePickupAvailability() {
    // Placeholder for store pickup availability
  }

  setUnavailable() {
    const button = document.querySelector('[data-add-to-cart]');
    if (button) {
      button.textContent = theme.strings.unavailable;
      button.disabled = true;
    }
  }
}

customElements.define('variant-selects', VariantSelects);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Ishmail Apparel theme loaded');
});
