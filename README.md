<div align="center">

# 📱 1Fi — Smart EMI Store

**A full-stack, production-ready e-commerce EMI financing application built for the 1Fi SDE1 evaluation.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[Features](#-key-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Database Schema](#-database-schema) • [API Reference](#-api-reference) • [Getting Started](#-getting-started) • [EMI Math Engine](#-emi-math-engine)

</div>

---

## 📖 Overview

**1Fi Smart EMI Store** is a specialized e-commerce web platform designed for financing high-end electronics and flagship smartphones using **Mutual Fund investments as collateral**. Customers can browse devices, dynamically customize storage and color variants, review 0% interest and reducing-balance EMI plans, check pin-code delivery eligibility, and complete instant loan application confirmations.

> [!NOTE]
> All product pricing, storage/color variants, and EMI payment schedules are dynamically served from a PostgreSQL database via Prisma ORM REST APIs without any client-side hardcoding.

---

## ✨ Key Features

### 🛍️ Dynamic Product Catalog
- **Slug-Based Routing**: Clean URLs for individual products (e.g. `/products/iphone-17-pro`, `/products/samsung-s25-ultra`, `/products/oneplus-nord-6`).
- **Interactive Variant Switcher**: Selecting different storage or color combinations instantly updates price, MRP, savings badge, and device photos.
- **High-Resolution Media**: Authentic custom variant product images served via static backend routes.

### 💳 Mutual Fund Collateral EMI Engine
- **0% Interest No-Cost EMI**: Special zero-interest schemes with ₹0 down payment.
- **Reducing Balance Formula**: Accurate financial calculations for interest-bearing plans (10.5% p.a.).
- **Cashback Incentives**: Automated cashback calculation recorded per tenure option.

### 🚚 Enhanced E-Commerce UX
- **Pincode Delivery Eligibility**: Interactive 6-digit pincode delivery validator.
- **Trust Badges**: Ratings overlay (`★ 4.8`), 1-year brand warranty tags, and 7-day easy replacement guarantees.
- **Collapsible FAQ Accordion**: Instant answers to common questions about mutual fund pledge processes, KYC requirements, and down payments.

### 🔒 2-Stage Confirmation Flow
- **Review Stage**: Clear summary of selected variant, monthly installment, tenure, interest rate, and total amount.
- **Confirmation Stage**: Dynamic transition to an instant approval screen complete with an **Application Reference ID (`#1FI-XXXXXX`)**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 6
- **Routing**: React Router v6 (`BrowserRouter`, `Routes`, `Route`, `useParams`, `useNavigate`)
- **HTTP Client**: Axios
- **Styling**: Custom CSS3 with Flexbox, CSS Grid, CSS Variables, and Glassmorphism effects

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, `express.json()`, `express.static()`
- **Environment**: Dotenv

### Database & ORM
- **Database**: PostgreSQL / SQLite
- **ORM**: Prisma 6 (Schema management, Client, and Seeding scripts)

---

## 📂 Project Structure

```bash
1Fi/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (Product, ProductVariant, EmiPlan)
│   │   └── seed.js                # Seed script with real phone images & EMI math
│   ├── public/
│   │   └── images/                # Static high-resolution product photos
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # PrismaClient singleton instance
│   │   ├── controllers/
│   │   │   └── productController.js # Async request handlers & error forwarding
│   │   ├── services/
│   │   │   └── productService.js    # Prisma database queries
│   │   ├── routes/
│   │   │   └── productRoutes.js   # Express REST routes (/api/products)
│   │   ├── app.js                 # Express application & error middleware
│   │   └── server.js              # Server bootstrap listener
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── images/                # Static frontend device assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with logo badge & mutual fund trust tag
│   │   │   ├── ProductCard.jsx     # Home grid product card
│   │   │   ├── ProductImage.jsx    # Photo display with 0% EMI & rating badges
│   │   │   ├── VariantSelector.jsx # Storage & color option buttons
│   │   │   └── EmiPlanCard.jsx     # Tenure selection card with radio indicator
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Catalog page with hero banner & trust badges
│   │   │   ├── ProductPage.jsx     # Detail view with pincode validator & FAQ accordion
│   │   │   └── Checkout.jsx        # 2-stage Order review & confirmation page
│   │   ├── services/
│   │   │   └── api.js              # Axios instance configuration
│   │   ├── App.jsx                 # Client routes
│   │   ├── index.css               # Clean global design stylesheet
│   │   └── main.jsx                # React root entry point
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Schema

The database utilizes 1:N relational modeling demarcating products, physical variants, and associated financing plans:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          Int              @id @default(autoincrement())
  name        String
  slug        String           @unique
  description String?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  variants    ProductVariant[]
}

model ProductVariant {
  id        Int       @id @default(autoincrement())
  productId Int
  storage   String
  color     String
  imageUrl  String
  mrp       Decimal   @db.Decimal(10, 2)
  price     Decimal   @db.Decimal(10, 2)
  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  emiPlans  EmiPlan[]
}

model EmiPlan {
  id             Int            @id @default(autoincrement())
  variantId      Int
  monthlyPayment Decimal        @db.Decimal(10, 2)
  tenureMonths   Int
  interestRate   Decimal        @db.Decimal(5, 2)
  cashback       Decimal        @default(0) @db.Decimal(10, 2)
  variant        ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
}
```

---

## 🧮 EMI Math Engine

The backend seed script (`seed.js`) computes exact monthly payments dynamically:

### 1. Zero Interest (0% No-Cost EMI)
$$\text{Monthly Payment} = \left\lceil \frac{\text{Principal}}{\text{Tenure Months}} \right\rceil$$

### 2. Reducing Balance Interest (10.5% p.a.)
$$\text{EMI} = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}$$

Where:
- $P$ = Selling price of selected variant
- $r$ = Monthly interest rate ($\text{Annual Rate} / 100 / 12$)
- $n$ = Loan tenure in months

---

## 📡 API Reference

### Get All Products
```http
GET /api/products
```
**Curl Command**:
```bash
curl -X GET http://localhost:5000/api/products
```
**Sample JSON Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "description": "Apple iPhone 17 Pro with Titanium design...",
      "variants": [
        {
          "id": 1,
          "storage": "256GB",
          "color": "Cosmic Orange",
          "imageUrl": "/images/iphone-17-pro-orange.png",
          "mrp": "134900.00",
          "price": "127400.00"
        }
      ]
    }
  ]
}
```

### Get Single Product by Slug
```http
GET /api/products/:slug
```
**Curl Command**:
```bash
curl -X GET http://localhost:5000/api/products/iphone-17-pro
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- PostgreSQL database instance running locally or via Docker / Supabase / Neon.

### 1. Clone Repository & Setup Backend
```bash
# Clone the repository
git clone https://github.com/your-username/1Fi-EMI-Store.git
cd 1Fi/backend

# Install backend dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Ensure `backend/.env` contains your PostgreSQL connection string:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/1fi"
```

Push Prisma schema and seed database:
```bash
# Create database tables
npx prisma db push

# Seed products, variants, and EMI plans
node prisma/seed.js

# Run backend development server
npm run dev
```
> [!TIP]
> The backend server will start at `http://localhost:5000`.

### 2. Setup Frontend
In a new terminal window:
```bash
cd 1Fi/frontend

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
> [!TIP]
> Access the web application at `http://localhost:3000`.

---

## 🧪 Production Build

To compile static assets for production deployment:
```bash
cd frontend
npm run build
```

The production output bundle will be generated in `frontend/dist/`.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  Developed for 1Fi Engineering Evaluation • 2026
</div>
