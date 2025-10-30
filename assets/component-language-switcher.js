'use strict';

class LanguageSwitcher {
  constructor(container) {
    this.container = container;
    this.toggle = container.querySelector('[data-language-toggle]');
    this.menu = container.querySelector('[data-language-menu]');
    this.options = Array.from(container.querySelectorAll('[data-language-option]'));

    if (!this.toggle || !this.menu || this.options.length === 0) {
      return;
    }

    this.isOpen = false;

    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentFocus = this.handleDocumentFocus.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleToggleKeydown = this.handleToggleKeydown.bind(this);

    this.container.classList.add('language-switcher--ready');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.menu.setAttribute('aria-hidden', 'true');

    this.toggle.addEventListener('click', this.handleToggleClick);
    this.toggle.addEventListener('keydown', this.handleToggleKeydown);

    this.options.forEach((option, index) => {
      option.addEventListener('click', () => {
        this.close();
      });

      option.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            this.focusOption(index + 1);
            break;
          case 'ArrowUp':
            event.preventDefault();
            this.focusOption(index - 1);
            break;
          case 'Home':
            event.preventDefault();
            this.focusOption(0);
            break;
          case 'End':
            event.preventDefault();
            this.focusOption(this.options.length - 1);
            break;
          case 'Escape':
            this.close();
            this.toggle.focus();
            break;
          default:
            break;
        }
      });
    });
  }

  handleToggleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleDropdown();
  }

  handleToggleKeydown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        }
        this.focusOption(0);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        }
        this.focusOption(this.options.length - 1);
        break;
      case 'Escape':
        if (this.isOpen) {
          this.close();
        }
        break;
      case 'Enter':
      case ' ':
      case 'Space':
      case 'Spacebar':
        event.preventDefault();
        this.toggleDropdown();
        break;
      default:
        break;
    }
  }

  handleDocumentClick(event) {
    if (!this.container.contains(event.target)) {
      this.close();
    }
  }

  handleDocumentFocus(event) {
    if (!this.container.contains(event.target)) {
      this.close();
    }
  }

  handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.close();
      this.toggle.focus();
    }
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpen) {
      return;
    }

    if (LanguageSwitcher.activeInstance && LanguageSwitcher.activeInstance !== this) {
      LanguageSwitcher.activeInstance.close();
    }

    LanguageSwitcher.activeInstance = this;
    this.isOpen = true;
    this.container.classList.add('language-switcher--open');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.menu.setAttribute('aria-hidden', 'false');

    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('focusin', this.handleDocumentFocus);
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    if (LanguageSwitcher.activeInstance === this) {
      LanguageSwitcher.activeInstance = null;
    }

    this.isOpen = false;
    this.container.classList.remove('language-switcher--open');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.menu.setAttribute('aria-hidden', 'true');

    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('focusin', this.handleDocumentFocus);
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  focusOption(index) {
    if (this.options.length === 0) {
      return;
    }

    const normalizedIndex = (index + this.options.length) % this.options.length;
    const option = this.options[normalizedIndex];

    if (option) {
      option.focus();
    }
  }
}

LanguageSwitcher.activeInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  const switchers = document.querySelectorAll('[data-language-switcher]');
  switchers.forEach((element) => {
    new LanguageSwitcher(element);
  });
});
