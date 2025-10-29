// Cart drawer component
class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.container = this.querySelector('.cart-drawer__container');
    this.overlay = this.querySelector('[data-cart-drawer-overlay]');
    this.closeButton = this.querySelector('[data-cart-drawer-close]');

    this.init();
  }

  init() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Add to cart buttons
    document.addEventListener('click', (e) => {
      const button = e.target.closest('[data-add-to-cart]');
      if (button) {
        e.preventDefault();
        this.handleAddToCart(button);
      }
    });

    // Quantity buttons in drawer
    this.addEventListener('click', (e) => {
      if (e.target.matches('[data-quantity-increase]')) {
        this.changeQuantity(e.target.dataset.quantityIncrease, 1);
      } else if (e.target.matches('[data-quantity-decrease]')) {
        this.changeQuantity(e.target.dataset.quantityDecrease, -1);
      } else if (e.target.matches('[data-cart-item-remove]')) {
        this.removeItem(e.target.dataset.cartItemRemove);
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.classList.contains('is-open')) {
        this.close();
      }
    });
  }

  async handleAddToCart(button) {
    const form = button.closest('form');
    const formData = new FormData(form);
    const id = formData.get('id');
    const quantity = formData.get('quantity') || 1;

    button.disabled = true;
    
    try {
      await window.cartManager.addItem(id, quantity);
      await this.renderContents();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      button.disabled = false;
    }
  }

  async changeQuantity(line, change) {
    const input = this.querySelector(`[data-quantity-input="${line}"]`);
    const currentQuantity = parseInt(input.value);
    const newQuantity = Math.max(0, currentQuantity + change);

    await window.cartManager.updateItem(line, newQuantity);
    await this.renderContents();
  }

  async removeItem(line) {
    await window.cartManager.updateItem(line, 0);
    await this.renderContents();
  }

  async renderContents() {
    const response = await fetch(`${window.shopUrl}?section_id=cart-drawer`);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, 'text/html');
    const newDrawer = html.querySelector('cart-drawer');
    
    if (newDrawer) {
      this.querySelector('[data-cart-drawer-body]').innerHTML = 
        newDrawer.querySelector('[data-cart-drawer-body]').innerHTML;
    }
  }

  open() {
    this.classList.add('is-open');
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.classList.remove('is-open');
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

customElements.define('cart-drawer', CartDrawer);
