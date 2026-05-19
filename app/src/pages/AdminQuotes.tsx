import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchQuoteRequests,
  updateQuoteStatus,
  verifyAdminKey,
  type QuoteRecord,
} from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lock, RefreshCw, LogOut } from 'lucide-react';

const STORAGE_KEY = 'mn_admin_api_key';

const STATUS_LABELS: Record<QuoteRecord['status'], string> = {
  new: 'New',
  read: 'Read',
  contacted: 'Contacted',
  closed: 'Closed',
};

function LoginCard({
  loginKey,
  setLoginKey,
  loginError,
  onSubmit,
}: {
  loginKey: string;
  setLoginKey: (v: string) => void;
  loginError: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Admin — Quote requests</h1>
          <p className="text-sm text-gray-500">Enter your admin API key</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-key">Admin API key</Label>
          <Input
            id="admin-key"
            type="password"
            value={loginKey}
            onChange={(e) => setLoginKey(e.target.value)}
            placeholder="From backend .env ADMIN_API_KEY"
            required
          />
        </div>
        {loginError && <p className="text-sm text-red-600">{loginError}</p>}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign in
        </Button>
      </form>

      <Link to="/" className="block text-center text-sm text-gray-500 mt-6 hover:text-blue-600">
        ← Back to website
      </Link>
    </div>
  );
}

export function AdminQuotes() {
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [loginKey, setLoginKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const loadQuotes = useCallback(async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchQuoteRequests(key);
      setQuotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!apiKey) return;
    verifyAdminKey(apiKey).then((valid) => {
      if (valid) {
        setIsAuthenticated(true);
        loadQuotes(apiKey);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
        setApiKey('');
      }
    });
  }, [apiKey, loadQuotes]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const valid = await verifyAdminKey(loginKey);
    if (!valid) {
      setLoginError('Invalid admin key');
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, loginKey);
    setApiKey(loginKey);
    setIsAuthenticated(true);
    await loadQuotes(loginKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setApiKey('');
    setLoginKey('');
    setIsAuthenticated(false);
    setQuotes([]);
  };

  const handleStatusChange = async (id: string, status: QuoteRecord['status']) => {
    try {
      const updated = await updateQuoteStatus(apiKey, id, status);
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <LoginCard
          loginKey={loginKey}
          setLoginKey={setLoginKey}
          loginError={loginError}
          onSubmit={handleLogin}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Quote requests</h1>
            <p className="text-slate-300 text-sm">Submissions from the Request a Quote form</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => loadQuotes(apiKey)} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-white border-white/30 hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          {quotes.length === 0 && !loading ? (
            <p className="p-8 text-center text-gray-500">No quote requests yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono text-xs">{quote.id}</TableCell>
                    <TableCell className="whitespace-nowrap text-xs">
                      {new Date(quote.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{quote.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                        {quote.email}
                      </a>
                    </TableCell>
                    <TableCell>{quote.phone || '—'}</TableCell>
                    <TableCell>{quote.company || '—'}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={quote.products}>
                      {quote.products}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={quote.status}
                        onValueChange={(v) =>
                          handleStatusChange(quote.id, v as QuoteRecord['status'])
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {quotes.some((q) => q.message) && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold">Additional requirements</h2>
            {quotes
              .filter((q) => q.message)
              .map((q) => (
                <details key={q.id} className="bg-white rounded-lg border p-4">
                  <summary className="cursor-pointer font-medium">
                    {q.id} — {q.name}
                  </summary>
                  <p className="mt-2 text-gray-600 whitespace-pre-wrap">{q.message}</p>
                </details>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
