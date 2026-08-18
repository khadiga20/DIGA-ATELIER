/* ==========================================
   DIGA — Shared Product Data Catalog
   ========================================== */

var DIGA_PRODUCTS = [
  {
    id: "ablaze-kinetic-silk-dress",
    aliasId: "ablaze-silk-dress",
    name: "Ablaze Kinetic Silk Dress",
    price: 620,
    moodSignature: "Restless Magenta",
    moodCategory: "magenta",
    accentColor: "#E0247D",
    image: "assets/images/gallery_ablaze.jpg",
    secondaryImage: "assets/images/collection_lifestyle_1.jpg",
    description: "Tailored for moments when quiet presence is impossible. Designed to ignite and billow with every stride.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabricDetails: {
      composition: "100% Organic Kinetic Silk",
      seams: "Bias Cut / Asymmetric Draping",
      origin: "Crafted in Milan Atelier",
      care: "Specialist Dry Clean Only"
    },
    pairingIds: ["voltaic-blazer", "restless-coat", "unbothered-trench"]
  },
  {
    id: "voltaic-blazer",
    aliasId: "voltaic-sculpted-blazer",
    name: "Voltaic Sculpted Blazer",
    price: 540,
    moodSignature: "Electric Violet",
    moodCategory: "violet",
    accentColor: "#536DFE",
    image: "assets/images/collection_lifestyle_2.jpg",
    secondaryImage: "assets/images/gallery_restless.jpg",
    description: "Architectural lines meeting high-voltage electric cyan rim light. Defined shoulders for commanding presence.",
    sizes: ["S", "M", "L", "XL"],
    fabricDetails: {
      composition: "Structured Italian Wool Blend",
      seams: "Sharp Sculpted Shoulders",
      origin: "Crafted in Milan Atelier",
      care: "Dry Clean Only"
    },
    pairingIds: ["ablaze-kinetic-silk-dress", "unbothered-trench", "asymmetric-gown"]
  },
  {
    id: "restless-coat",
    aliasId: "restless-cutout-overcoat",
    name: "Restless Cutout Overcoat",
    price: 690,
    moodSignature: "Fierce Magenta",
    moodCategory: "magenta",
    accentColor: "#C2185B",
    image: "assets/images/gallery_restless.jpg",
    secondaryImage: "assets/images/collection_lifestyle_2.jpg",
    description: "Avant-garde cutout tailoring in heavy wool. A stance of pure confidence and rebellious poise.",
    sizes: ["XS", "S", "M", "L"],
    fabricDetails: {
      composition: "Heavyweight Virgin Wool",
      seams: "Strategic Kinetic Cutouts",
      origin: "Crafted in Paris Atelier",
      care: "Specialist Dry Clean Only"
    },
    pairingIds: ["ablaze-kinetic-silk-dress", "voltaic-blazer", "solitude-wrap"]
  },
  {
    id: "unbothered-trench",
    aliasId: "unbothered-oversized-trench",
    name: "Unbothered Oversized Trench",
    price: 720,
    moodSignature: "Quiet Obsidian",
    moodCategory: "obsidian",
    accentColor: "#B4AAA0",
    image: "assets/images/gallery_unbothered.jpg",
    secondaryImage: "assets/images/hero_bg.jpg",
    description: "Subdued, structured coat in cream and off-white. Restrained precision for serene introspection.",
    sizes: ["S", "M", "L", "XL"],
    fabricDetails: {
      composition: "Double-Faced Cashmere & Cotton",
      seams: "Relaxed Drop Shoulders",
      origin: "Crafted in Florence Atelier",
      care: "Dry Clean Only"
    },
    pairingIds: ["asymmetric-gown", "solitude-wrap", "voltaic-blazer"]
  },
  {
    id: "asymmetric-gown",
    aliasId: "asymmetric-stage-gown",
    name: "Asymmetric Stage Gown",
    price: 480,
    moodSignature: "Fluid Violet",
    moodCategory: "violet",
    accentColor: "#7A22C4",
    image: "assets/images/collection_lifestyle_1.jpg",
    secondaryImage: "assets/images/gallery_ablaze.jpg",
    description: "Translucent sheer layers designed under deep purple stage lighting. Ethereal movement in every drapery.",
    sizes: ["XS", "S", "M", "L"],
    fabricDetails: {
      composition: "Sheer Chiffon & Silk Crepe",
      seams: "Fluid Cascading Drapes",
      origin: "Crafted in Rome Atelier",
      care: "Specialist Dry Clean Only"
    },
    pairingIds: ["ablaze-kinetic-silk-dress", "unbothered-trench", "restless-coat"]
  },
  {
    id: "solitude-wrap",
    aliasId: "solitude-cinemagraph-wrap",
    name: "Solitude Cinemagraph Wrap",
    price: 340,
    moodSignature: "Quiet Cream",
    moodCategory: "obsidian",
    accentColor: "#D4CEB8",
    image: "assets/images/hero_bg.jpg",
    secondaryImage: "assets/images/gallery_unbothered.jpg",
    description: "Cinemagraph-inspired sheer fabric wrap in muted black and cream tones. Soft, ambient, weightless.",
    sizes: ["ONE SIZE"],
    fabricDetails: {
      composition: "100% Sheer Silk Gauze",
      seams: "Raw Feathered Edges",
      origin: "Crafted in Milan Atelier",
      care: "Hand Wash Cold / Flat Dry"
    },
    pairingIds: ["unbothered-trench", "asymmetric-gown", "voltaic-blazer"]
  }
];

if (typeof window !== 'undefined') {
  window.DIGA_PRODUCTS = DIGA_PRODUCTS;
}
