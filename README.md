# Ethereal Sarees — Premium Saree E-Commerce Website

Production-ready React + Vite website for luxury handcrafted sarees.

## Features

- Smooth Framer Motion animations throughout (hero, cards, page transitions)
- 13 pages: Home, Store, Product Detail, Cart, Wishlist, Checkout, Collections, About, Contact, Blog, FAQ, Account, Order Success
- Store page with category grid + right-side filters (category, price, bestsellers, new) + sorting
- Cart & Wishlist with localStorage persistence
- Fully responsive, mobile-first design
- Tailwind CSS v4 only (no external CSS files)
- Production build config with code splitting

## Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Framer Motion
- React Router DOM 7
- Lucide React

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   Navbar, Footer, Hero, ProductCard, Layout
  pages/        All 13 pages
  context/      Cart & Wishlist store (localStorage)
  data/         Products, categories, blog posts
  index.css     Tailwind + theme tokens
```
