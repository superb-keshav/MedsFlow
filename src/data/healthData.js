// Health categories, coupons, and lab test packages
export const categories = [
  { id: "all", name: "All Medicines", count: 20 },
  { id: "Fever & Pain", name: "Fever & Pain", count: 4 },
  { id: "Diabetes Care", name: "Diabetes Care", count: 2 },
  { id: "BP & Heart", name: "BP & Heart", count: 2 },
  { id: "Stomach & Acidity", name: "Stomach & Acidity", count: 4 },
  { id: "Antibiotics", name: "Antibiotics", count: 2 },
  { id: "Immunity & Vitamins", name: "Immunity & Vitamins", count: 4 },
  { id: "Cough & Allergy", name: "Cough & Allergy", count: 3 },
  { id: "Bone Health", name: "Bone Health", count: 1 },
];

export const coupons = [
  {
    code: "MEDS25",
    title: "FLAT 25% OFF",
    description: "On all medicines & wellness products above ₹199",
    discountPercent: 25,
    minOrder: 199,
    maxDiscount: 250,
  },
  {
    code: "FIRST100",
    title: "FLAT ₹100 OFF",
    description: "Welcome voucher on your first order above ₹299",
    flatDiscount: 100,
    minOrder: 299,
  },
  {
    code: "FREEDEL",
    title: "FREE EXPRESS DELIVERY",
    description: "Instant 20-min temperature-controlled delivery at ₹0",
    freeDelivery: true,
    minOrder: 149,
  }
];

export const labTests = [
  {
    id: "lab_1",
    title: "Comprehensive Full Body Checkup",
    testsCount: 72,
    parameters: ["Complete Blood Count (CBC)", "Lipid Profile", "Liver Function (LFT)", "Kidney Function (KFT)", "Thyroid (TSH)", "HbA1c Blood Sugar"],
    price: 499,
    mrp: 1499,
    discount: 66,
    badge: "Most Popular",
    turnaround: "Report in 12 hours",
    homePickup: true
  },
  {
    id: "lab_2",
    title: "Advanced Diabetes & Cardiac Panel",
    testsCount: 48,
    parameters: ["Fasting Blood Sugar", "HbA1c Average 3 Months", "Lipid Cholesterol Profile", "Microalbuminuria Urine", "Serum Creatinine"],
    price: 399,
    mrp: 1199,
    discount: 67,
    badge: "Doctor Recommended",
    turnaround: "Report in 8 hours",
    homePickup: true
  },
  {
    id: "lab_3",
    title: "Immunity, Vitamin D & B12 Screening",
    testsCount: 24,
    parameters: ["Vitamin D 25-OH Total", "Vitamin B12 Cyanocobalamin", "Iron Profile & Ferritin", "ESR & Total WBC"],
    price: 549,
    mrp: 1699,
    discount: 68,
    badge: "Energy & Fatigue",
    turnaround: "Report in 24 hours",
    homePickup: true
  }
];

export const doctorSpecialties = [
  { id: "gp", name: "General Physician", fee: "₹199", waitTime: "Instant (2 mins)", icon: "Stethoscope" },
  { id: "diab", name: "Diabetologist", fee: "₹299", waitTime: "5 mins", icon: "Activity" },
  { id: "pedia", name: "Pediatrician (Child Specialist)", fee: "₹249", waitTime: "10 mins", icon: "Baby" },
  { id: "derma", name: "Dermatologist (Skin & Hair)", fee: "₹299", waitTime: "7 mins", icon: "Sparkles" }
];
