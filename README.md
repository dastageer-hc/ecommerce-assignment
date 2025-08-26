# 🛒 Mini E-Commerce Dashboard

A frontend interview assignment built with **Next.js, React, TypeScript, Tailwind CSS, Redux, and Axios**.  
This mini e-commerce dashboard demonstrates product browsing, filtering, sorting, cart functionality, and responsive UI with dark/light mode support.

---

## 🚀 Features

### Product Listing
- Browse products fetched from [Fake Store API](https://fakestoreapi.com/docs#tag/Products).
- Responsive grid layout with **CSS Grid/Flexbox**.
- **Search by title**.
- **Sort by price** (ascending/descending).
- **Filter by category**.
- **Loading and error states** with retry button.
- **Skeleton loaders** for smooth UX.

### Product Details
- Click a product to view **title, price, description, and rating**.
- **Add to Cart** button from detail view.

### Cart
- Add products to cart from product detail page.
- Cart state managed with **Redux**.
- Cart state **persists in `localStorage`** across refresh.

### UI / UX
- **Dark/Light mode toggle**, with persisted preference.
- Fully **responsive design** (mobile → desktop).
- Clean and minimal **Tailwind CSS** styling.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – Framework for React + SSR/SSG
- [React](https://react.dev/) – UI Library
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management
- [Axios](https://axios-http.com/) – API requests
- [Fake Store API](https://fakestoreapi.com/) – Product data

---

## 📂 Project Structure
/src

├── components # Reusable UI components

├── pages # Next.js pages (listing, details, etc.)

├── redux # Redux store, slices

├── hooks # Custom hooks

├── styles # Global styles

├── utils # Helpers (e.g., localStorage persistence)


---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone repo
git clone git@github.com:dastageer-hc/ecommerce-assignment.git

cd ecommerce-dashboard

# Install dependencies
npm install
# or
yarn install

Development
npm run dev
# or
yarn dev


Open http://localhost:3000
 to view in browser.

Build & Deploy
npm run build
npm run start
