class ProductCarousel extends HTMLElement {
  constructor() {
    super();
    this.carousels = this.querySelectorAll('.product-carousel__wrapper');
    this.init();
  }

  init() {
    this.carousels.forEach((carousel) => {
      const track = carousel.querySelector('.product-carousel__track');
      const prevBtn = carousel.querySelector('.product-carousel__nav--prev');
      const nextBtn = carousel.querySelector('.product-carousel__nav--next');
      const items = carousel.querySelectorAll('.product-carousel__item');

      if (!track || !prevBtn || !nextBtn || items.length === 0) return;

      let currentIndex = 0;
      const itemsPerView = this.getItemsPerView();
      const maxIndex = Math.max(0, items.length - itemsPerView);

      const updateButtons = () => {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
      };

      const updateCarousel = () => {
        const item = items[0];
        const itemWidth = item.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const offset = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();
      };

      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex = Math.max(0, currentIndex - itemsPerView);
          updateCarousel();
        }
      });

      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
          updateCarousel();
        }
      });

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newItemsPerView = this.getItemsPerView();
          const newMaxIndex = Math.max(0, items.length - newItemsPerView);
          currentIndex = Math.min(currentIndex, newMaxIndex);
          updateCarousel();
        }, 150);
      });

      updateButtons();

      const addToCartButtons = carousel.querySelectorAll('.product-carousel-card__add-to-cart');
      addToCartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.addToCart(button);
        });
      });
    });
  }

  getItemsPerView() {
    const width = window.innerWidth;
    if (width < 750) return 2;
    if (width < 990) return 3;
    return 4;
  }

  async addToCart(button) {
    const variantId = button.dataset.productId;

    if (!variantId) return;

    const originalHTML = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: variantId,
              quantity: 1,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();

      const cartCount = document.querySelector('.cart-count-bubble');
      if (cartCount) {
        const cartResponse = await fetch('/cart.js');
        const cart = await cartResponse.json();
        cartCount.textContent = cart.item_count;
      }

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.disabled = false;
      }, 2000);

      document.dispatchEvent(new CustomEvent('cart:updated', { detail: data }));
    } catch (error) {
      console.error('Error adding to cart:', error);
      button.innerHTML = originalHTML;
      button.disabled = false;
    }
  }
}

if (!customElements.get('product-carousel')) {
  customElements.define('product-carousel', ProductCarousel);
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselSections = document.querySelectorAll('.product-carousel');
  carouselSections.forEach((section) => {
    if (!section.hasAttribute('is')) {
      const carousel = document.createElement('product-carousel');
      carousel.innerHTML = section.innerHTML;
      section.parentNode.replaceChild(carousel, section);
      carousel.className = section.className;
    }
  });
});
