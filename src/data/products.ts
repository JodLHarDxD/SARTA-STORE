export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  tag?: string;
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
  image: string;
  hoverImage?: string;
  gallery: string[];
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = [
  { id: "all", label: "All" },
  { id: "new", label: "New In" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "outerwear", label: "Outerwear" },
  { id: "essentials", label: "Essentials" },
  { id: "accessories", label: "Accessories" },
] as const;

export const products: Product[] = [
  {
    id: "1",
    slug: "wool-cocoon-coat",
    name: "Wool Cocoon Coat",
    price: 289,
    category: "outerwear",
    tag: "New",
    colors: ["Charcoal", "Sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A sculptural outer layer with dropped shoulders and a clean hidden placket. Built for city winters without the bulk.",
    details: [
      "Italian brushed wool blend",
      "Fully lined interior",
      "Side seam pockets",
      "Dry clean only",
    ],
    image: img("photo-1539533018447-63fcce4278e4"),
    hoverImage: img("photo-1496747611176-843222e1e57c"),
    gallery: [
      img("photo-1539533018447-63fcce4278e4"),
      img("photo-1496747611176-843222e1e57c"),
      img("photo-1515886657613-9f3515b0c78f"),
    ],
  },
  {
    id: "2",
    slug: "structured-blazer",
    name: "Structured Blazer",
    price: 198,
    category: "women",
    tag: "Bestseller",
    colors: ["Black", "Olive"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Sharp tailoring with softened edges. Wear open over denim or buttoned for evening.",
    details: [
      "Recycled viscose suiting",
      "Single-breasted closure",
      "Functional cuff buttons",
    ],
    image: img("photo-1594633312681-425c7b97ccd1"),
    hoverImage: img("photo-1483985988355-763728e3685b"),
    gallery: [
      img("photo-1594633312681-425c7b97ccd1"),
      img("photo-1483985988355-763728e3685b"),
    ],
  },
  {
    id: "3",
    slug: "relaxed-merino-knit",
    name: "Relaxed Merino Knit",
    price: 124,
    category: "essentials",
    colors: ["Ecru", "Navy", "Rust"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Fine-gauge merino with a relaxed fit and ribbed cuffs. Your layer-one uniform.",
    details: ["100% merino wool", "Ribbed hem and cuffs", "Hand wash cold"],
    image: img("photo-1434389677669-e08b4cac3105"),
    hoverImage: img("photo-1509631179647-0177331693ae"),
    gallery: [img("photo-1434389677669-e08b4cac3105"), img("photo-1509631179647-0177331693ae")],
  },
  {
    id: "4",
    slug: "wide-leg-trouser",
    name: "Wide Leg Trouser",
    price: 148,
    category: "men",
    colors: ["Black", "Stone"],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "High-rise wide leg with pressed crease. Tailored drape inspired by editorial street style.",
    details: ["Cotton twill blend", "Zip fly", "Side pockets"],
    image: img("photo-1503342217505-9e6cf27fe70f"),
    hoverImage: img("photo-1617137968427-85924c800a22"),
    gallery: [img("photo-1503342217505-9e6cf27fe70f"), img("photo-1617137968427-85924c800a22")],
  },
  {
    id: "5",
    slug: "canvas-field-jacket",
    name: "Canvas Field Jacket",
    price: 215,
    category: "outerwear",
    colors: ["Khaki", "Midnight"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Utility pockets, storm flap, and a broken-in hand feel from day one.",
    details: ["Organic cotton canvas", "Brass hardware", "Adjustable cuffs"],
    image: img("photo-1551028719-00167b16eac5"),
    hoverImage: img("photo-1544022613-e87ca75a784f"),
    gallery: [img("photo-1551028719-00167b16eac5"), img("photo-1544022613-e87ca75a784f")],
  },
  {
    id: "6",
    slug: "ribbed-tank-dress",
    name: "Ribbed Tank Dress",
    price: 98,
    category: "new",
    tag: "New",
    colors: ["Black", "Cream"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Midi length rib knit that moves from studio to dinner. Minimal hardware, maximum ease.",
    details: ["Cotton modal blend", "Midi length", "Machine wash cold"],
    image: img("photo-1515886657613-9f3515b0c78f"),
    hoverImage: img("photo-1469334031218-e382a71b716b"),
    gallery: [img("photo-1515886657613-9f3515b0c78f"), img("photo-1469334031218-e382a71b716b")],
  },
  {
    id: "7",
    slug: "leather-crossbody",
    name: "Leather Crossbody",
    price: 165,
    category: "accessories",
    colors: ["Tan", "Black"],
    sizes: ["One Size"],
    description:
      "Compact crossbody with adjustable strap and suede-lined interior.",
    details: ["Vegetable-tanned leather", "Magnetic closure", "Interior card slot"],
    image: img("photo-1548036328-c9fa89d128fa"),
    hoverImage: img("photo-1590874103328-d259a74309f9"),
    gallery: [img("photo-1548036328-c9fa89d128fa")],
  },
  {
    id: "8",
    slug: "oversized-oxford",
    name: "Oversized Oxford",
    price: 112,
    category: "men",
    colors: ["White", "Sky"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Crisp cotton oxford with an exaggerated collar and longer back hem.",
    details: ["100% cotton", "Mother-of-pearl buttons", "Machine wash warm"],
    image: img("photo-1596755094514-f87e34085b2c"),
    hoverImage: img("photo-1620799140400-9a070a49614e"),
    gallery: [img("photo-1596755094514-f87e34085b2c"), img("photo-1620799140400-9a070a49614e")],
  },
  {
    id: "9",
    slug: "cashmere-scarf",
    name: "Cashmere Scarf",
    price: 89,
    category: "accessories",
    colors: ["Camel", "Grey", "Forest"],
    sizes: ["One Size"],
    description: "Lightweight cashmere with raw fringe edges.",
    details: ["Grade-A cashmere", "70 × 200 cm", "Dry clean recommended"],
    image: img("photo-1520903923153-0296aecb7b4d"),
    gallery: [img("photo-1520903923153-0296aecb7b4d")],
  },
  {
    id: "10",
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    price: 132,
    category: "women",
    colors: ["Ink", "Burgundy"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Sunray pleats with a satin waistband. Pairs with knits or crisp shirting.",
    details: ["Poly satin blend", "Elasticated waist", "Midi length"],
    image: img("photo-1583496667400-7e1b9a4ef8a2"),
    hoverImage: img("photo-1495385790547-4077814c0c10"),
    gallery: [img("photo-1583496667400-7e1b9a4ef8a2"), img("photo-1495385790547-4077814c0c10")],
  },
  {
    id: "11",
    slug: "technical-shell",
    name: "Technical Shell",
    price: 245,
    category: "new",
    tag: "New",
    colors: ["Slate", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Water-resistant shell with taped seams and packable hood.",
    details: ["Recycled nylon", "DWR finish", "Packable hood"],
    image: img("photo-1544022613-e87ca75a784f"),
    hoverImage: img("photo-1551028719-00167b16eac5"),
    gallery: [img("photo-1544022613-e87ca75a784f")],
  },
  {
    id: "12",
    slug: "studio-legging",
    name: "Studio Legging",
    price: 78,
    category: "essentials",
    colors: ["Black", "Moss"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Second-skin legging with brushed interior and no side seams.",
    details: ["Recycled poly blend", "High waist", "Squat-proof"],
    image: img("photo-1506629082955-511b1f4c1bbb"),
    gallery: [img("photo-1506629082955-511b1f4c1bbb")],
  },
];

export const heroSlides = [
  {
    src: "https://outfit.hellohello.is/preloader/image-01.jpg",
    label: "Editorial",
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80",
    label: "Outerwear",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e3685b?auto=format&fit=crop&w=1600&q=80",
    label: "Women",
  },
  {
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80",
    label: "Men",
  },
];

export const dragGalleryItems = [
  {
    src: "https://outfit.hellohello.is/preloader/image-02.jpg",
    title: "Layered wool",
    subtitle: "Outerwear",
  },
  {
    src: "https://outfit.hellohello.is/preloader/image-03.jpg",
    title: "Soft tailoring",
    subtitle: "Women",
  },
  {
    src: "https://outfit.hellohello.is/preloader/image-04.jpg",
    title: "Street editorial",
    subtitle: "Campaign",
  },
  {
    src: "https://outfit.hellohello.is/preloader/image-05.jpg",
    title: "Essential knits",
    subtitle: "Core",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    title: "Evening ease",
    subtitle: "Dresses",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-9e6cf27fe70f?auto=format&fit=crop&w=900&q=80",
    title: "Wide silhouettes",
    subtitle: "Men",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
