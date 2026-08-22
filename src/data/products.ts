import type { Product } from "../types/productType";

export const products: Product[] = [
  // =====================================================
  // CLOTHING — 5 PRODUCTS
  // =====================================================

  {
    id: 1,
    name: "Classic Oversized T-Shirt",
    slug: "classic-oversized-t-shirt",
    price: 29.99,
    description:
      "A relaxed oversized t-shirt made from soft premium cotton for everyday comfort and effortless style.",
    category: "clothing",
    images: [
      "/images/products/oversized-tshirt-1.jpg",
      "/images/products/oversized-tshirt-2.jpg",
      "/images/products/oversized-tshirt-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 128,
    colors: ["Black", "White", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    brand: "NOVA",
    tags: ["bestseller", "new"],
  },

  {
    id: 2,
    name: "Essential Pullover Hoodie",
    slug: "essential-pullover-hoodie",
    price: 59.99,
    description:
      "A warm everyday hoodie featuring a clean design, soft fabric, and a comfortable brushed interior.",
    category: "clothing",
    images: [
      "/images/products/pullover-hoodie-1.jpg",
      "/images/products/pullover-hoodie-2.jpg",
      "/images/products/pullover-hoodie-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 94,
    colors: ["Black", "Cream", "Olive", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "NOVA",
    tags: ["bestseller"],
  },

  {
    id: 3,
    name: "Relaxed Fit Denim Jeans",
    slug: "relaxed-fit-denim-jeans",
    price: 74.99,
    description:
      "Classic relaxed-fit jeans crafted from durable denim with a comfortable everyday silhouette.",
    category: "clothing",
    images: [
      "/images/products/denim-jeans-1.jpg",
      "/images/products/denim-jeans-2.jpg",
      "/images/products/denim-jeans-3.jpg",
    ],
    rating: 4.5,
    reviewCount: 76,
    colors: ["Blue", "Black", "Light Blue"],
    sizes: ["28", "30", "32", "34", "36"],
    brand: "UrbanThread",
    tags: ["popular"],
  },

  {
    id: 4,
    name: "Linen Casual Shirt",
    slug: "linen-casual-shirt",
    price: 54.99,
    description:
      "A lightweight linen shirt designed for warm days with a relaxed fit and breathable construction.",
    category: "clothing",
    images: [
      "/images/products/linen-shirt-1.jpg",
      "/images/products/linen-shirt-2.jpg",
      "/images/products/linen-shirt-3.jpg",
    ],
    rating: 4.4,
    reviewCount: 51,
    colors: ["White", "Beige", "Sky Blue", "Green"],
    sizes: ["S", "M", "L", "XL"],
    brand: "UrbanThread",
    tags: ["new"],
  },

  {
    id: 5,
    name: "Everyday Cargo Pants",
    slug: "everyday-cargo-pants",
    price: 64.99,
    description:
      "Versatile cargo pants with multiple utility pockets and a comfortable modern fit.",
    category: "clothing",
    images: [
      "/images/products/cargo-pants-1.jpg",
      "/images/products/cargo-pants-2.jpg",
      "/images/products/cargo-pants-3.jpg",
    ],
    rating: 4.7,
    reviewCount: 83,
    colors: ["Black", "Olive", "Khaki"],
    sizes: ["S", "M", "L", "XL"],
    brand: "NOVA",
    tags: ["popular"],
  },

  // =====================================================
  // SHOES — 5 PRODUCTS
  // =====================================================

  {
    id: 6,
    name: "Urban Runner Sneakers",
    slug: "urban-runner-sneakers",
    price: 89.99,
    description:
      "Lightweight everyday sneakers with cushioned soles and a breathable upper designed for all-day comfort.",
    category: "shoes",
    images: [
      "/images/products/urban-runner-1.jpg",
      "/images/products/urban-runner-2.jpg",
      "/images/products/urban-runner-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 214,
    colors: ["White", "Black", "Gray"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "NOVA",
    tags: ["bestseller"],
  },

  {
    id: 7,
    name: "Classic White Sneakers",
    slug: "classic-white-sneakers",
    price: 79.99,
    description:
      "Minimal white sneakers featuring a timeless silhouette that works with casual and smart outfits.",
    category: "shoes",
    images: [
      "/images/products/classic-white-sneakers-1.jpg",
      "/images/products/classic-white-sneakers-2.jpg",
      "/images/products/classic-white-sneakers-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 167,
    colors: ["White", "Off White"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "StreetForm",
    tags: ["popular"],
  },

  {
    id: 8,
    name: "Trail Walking Shoes",
    slug: "trail-walking-shoes",
    price: 99.99,
    description:
      "Durable walking shoes with supportive cushioning and enhanced grip for outdoor adventures.",
    category: "shoes",
    images: [
      "/images/products/trail-shoes-1.jpg",
      "/images/products/trail-shoes-2.jpg",
      "/images/products/trail-shoes-3.jpg",
    ],
    rating: 4.7,
    reviewCount: 112,
    colors: ["Black", "Green", "Gray"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "TrailPeak",
    tags: ["outdoor"],
  },

  {
    id: 9,
    name: "Minimal Leather Shoes",
    slug: "minimal-leather-shoes",
    price: 119.99,
    description:
      "Premium leather shoes with a refined minimal design suitable for work, events, and everyday wear.",
    category: "shoes",
    images: [
      "/images/products/leather-shoes-1.jpg",
      "/images/products/leather-shoes-2.jpg",
      "/images/products/leather-shoes-3.jpg",
    ],
    rating: 4.5,
    reviewCount: 68,
    colors: ["Black", "Brown"],
    sizes: ["7", "8", "9", "10", "11"],
    brand: "Forme",
    tags: ["premium"],
  },

  {
    id: 10,
    name: "Everyday Canvas Shoes",
    slug: "everyday-canvas-shoes",
    price: 49.99,
    description:
      "Comfortable canvas shoes with a lightweight construction and classic low-profile design.",
    category: "shoes",
    images: [
      "/images/products/canvas-shoes-1.jpg",
      "/images/products/canvas-shoes-2.jpg",
      "/images/products/canvas-shoes-3.jpg",
    ],
    rating: 4.3,
    reviewCount: 91,
    colors: ["Black", "White", "Navy", "Red"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "StreetForm",
    tags: ["value"],
  },

  // =====================================================
  // BAGS — 5 PRODUCTS
  // =====================================================

  {
    id: 11,
    name: "Everyday Backpack",
    slug: "everyday-backpack",
    price: 69.99,
    description:
      "A versatile everyday backpack with a spacious main compartment and dedicated laptop sleeve.",
    category: "bags",
    images: [
      "/images/products/everyday-backpack-1.jpg",
      "/images/products/everyday-backpack-2.jpg",
      "/images/products/everyday-backpack-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 156,
    colors: ["Black", "Gray", "Navy"],
    sizes: ["One Size"],
    brand: "NOVA",
    tags: ["bestseller"],
  },

  {
    id: 12,
    name: "Minimal Laptop Bag",
    slug: "minimal-laptop-bag",
    price: 79.99,
    description:
      "A slim laptop bag with padded protection and organized storage for work essentials.",
    category: "bags",
    images: [
      "/images/products/laptop-bag-1.jpg",
      "/images/products/laptop-bag-2.jpg",
      "/images/products/laptop-bag-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 87,
    colors: ["Black", "Brown", "Gray"],
    sizes: ["13 inch", "15 inch", "16 inch"],
    brand: "WorkForm",
    tags: ["work"],
  },

  {
    id: 13,
    name: "Travel Duffel Bag",
    slug: "travel-duffel-bag",
    price: 84.99,
    description:
      "A spacious travel duffel with durable handles and multiple compartments for organized packing.",
    category: "bags",
    images: [
      "/images/products/travel-duffel-1.jpg",
      "/images/products/travel-duffel-2.jpg",
      "/images/products/travel-duffel-3.jpg",
    ],
    rating: 4.7,
    reviewCount: 73,
    colors: ["Black", "Olive", "Navy"],
    sizes: ["Small", "Medium", "Large"],
    brand: "TrailPeak",
    tags: ["travel"],
  },

  {
    id: 14,
    name: "Classic Crossbody Bag",
    slug: "classic-crossbody-bag",
    price: 44.99,
    description:
      "A compact crossbody bag designed to carry your daily essentials while keeping your hands free.",
    category: "bags",
    images: [
      "/images/products/crossbody-bag-1.jpg",
      "/images/products/crossbody-bag-2.jpg",
      "/images/products/crossbody-bag-3.jpg",
    ],
    rating: 4.4,
    reviewCount: 62,
    colors: ["Black", "Brown", "Cream"],
    sizes: ["One Size"],
    brand: "Forme",
    tags: ["popular"],
  },

  {
    id: 15,
    name: "Organic Canvas Tote",
    slug: "organic-canvas-tote",
    price: 29.99,
    description:
      "A reusable canvas tote made for everyday shopping, commuting, and casual outings.",
    category: "bags",
    images: [
      "/images/products/canvas-tote-1.jpg",
      "/images/products/canvas-tote-2.jpg",
      "/images/products/canvas-tote-3.jpg",
    ],
    rating: 4.5,
    reviewCount: 48,
    colors: ["Natural", "Black", "Green"],
    sizes: ["One Size"],
    brand: "NOVA",
    tags: ["eco"],
  },

  // =====================================================
  // ACCESSORIES — 5 PRODUCTS
  // =====================================================

  {
    id: 16,
    name: "Minimal Everyday Watch",
    slug: "minimal-everyday-watch",
    price: 129.99,
    description:
      "A clean minimalist watch featuring a simple dial and comfortable adjustable strap.",
    category: "accessories",
    images: [
      "/images/products/minimal-watch-1.jpg",
      "/images/products/minimal-watch-2.jpg",
      "/images/products/minimal-watch-3.jpg",
    ],
    rating: 4.7,
    reviewCount: 102,
    colors: ["Black", "Silver", "Brown"],
    sizes: ["One Size"],
    brand: "Forme",
    tags: ["premium"],
  },

  {
    id: 17,
    name: "Classic Polarized Sunglasses",
    slug: "classic-polarized-sunglasses",
    price: 39.99,
    description:
      "Classic polarized sunglasses with UV protection and a lightweight frame for everyday use.",
    category: "accessories",
    images: [
      "/images/products/sunglasses-1.jpg",
      "/images/products/sunglasses-2.jpg",
      "/images/products/sunglasses-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 134,
    colors: ["Black", "Tortoise", "Brown"],
    sizes: ["One Size"],
    brand: "NOVA",
    tags: ["bestseller"],
  },

  {
    id: 18,
    name: "Leather Card Wallet",
    slug: "leather-card-wallet",
    price: 34.99,
    description:
      "A compact genuine leather card wallet designed for minimal everyday carry.",
    category: "accessories",
    images: [
      "/images/products/leather-wallet-1.jpg",
      "/images/products/leather-wallet-2.jpg",
      "/images/products/leather-wallet-3.jpg",
    ],
    rating: 4.5,
    reviewCount: 57,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    brand: "Forme",
    tags: ["minimal"],
  },

  {
    id: 19,
    name: "Everyday Cotton Cap",
    slug: "everyday-cotton-cap",
    price: 24.99,
    description:
      "A comfortable cotton baseball cap with an adjustable back strap and clean embroidered logo.",
    category: "accessories",
    images: [
      "/images/products/cotton-cap-1.jpg",
      "/images/products/cotton-cap-2.jpg",
      "/images/products/cotton-cap-3.jpg",
    ],
    rating: 4.3,
    reviewCount: 42,
    colors: ["Black", "White", "Navy", "Green"],
    sizes: ["Adjustable"],
    brand: "NOVA",
    tags: ["new"],
  },

  {
    id: 20,
    name: "Classic Leather Belt",
    slug: "classic-leather-belt",
    price: 39.99,
    description:
      "A versatile leather belt featuring a durable metal buckle and timeless design.",
    category: "accessories",
    images: [
      "/images/products/leather-belt-1.jpg",
      "/images/products/leather-belt-2.jpg",
      "/images/products/leather-belt-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 61,
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L", "XL"],
    brand: "Forme",
    tags: ["classic"],
  },

  // =====================================================
  // ELECTRONICS — 5 PRODUCTS
  // =====================================================

  {
    id: 21,
    name: "Wireless Noise Cancelling Headphones",
    slug: "wireless-noise-cancelling-headphones",
    price: 149.99,
    description:
      "Premium wireless headphones with active noise cancellation, rich audio, and long battery life.",
    category: "electronics",
    images: [
      "/images/products/noise-cancelling-headphones-1.jpg",
      "/images/products/noise-cancelling-headphones-2.jpg",
      "/images/products/noise-cancelling-headphones-3.jpg",
    ],
    rating: 4.9,
    reviewCount: 342,
    colors: ["Black", "White", "Silver"],
    sizes: ["One Size"],
    brand: "SoundCore",
    tags: ["bestseller", "premium"],
  },

  {
    id: 22,
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    price: 69.99,
    description:
      "A compact wireless speaker delivering clear sound with a durable water-resistant design.",
    category: "electronics",
    images: [
      "/images/products/bluetooth-speaker-1.jpg",
      "/images/products/bluetooth-speaker-2.jpg",
      "/images/products/bluetooth-speaker-3.jpg",
    ],
    rating: 4.7,
    reviewCount: 189,
    colors: ["Black", "Blue", "Red"],
    sizes: ["One Size"],
    brand: "SoundCore",
    tags: ["popular"],
  },

  {
    id: 23,
    name: "Ergonomic Wireless Mouse",
    slug: "ergonomic-wireless-mouse",
    price: 39.99,
    description:
      "An ergonomic wireless mouse designed for comfortable long-term productivity and precise control.",
    category: "electronics",
    images: [
      "/images/products/wireless-mouse-1.jpg",
      "/images/products/wireless-mouse-2.jpg",
      "/images/products/wireless-mouse-3.jpg",
    ],
    rating: 4.5,
    reviewCount: 118,
    colors: ["Black", "White", "Gray"],
    sizes: ["One Size"],
    brand: "WorkForm",
    tags: ["work"],
  },

  {
    id: 24,
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    price: 109.99,
    description:
      "A compact mechanical keyboard with tactile switches, customizable lighting, and a durable frame.",
    category: "electronics",
    images: [
      "/images/products/mechanical-keyboard-1.jpg",
      "/images/products/mechanical-keyboard-2.jpg",
      "/images/products/mechanical-keyboard-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 227,
    colors: ["Black", "White"],
    sizes: ["75%", "TKL"],
    brand: "KeyLab",
    tags: ["bestseller"],
  },

  {
    id: 25,
    name: "Universal USB-C Hub",
    slug: "universal-usb-c-hub",
    price: 49.99,
    description:
      "A compact USB-C hub with multiple ports for connecting displays, storage, and accessories.",
    category: "electronics",
    images: [
      "/images/products/usb-c-hub-1.jpg",
      "/images/products/usb-c-hub-2.jpg",
      "/images/products/usb-c-hub-3.jpg",
    ],
    rating: 4.4,
    reviewCount: 96,
    colors: ["Gray", "Silver"],
    sizes: ["One Size"],
    brand: "WorkForm",
    tags: ["work"],
  },

  // =====================================================
  // HOME & LIFESTYLE — 5 PRODUCTS
  // =====================================================

  {
    id: 26,
    name: "Ceramic Coffee Mug",
    slug: "ceramic-coffee-mug",
    price: 19.99,
    description:
      "A simple ceramic coffee mug with a comfortable handle and minimalist design for everyday use.",
    category: "home-lifestyle",
    images: [
      "/images/products/ceramic-mug-1.jpg",
      "/images/products/ceramic-mug-2.jpg",
      "/images/products/ceramic-mug-3.jpg",
    ],
    rating: 4.6,
    reviewCount: 73,
    colors: ["White", "Black", "Cream", "Green"],
    sizes: ["300ml", "450ml"],
    brand: "NOVA Home",
    tags: ["popular"],
  },

  {
    id: 27,
    name: "Minimal Desk Lamp",
    slug: "minimal-desk-lamp",
    price: 54.99,
    description:
      "A modern adjustable desk lamp designed to provide comfortable lighting for work and study.",
    category: "home-lifestyle",
    images: [
      "/images/products/desk-lamp-1.jpg",
      "/images/products/desk-lamp-2.jpg",
      "/images/products/desk-lamp-3.jpg",
    ],
    rating: 1.7,
    reviewCount: 88,
    colors: ["Black", "White", "Silver"],
    sizes: ["One Size"],
    brand: "NOVA Home",
    tags: ["work"],
  },

  {
    id: 28,
    name: "Natural Scented Candle",
    slug: "natural-scented-candle",
    price: 24.99,
    description:
      "A hand-poured scented candle made with natural wax and a relaxing botanical fragrance.",
    category: "home-lifestyle",
    images: [
      "/images/products/scented-candle-1.jpg",
      "/images/products/scented-candle-2.jpg",
      "/images/products/scented-candle-3.jpg",
    ],
    rating: 2.5,
    reviewCount: 64,
    colors: ["Cream", "Amber", "Green"],
    sizes: ["Small", "Medium", "Large"],
    brand: "NOVA Home",
    tags: ["relaxation"],
  },

  {
    id: 29,
    name: "Bamboo Desk Organizer",
    slug: "bamboo-desk-organizer",
    price: 34.99,
    description:
      "A practical bamboo organizer designed to keep pens, notebooks, and everyday desk accessories tidy.",
    category: "home-lifestyle",
    images: [
      "/images/products/bamboo-organizer-1.jpg",
      "/images/products/bamboo-organizer-2.jpg",
      "/images/products/bamboo-organizer-3.jpg",
    ],
    rating: 3.6,
    reviewCount: 52,
    colors: ["Natural", "Dark Brown"],
    sizes: ["One Size"],
    brand: "NOVA Home",
    tags: ["eco", "work"],
  },

  {
    id: 30,
    name: "Insulated Water Bottle",
    slug: "insulated-water-bottle",
    price: 32.99,
    description:
      "A double-wall insulated water bottle designed to keep drinks cold or hot throughout the day.",
    category: "home-lifestyle",
    images: [
      "/images/products/water-bottle-1.jpg",
      "/images/products/water-bottle-2.jpg",
      "/images/products/water-bottle-3.jpg",
    ],
    rating: 1.8,
    reviewCount: 143,
    colors: ["Black", "White", "Blue", "Green"],
    sizes: ["500ml", "750ml", "1L"],
    brand: "NOVA",
    tags: ["bestseller", "eco"],
  },
];
