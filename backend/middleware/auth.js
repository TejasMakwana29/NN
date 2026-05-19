export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(503).json({
      error: 'Admin API is not configured. Set ADMIN_API_KEY in backend/.env',
    });
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
