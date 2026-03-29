// Product data for the weighing scale e-commerce website

export interface ProductCapacity {
  weight: string;
  image?: string; // Optional specific image for this capacity
}

export interface Product {
  id: string;
  name: string;
  baseCapacity?: string; // Kept for backwards compatibility in lists
  capacities: ProductCapacity[]; // New array for selectable capacities
  precision: string;
  image: string; // Default image
  bodyMaterial?: string;
  displayType?: string;
  warranty?: string;
  battery?: string;
  panSize?: string;
  brand?: string;
  features?: string[];
  category?: string;
  categorySlug?: string;
  subcategory?: string;
  type?: string;
  typeSlug?: string;
  size?: string;
  sizeSlug?: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export interface ProductSize {
  name: string;
  slug: string;
  products: Product[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  products?: Product[];
  sizes?: ProductSize[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products?: Product[];
  subcategories?: Subcategory[];
  types?: ProductType[];
}

export const categories: Category[] = [
  {
    id: 'counter-scales',
    name: 'Counter Scales',
    slug: 'counter',
    description: 'Available in Emboss, Plain, and Super Body options.',
    image: '/images/counter-scale.jpg',
    types: [
      {
        id: 'cs-emboss',
        name: 'Emboss Body',
        slug: 'emboss',
        description: 'Medium weight steel body, oblong (bowl) & tray options.',
        products: [
          {
            id: 'cs-emb',
            name: 'Emboss Body Counter Scale',
            capacities: [
              { weight: '1 kg', image: '/images/counter-emboss-1.jpg' },
              { weight: '2 kg', image: '/images/counter-emboss-2.jpg' },
              { weight: '5 kg', image: '/images/counter-emboss-5.jpg' },
              { weight: '10 kg', image: '/images/counter-emboss-10.jpg' },
              { weight: '15 kg', image: '/images/counter-emboss-15.jpg' }
            ],
            baseCapacity: '1 kg - 15 kg',
            precision: '',
            image: '/images/counter-emboss-1.jpg',
            bodyMaterial: 'Steel (Medium weight body)',
            features: ['Available in different colors', 'Weighing option: Oblong (bowl) & Tray']
          }
        ]
      },
      {
        id: 'cs-plain',
        name: 'Plain Body',
        slug: 'plain',
        description: 'Heavy weight M.S. body, oblong (bowl) & tray options.',
        products: [
          {
            id: 'cs-pln',
            name: 'Plain Body Counter Scale',
            capacities: [
              { weight: '10 kg', image: '/images/counter-plain-10.jpg' },
              { weight: '15 kg', image: '/images/counter-plain-15.jpg' },
              { weight: '25 kg', image: '/images/counter-plain-25.jpg' }
            ],
            baseCapacity: '10 kg - 25 kg',
            precision: '',
            image: '/images/counter-plain-10.jpg',
            bodyMaterial: 'M.S. (Heavy weight body)',
            features: ['Available in different colors', 'Weighing option: Oblong (bowl) & Tray']
          }
        ]
      },
      {
        id: 'cs-super',
        name: 'Super Body',
        slug: 'super',
        description: 'Light weight stainless steel body.',
        products: [
          {
            id: 'cs-sup',
            name: 'Super Body Counter Scale',
            capacities: [
              { weight: '1 kg', image: '/images/counter-super-1.jpg' },
              { weight: '2 kg', image: '/images/counter-super-2.jpg' },
              { weight: '5 kg', image: '/images/counter-super-5.jpg' },
              { weight: '10 kg', image: '/images/counter-super-10.jpg' }
            ],
            baseCapacity: '1 kg - 10 kg',
            precision: '',
            image: '/images/counter-super-1.jpg',
            bodyMaterial: 'Stainless steel (Light weight body)',
            features: ['Available in different colors', 'Weighing option: Oblong (bowl) & Tray']
          }
        ]
      }
    ]
  },
  {
    id: 'electronic-scales',
    name: 'Electronic Scales',
    slug: 'electronic',
    description: 'Modern digital scales for various applications.',
    image: '/images/electronic-scale.jpg',
    types: [
      {
        id: 'es-micro',
        name: 'Micro',
        slug: 'micro',
        description: 'Compact micro precision scales',
        products: [
          {
            id: 'em-100',
            name: 'Micro Scale',
            capacities: [{ weight: '10 kg' }],
            baseCapacity: '10 kg',
            precision: '1 gm',
            image: '/images/micro-scale.jpg',
            bodyMaterial: 'Stainless Steel',
            panSize: 'Stainless Steel (6x7 inches)',
            battery: 'Rechargeable 4v battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '6 months (t&c apply)'
          }
        ]
      },
      {
        id: 'es-tabletop',
        name: 'Table Top',
        slug: 'tabletop',
        description: 'Table top digital scales',
        products: [
          {
            id: 'ett-30',
            name: 'Table Top Scale',
            capacities: [{ weight: '30 kg' }],
            baseCapacity: '30 kg',
            precision: '5 gm',
            image: '/images/tabletop-30kg.jpg',
            bodyMaterial: 'Steel',
            panSize: 'Stainless Steel (250x300 mm)',
            battery: 'Rechargeable 4v battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            features: ['Pole Display available']
          }
        ]
      },
      {
        id: 'es-poultry',
        name: 'Chicken (Poultry)',
        slug: 'poultry',
        description: 'Scales for poultry applications',
        products: [
          {
            id: 'ep-multi',
            name: 'Poultry Scale',
            capacities: [
              { weight: '50 kg' },
              { weight: '100 kg' },
              { weight: '150 kg' },
              { weight: '200 kg' }
            ],
            baseCapacity: '50kg - 200kg',
            precision: '10gm to 50gm',
            image: '/images/poultry-50kg.jpg',
            bodyMaterial: 'M.S.',
            panSize: '300x300 mm to 500x500 mm (depends on Capacity)',
            battery: 'Rechargeable 6v battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            features: ['Pan material: Chequered (MS) or Stainless Steel', 'Add ons: Grill for support']
          }
        ]
      },
      {
        id: 'es-platform',
        name: 'Platform',
        slug: 'platform',
        description: 'Heavy duty platform scales',
        products: [
          {
            id: 'epl-multi',
            name: 'Platform Scale',
            capacities: [
              { weight: '50 kg' },
              { weight: '100 kg' },
              { weight: '200 kg' },
              { weight: '300 kg' },
              { weight: '500 kg' },
              { weight: '1 Ton' },
              { weight: '2 Ton' }
            ],
            baseCapacity: '50kg - 2 Ton',
            precision: '10gm to 200gm',
            image: '/images/platform-100kg.jpg',
            bodyMaterial: 'M.S.',
            panSize: '400x400 mm to 900x900 mm (depends on Capacity)',
            battery: 'Rechargeable 6v battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            features: ['Pan material: Chequered (MS) or Stainless Steel', 'Add ons: Grill for support, extra extended display']
          }
        ]
      },
      {
        id: 'es-jewellery',
        name: 'Jewellery',
        slug: 'jewellery',
        description: 'High precision scales for jewelry',
        products: [
          {
            id: 'ej-510',
            name: 'Jewellery Scale',
            capacities: [{ weight: '510 gm' }],
            baseCapacity: '510 gm',
            precision: '10 mg (0.01gm)',
            image: '/images/jewelry-100g.jpg',
            panSize: 'Round Stainless Steel, 110 mm',
            displayType: 'LED dual display',
            warranty: '1 year (t&c apply)'
          }
        ]
      },
      {
        id: 'es-kitchen',
        name: 'Kitchen',
        slug: 'kitchen',
        description: 'Compact kitchen scales',
        products: [
          {
            id: 'ek-10',
            name: 'Kitchen Scale',
            capacities: [{ weight: '10 kg' }],
            baseCapacity: '10 kg',
            precision: '1 gm',
            image: '/images/kitchen-10kg.jpg',
            bodyMaterial: 'Plastic (ABS)',
            displayType: 'LCD display',
            battery: '2x AA battery',
            warranty: '6 months'
          }
        ]
      },
      {
        id: 'es-personal',
        name: 'Personal (Body)',
        slug: 'personal',
        description: 'Personal body weight scales',
        products: [
          {
            id: 'eb-180',
            name: 'Personal Body Scale',
            capacities: [{ weight: '180 kg' }],
            baseCapacity: '180 kg',
            precision: '50 gm',
            image: '/images/bathroom-180kg.jpg',
            bodyMaterial: 'Strong Reinforced glass body, Scratch resistance',
            displayType: 'LCD display',
            battery: '2x AAA battery',
            warranty: '3 years',
            features: ['Auto On/off (step on & step off)']
          }
        ]
      },
      {
        id: 'es-luggage',
        name: 'Luggage',
        slug: 'luggage',
        description: 'Portable scales for luggage',
        products: [
          {
            id: 'el-50',
            name: 'Luggage Scale',
            capacities: [{ weight: '50 kg' }],
            baseCapacity: '50 kg',
            precision: '10 gm',
            image: '/images/luggage-scale.jpg',
            bodyMaterial: 'ABS',
            displayType: 'LED display (green colour)',
            battery: '2x AA battery'
          }
        ]
      }
    ]
  },
  {
    id: 'hanging-scales',
    name: 'Hanging Scales',
    slug: 'hanging',
    description: 'Spring balance and digital hanging scales',
    image: '/images/hanging-scale.jpg',
    types: [
      {
        id: 'hs-circular',
        name: 'Circular',
        slug: 'circular',
        description: 'Classic circular dial hanging scales',
        products: [
          {
            id: 'hc-25',
            name: 'Circular Scale 25kg',
            capacities: [{ weight: '25 kg' }],
            baseCapacity: '25 kg',
            precision: '100 gm',
            image: '/images/hanging-circular-25kg.jpg',
            brand: 'Paras',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year',
            features: ['Adjustable: Yes (Zero adjust knob)', 'Hook: High strength hook at top & bottom', 'Attractive design & look', 'Registered trade mark']
          },
          {
            id: 'hc-100',
            name: 'Circular Scale 100kg',
            capacities: [{ weight: '100 kg' }],
            baseCapacity: '100 kg',
            precision: '500 gm',
            image: '/images/hanging-circular-100kg.jpg',
            brand: 'Paras, Shubhm, Ajanta',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year',
            features: ['Adjustable: Yes (Zero adjust knob)', 'Hook: High strength hook at top & bottom', 'Attractive design & look', 'Registered trade mark']
          },
          {
            id: 'hc-200',
            name: 'Circular Scale 200kg',
            capacities: [{ weight: '200 kg' }],
            baseCapacity: '200 kg',
            precision: '1 kg',
            image: '/images/hanging-circular-200kg.jpg',
            brand: 'Paras, Shubhm, Ajanta',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year (t&c apply)',
            features: ['Adjustable: Yes (Zero adjust knob)', 'Hook: High strength hook at top & bottom', 'Attractive design & look', 'Registered trade mark']
          }
        ]
      },
      {
        id: 'hs-pocket',
        name: 'Pocket',
        slug: 'pocket',
        description: 'Compact pocket-sized hanging scales',
        products: [
          {
            id: 'hp-100',
            name: 'Pocket Scale',
            capacities: [{ weight: '100 kg' }],
            baseCapacity: '100 kg',
            precision: '500 gm',
            image: '/images/hanging-pocket-100kg.jpg',
            brand: 'Paras, Fish',
            bodyMaterial: 'Steel',
            features: ['Adjustable: No', 'Hook: High strength hook at top & bottom']
          }
        ]
      },
      {
        id: 'hs-tubular',
        name: 'Tubular',
        slug: 'tubular',
        description: 'Tubular hanging scales',
        products: [
          {
            id: 'ht-multi',
            name: 'Tubular Scale',
            capacities: [{ weight: '50 kg' }, { weight: '100 kg' }],
            baseCapacity: '50kg & 100kg',
            precision: '50 gm',
            image: '/images/hanging-tubular-50kg.jpg',
            brand: 'Paras',
            bodyMaterial: 'Steel',
            features: ['Adjustable: yes (zero adjust knob)', 'Hook: High strength hook at top & bottom']
          }
        ]
      },
      {
        id: 'hs-crane',
        name: 'Crane',
        slug: 'crane',
        description: 'Heavy duty crane scales',
        products: [
          {
            id: 'hcr-multi',
            name: 'Crane Scale',
            capacities: [{ weight: '3 Ton' }, { weight: '5 Ton' }, { weight: '10 Ton' }],
            baseCapacity: '3 Ton - 10 Ton',
            precision: '1 kg',
            image: '/images/hanging-crane.jpg', // You may need to add this image
            brand: 'Paras',
            displayType: 'LED Bright & Big display',
            battery: '6v Rechargeable battery (up to 72 hrs backup)',
            warranty: '1 year (t&c apply)',
            features: ['Hook: High strength hook at top & bottom']
          }
        ]
      },
      {
        id: 'hs-digital',
        name: 'Digital',
        slug: 'digital',
        description: 'Digital hanging scales',
        products: [
          {
            id: 'hd-multi',
            name: 'Digital Hanging Scale',
            capacities: [{ weight: '100 kg' }, { weight: '200 kg' }],
            baseCapacity: '100kg & 200kg',
            precision: '500gm, 1kg',
            image: '/images/hanging-digital.jpg', // You may need to add this image
            brand: 'Paras, Shubhm',
            bodyMaterial: 'Aluminium',
            displayType: 'LED dual display',
            battery: 'Rechargeable 6v battery',
            warranty: '1 year (t&c apply)',
            features: ['Hook: High strength hook at top & bottom']
          }
        ]
      }
    ]
  },
  {
    id: 'beam-scales',
    name: 'Beam Scales',
    slug: 'beam',
    description: 'Traditional mechanical precision scales',
    image: '/images/beam-scale.jpg',
    types: [
      {
        id: 'beam-class-c',
        name: 'Class C',
        slug: 'class-c',
        description: 'Versatile scales for various applications',
        products: [
          {
            id: 'bc-multi',
            name: 'Class C Beam Scale',
            capacities: [
              { weight: '100 gm' }, { weight: '200 gm' }, { weight: '500 gm' },
              { weight: '1 kg' }, { weight: '2 kg' }, { weight: '5 kg' },
              { weight: '10 kg' }, { weight: '20 kg' }, { weight: '50 kg' },
              { weight: '100 kg' }, { weight: '200 kg' }, { weight: '300 kg' },
              { weight: '500 kg' }, { weight: '1 Ton' }
            ],
            baseCapacity: '100gm - 1 Ton',
            precision: '',
            image: '/images/beam-scale.jpg',
            bodyMaterial: 'M.S.',
            features: ['Type: Swan type, 3 Axle type']
          }
        ]
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Weights, hooks, and load cells',
    image: '/images/accessories.jpg',
    types: [
      {
        id: 'acc-cast-iron-knob',
        name: 'Cast iron weights (Knob type)',
        slug: 'knob-weights',
        description: 'Brass plated, Knob type',
        products: [
          {
            id: 'acc-cik',
            name: 'Knob Type Cast Iron Weights',
            capacities: [
              { weight: '5 gm' }, { weight: '10 gm' }, { weight: '20 gm' },
              { weight: '50 gm' }, { weight: '100 gm' }, { weight: '200 gm' },
              { weight: '500 gm' }, { weight: '1 kg' }, { weight: '2 kg' }
            ],
            baseCapacity: '5gm - 2kg',
            precision: 'N/A',
            image: '/images/weights-knob.jpg', // Need to add
            features: ['Type: Cylindrical shape (knob type)', 'Set: 9 pcs. In one set', 'More precise & Accurate']
          }
        ]
      },
      {
        id: 'acc-cast-iron-hex',
        name: 'Cast iron weights (Hexagonal)',
        slug: 'hex-weights',
        description: 'Hexagonal type',
        products: [
          {
            id: 'acc-cih',
            name: 'Hexagonal Cast Iron Weights',
            capacities: [
              { weight: '20 gm' }, { weight: '50 gm' }, { weight: '100 gm' },
              { weight: '200 gm' }, { weight: '500 gm' }, { weight: '1 kg' },
              { weight: '2 kg' }, { weight: '5 kg' }, { weight: '10 kg' },
              { weight: '20 kg' }, { weight: '50 kg' }, { weight: '100 kg' }
            ],
            baseCapacity: '20gm - 100kg',
            precision: 'N/A',
            image: '/images/weights-hex.jpg', // Need to add
            features: ['Type: Hexagonal shape']
          }
        ]
      },
      {
        id: 'acc-load-cells',
        name: 'Load Cells',
        slug: 'load-cells',
        description: 'Platform and Table top load cells',
        products: [
          {
            id: 'acc-lc-platform',
            name: 'Platform Load Cell',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/load-cell.jpg'
          },
          {
            id: 'acc-lc-tabletop',
            name: 'Table Top Load Cell',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/load-cell-tt.jpg'
          }
        ]
      },
      {
        id: 'acc-hooks',
        name: 'Hooks',
        slug: 'hooks',
        description: 'Hooks for various scales',
        products: [
          {
            id: 'acc-hook-mech',
            name: 'Mechanical Hanging Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-mech.jpg'
          },
          {
            id: 'acc-hook-digital',
            name: 'Digital Hanging Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-digital.jpg'
          },
          {
            id: 'acc-hook-crane',
            name: 'Crane Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-crane.jpg'
          }
        ]
      }
    ]
  }
];

// Helper function to get all products flattened
export function getAllProducts(): Product[] {
  const allProducts: Product[] = [];
  
  categories.forEach(category => {
    if (category.products) {
      category.products.forEach(product => {
        allProducts.push({ ...product, category: category.name, categorySlug: category.slug });
      });
    }
    
    if (category.subcategories) {
      category.subcategories.forEach(sub => {
        if (sub.products) {
          sub.products.forEach(product => {
            allProducts.push({ ...product, category: category.name, categorySlug: category.slug, subcategory: sub.name });
          });
        }
        if (sub.sizes) {
          sub.sizes.forEach(size => {
            size.products.forEach(product => {
              allProducts.push({ ...product, category: category.name, categorySlug: category.slug, subcategory: sub.name, size: size.name });
            });
          });
        }
      });
    }
    
    if (category.types) {
      category.types.forEach(type => {
        if (type.products) {
          type.products.forEach(product => {
            allProducts.push({ ...product, category: category.name, categorySlug: category.slug, type: type.name });
          });
        }
      });
    }
  });
  
  return allProducts;
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(slug: string): Product[] {
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return [];
  
  const products: Product[] = [];
  
  if (category.products) {
    products.push(...category.products.map(p => ({ ...p, category: category.name })));
  }
  
  if (category.subcategories) {
    category.subcategories.forEach(sub => {
      if (sub.products) {
        products.push(...sub.products.map(p => ({ ...p, category: category.name, subcategory: sub.name })));
      }
      if (sub.sizes) {
        sub.sizes.forEach(size => {
          products.push(...size.products.map(p => ({ ...p, category: category.name, subcategory: sub.name, size: size.name })));
        });
      }
    });
  }
  
  if (category.types) {
    category.types.forEach(type => {
      if (type.products) {
        products.push(...type.products.map(p => ({ ...p, category: category.name, type: type.name })));
      }
    });
  }
  
  return products;
}

// Helper function to get products by type
export function getProductsByType(categorySlug: string, typeSlug: string): Product[] {
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category || !category.types) return [];
  
  const type = category.types.find(t => t.slug === typeSlug);
  return type?.products?.map(p => ({ ...p, category: category.name, type: type.name })) || [];
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return getAllProducts().filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    (product.baseCapacity && product.baseCapacity.toLowerCase().includes(searchTerm)) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
}
