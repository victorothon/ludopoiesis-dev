# Ludopoiesis 2.0 - SvelteKit Version 🎴✨

A modern, responsive oracle card application built with SvelteKit. Draw cards, explore different spreads, and let wisdom speak.

## 🎯 What's New

### ✅ Fully Responsive
- **Mobile-first design** - Perfect on phones, tablets, and desktops
- **Touch-optimized** - Smooth interactions on all devices
- **Adaptive layout** - Sidebar on desktop, bottom controls on mobile

### 🎴 Multiple Card Spreads
- **Single Card** - Quick, direct answers
- **Three Card Spread** - Past, Present, Future readings
- **Extensible** - Easy to add more spreads (Celtic Cross, etc.)

### 🚀 Modern Features
- **PWA Support** - Install on mobile like a native app
- **Offline capable** - Works without internet
- **Fast loading** - Optimized performance
- **Smooth animations** - Beautiful card transitions

### 🎨 Better UX
- **Clean UI** - Modern, polished design
- **Bilingual** - Spanish & Portuguese
- **Lens system** - Filter cards by perspective
- **Expandable** - Easy to add features

## 🏗️ Project Structure

```
ludopoiesis/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable components
│   │   │   ├── Card.svelte      # Card component with flip animation
│   │   │   ├── LensSelector.svelte
│   │   │   └── LanguageSwitcher.svelte
│   │   ├── stores/              # State management
│   │   │   └── cardStore.js     # Cards, lenses, language state
│   │   └── utils/               # Helper functions
│   ├── routes/                  # Pages/routes
│   │   ├── +layout.svelte       # Main layout
│   │   ├── +page.svelte         # Home/single card page
│   │   └── three-card/          # Three card spread page
│   │       └── +page.svelte
│   ├── app.css                  # Global styles
│   └── app.html                 # HTML template
├── static/                      # Static assets
│   ├── img/                     # Images
│   ├── cartas.json              # Card data
│   ├── textos.json              # UI texts
│   ├── manifest.json            # PWA manifest
│   └── service-worker.js        # Service worker for PWA
├── package.json
├── svelte.config.js
└── vite.config.js
```

## 🚀 Quick Start

### Development
```bash
# Install dependencies (already done)
npm install

# Start dev server (already running!)
npm run dev
```

Visit: **http://localhost:5173**

### Build for Production
```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📱 Adding New Card Spreads

Create a new route in `src/routes/` (e.g., `src/routes/celtic-cross/+page.svelte`):

```svelte
<script>
  import Card from '$lib/components/Card.svelte';
  import { drawCard } from '$lib/stores/cardStore.js';
  
  // Your spread logic here
</script>

<div class="spread-layout">
  <!-- Your layout -->
</div>
```

Then add a link to it on the homepage in `src/routes/+page.svelte`.

## 🎨 Customization

### Colors
Edit CSS variables in `src/app.css`:
```css
:root {
  --color-primary: rgb(0, 77, 77);
  --color-background: #f4f1ee;
  /* ... */
}
```

### Card Data
Edit `static/cartas.json` to add/modify cards.

### Text Content
Edit `static/textos.json` for UI texts and intro content.

## 📦 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)
```bash
npm run build
```

Deploy the `build/` folder.

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `build`

## 🔧 Tech Stack

- **SvelteKit** - Modern framework
- **Vite** - Lightning-fast build tool
- **CSS Variables** - Easy theming
- **PWA** - Installable app
- **Service Worker** - Offline support

## 📱 PWA Installation

On mobile (Chrome/Safari):
1. Open the app in browser
2. Tap "Add to Home Screen"
3. Use like a native app!

## 🎯 Features to Add Later

- [ ] Celtic Cross spread (10 cards)
- [ ] Save reading history
- [ ] Share readings
- [ ] Dark mode
- [ ] More lenses
- [ ] Animation customization
- [ ] Card journal/notes

## 🐛 Troubleshooting

**Dev server won't start:**
```bash
rm -rf node_modules .svelte-kit
npm install
npm run dev
```

**PWA not working locally:**
- PWA only works on HTTPS or localhost
- Test production build: `npm run build && npm run preview`

## 📄 Old Version

The original vanilla JS version is still in the root directory:
- `index.html`
- `script.js`
- `style.css`

You can keep it as backup or remove it once you're happy with the new version.

## 💡 Tips

1. **Component-based**: Each UI element is a component - easy to reuse!
2. **Stores**: State is managed globally - access anywhere
3. **Routes = Pages**: Add a folder in `src/routes/` = new page
4. **Reactive**: Use `$` to access store values in templates
5. **Transitions**: Import from `svelte/transition` for animations

## 🙏 Credits

Original concept: Ludopoiesis oracle
Refactored to SvelteKit for modern development

---

**Ready to extend?** Start by exploring the components in `src/lib/components/` and the store in `src/lib/stores/cardStore.js`. Everything is modular and well-commented!

Enjoy building! 🎴✨
