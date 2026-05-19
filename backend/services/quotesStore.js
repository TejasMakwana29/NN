import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(QUOTES_FILE);
  } catch {
    await fs.writeFile(QUOTES_FILE, '[]', 'utf-8');
  }
}

async function readQuotes() {
  await ensureDataFile();
  const raw = await fs.readFile(QUOTES_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeQuotes(quotes) {
  await ensureDataFile();
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf-8');
}

export function generateQuoteId() {
  return `QUOTE-${Date.now().toString(36).toUpperCase()}`;
}

export async function addQuote(quote) {
  const quotes = await readQuotes();
  quotes.unshift(quote);
  await writeQuotes(quotes);
  return quote;
}

export async function getAllQuotes() {
  const quotes = await readQuotes();
  return quotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function updateQuoteStatus(id, status) {
  const quotes = await readQuotes();
  const index = quotes.findIndex((q) => q.id === id);
  if (index === -1) return null;
  quotes[index] = { ...quotes[index], status, updatedAt: new Date().toISOString() };
  await writeQuotes(quotes);
  return quotes[index];
}
