# 💊 MedsFlow — Next-Gen Digital Pharmacy & Healthcare Hub

<div align="center">

![MedsFlow Banner](https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80)

**An ultra-fast, modern healthcare e-commerce platform featuring intelligent medicine search, certified doctor tele-consultations, comprehensive diagnostic packages, dynamic QR-code checkout, and an authorized inventory administration suite.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React 19](https://img.shields.io/badge/React-19.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT Secured](https://img.shields.io/badge/Auth-JWT%20%2B%20Bcrypt-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](#)

[Live Demo](https://medsflow.netlify.app/) • [Report Bug](https://github.com/superb-keshav/MedsFlow/issues) • [Request Feature](https://github.com/superb-keshav/MedsFlow/issues)

</div>

---

## 📖 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [🖥️ UI & Feature Walkthrough](#️-ui--feature-walkthrough)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Admin Control Center](#-admin-control-center)
- [📡 API Documentation](#-api-documentation)
- [🌐 Deployment Guide](#-deployment-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Highlights

- ⚡ **Hyper-Local 20-Minute Express Delivery**: Live delivery simulation with pincode check and instant dispatch timers.
- 🔍 **Intelligent Salt & Substitute Engine**: Deep search matching commercial brand names, active pharmaceutical ingredients (salts), and targeted diseases/conditions.
- 👨‍⚕️ **Verified Doctor Tele-Consultation**: Direct appointment scheduling with specialized healthcare practitioners (Cardiology, Pediatrics, General Medicine, Dermatology) with transparent consultation fees.
- 🔬 **Comprehensive Diagnostic Lab Packages**: At-home sample collection booking for full-body health checks, diabetes screenings, and cardiac health profiles.
- 💳 **Dynamic QR & Smart Invoice Flow**: Seamless slide-out cart, automated savings & tax breakdown, instant UPI QR payment generator, and real-time order tracking progression.
- 🔐 **Secured Admin Management Portal**: Protected by JWT authentication and Bcrypt hashing (`admin` / `admin123`) with real-time stock monitoring, low-stock visual flags, and medicine CRUD operations.

---

## 🖥️ UI & Feature Walkthrough

### 1. 🛍️ Customer Storefront & Quick Commerce Experience
- **Smart Category Navigation**: One-click filtering across All Medicines, Prescription, OTC & Wellness, Chronic Care, and Mother & Baby care.
- **Micro-Filters**: Instant toggling between *25%+ Heavy Discounts*, *20-Min Express Eligible*, and *In-Stock Only* items.
- **Rich Product Cards**: Shows brand badges, active salt formulas, dosage formats, discount tags, pack sizes, and one-tap "+ Add" with quantity counters.
- **Detailed Medicine Modal**: Comprehensive breakdown of composition, therapeutic uses, manufacturer credentials, side-effect warnings, and storage advice.

### 2. 👨‍⚕️ Certified Doctor Consultation
- Book licensed specialists directly without leaving the store.
- Fixed, transparent pricing (e.g. Dr. Rajesh Sharma - Cardiologist ₹499, Dr. Anita Deshmukh - General Physician ₹299).
- Slot selector (Morning / Afternoon / Evening) with instant appointment confirmation.

### 3. 🔬 Diagnostic Health Tests & Checkups
- Home sample collection booking with NABL-accredited diagnostic partners.
- Packages including **Comprehensive Full Body Checkup (85+ tests)**, **Advanced Diabetes Profile (4 tests)**, and **Heart Care Comprehensive Screen (28 tests)**.
- Digital reports delivered securely within 24 hours.

### 4. 💳 Dynamic QR Billing & Live Order Tracker
- **Smart Cart Drawer**: Live subtotal calculations, packaging charges, itemized discounts, and instant promo code applied.
- **UPI QR Checkout**: Dynamically generated QR code compatible with Google Pay, PhonePe, Paytm, and BHIM UPI.
- **Interactive Tracking Modal**: 4-stage live progression tracker: *Order Confirmed ➔ Pharmacy Packing ➔ Rider Dispatched ➔ Delivered in 20 Mins*.

### 5. 🔐 Authorized Admin Portal
- Accessible via the top navbar key icon.
- Secured credentials: `admin` / `admin123`.
- Real-time inventory overview: total catalog count, low-stock alerts, total valuation, and out-of-stock warnings.
- Complete CRUD controls: Add new medicines with custom salt, disease tags, pricing, and stock count; edit existing pricing/stock; and delete discontinued items.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User([Customer / Patient]) -->|Browse / Search / Cart / QR Pay| ReactClient[React 19 + Tailwind v4 + Lucide UI]
    AdminUser([Store Administrator]) -->|JWT Login / Manage Stock| ReactClient
    
    subgraph Frontend Application
        ReactClient --> StoreCtx[Store Context & Local State Engine]
        StoreCtx --> UIComponents[Navbar | ProductCard | Modals | CartDrawer]
    end
    
    subgraph Express Backend API
        UIComponents -->|REST API Requests| ExpressServer[Express.js 5.x Server :5000]
        ExpressServer --> AuthMW[JWT Authentication Middleware]
        ExpressServer --> MedRoutes[Medicine & Stock Controllers]
        ExpressServer --> ExpiryRoutes[Expiry & Low-Stock Alerts]
    end
    
    subgraph Database
        AuthMW --> Mongo[(MongoDB / Mongoose ODM)]
        MedRoutes --> Mongo
        ExpiryRoutes --> Mongo
    end
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI components with hooks & functional architecture |
| **Vite 8** | Lightning-fast development server and production bundler |
| **Tailwind CSS v4** | Next-generation utility-first styling with sleek dark-mode glassmorphism |
| **Lucide React** | Crisp, lightweight medical and interface iconography |
| **Canvas Confetti** | Delightful micro-interaction feedback on successful orders |

### Backend & Database
| Technology | Description |
| :--- | :--- |
| **Node.js** | High-performance asynchronous JavaScript runtime |
| **Express.js 5** | RESTful API server handling inventory, auth, and analytics |
| **MongoDB & Mongoose** | NoSQL database with strict schema validation for medicines & orders |
| **Bcrypt.js & JSON Web Tokens** | Industry-standard password hashing and secure tokenized authentication |
| **CORS** | Cross-Origin Resource Sharing security configuration |

---

## 📂 Project Structure

```
MedsFlow/
├── backend/
│   ├── node_modules/
│   ├── package.json          # Express, Mongoose, Bcrypt, JWT
│   └── server.js             # REST API endpoints, auth, and seed data
├── public/
│   └── favicon.svg           # MedsFlow brand icon
├── src/
│   ├── components/
│   │   ├── AdminDashboardModal.jsx   # Secured inventory management console
│   │   ├── CartDrawer.jsx            # Dynamic slide-out checkout & cart
│   │   ├── CategoryPills.jsx         # Category & quick-filter pills
│   │   ├── CheckoutModal.jsx         # Dynamic UPI QR & customer details
│   │   ├── DoctorConsultModal.jsx    # Doctor consultation booking modal
│   │   ├── Footer.jsx                # Trust badges, links & credentials
│   │   ├── HeroBanner.jsx            # Hero carousel & quick-action cards
│   │   ├── LabTestsSection.jsx       # Diagnostic packages & booking
│   │   ├── Navbar.jsx                # Search bar, pincode, admin & cart
│   │   ├── OrderTrackingModal.jsx    # Real-time delivery progress timeline
│   │   ├── PincodeModal.jsx          # Hyper-local 20-min delivery checker
│   │   ├── ProductCard.jsx           # Medicine card with salt & stock status
│   │   └── ProductDetailModal.jsx    # Comprehensive drug info & dosage
│   ├── context/
│   │   └── StoreContext.jsx          # Centralized React state management
│   ├── data/
│   │   └── initialMedicines.js       # Curated initial medical catalog
│   ├── App.jsx                       # Root application view & routing
│   ├── index.css                     # Tailwind v4 theme & custom utilities
│   └── main.jsx                      # React 19 bootstrap entry
├── .gitignore                        # Git exclusion rules
├── index.html                        # HTML5 document & typography imports
├── package.json                      # Frontend dependencies & scripts
├── README.md                         # Project documentation
└── vite.config.js                    # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` OR a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud URI)
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/superb-keshav/MedsFlow.git
cd MedsFlow
```

---

### Step 2: Start the Backend Server
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the Express server
npm start
# or: node server.js
```
The backend will launch on **http://localhost:5000** and automatically seed the database with admin credentials and initial medicines.

---

### Step 3: Start the Frontend Application
Open a new terminal window:
```bash
# From the project root (MedsFlow/)
npm install

# Run the Vite development server
npm run dev
```
Visit **http://localhost:5173** in your browser to experience MedsFlow!

---

## 🔐 Admin Control Center

The application features a secure admin interface to manage medicine stocks, prices, and catalog entries.

| Key | Value |
| :--- | :--- |
| **Access Point** | Click the **Admin Key** icon (`🔑`) in the top navbar |
| **Default Username** | `admin` |
| **Default Password** | `admin123` |
| **Authentication** | Secure JWT Bearer Token stored in session |

### Capabilities:
- 📊 **Real-time Inventory Metrics**: Track in-stock items, total units, and inventory value.
- ⚠️ **Low-Stock Alert Banners**: Immediate notifications for medicines with fewer than 10 units remaining.
- ➕ **Add New Medicine**: Add brand name, salt composition, therapeutic indication, category, packaging, MRP, discount price, and starting stock.
- ✏️ **Edit & Restock**: Update pricing, adjust quantities after new shipments, or modify drug descriptions.
- 🗑️ **Delete Items**: Safely remove phased-out medications.

---

## 📡 API Documentation

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Authenticate admin with username & password | No |
| `GET` | `/api/admin/verify` | Validate existing admin session token | Yes (Bearer Token) |
| `GET` | `/api/medicines` | Retrieve all catalog medicines with stock status | No |
| `GET` | `/api/expiry-alerts` | Retrieve medicines nearing expiration | No |
| `POST` | `/api/medicines` | Add a new medicine to the inventory | Yes (Bearer Token) |
| `PUT` | `/api/medicines/:id` | Update details or adjust stock of a medicine | Yes (Bearer Token) |
| `DELETE` | `/api/medicines/:id` | Remove a medicine from the database | Yes (Bearer Token) |

---

## 🌐 Deployment Guide

### Deploying the Frontend (Netlify / Vercel)
1. Push your repository to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
3. Choose **Import from Git** and select `MedsFlow`.
4. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Deploy**.

### Deploying the Backend (Render / Railway)
1. Push the `backend/` folder or repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/) or [Railway](https://railway.app/).
3. Set the Root Directory to `backend`.
4. Set Environment Variables:
   - `PORT` = `5000`
   - `MONGO_URI` = `your_mongodb_atlas_connection_string`
   - `JWT_SECRET` = `your_custom_jwt_secret`
5. Deploy the service!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/superb-keshav/MedsFlow/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">

Crafted with ❤️ by [Keshav](https://github.com/superb-keshav) • **MedsFlow** — Healthcare Delivered at the Speed of Life.

</div>
