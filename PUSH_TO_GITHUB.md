## Push this project to GitHub (HTTPS only, clean steps)

**Goal:** From this folder on your PC to your repo on GitHub using **HTTPS only**, no SSH changes.

- **Local folder:** `d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project`  
- **GitHub repo (open in browser):** `https://github.com/vaishnavisomani28/manish-scale-ecommerce`  
- **Remote URL (HTTPS):** `https://github.com/vaishnavisomani28/manish-scale-ecommerce.git`

---

### 1. Open terminal in this folder

In Cursor or PowerShell:

```powershell
cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"
```

Make sure `git` works:

```powershell
git --version
```

If it says “git is not recognized”, install Git from `https://git-scm.com/download/win`, then reopen the terminal.

---

### 2. (First time on this PC) Set your Git identity

Do this once per computer (skip if already set earlier):

```powershell
git config --global user.name "Vaishnavi Somani"
git config --global user.email "YOUR_GITHUB_EMAIL@example.com"
```

Use the same email you use on GitHub.

---

### 3. Initialize Git repo (only once for this project)

If this project is **not** already a Git repo:

```powershell
git init
```

If it is already a repo, Git will say something like “Reinitialized existing Git repository” – that’s fine.

---

### 4. Stage all files and commit

```powershell
git add .
git commit -m "Initial commit: full project"
```

If Git says “nothing to commit”, it means you already committed once; that’s fine, continue.

---

### 5. Ensure branch name is `main`

```powershell
git branch -M main
```

---

### 6. Point this repo to your GitHub remote (HTTPS only)

Remove any old/incorrect remote (safe to run even if it doesn’t exist):

```powershell
git remote remove origin 2>$null
```

Now add the **correct HTTPS remote**:

```powershell
git remote add origin https://github.com/vaishnavisomani28/manish-scale-ecommerce.git
```

This uses **only HTTPS**. Your **SSH configuration is untouched**.

---

### 7. Push your code to GitHub

```powershell
git push -u origin main
```

Git will ask you to log in:

- **If a browser window opens:** log in to GitHub and approve; Git will finish the push.  
- **If terminal asks for username/password:**
  - **Username:** `vaishnavisomani28`
  - **Password:** a **Personal Access Token** (PAT), *not* your GitHub password.

To create a PAT:

1. Go to GitHub in browser → your profile → **Settings**.  
2. Left side: **Developer settings** → **Personal access tokens** → **Tokens (classic)**.  
3. Click **Generate new token (classic)**.  
4. Give it a name, choose expiry, tick **repo**.  
5. Generate and **copy** the token.  
6. When Git asks for password in the terminal, **paste this token**.

After this first time, future `git push` will normally not ask again for credentials (Git will remember).

---

### 8. Confirm on GitHub

Open:

```text
https://github.com/vaishnavisomani28/manish-scale-ecommerce
```

You should now see your project files (frontend, backend, etc.).

---

### 9. Next time you change code

From the same folder:

```powershell
cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"
git add .
git commit -m "Describe what you changed"
git push
```

No SSH keys involved, HTTPS only.
