# Quote form — email & admin integration

When a visitor submits **Request a Quote**, the backend:

1. Saves the submission to `backend/data/quotes.json`
2. Emails **you** (admin) with full details
3. Sends a **confirmation email** to the visitor

## 1. Configure the backend

```bash
cd backend
cp .env.example .env
npm install
```

Edit `backend/.env`:

| Variable | Purpose |
|----------|---------|
| `ADMIN_EMAIL` | Your inbox — receives new quote alerts |
| `ADMIN_API_KEY` | Secret password for `/admin/quotes` dashboard |
| `SMTP_*` | Outgoing mail server (Gmail, Outlook, etc.) |
| `COMPANY_NAME` | Used in customer confirmation email |

### Gmail example (manishscaleindia@gmail.com)

**See full step-by-step guide:** [`GMAIL_APP_PASSWORD_SETUP.md`](./GMAIL_APP_PASSWORD_SETUP.md)

1. Turn on **2-Step Verification** (required)
2. Create an **App Password** at https://myaccount.google.com/apppasswords — **not** your normal Gmail password
3. Set in `backend/.env`:

```env
ADMIN_EMAIL=manishscaleindia@gmail.com
SMTP_USER=manishscaleindia@gmail.com
SMTP_PASS=your16charapppasswordnospaces
MAIL_FROM="Manish Scale <manishscaleindia@gmail.com>"
ADMIN_API_KEY=pick-a-long-random-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

## 2. Run locally

**Terminal 1 — API**

```bash
cd backend
npm run dev
```

**Terminal 2 — website**

```bash
cd app
npm run dev
```

- Quote form: http://localhost:5173/quote  
- Admin dashboard: http://localhost:5173/admin/quotes (sign in with `ADMIN_API_KEY`)

Vite proxies `/api` to `http://localhost:3000` in development.

## 3. Production (e.g. Vercel + Railway/Render)

1. Deploy the **backend** (Node) on Railway, Render, Fly.io, etc.
2. Set the same env vars on the host
3. In the frontend host, set:

```env
VITE_API_URL=https://your-api.example.com
```

4. Add your live site URL to backend `CORS_ORIGINS`

## API reference

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/quotes` | — | Submit quote (public) |
| GET | `/api/quotes` | Bearer `ADMIN_API_KEY` | List all quotes |
| PATCH | `/api/quotes/:id` | Bearer | Update status (`new`, `read`, `contacted`, `closed`) |
| POST | `/api/admin/verify` | — | Check admin key |

## Notes

- Quotes are stored in a JSON file on the server. For high volume, migrate to a database later.
- If SMTP is not configured, submissions are still saved; emails are skipped (check server logs).
- Keep `ADMIN_API_KEY` private — only share with staff who need the dashboard.
