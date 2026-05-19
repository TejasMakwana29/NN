# Gmail setup for quote emails — Manish Scale

Use account: **manishscaleindia@gmail.com**

**Do not use your normal Gmail password (`MS@circular` or any login password) in the website backend.**  
Google blocks that for security. You must use an **App Password** (16 characters, no spaces).

---

## Step 0 — Change your Gmail password (if you shared it)

If your login password was shared anywhere (chat, screenshot, etc.):

1. Open https://myaccount.google.com/security  
2. Click **Password** → change to a new strong password  
3. Only you should know this new password — it is **only for signing into Gmail in the browser**

---

## Step 1 — Turn on 2-Step Verification (required)

App Passwords only work when 2-Step Verification is ON.

1. Go to https://myaccount.google.com/security  
2. Under **How you sign in to Google**, click **2-Step Verification**  
3. Click **Get started** and follow the prompts (phone number + SMS or Google prompt on phone)  
4. Finish until it shows **2-Step Verification is ON**

---

## Step 2 — Create an App Password

1. Open: https://myaccount.google.com/apppasswords  
   - If the link does not work, go to **Security** → **2-Step Verification** → scroll down → **App passwords**  
2. You may need to sign in again  
3. Under **Select app**, choose **Mail** (or **Other** and type `Manish Scale Website`)  
4. Under **Select device**, choose **Windows Computer** (or Other)  
5. Click **Generate**  
6. Google shows a **16-character password** like: `abcd efgh ijkl mnop`  
7. **Copy it** — you will not see it again  
8. For `.env`, use it **without spaces**: `abcdefghijklmnop`

---

## Step 3 — Create `backend/.env` on your PC

In folder `d:\MN\MN\backend`:

1. Copy the example file:
   ```powershell
   cd d:\MN\MN\backend
   copy .env.example .env
   ```
2. Open `.env` in Notepad or Cursor and paste this (replace only the App Password line):

```env
PORT=3000

ADMIN_EMAIL=manishscaleindia@gmail.com
ADMIN_API_KEY=ManishScale-Admin-2026-ChangeMe

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=manishscaleindia@gmail.com
SMTP_PASS=paste-your-16-char-app-password-here-no-spaces
MAIL_FROM="Manish Scale <manishscaleindia@gmail.com>"
COMPANY_NAME=Manish Scale

CORS_ORIGINS=http://localhost:5173
```

| Line | What to put |
|------|-------------|
| `ADMIN_EMAIL` | Where **you** receive new quote alerts → `manishscaleindia@gmail.com` |
| `SMTP_USER` | Same Gmail that **sends** mail → `manishscaleindia@gmail.com` |
| `SMTP_PASS` | **App Password only** (16 chars, no spaces) — NOT `MS@circular` |
| `ADMIN_API_KEY` | Any long secret you choose — used to log in at `/admin/quotes` |

**Never commit `.env` to GitHub** — it is already in `.gitignore`.

---

## Step 4 — Install and start the backend

```powershell
cd d:\MN\MN\backend
npm install
npm run dev
```

You should see: `Backend server is running on http://localhost:3000`

---

## Step 5 — Start the website and test

```powershell
cd d:\MN\MN\app
npm run dev
```

1. Open http://localhost:5173/quote  
2. Fill the form with a **test email you can check** (can be the same Gmail or another address)  
3. Click **Submit Quote Request**

**Check:**

| What | Where |
|------|--------|
| Admin notification | Inbox of `manishscaleindia@gmail.com` — subject like "New quote request — QUOTE-..." |
| Visitor confirmation | Inbox of the email you typed in the form |
| Saved on server | http://localhost:5173/admin/quotes — sign in with your `ADMIN_API_KEY` |

If mail does not arrive, check **Spam** and the backend terminal for `[mail]` errors.

---

## Step 6 — Admin dashboard login

1. Open http://localhost:5173/admin/quotes  
2. Enter the value you set for `ADMIN_API_KEY` in `.env` (e.g. `ManishScale-Admin-2026-ChangeMe`)  
3. You will see all quote submissions in a table

---

## Troubleshooting

### "App passwords" option missing

- 2-Step Verification is not enabled → complete Step 1  
- Work/school Google account may block App Passwords — use a personal `@gmail.com` account  
- Advanced Protection Program accounts cannot use App Passwords

### Error: Invalid login / Username and Password not accepted

- You used the **normal Gmail password** instead of the **App Password** → create App Password again (Step 2)  
- Spaces in `SMTP_PASS` → remove all spaces  
- Wrong `SMTP_USER` → must be full email `manishscaleindia@gmail.com`

### Emails go to Spam

- Normal for new senders; mark as **Not spam**  
- Later you can use a custom domain email for better deliverability

### Quotes save but no email

- Backend log: `[mail] SMTP not configured` → `.env` missing or wrong folder  
- Restart backend after editing `.env`

---

## Quick reference — what each email does

```
Visitor submits form
        │
        ├─► Email TO manishscaleindia@gmail.com  (you: full quote details)
        │
        └─► Email TO visitor's email           (them: "We received your request...")
```

---

## Security checklist

- [ ] Changed Gmail password if it was shared  
- [ ] Using **App Password** in `SMTP_PASS`, not login password  
- [ ] `.env` file is only on your computer, not uploaded to GitHub  
- [ ] `ADMIN_API_KEY` is a strong secret only your team knows
