const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "medsflow_super_secret_jwt_key_2026";

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medical_inventory_full";
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully:", MONGO_URI);
    seedDatabase();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas & Models
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model("Admin", AdminSchema);

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  disease: String,
  category: String,
  salt: String,
  price: { type: Number, required: true },
  mrp: Number,
  quantity: { type: Number, required: true, default: 0 },
  batchNumber: String,
  expiryDate: Date,
  rxRequired: { type: Boolean, default: false },
  dosage: String,
  manufacturer: String,
  packageSize: String,
  rating: { type: Number, default: 4.8 },
  reviews: { type: Number, default: 120 },
  expressDelivery: { type: Boolean, default: true },
  coldChain: { type: Boolean, default: false },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Medicine = mongoose.model("Medicine", MedicineSchema);

// Initial 20 Genuine Medicines Dataset
const initialMedicines = [
  {
    name: "Paracetamol 500mg",
    salt: "Paracetamol IP (500mg)",
    description: "Fast-acting antipyretic and analgesic used to relieve fever, headaches, body ache, and mild pain.",
    disease: "Fever, Headache",
    category: "Fever & Pain",
    price: 25,
    mrp: 35,
    quantity: 200,
    batchNumber: "PCM500-A1",
    expiryDate: new Date("2026-05-30"),
    rxRequired: false,
    dosage: "1 tablet every 4-6 hours with water after food.",
    manufacturer: "Micro Labs Ltd",
    packageSize: "Strip of 15 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Ibuprofen 400mg",
    salt: "Ibuprofen IP (400mg)",
    description: "Non-steroidal anti-inflammatory drug (NSAID) for dental pain, muscle aches, back pain, and joint swelling.",
    disease: "Pain, Inflammation",
    category: "Fever & Pain",
    price: 40,
    mrp: 55,
    quantity: 150,
    batchNumber: "IBU400-B2",
    expiryDate: new Date("2026-03-15"),
    rxRequired: false,
    dosage: "1 tablet twice daily after meals. Do not exceed recommended dosage.",
    manufacturer: "Abbott Healthcare",
    packageSize: "Strip of 10 tablets",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Cetirizine 10mg",
    salt: "Cetirizine Hydrochloride (10mg)",
    description: "Second-generation antihistamine relieving runny nose, watery eyes, sneezing, and skin allergy hives.",
    disease: "Allergy, Cold",
    category: "Cough & Allergy",
    price: 30,
    mrp: 45,
    quantity: 180,
    batchNumber: "CET10-C3",
    expiryDate: new Date("2026-07-20"),
    rxRequired: false,
    dosage: "1 tablet once daily preferably at bedtime.",
    manufacturer: "Dr. Reddy's Laboratories",
    packageSize: "Strip of 10 tablets",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Azithromycin 500mg",
    salt: "Azithromycin Dihydrate (500mg)",
    description: "Broad-spectrum macrolide antibiotic treating respiratory tract infections, tonsillitis, and ear infections.",
    disease: "Bacterial Infection",
    category: "Antibiotics",
    price: 120,
    mrp: 160,
    quantity: 90,
    batchNumber: "AZI500-D4",
    expiryDate: new Date("2026-01-10"),
    rxRequired: true,
    dosage: "1 tablet once daily for 3 to 5 consecutive days as directed by doctor.",
    manufacturer: "Cipla Ltd",
    packageSize: "Pack of 3 tablets",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Amoxicillin 500mg",
    salt: "Amoxicillin Trihydrate (500mg)",
    description: "Penicillin-class antibiotic effective against bacterial infections of chest, dental abscesses, and urinary tract.",
    disease: "Infection",
    category: "Antibiotics",
    price: 95,
    mrp: 130,
    quantity: 100,
    batchNumber: "AMX500-E5",
    expiryDate: new Date("2026-04-18"),
    rxRequired: true,
    dosage: "1 capsule 3 times daily at equal 8-hour intervals after meals.",
    manufacturer: "Alkem Laboratories",
    packageSize: "Strip of 10 capsules",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Pantoprazole 40mg",
    salt: "Pantoprazole Sodium (40mg)",
    description: "Proton pump inhibitor (PPI) providing 24-hour relief from acid reflux, heartburn, GERD, and gastric ulcers.",
    disease: "Acidity, GERD",
    category: "Stomach & Acidity",
    price: 60,
    mrp: 85,
    quantity: 140,
    batchNumber: "PAN40-F6",
    expiryDate: new Date("2026-06-12"),
    rxRequired: false,
    dosage: "1 tablet empty stomach in the morning 30 minutes before breakfast.",
    manufacturer: "Sun Pharma Ltd",
    packageSize: "Strip of 15 tablets",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Omeprazole 20mg",
    salt: "Omeprazole (20mg)",
    description: "Fast-acting gastric acid reducer for frequent heartburn, sour burps, and stomach mucosa protection.",
    disease: "Acidity, Ulcer",
    category: "Stomach & Acidity",
    price: 55,
    mrp: 75,
    quantity: 160,
    batchNumber: "OME20-G7",
    expiryDate: new Date("2026-02-28"),
    rxRequired: false,
    dosage: "1 capsule daily morning before meals with water.",
    manufacturer: "Zydus Cadila",
    packageSize: "Strip of 15 capsules",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Metformin 500mg",
    salt: "Metformin Hydrochloride (500mg)",
    description: "First-line oral anti-diabetic medication to improve insulin sensitivity and regulate blood glucose levels.",
    disease: "Diabetes",
    category: "Diabetes Care",
    price: 35,
    mrp: 50,
    quantity: 220,
    batchNumber: "MET500-H8",
    expiryDate: new Date("2026-08-30"),
    rxRequired: true,
    dosage: "1 tablet twice daily with meals to avoid gastric irritation.",
    manufacturer: "USV Private Ltd",
    packageSize: "Strip of 20 tablets",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Amlodipine 5mg",
    salt: "Amlodipine Besylate (5mg)",
    description: "Calcium channel blocker to relax blood vessels, lower blood pressure, and improve cardiac blood flow.",
    disease: "Hypertension",
    category: "BP & Heart",
    price: 45,
    mrp: 60,
    quantity: 130,
    batchNumber: "AML5-I9",
    expiryDate: new Date("2026-09-05"),
    rxRequired: true,
    dosage: "1 tablet once daily morning or evening, as directed by cardiologist.",
    manufacturer: "Pfizer Ltd",
    packageSize: "Strip of 15 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Losartan 50mg",
    salt: "Losartan Potassium (50mg)",
    description: "Angiotensin II receptor blocker (ARB) to treat hypertension and protect kidney function in diabetic patients.",
    disease: "Hypertension",
    category: "BP & Heart",
    price: 50,
    mrp: 70,
    quantity: 125,
    batchNumber: "LOS50-J10",
    expiryDate: new Date("2026-11-01"),
    rxRequired: true,
    dosage: "1 tablet once daily with or without meals at a fixed time.",
    manufacturer: "Torrent Pharma",
    packageSize: "Strip of 15 tablets",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Vitamin C Tablets",
    salt: "Ascorbic Acid (500mg) + Sodium Ascorbate",
    description: "Chewable immunity booster, antioxidant defense against viral colds, and promoter of skin collagen synthesis.",
    disease: "Immunity",
    category: "Immunity & Vitamins",
    price: 80,
    mrp: 120,
    quantity: 300,
    batchNumber: "VITC-K11",
    expiryDate: new Date("2027-01-15"),
    rxRequired: false,
    dosage: "1 chewable tablet daily after lunch.",
    manufacturer: "GlaxoSmithKline (GSK)",
    packageSize: "Strip of 15 chewable tablets",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Calcium + Vitamin D3",
    salt: "Calcium Carbonate (500mg) + Vitamin D3 (250 IU)",
    description: "Dual-action bone mineral supplement strengthening bones, teeth, and reducing osteopenia risk in adults.",
    disease: "Bone Health",
    category: "Bone Health",
    price: 110,
    mrp: 160,
    quantity: 170,
    batchNumber: "CALD3-L12",
    expiryDate: new Date("2027-03-20"),
    rxRequired: false,
    dosage: "1 tablet once daily with milk or after principal meal.",
    manufacturer: "Sun Pharma Ltd",
    packageSize: "Bottle of 30 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "ORS Sachet (Electral)",
    salt: "WHO Formula Electrolytes (Sodium, Potassium, Dextrose)",
    description: "Vital rehydration formula to replace body fluid and electrolytes lost during diarrhea, heat exhaustion, and vomiting.",
    disease: "Dehydration",
    category: "Stomach & Acidity",
    price: 20,
    mrp: 25,
    quantity: 400,
    batchNumber: "ORS-M13",
    expiryDate: new Date("2026-12-01"),
    rxRequired: false,
    dosage: "Dissolve full contents of 1 sachet in 1 liter of clean drinking water.",
    manufacturer: "FDC Ltd (Electral)",
    packageSize: "Pack of 21.8g Sachet",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Dolo 650",
    salt: "Paracetamol (650mg)",
    description: "India's most trusted fever and body pain specialist formula with clinical efficacy for viral flu and body pain.",
    disease: "Fever, Pain",
    category: "Fever & Pain",
    price: 30,
    mrp: 40,
    quantity: 250,
    batchNumber: "DOLO650-N14",
    expiryDate: new Date("2026-10-10"),
    rxRequired: false,
    dosage: "1 tablet every 6 to 8 hours as needed. Do not exceed 4 tablets in 24 hours.",
    manufacturer: "Micro Labs Ltd",
    packageSize: "Strip of 15 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Cough Syrup (Ascoril D+)",
    salt: "Dextromethorphan + Chlorpheniramine + Phenylephrine",
    description: "Triple-action soothing syrup for dry hacking cough, throat irritation, nasal congestion, and seasonal allergies.",
    disease: "Cough",
    category: "Cough & Allergy",
    price: 75,
    mrp: 100,
    quantity: 90,
    batchNumber: "COUGH-O15",
    expiryDate: new Date("2026-06-30"),
    rxRequired: false,
    dosage: "10ml (2 measuring spoons) 3 times daily.",
    manufacturer: "Glenmark Pharma",
    packageSize: "100ml Amber Bottle",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Antacid Syrup (Gelusil MPS)",
    salt: "Aluminium Hydroxide + Magnesium Hydroxide + Simethicone",
    description: "Instant liquid cooling comfort for burning chest acidity, gas bubbles, bloating, and sour belching.",
    disease: "Acidity",
    category: "Stomach & Acidity",
    price: 65,
    mrp: 90,
    quantity: 110,
    batchNumber: "ANTAC-P16",
    expiryDate: new Date("2026-09-18"),
    rxRequired: false,
    dosage: "1 to 2 measuring spoons after food or when acidity flares.",
    manufacturer: "Pfizer Ltd",
    packageSize: "200ml Mint Flavor Bottle",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Insulin Injection (Mixtard 30/70)",
    salt: "Biphasic Isophane Insulin (40 IU/ml)",
    description: "Precision temperature-controlled insulin suspension for intensive glycemic regulation in diabetes.",
    disease: "Diabetes",
    category: "Diabetes Care",
    price: 450,
    mrp: 550,
    quantity: 40,
    batchNumber: "INS-Q17",
    expiryDate: new Date("2026-04-30"),
    rxRequired: true,
    dosage: "Subcutaneous injection 15-30 mins before breakfast and dinner as prescribed by endocrinologist.",
    manufacturer: "Novo Nordisk",
    packageSize: "10ml Cold-Chain Vial",
    coldChain: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Salbutamol Inhaler (Asthalin 100mcg)",
    salt: "Salbutamol Inhalation Aerosol (100mcg/puff)",
    description: "Fast bronchodilator rescue inhaler providing rapid 5-minute airway opening during asthma attacks.",
    disease: "Asthma",
    category: "Cough & Allergy",
    price: 320,
    mrp: 400,
    quantity: 60,
    batchNumber: "SALB-R18",
    expiryDate: new Date("2026-04-25"),
    rxRequired: true,
    dosage: "1 to 2 puffs whenever acute shortness of breath or wheezing occurs.",
    manufacturer: "Cipla Ltd",
    packageSize: "200 Metered Doses Canister",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Multivitamin Capsules (Becadexamin)",
    salt: "Multivitamins + Multiminerals + Zinc + Ginseng",
    description: "Comprehensive vitality and stamina booster replenishing daily micronutrient shortfalls, combats fatigue.",
    disease: "General Weakness",
    category: "Immunity & Vitamins",
    price: 150,
    mrp: 220,
    quantity: 200,
    batchNumber: "MULTI-S19",
    expiryDate: new Date("2027-02-14"),
    rxRequired: false,
    dosage: "1 capsule daily after breakfast with water.",
    manufacturer: "GlaxoSmithKline (GSK)",
    packageSize: "Bottle of 30 softgels",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80"
  },
  {
    name: "Zinc Tablets 50mg",
    salt: "Zinc Gluconate (50mg)",
    description: "Vital trace mineral essential for cellular immunity, wound healing, protein synthesis, and taste acuity.",
    disease: "Immunity",
    category: "Immunity & Vitamins",
    price: 55,
    mrp: 80,
    quantity: 180,
    batchNumber: "ZINC-T20",
    expiryDate: new Date("2026-08-08"),
    rxRequired: false,
    dosage: "1 tablet once daily with meals.",
    manufacturer: "Sun Pharma Ltd",
    packageSize: "Strip of 20 tablets",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=80"
  }
];

// Auto-seed admin user (admin / admin123) and medicines
async function seedDatabase() {
  try {
    // 1. Ensure Authorized Admin: username "admin", password "admin123"
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hash = await bcrypt.hash("admin123", 10);
      await new Admin({ username: "admin", password: hash }).save();
      console.log("-> Authorized Admin created: username: admin / password: admin123");
    } else {
      // Ensure password matches admin123
      const isMatch = await bcrypt.compare("admin123", existingAdmin.password);
      if (!isMatch) {
        existingAdmin.password = await bcrypt.hash("admin123", 10);
        await existingAdmin.save();
        console.log("-> Admin password updated to admin123");
      } else {
        console.log("-> Admin credentials verified: admin / admin123");
      }
    }

    // 2. Ensure initial medicines exist in MongoDB
    const medCount = await Medicine.countDocuments();
    if (medCount === 0) {
      await Medicine.insertMany(initialMedicines);
      console.log("-> Initial 20 genuine medicines seeded successfully into MongoDB");
    } else {
      console.log(`-> Database contains ${medCount} medicines`);
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

// Authentication Middleware: Enforces authorized admin for checking/adding/editing
const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: "Access denied. Authentication token is required." });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
  }
};

// --------------------- AUTH & ADMIN ROUTES ---------------------

// Admin Login endpoint (Username: admin, Password: admin123)
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Sign JWT token valid for 24 hours
    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, {
      expiresIn: "24h"
    });

    res.json({
      token,
      username: admin.username,
      message: "Admin authentication successful"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error during authentication" });
  }
});

// Verify token endpoint
app.get("/api/admin/verify", auth, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// --------------------- MEDICINES ROUTES ---------------------

// GET /api/medicines - Public (so store customers can view products)
app.get("/api/medicines", async (req, res) => {
  try {
    const meds = await Medicine.find().sort({ createdAt: -1 });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// GET /api/expiry-alerts - Expiry tracking (within next 60 days)
app.get("/api/expiry-alerts", async (req, res) => {
  try {
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + 90);
    const meds = await Medicine.find({ expiryDate: { $lte: limit } });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expiry alerts" });
  }
});

// POST /api/medicines - PROTECTED: Only Authorized Admin can add medicines
app.post("/api/medicines", auth, async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Medicine name and price are required" });
    }

    const newMed = new Medicine({
      ...req.body,
      mrp: req.body.mrp || Number(price) * 1.3,
      quantity: Number(req.body.quantity) || 0,
      price: Number(price),
      expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : new Date(Date.now() + 365*24*60*60*1000)
    });

    const saved = await newMed.save();
    res.status(201).json({ message: "Medicine added successfully", medicine: saved });
  } catch (err) {
    console.error("Add medicine error:", err);
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

// PUT /api/medicines/:id - PROTECTED: Only Authorized Admin can update stock/details
app.put("/api/medicines/:id", auth, async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json({ message: "Medicine updated successfully", medicine: updated });
  } catch (err) {
    console.error("Update stock error:", err);
    res.status(500).json({ error: "Failed to update stock" });
  }
});

// DELETE /api/medicines/:id - PROTECTED: Only Authorized Admin can delete medicine
app.delete("/api/medicines/:id", auth, async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` MedsFlow Backend running on port ${PORT}`);
  console.log(` Admin Auth Login: POST http://localhost:${PORT}/api/admin/login`);
  console.log(` Default Admin User: admin | Password: admin123`);
  console.log(`=======================================================`);
});
