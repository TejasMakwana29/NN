# Deploy to Vercel

Your frontend (Vite + React) is ready to deploy on Vercel. Follow these steps.

## 1. Push the latest code (including `app/vercel.json`)

```bash
git add app/vercel.json DEPLOY_VERCEL.md
git commit -m "Add Vercel config and deploy guide"
git push origin main
```

## 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (use **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. **Import** your repo: `TejasMakwana29/NN` (or your fork).
4. **Root Directory** — choose **one** option:
   - **Option A (recommended):** Leave root empty. The repo’s root `vercel.json` builds `app/` automatically.
   - **Option B:** Set Root Directory to `app`, then Build = `npm run build`, Output = `dist`.
5. Click **Deploy**.

### If you see `404: NOT_FOUND`

1. **Settings → General → Root Directory**  
   - Either leave blank (uses root `vercel.json`), **or** set to `app` (not both misconfigured).
2. **Settings → General → Build & Development**  
   - Output Directory must be `dist` (if root is `app`) or `app/dist` (if root is repo root with root `vercel.json`).
3. **Deployments** → open latest → check **Build Logs** for errors.
4. **Redeploy** after pushing the latest code from `main`.

After the build finishes, you’ll get a URL like `https://your-project.vercel.app`.

## 3. Optional: custom domain

In the Vercel project → **Settings** → **Domains**, add your own domain and follow the DNS instructions.

---

**Note:** Only the **frontend** (in `app/`) is deployed. The small Express backend in `backend/` is not used by the app right now. If you add API calls later, you can either host the backend elsewhere (e.g. Railway, Render) or move that logic into Vercel Serverless Functions.
