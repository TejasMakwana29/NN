# Push Your Code to GitHub – Simple Steps

**Your repo:** https://github.com/vaishnavisomani28/manish-scale-ecommerce

---

## What you need first

1. **Git installed**  
   - If you get "git is not recognized", install from: https://git-scm.com/download/win  
   - After installing, **close and reopen** your terminal/Cursor.

2. **Terminal open in this project folder**  
   - In Cursor: **Terminal → New Terminal** (it usually opens in your project folder).  
   - Or in PowerShell:  
     ```powershell
     cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"
     ```

---

## Commands to run (copy-paste one block at a time)

### Step 1: Turn this folder into a Git repo

```powershell
git init
```

You should see: `Initialized empty Git repository in ...`

---

### Step 2: Tell Git your name and email (only first time on this PC)

Replace with your real name and the email you use on GitHub:

```powershell
git config --global user.name "Vaishnavi Somani"
git config --global user.email "vaishnavisomani28@example.com"
```

Use your actual email (the one you use to log in to GitHub).

---

### Step 3: Add all your code

```powershell
git add .
```

This stages everything. The `.gitignore` file makes sure `node_modules` and `dist` are **not** added.

---

### Step 4: Save a snapshot (first commit)

```powershell
git commit -m "Add full project: React frontend + Express backend"
```

You should see something like: `X files changed, Y insertions(+)`.

---

### Step 5: Name your branch "main"

```powershell
git branch -M main
```

GitHub’s default branch is `main`, so we use the same name.

---

### Step 6: Connect to your GitHub repo

```powershell
git remote add origin https://github.com/vaishnavisomani28/manish-scale-ecommerce.git
```

If you see "remote origin already exists", run this first, then run the line above again:

```powershell
git remote remove origin
```

---

### Step 7: Push your code

Your GitHub repo already has one file (README). So we have two options.

**Option A – Keep GitHub’s README and add your code (recommended)**

```powershell
git pull origin main --allow-unrelated-histories --no-edit
git push -u origin main
```

If Git asks for a merge message, just save and close the file (in Vim: press `Esc`, type `:wq`, press Enter).

**Option B – Replace everything on GitHub with your project (ignore existing README)**

```powershell
git push -u origin main --force
```

⚠️ This overwrites whatever is on GitHub with your local project. Use only if you don’t care about the current README.

---

### Step 8: Log in when asked

- When you run `git push`, a browser or popup may open for **GitHub login**.  
- Or Git may ask for **username** and **password**.  
  - **Username:** your GitHub username (`vaishnavisomani28`).  
  - **Password:** do **not** use your normal GitHub password. Use a **Personal Access Token**:  
    1. GitHub → your profile (top right) → **Settings**.  
    2. Left sidebar → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.  
    3. **Generate new token (classic)**.  
    4. Give it a name, choose expiry, tick **repo**.  
    5. Generate and **copy the token**.  
    6. When Git asks for password, **paste this token**.

After a successful push, refresh:  
https://github.com/vaishnavisomani28/manish-scale-ecommerce  

You should see your `app`, `backend`, `.gitignore`, etc.

---

## Summary (quick copy-paste)

Run in order in your project folder:

```powershell
cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"
git init
git config --global user.name "Vaishnavi Somani"
git config --global user.email "your-email@example.com"
git add .
git commit -m "Add full project: React frontend + Express backend"
git branch -M main
git remote add origin https://github.com/vaishnavisomani28/manish-scale-ecommerce.git
git pull origin main --allow-unrelated-histories --no-edit
git push -u origin main
```

(Use your real email and, when asked, your GitHub username and a Personal Access Token as password.)

---

## Next time you make changes

After you change code and want to update GitHub:

```powershell
git add .
git commit -m "What you changed in one line"
git push
```

That’s it.
