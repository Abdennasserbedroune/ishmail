# Ishmail Apparel - Shopify Theme

A modern, production-ready Shopify Online Store 2.0 theme designed for clothing ecommerce brands.

## Features

- **Online Store 2.0**: Built with the latest Shopify theme architecture using JSON templates and sections
- **Responsive Design**: Mobile-first approach with fluid layouts optimized for all devices
- **Accessibility**: WCAG 2.1 compliant with semantic HTML, ARIA attributes, and keyboard navigation
- **Performance Optimized**: Lazy loading, responsive images, minimal CSS/JS, optimized for Lighthouse scores
- **Product Variants**: Full support for size and color variants with swatches
- **Collection Filtering**: Shopify storefront filters for size, color, price, and availability
- **Cart Drawer**: AJAX-powered cart drawer with quantity updates
- **SEO Ready**: Clean URLs, meta tags, JSON-LD structured data, Open Graph/Twitter cards
- **Internationalization**: Base English locale with structure for additional locales

## Theme Structure

```
/
├── assets/              # CSS, JavaScript, and other static assets
├── config/              # Theme settings and configuration
├── layout/              # Base theme layouts
├── locales/             # Translation files
├── sections/            # Reusable sections
├── snippets/            # Reusable code snippets
└── templates/           # Page templates (JSON format)
```

## Installation

### Prerequisites

- [Shopify CLI](https://shopify.dev/themes/tools/cli) installed
- A Shopify Partner account or development store

### Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd ishmail-theme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Connect to your Shopify store:
   ```bash
   shopify theme dev
   ```

4. The theme will be available at the provided preview URL

## Development

### Local Development

Start the development server with hot reload:

```bash
shopify theme dev
```

This will:
- Upload the theme to your development store
- Watch for file changes and sync automatically
- Provide a preview URL for testing

### Building for Production

The theme is ready to deploy as-is. To push to your store:

```bash
shopify theme push
```

### Code Quality

Run linting and formatting:

```bash
npm run lint
npm run format
```

## Configuration

### Theme Settings

Configure colors, typography, and other global settings through the Shopify theme editor:

1. Go to **Online Store > Themes**
2. Click **Customize** on the Ishmail Apparel theme
3. Navigate to **Theme settings**

Default configuration includes:
- **Primary Color**: #000000 (Black)
- **Design Aesthetic**: Minimal, clean with generous white space
- **Fonts**: Light weight (300) sans-serif fonts
- **Cart Type**: Drawer (configurable to page)

### Menus

Configure navigation menus:

1. Go to **Online Store > Navigation**
2. Edit the **Main menu** for header navigation
3. Edit the **Footer menu** for footer links

### Social Media

Add social media links in **Theme settings > Social media**

## Templates

### Available Templates

- `index.json` - Homepage
- `product.json` - Product pages
- `collection.json` - Collection pages
- `cart.json` - Cart page
- `search.json` - Search results
- `blog.json` - Blog listing
- `article.json` - Blog posts
- `page.json` - Static pages
- `404.json` - Error page
- `list-collections.json` - Collections list

### Sections

- `header` - Global header with navigation
- `footer` - Global footer with newsletter
- `announcement-bar` - Promotional banner
- `hero` - Hero banner with image and CTA
- `featured-collection` - Product showcase
- `image-with-text` - Editorial content
- `newsletter` - Email signup
- `collage` - Category showcase
- `product-recommendations` - Related products

## Customization

### Adding Custom Sections

1. Create a new file in `/sections/` with `.liquid` extension
2. Include a `{% schema %}` block with settings
3. Add to any JSON template through the theme editor

### Modifying Styles

Global styles are in `/assets/theme.css`. Component-specific styles use the BEM naming convention in `/assets/component-*.css` files.

**Design Philosophy:**
- Minimal, clean aesthetic inspired by contemporary design
- Light font weights (300) throughout
- Sharp corners (border-radius: 0)
- Black and white color palette with subtle grays
- Generous white space and breathing room
- Subtle hover interactions using opacity

CSS variables for theming:
```css
--color-primary: #000000 (Black)
--color-secondary: #666666 (Gray)
--color-text: #000000 (Black)
--color-background: #FFFFFF (White)
--color-border: #E0E0E0 (Light gray)
```

### Adding JavaScript

Component JavaScript files are in `/assets/`. The main global script is `global.js`. Use web components and custom elements for interactive features.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## Performance

Target Lighthouse scores:
- Performance: ≥85
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

## Accessibility

This theme follows WCAG 2.1 Level AA guidelines:
- Semantic HTML5 elements
- ARIA landmarks and labels
- Keyboard navigation support
- Focus indicators
- Color contrast ratios ≥4.5:1
- Alt text for images
- Skip-to-content link

## Support

For issues and questions:
- [GitHub Issues](https://github.com/ishmail/theme/issues)
- [Shopify Theme Documentation](https://shopify.dev/themes)

## License

Copyright © 2024 Ishmail. All rights reserved.

## Credits

Built with ❤️ for modern ecommerce.
