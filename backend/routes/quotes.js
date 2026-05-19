import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import {
  addQuote,
  generateQuoteId,
  getAllQuotes,
  updateQuoteStatus,
} from '../services/quotesStore.js';
import { sendQuoteEmails } from '../services/mail.js';

const router = Router();

function validateQuoteBody(body) {
  const errors = [];
  if (!body.name?.trim()) errors.push('Full name is required');
  if (!body.email?.trim()) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push('Invalid email address');
  }
  if (!body.products?.trim()) errors.push('Products interested in is required');
  return errors;
}

router.post('/admin/verify', (req, res) => {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(503).json({ valid: false, error: 'Admin not configured' });
  }
  const { apiKey } = req.body || {};
  if (apiKey === expected) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false, error: 'Invalid admin key' });
});

router.post('/quotes', async (req, res) => {
  try {
    const errors = validateQuoteBody(req.body || {});
    if (errors.length) {
      return res.status(400).json({ error: errors.join('. ') });
    }

    const quote = {
      id: generateQuoteId(),
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: (req.body.phone || '').trim(),
      company: (req.body.company || '').trim(),
      products: req.body.products.trim(),
      message: (req.body.message || '').trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await addQuote(quote);
    const mailResult = await sendQuoteEmails(quote);

    res.status(201).json({
      success: true,
      quoteId: quote.id,
      emailSent: mailResult.customerSent,
      adminNotified: mailResult.adminSent,
    });
  } catch (err) {
    console.error('[quotes] Submit failed:', err);
    res.status(500).json({ error: 'Failed to submit quote request. Please try again.' });
  }
});

router.get('/quotes', requireAdmin, async (_req, res) => {
  try {
    const quotes = await getAllQuotes();
    res.json({ quotes });
  } catch (err) {
    console.error('[quotes] List failed:', err);
    res.status(500).json({ error: 'Failed to load quotes' });
  }
});

router.patch('/quotes/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!['new', 'read', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await updateQuoteStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json({ quote: updated });
  } catch (err) {
    console.error('[quotes] Update failed:', err);
    res.status(500).json({ error: 'Failed to update quote' });
  }
});

export default router;
