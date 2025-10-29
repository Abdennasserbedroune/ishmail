// Collection filters
class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    this.form.addEventListener('input', this.debouncedOnSubmit.bind(this));
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const searchParams = new URLSearchParams(formData);
    window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
  }
}

customElements.define('facet-filters-form', FacetFiltersForm);

// Collection sorting
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.querySelector('[data-collection-sort]');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', e.target.value);
      window.location.href = url.toString();
    });
  }
});

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
