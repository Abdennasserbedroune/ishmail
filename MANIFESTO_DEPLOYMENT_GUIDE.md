# MANIFESTO Page - Deployment and Troubleshooting Guide

## Overview
The MANIFESTO page has been updated with an alternating image-text layout similar to https://benmoyal.com/en/pages/about. This guide explains the changes, deployment process, and how to troubleshoot if updates don't appear.

## Changes Made

### 1. New Reusable Component: `manifesto-block.liquid`
- **Location**: `/snippets/manifesto-block.liquid`
- **Purpose**: A reusable block component for rendering image-text pairs
- **Features**:
  - Responsive image loading with srcset
  - Lazy loading for performance
  - Accessible alt text (with fallbacks)
  - Support for fallback placeholder images
  - Proper semantic HTML

### 2. Updated Section: `page-manifesto.liquid`
- **Location**: `/sections/page-manifesto.liquid`
- **Key Changes**:
  - Now uses the `manifesto-block` snippet for each content block
  - Added `alternating_layout` setting (checkbox) to auto-alternate image positions
  - Added `image_alt` field for accessible alt text
  - Added `fallback_image` dropdown for placeholder images
  - Automatic left/right alternation when `alternating_layout` is enabled

### 3. Updated Template: `page.manifesto.json`
- **Location**: `/templates/page.manifesto.json`
- **Key Changes**:
  - Enabled `alternating_layout: true` by default
  - Added 2 more blocks (now 6 total: "Pillar 01" through "Pillar 06")
  - Added alt text for each block for accessibility
  - Set fallback SVG images for better preview experience

### 4. New Placeholder Images
- **Location**: `/assets/manifesto-block-*.svg` (1-4)
- **Purpose**: Elegant placeholder graphics for development/preview
- **Design**: Minimal, line-art style illustrations matching the Ishmail aesthetic

### 5. Existing CSS: `section-manifesto.css`
- **Location**: `/assets/section-manifesto.css`
- **Status**: Already configured for alternating layout
- **Features**:
  - Desktop: 2-column grid with alternating image/text sides
  - Mobile: Stacked layout (image always on top)
  - Responsive breakpoints at 989px and 749px
  - Smooth hover effects and transitions

## Page Structure

The MANIFESTO page uses Shopify's page template system:

1. **Page in Shopify Admin** → Assigned template: `page.manifesto`
2. **Template File** (`templates/page.manifesto.json`) → References section `page-manifesto`
3. **Section File** (`sections/page-manifesto.liquid`) → Renders the layout
4. **Snippet File** (`snippets/manifesto-block.liquid`) → Reusable block component
5. **CSS File** (`assets/section-manifesto.css`) → Styling

## How to Access the MANIFESTO Page

### In Shopify Admin:
1. Go to **Online Store > Pages**
2. Find or create a page with the handle `manifesto`
3. Assign template: **page.manifesto** (from the template dropdown on the right)
4. Save

### Live URL:
- `https://your-store.myshopify.com/pages/manifesto`
- Or on custom domain: `https://yourdomain.com/pages/manifesto`

## Deployment Instructions

### Method 1: Using Shopify CLI (Recommended for Development)

1. **Install Shopify CLI** (if not already installed):
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Authenticate with your store**:
   ```bash
   shopify auth login
   ```

3. **Push the theme to your store**:
   ```bash
   shopify theme push
   ```
   
   Or to push to a development theme:
   ```bash
   shopify theme dev
   ```

4. **Verify the changes**:
   - Access the preview URL provided by Shopify CLI
   - Navigate to `/pages/manifesto`

### Method 2: Manual Upload via Theme Editor

1. Go to **Online Store > Themes**
2. Click **Actions > Edit code** on your active theme
3. Upload/update these files:
   - `snippets/manifesto-block.liquid` (new file)
   - `sections/page-manifesto.liquid` (updated)
   - `templates/page.manifesto.json` (updated)
   - `assets/manifesto-block-1.svg` through `manifesto-block-4.svg` (new files)
4. Save all changes
5. Visit `/pages/manifesto` to verify

### Method 3: Git-based Deployment (if using GitHub/Version Control)

1. Commit all changes to the branch
2. If using Shopify GitHub integration:
   - Push to the connected branch
   - Shopify will auto-deploy
3. If manual:
   - Pull the repo on your server
   - Use Shopify CLI to push

## Troubleshooting: "Changes Don't Appear"

### 1. **Cache Issues**

**Problem**: Changes pushed but old version still showing.

**Solutions**:
- **Browser cache**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or open in incognito
- **CDN cache**: Shopify CDN can cache for up to 10 minutes
  - Wait 10-15 minutes
  - Or clear cache in Shopify Admin (if available)
- **Theme cache**: In Shopify CLI, stop and restart `shopify theme dev`

### 2. **Wrong Template Assigned**

**Problem**: Page exists but using the default `page.json` template instead of `page.manifesto.json`.

**Solutions**:
1. Go to **Online Store > Pages**
2. Click on the MANIFESTO page
3. On the right sidebar, find **Template**
4. Change from "Default page" to **page.manifesto**
5. Save

### 3. **Page Doesn't Exist**

**Problem**: No page with handle `manifesto` exists.

**Solutions**:
1. Go to **Online Store > Pages**
2. Click **Add page**
3. Title: "Manifesto" (or "MANIFESTO")
4. Handle: Ensure it's `manifesto` (check in SEO section)
5. Template: Select **page.manifesto**
6. Content: Can be empty (template provides all content)
7. Save

### 4. **Wrong Environment**

**Problem**: Editing a development theme but live site uses a different theme.

**Solutions**:
1. Check which theme is **published** (has green "Current theme" badge)
2. Verify you're editing the correct theme
3. If editing a development theme, you must **publish** it:
   - Go to **Online Store > Themes**
   - Find your updated theme
   - Click **Actions > Publish**

### 5. **File Not Synced**

**Problem**: Using Shopify CLI dev mode but files not syncing.

**Solutions**:
1. Check terminal for sync errors
2. Restart the dev server: Stop (Ctrl+C) and run `shopify theme dev` again
3. Verify file paths match Shopify's structure
4. Check file permissions (should be readable)

### 6. **Section Not Loading**

**Problem**: Template references section but section file is missing or has errors.

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify section filename matches template reference: `page-manifesto.liquid`
3. Validate Liquid syntax: Shopify CLI will show errors during push
4. Check schema JSON is valid (common error: trailing commas)

### 7. **CSS Not Loading**

**Problem**: Layout broken or no styling applied.

**Solutions**:
1. Verify `section-manifesto.css` exists in `/assets/`
2. Check first line of `page-manifesto.liquid` includes:
   ```liquid
   {{ 'section-manifesto.css' | asset_url | stylesheet_tag }}
   ```
3. Hard refresh browser to clear CSS cache
4. Check browser Network tab to confirm CSS file loads (status 200)

## Editing Content

### Via Shopify Theme Customizer (Recommended for Non-Developers)

1. Go to **Online Store > Themes**
2. Click **Customize** on your active theme
3. Navigate to **Pages > Manifesto** (or select the page from the dropdown)
4. In the left sidebar, you'll see:
   - **Section settings**: Heading, intro, alternating layout toggle
   - **Story blocks**: Click each to edit kicker, heading, body, image, alt text
5. **Add blocks**: Click "Add block" at the bottom
6. **Reorder blocks**: Drag and drop
7. **Save** when done

### Via Code (For Developers)

Edit `/templates/page.manifesto.json`:
- Update `settings` for the header
- Update `blocks` to add/edit/remove content blocks
- Change `image_alt` for accessibility
- Select `fallback_image` for placeholder graphics

### Content Structure

Each block has:
- **kicker**: Small label above heading (e.g., "Pillar 01")
- **heading**: Main block heading
- **body**: Rich text (supports HTML: `<p>`, `<strong>`, `<em>`, `<a>`)
- **image**: Upload via Shopify Files or select from library
- **image_alt**: Alt text for accessibility
- **fallback_image**: Placeholder when no image selected
- **image_position**: Left or Right (ignored if alternating layout is on)

## Layout Behavior

### Desktop (≥990px)
- Two-column grid layout
- Image on one side, text on the other
- Alternates: odd blocks (1, 3, 5) = image left, even blocks (2, 4, 6) = image right
- Gap between columns: 6rem (96px)
- Gap between blocks: 8rem (128px)

### Tablet (749px - 989px)
- Single column (stacked)
- Image always on top
- Text below
- Gap between blocks: 6rem

### Mobile (<749px)
- Single column (stacked)
- Smaller image aspect ratio (4:5 instead of 3:4)
- Reduced spacing
- Gap between blocks: 4rem

## Performance & Accessibility

### Images
- **Lazy loading**: All images use `loading="lazy"`
- **Responsive**: Srcset with 5 sizes (600w, 800w, 1000w, 1200w, 1600w)
- **Sizes attribute**: `(min-width: 990px) 50vw, 100vw`
- **Alt text**: Required for accessibility (fallback to heading if not provided)

### Semantic HTML
- `<section>` for page wrapper
- `<article>` for each block
- `<h1>` for page title
- `<h2>` for block headings
- Proper heading hierarchy

### Reduced Motion
- Hover animations disabled for users with `prefers-reduced-motion` preference

## Testing Checklist

Before marking deployment as complete:

- [ ] Page loads at `/pages/manifesto`
- [ ] Desktop view shows alternating layout (left/right/left/right)
- [ ] Mobile view shows stacked layout (image on top)
- [ ] All 6 blocks display correctly
- [ ] Images load properly (or placeholders show if no images uploaded)
- [ ] Hover effects work on desktop (subtle scale on image)
- [ ] Text is readable with proper spacing
- [ ] Hard refresh shows latest changes (not cached)
- [ ] Browser console shows no errors
- [ ] Lighthouse score: Layout Shift minimal, Accessibility ≥90
- [ ] Test on multiple viewports: mobile, tablet, desktop
- [ ] Test in multiple browsers: Chrome, Safari, Firefox

## URLs to Check

1. **Development**: `https://[your-store].myshopify.com/pages/manifesto` (requires password)
2. **Preview**: Shopify CLI provides a preview URL when running `shopify theme dev`
3. **Live**: `https://[your-domain].com/pages/manifesto` (after publishing theme)

## Support & Further Customization

### To change the alternating pattern:
Edit `/sections/page-manifesto.liquid` around line 34:
```liquid
if is_even == 0
  assign computed_position = 'right'
else
  assign computed_position = 'left'
endif
```

### To adjust spacing:
Edit `/assets/section-manifesto.css`:
- Line 54: `.manifesto__blocks { gap: 8rem; }` (vertical gap between blocks)
- Line 63: `gap: 6rem;` (horizontal gap between image and text)

### To change image aspect ratio:
Edit `/assets/section-manifesto.css`:
- Line 103: `.manifesto-block__image { aspect-ratio: 3 / 4; }` (desktop)
- Line 294: `.manifesto-block__image { aspect-ratio: 4 / 5; }` (mobile)

### To add a new block:
1. Via Customizer: Click "Add block" in the Manifesto section
2. Via Code: Add to `templates/page.manifesto.json` in the `blocks` object and `block_order` array

## Questions?

If changes still don't appear after following this guide:
1. Check the Shopify Admin error logs
2. Verify theme version deployed matches code version
3. Test in incognito mode to rule out cache
4. Use browser DevTools Network tab to check file loads
5. Review Shopify CLI terminal output for error messages

---

**Last Updated**: December 2024  
**Theme Version**: Ishmail Apparel Shopify Theme  
**Shopify Online Store**: 2.0 Architecture
