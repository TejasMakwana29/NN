// Product data for the weighing scale e-commerce website

export interface Product {
  id: string;
  name: string;
  capacity: string;
  price: number;
  precision: string;
  image: string;
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
    description: 'Perfect for retail shops and commercial use',
    image: '/images/counter-scale.jpg',
    products: [
      { id: 'cs-2kg', name: 'Counter Scale 2kg', capacity: '2kg', price: 2499, precision: '0.5g', image: '/images/counter-2kg.jpg' },
      { id: 'cs-5kg', name: 'Counter Scale 5kg', capacity: '5kg', price: 2999, precision: '1g', image: '/images/counter-5kg.jpg' },
      { id: 'cs-10kg', name: 'Counter Scale 10kg', capacity: '10kg', price: 3499, precision: '2g', image: '/images/counter-10kg.jpg' },
      { id: 'cs-15kg', name: 'Counter Scale 15kg', capacity: '15kg', price: 3999, precision: '2g', image: '/images/counter-15kg.jpg' },
      { id: 'cs-20kg', name: 'Counter Scale 20kg', capacity: '20kg', price: 4499, precision: '5g', image: '/images/counter-20kg.jpg' }
    ]
  },
  {
    id: 'beam-scales',
    name: 'Beam Scales',
    slug: 'beam',
    description: 'Traditional mechanical precision scales',
    image: '/images/beam-scale.jpg',
    subcategories: [
      {
        id: 'beam-class-b',
        name: 'Class B - Jewelry',
        slug: 'class-b',
        description: 'High precision for jewelry and precious metals',
        products: [
          { id: 'bb-jewelry', name: 'Jewelry Beam Scale', capacity: '100g - 500g', price: 5999, precision: '0.01g', image: '/images/beam-jewelry.jpg' }
        ]
      },
      {
        id: 'beam-class-c',
        name: 'Class C - General',
        slug: 'class-c',
        description: 'Versatile scales for various applications',
        sizes: [
          {
            name: 'Small',
            slug: 'small',
            products: [
              { id: 'bc-100g', name: 'Beam Scale 100g', capacity: '100g', price: 1999, precision: '0.1g', image: '/images/beam-100g.jpg' },
              { id: 'bc-200g', name: 'Beam Scale 200g', capacity: '200g', price: 2299, precision: '0.1g', image: '/images/beam-200g.jpg' },
              { id: 'bc-300g', name: 'Beam Scale 300g', capacity: '300g', price: 2499, precision: '0.1g', image: '/images/beam-300g.jpg' }
            ]
          },
          {
            name: 'Medium',
            slug: 'medium',
            products: [
              { id: 'bc-1kg', name: 'Beam Scale 1kg', capacity: '1kg', price: 2999, precision: '0.5g', image: '/images/beam-1kg.jpg' },
              { id: 'bc-2kg', name: 'Beam Scale 2kg', capacity: '2kg', price: 3499, precision: '1g', image: '/images/beam-2kg.jpg' },
              { id: 'bc-5kg', name: 'Beam Scale 5kg', capacity: '5kg', price: 4499, precision: '2g', image: '/images/beam-5kg.jpg' },
              { id: 'bc-10kg', name: 'Beam Scale 10kg', capacity: '10kg', price: 5499, precision: '5g', image: '/images/beam-10kg.jpg' },
              { id: 'bc-20kg', name: 'Beam Scale 20kg', capacity: '20kg', price: 6999, precision: '10g', image: '/images/beam-20kg.jpg' }
            ]
          },
          {
            name: 'Heavy',
            slug: 'heavy',
            products: [
              { id: 'bc-1ton', name: 'Heavy Duty Beam Scale', capacity: '1 Tonne', price: 24999, precision: '100g', image: '/images/beam-1ton.jpg' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'electronic-scales',
    name: 'Electronic Scales',
    slug: 'electronic',
    description: 'Modern digital scales with LCD displays',
    image: '/images/electronic-scale.jpg',
    types: [
      {
        id: 'es-micro',
        name: 'Micro',
        slug: 'micro',
        description: 'Laboratory-grade micro precision scales',
        products: [
          { id: 'em-001', name: 'Micro Scale MS-100', capacity: '100g', price: 15999, precision: '0.0001g', image: '/images/micro-scale.jpg' },
          { id: 'em-002', name: 'Micro Scale MS-200', capacity: '200g', price: 18999, precision: '0.0001g', image: '/images/micro-scale-2.jpg' }
        ]
      },
      {
        id: 'es-tabletop',
        name: 'Table Top',
        slug: 'tabletop',
        description: 'Versatile table top digital scales',
        products: [
          { id: 'ett-10', name: 'Table Top Scale 10kg', capacity: '10kg', price: 3999, precision: '1g', image: '/images/tabletop-10kg.jpg' },
          { id: 'ett-20', name: 'Table Top Scale 20kg', capacity: '20kg', price: 4999, precision: '2g', image: '/images/tabletop-20kg.jpg' },
          { id: 'ett-30', name: 'Table Top Scale 30kg', capacity: '30kg', price: 5999, precision: '5g', image: '/images/tabletop-30kg.jpg' }
        ]
      },
      {
        id: 'es-poultry',
        name: 'Chicken/Poultry',
        slug: 'poultry',
        description: 'Water-resistant scales for poultry and meat',
        products: [
          { id: 'ep-10', name: 'Poultry Scale 10kg', capacity: '10kg', price: 5499, precision: '5g', image: '/images/poultry-10kg.jpg' },
          { id: 'ep-20', name: 'Poultry Scale 20kg', capacity: '20kg', price: 6499, precision: '10g', image: '/images/poultry-20kg.jpg' },
          { id: 'ep-50', name: 'Poultry Scale 50kg', capacity: '50kg', price: 8999, precision: '20g', image: '/images/poultry-50kg.jpg' }
        ]
      },
      {
        id: 'es-platform',
        name: 'Platform',
        slug: 'platform',
        description: 'Heavy duty platform scales for industrial use',
        products: [
          { id: 'epl-100', name: 'Platform Scale 100kg', capacity: '100kg', price: 12999, precision: '50g', image: '/images/platform-100kg.jpg' },
          { id: 'epl-200', name: 'Platform Scale 200kg', capacity: '200kg', price: 18999, precision: '100g', image: '/images/platform-200kg.jpg' },
          { id: 'epl-500', name: 'Platform Scale 500kg', capacity: '500kg', price: 34999, precision: '200g', image: '/images/platform-500kg.jpg' }
        ]
      },
      {
        id: 'es-jewellery',
        name: 'Jewellery',
        slug: 'jewellery',
        description: 'High precision scales for jewelry and gems',
        products: [
          { id: 'ej-100', name: 'Jewelry Scale 100g', capacity: '100g', price: 7999, precision: '0.001g', image: '/images/jewelry-100g.jpg' },
          { id: 'ej-200', name: 'Jewelry Scale 200g', capacity: '200g', price: 9999, precision: '0.001g', image: '/images/jewelry-200g.jpg' },
          { id: 'ej-500', name: 'Jewelry Scale 500g', capacity: '500g', price: 12999, precision: '0.01g', image: '/images/jewelry-500g.jpg' }
        ]
      },
      {
        id: 'es-kitchen',
        name: 'Kitchen',
        slug: 'kitchen',
        description: 'Compact kitchen scales for home use',
        products: [
          { id: 'ek-3', name: 'Kitchen Scale 3kg', capacity: '3kg', price: 1499, precision: '1g', image: '/images/kitchen-3kg.jpg' },
          { id: 'ek-5', name: 'Kitchen Scale 5kg', capacity: '5kg', price: 1999, precision: '1g', image: '/images/kitchen-5kg.jpg' },
          { id: 'ek-10', name: 'Kitchen Scale 10kg', capacity: '10kg', price: 2499, precision: '2g', image: '/images/kitchen-10kg.jpg' }
        ]
      },
      {
        id: 'es-bathroom',
        name: 'Bathroom (Body)',
        slug: 'bathroom',
        description: 'Personal body weight scales',
        products: [
          { id: 'eb-150', name: 'Digital Body Scale', capacity: '150kg', price: 1999, precision: '100g', image: '/images/bathroom-150kg.jpg' },
          { id: 'eb-180', name: 'Digital Body Scale Pro', capacity: '180kg', price: 2999, precision: '100g', image: '/images/bathroom-180kg.jpg' }
        ]
      },
      {
        id: 'es-luggage',
        name: 'Luggage',
        slug: 'luggage',
        description: 'Portable scales for travel and baggage',
        products: [
          { id: 'el-50', name: 'Luggage Scale', capacity: '50kg', price: 1299, precision: '10g', image: '/images/luggage-scale.jpg' }
        ]
      }
    ]
  },
  {
    id: 'hanging-scales',
    name: 'Hanging Scales',
    slug: 'hanging',
    description: 'Spring balance scales for portable weighing',
    image: '/images/hanging-scale.jpg',
    types: [
      {
        id: 'hs-circular',
        name: 'Circular',
        slug: 'circular',
        description: 'Classic circular dial hanging scales',
        products: [
          { id: 'hc-25', name: 'Circular Hanging Scale 25kg', capacity: '25kg', price: 899, precision: '100g', image: '/images/hanging-circular-25kg.jpg' },
          { id: 'hc-100', name: 'Circular Hanging Scale 100kg', capacity: '100kg', price: 1499, precision: '500g', image: '/images/hanging-circular-100kg.jpg' },
          { id: 'hc-200', name: 'Circular Hanging Scale 200kg', capacity: '200kg', price: 2499, precision: '1kg', image: '/images/hanging-circular-200kg.jpg' }
        ]
      },
      {
        id: 'hs-pocket',
        name: 'Pocket',
        slug: 'pocket',
        description: 'Compact pocket-sized hanging scales',
        products: [
          { id: 'hp-100', name: 'Pocket Hanging Scale 100kg', capacity: '100kg', price: 699, precision: '500g', image: '/images/hanging-pocket-100kg.jpg' }
        ]
      },
      {
        id: 'hs-tubular',
        name: 'Tubular',
        slug: 'tubular',
        description: 'Heavy duty tubular hanging scales',
        products: [
          { id: 'ht-50', name: 'Tubular Hanging Scale 50kg', capacity: '50kg', price: 1199, precision: '250g', image: '/images/hanging-tubular-50kg.jpg' },
          { id: 'ht-100', name: 'Tubular Hanging Scale 100kg', capacity: '100kg', price: 1699, precision: '500g', image: '/images/hanging-tubular-100kg.jpg' }
        ]
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Weights, calibration tools and spare parts',
    image: '/images/accessories.jpg',
    products: [
      { id: 'acc-weights-1kg', name: 'Calibration Weight Set 1kg', capacity: '1kg', price: 999, precision: 'N/A', image: '/images/weights-1kg.jpg' },
      { id: 'acc-weights-5kg', name: 'Calibration Weight Set 5kg', capacity: '5kg', price: 2499, precision: 'N/A', image: '/images/weights-5kg.jpg' },
      { id: 'acc-weights-10kg', name: 'Calibration Weight Set 10kg', capacity: '10kg', price: 4499, precision: 'N/A', image: '/images/weights-10kg.jpg' },
      { id: 'acc-adapter', name: 'Power Adapter Universal', capacity: 'N/A', price: 499, precision: 'N/A', image: '/images/adapter.jpg' },
      { id: 'acc-battery', name: 'Rechargeable Battery Pack', capacity: 'N/A', price: 799, precision: 'N/A', image: '/images/battery.jpg' }
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
    product.capacity.toLowerCase().includes(searchTerm) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
}
