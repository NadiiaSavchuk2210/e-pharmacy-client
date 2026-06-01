<img src="https://capsule-render.vercel.app/api?type=waving&color=0:59B17A,50:2F8F5B,100:F7C948&height=220&section=header&text=E-Pharmacy&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Online%20medicine%20store%20built%20with%20Next.js%2C%20React%2C%20TypeScript%2C%20and%20Tailwind%20CSS&descAlignY=60&descSize=16" alt="E-Pharmacy header" />

<div align="center">

<img src="public/icons/apple-touch-icon.png" alt="E-Pharmacy logo" width="96" height="96" />

# E-Pharmacy Client

A responsive online pharmacy web application for browsing medicines, exploring pharmacy stores, managing a cart, and placing orders.

<p>
  <img src="https://img.shields.io/badge/status-active-59B17A?style=flat-square" alt="Project status: active" />
  <img src="https://img.shields.io/badge/platform-web-2F8F5B?style=flat-square" alt="Platform: web" />
  <img src="https://img.shields.io/badge/deployment-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Deployment: Vercel" />
  <img src="https://img.shields.io/badge/domain-healthcare-F7C948?style=flat-square" alt="Domain: healthcare" />
</p>

<p>
  <a href="https://e-pharmacy-client-nu.vercel.app/"><strong>Live Demo</strong></a>
  |
  <a href="https://github.com/NadiiaSavchuk2210/e-pharmacy-client"><strong>Source Code</strong></a>
  |
  <a href="https://github.com/NadiiaSavchuk2210/e-pharmacy-backend"><strong>Backend Repository</strong></a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p>
  <img src="https://skillicons.dev/icons?i=next,react,ts,tailwind,vercel,github&perline=6" alt="Tech stack icons" />
</p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Preview](#preview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Helpful Resources](#helpful-resources)
- [Author](#author)

## Overview

**E-Pharmacy Client** is the frontend for an online medicine ordering platform. It helps users discover medicines, review product details, browse pharmacy stores, add products to a cart, submit checkout information, and view order history after authentication.

The project is built with `Next.js 16`, `React 19`, `TypeScript`, and `Tailwind CSS 4`. It uses the Next.js App Router, server-rendered route pages, client-side data flows with TanStack Query, and API utilities configured through environment variables.

> Built as a responsive healthcare ecommerce experience with SEO metadata, protected private routes, API rewrites, loading states, empty states, and reusable feature modules.

## Preview

<div align="center">
  <img src="public/og-image.png" alt="E-Pharmacy preview" width="100%" />
</div>

## Features

| Area | Details |
| --- | --- |
| Home | Promotional sections, featured medicine stores, delivery messaging, and customer reviews |
| Medicine catalog | Search, category filtering, discount filtering, pagination, and product skeleton states |
| Product details | Product description, supplier/category/stock details, reviews tab, and dynamic metadata |
| Medicine stores | Paginated pharmacy store list and store detail routes |
| Authentication | Register, login, current user profile, refresh session, and logout API paths |
| Cart | Auth-aware cart page, quantity updates, checkout validation, draft persistence, and order submission |
| Orders | Authenticated order history with pagination, loading, empty, and error states |
| SEO | App metadata, Open Graph image, Twitter card metadata, sitemap, robots config, manifest, and icons |
| UX | Responsive layouts, shared UI components, toasts, route state pages, and scroll-to-top behavior |

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | `Next.js 16`, `React 19` |
| Language | `TypeScript` |
| Styling | `Tailwind CSS 4`, `modern-normalize`, `tailwind-merge`, `class-variance-authority` |
| Data Fetching | `TanStack Query`, `Axios`, custom API clients |
| Forms and Validation | `Formik`, `Yup`, `libphonenumber-js` |
| UI | `Radix UI`, `Lucide React`, shared component primitives |
| Feedback | `react-hot-toast`, `canvas-confetti` |
| Tooling | `ESLint 9`, `eslint-config-next`, `React Compiler` |
| Deployment | `Vercel` |

<div align="center">
  <img src="https://img.shields.io/badge/Architecture-Next.js_App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js App Router architecture" />
  <img src="https://img.shields.io/badge/API-Rewrites-59B17A?style=for-the-badge" alt="API rewrites" />
  <img src="https://img.shields.io/badge/Forms-Formik_%2B_Yup-2F8F5B?style=for-the-badge" alt="Formik and Yup forms" />
  <img src="https://img.shields.io/badge/SEO-Optimized-F7C948?style=for-the-badge" alt="SEO optimized" />
</div>

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Redirects to `/home` |
| `/home` | Public | Landing page with promos, stores, and reviews |
| `/medicine-store` | Public | Paginated list of pharmacy stores |
| `/medicine-store/[storeId]` | Public | Store detail page |
| `/medicine` | Public | Medicine catalog with filters and pagination |
| `/product/[productId]` | Public | Redirects to the product description tab |
| `/product/[productId]/description` | Public | Product description and key details |
| `/product/[productId]/reviews` | Public | Product reviews with pagination |
| `/feature` | Public | Secure delivery information page |
| `/register` | Public | User registration page |
| `/login` | Public | User login page |
| `/cart` | Private | Authenticated cart and checkout page |
| `/orders` | Private | Authenticated order history page |

## Project Structure

```text
e-pharmacy-client/
|-- assets/                    # Source SVG and image assets
|-- public/                    # Public logos, icons, images, favicon, manifest, OG image
|-- src/
|   |-- app/                   # Next.js App Router pages, layouts, metadata, API routes
|   |-- entities/              # Domain entities: products, stores, users, orders, reviews
|   |-- features/              # Feature modules: auth, cart, orders
|   |-- shared/                # Shared API clients, UI, constants, layouts, utilities
|   `-- widgets/               # Composed UI sections such as header and reviews
|-- .env.example
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

The codebase follows a feature-oriented structure. Domain logic is grouped by entity or feature, while reusable infrastructure lives in `shared`.

## Environment Variables

Create a `.env` file based on `.env.example`.

| Variable | Description | Example |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for metadata, sitemap, and canonical configuration | `https://e-pharmacy-client-nu.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Backend API base URL used by API clients and Next.js rewrites | `https://e-pharmacy-backend-z5z2.onrender.com` |
| `NEXT_PUBLIC_REGISTER_PATH` | Register endpoint path | `/api/user/register` |
| `NEXT_PUBLIC_LOGIN_PATH` | Login endpoint path | `/api/user/login` |
| `NEXT_PUBLIC_CURRENT_USER_PATH` | Current user profile endpoint path | `/api/user/profile` |
| `NEXT_PUBLIC_REFRESH_PATH` | Token refresh endpoint path | `/api/user/refresh` |
| `NEXT_PUBLIC_LOGOUT_PATH` | Logout endpoint path | `/api/user/logout` |

Example:

```env
NEXT_PUBLIC_SITE_URL=https://e-pharmacy-client-nu.vercel.app
NEXT_PUBLIC_API_URL=https://e-pharmacy-backend-z5z2.onrender.com
NEXT_PUBLIC_REGISTER_PATH=/api/user/register
NEXT_PUBLIC_LOGIN_PATH=/api/user/login
NEXT_PUBLIC_CURRENT_USER_PATH=/api/user/profile
NEXT_PUBLIC_REFRESH_PATH=/api/user/refresh
NEXT_PUBLIC_LOGOUT_PATH=/api/user/logout
```

## Installation and Setup

1. Clone the repository:

```bash
git clone git@github.com:NadiiaSavchuk2210/e-pharmacy-client.git
cd e-pharmacy-client
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint checks |

## Deployment

The production version is deployed on Vercel:

- https://e-pharmacy-client-nu.vercel.app/

The backend API is deployed on Render:

- https://e-pharmacy-backend-z5z2.onrender.com

For production deployment, add the environment variables from `.env.example` to the Vercel project settings. The build command is:

```bash
npm run build
```

## Helpful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Documentation](https://vercel.com/docs)

## Author

**Nadiia Savchuk**

- GitHub: [@NadiiaSavchuk2210](https://github.com/NadiiaSavchuk2210)
- Project Repository: [e-pharmacy-client](https://github.com/NadiiaSavchuk2210/e-pharmacy-client)
- Backend Repository: [e-pharmacy-backend](https://github.com/NadiiaSavchuk2210/e-pharmacy-backend)
- Live Project: [E-Pharmacy](https://e-pharmacy-client-nu.vercel.app/)
- Backend API: [E-Pharmacy API](https://e-pharmacy-backend-z5z2.onrender.com)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:F7C948,50:2F8F5B,100:59B17A&height=120&section=footer" alt="Footer decoration" />
</p>
