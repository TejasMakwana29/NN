/**
 * Resolve paths to files in /public (e.g. /images/...).
 * Always returns a root-absolute URL so images work on nested routes
 * (/products/electronic/...) on Vercel and local dev.
 */
export function publicAsset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const clean = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env.BASE_URL ?? '/';

  // Subpath deploy: respect Vite base (e.g. /my-app/)
  if (base !== '/' && base !== './') {
    const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${prefix}${clean}`.replace(/\/+/g, '/');
  }

  return clean;
}
