const API_BASE = import.meta.env.VITE_API_URL ?? '';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  products: string;
  message: string;
}

export interface QuoteSubmissionResult {
  success: boolean;
  quoteId: string;
  emailSent?: boolean;
  adminNotified?: boolean;
}

export interface QuoteRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  products: string;
  message: string;
  status: 'new' | 'read' | 'contacted' | 'closed';
  createdAt: string;
  updatedAt?: string;
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data === 'object' && data !== null && 'error' in data
        ? String((data as { error: string }).error)
        : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

export async function submitQuoteRequest(
  form: QuoteFormData
): Promise<QuoteSubmissionResult> {
  const res = await fetch(`${API_BASE}/api/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return parseJson<QuoteSubmissionResult>(res);
}

export async function verifyAdminKey(apiKey: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/admin/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  return Boolean(data.valid);
}

export async function fetchQuoteRequests(
  apiKey: string
): Promise<QuoteRecord[]> {
  const res = await fetch(`${API_BASE}/api/quotes`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const data = await parseJson<{ quotes: QuoteRecord[] }>(res);
  return data.quotes;
}

export async function updateQuoteStatus(
  apiKey: string,
  id: string,
  status: QuoteRecord['status']
): Promise<QuoteRecord> {
  const res = await fetch(`${API_BASE}/api/quotes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await parseJson<{ quote: QuoteRecord }>(res);
  return data.quote;
}
