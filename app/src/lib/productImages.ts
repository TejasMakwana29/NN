/**
 * Relevant, high-quality images for weighing scales e-commerce.
 * Uses Unsplash (scale, retail, kitchen, industrial, jewelry) and local /images/ where available.
 */

const U = (id: string, w = 800, q = 85) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

// Curated Unsplash photo IDs for scale-related imagery
export const IMAGES = {
  // Digital / tabletop scale (hero, counter, electronic)
  hero: U('1565193566173-7a0ee3dbe261', 720),
  counter: U('1581093458791-9f3c3900df4b', 600),
  electronic: U('1586864387967-d02ef85d93e8', 600),
  // Kitchen / small scale
  kitchen: U('1556909114-f6e7ad7d3136', 600),
  // Industrial / platform
  industrial: U('1581093458791-9f3c3900df4b', 600),
  // Jewelry / precision (balance)
  jewelry: U('1565193566173-7a0ee3dbe261', 600),
  // Hanging / portable
  hanging: U('1607703703674-df96af81dffa', 600),
  // Weights / accessories
  accessories: U('1602143407151-7111542de6e8', 600),
  // Poultry / food
  poultry: U('1581093458791-9f3c3900df4b', 600),
  // Beam / mechanical
  beam: U('1581093458791-9f3c3900df4b', 600),
} as const;

/** Fallback image when product image path is /images/... (local file not loaded) */
export function getProductImageUrl(product: { image: string; categorySlug?: string; type?: string; name: string }, size: 'thumb' | 'medium' | 'large' = 'medium'): string {
  const w = size === 'thumb' ? 200 : size === 'medium' ? 500 : 800;
  if (!product.image.startsWith('/images/')) return product.image;
  const slug = (product.categorySlug || '').toLowerCase();
  const type = (product.type || '').toLowerCase();
  if (slug.includes('counter')) return U('1581093458791-9f3c3900df4b', w);
  if (slug.includes('beam')) return U('1581093458791-9f3c3900df4b', w);
  if (slug.includes('electronic') || slug.includes('digital')) {
    if (type.includes('kitchen')) return U('1556909114-f6e7ad7d3136', w);
    if (type.includes('jewel')) return U('1565193566173-7a0ee3dbe261', w);
    return U('1586864387967-d02ef85d93e8', w);
  }
  if (slug.includes('hanging')) return U('1607703703674-df96af81dffa', w);
  if (slug.includes('accessories')) return U('1602143407151-7111542de6e8', w);
  return U('1565193566173-7a0ee3dbe261', w);
}

/** Placeholder for product name when image fails to load */
export function getPlaceholderImageUrl(name: string, w = 400): string {
  return `https://placehold.co/${w}x${w}/1e293b/f8fafc?text=${encodeURIComponent(name.slice(0, 20))}`;
}
