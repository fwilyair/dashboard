# Dual Airport Command Dashboard (v1.1)

A next-generation situational awareness dashboard designed for dual-airport joint operations command. This project emphasizes high-performance rendering, a "Deep Tech" aesthetic, and responsive data visualization.

![Dashboard Preview](./screenshot.png)
*(Please add a screenshot of the dashboard here)*

## 🎨 Visual Style: Ghostly Animated Deep Tech Hills

The v1.1 update introduces a completely redesigned visual system:

- **Palette**: **Monochromatic Cool Tones** (Slate / Indigo / Blue). A strictly controlled cool color temperature ensures a professional, calm command center atmosphere.
- **Background System**: 
  - **Solid Stacked SVG**: Uses solid geometry instead of gradients to create disjointed, sharp "hill" layers.
  - **Ghostly Opacity**: Layers are rendered at ~20% opacity with a global dark overlay, behaving like a subtle radar ghosting effect rather than a decorative wallpaper.
  - **Organic Motion**: Each layer features independent `swell` animations (10s-15s cycles) and `feathered` edges (8px blur) for a breathing, organic feel.
  - **Color Shifting**: Background colors slowly cycle through the Deep Tech spectrum (Slate -> Indigo -> Violet -> Cyan) over 30-60s intervals, ensuring the display never looks static.
  - **Full Coverage**: A dynamic base layer ensures 100% screen coverage without dead zones, regardless of aspect ratio.

## 🛠️ Tech Stack

Built with a modern, high-performance frontend stack:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure

- `components/FluidBackground.tsx`: The core visual engine for the animated background.
- `components/*Panel.tsx`: Feature-specific data panels (Airport A, Airport B, Joint Ops, etc.).
- `App.tsx`: Main layout manager handling the "Liquid Pagination" transitions.

---
*Designed for ultra-wide command center displays.*
