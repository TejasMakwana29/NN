# Push This Project to GitHub – Step by Step

Follow these steps in order.

---

## Step 1: Install Git (if needed)

If you get **"git is not recognized"** in the terminal:

1. Download Git for Windows: https://git-scm.com/download/win  
2. Run the installer (default options are fine).  
3. **Close and reopen** your terminal (or Cursor) so `git` is in your PATH.

Check that it works:

```powershell
git --version
```

You should see something like `git version 2.x.x`.

---

## Step 2: Create a New Repository on GitHub

1. Go to **https://github.com** and sign in.  
2. Click the **"+"** (top right) → **"New repository"**.  
3. Fill in:
   - **Repository name:** e.g. `manish-scale-ecommerce` (or any name you like).  
   - **Description:** optional, e.g. "Industrial scale e-commerce – React + Express".  
   - **Public** or **Private** – your choice.  
4. **Do not** check "Add a README" or "Add .gitignore" (you already have a project).  
5. Click **"Create repository"**.  
6. Copy the repository URL GitHub shows, e.g.:
   - **HTTPS:** `https://github.com/YOUR_USERNAME/manish-scale-ecommerce.git`  
   - **SSH:** `git@github.com:YOUR_USERNAME/manish-scale-ecommerce.git`  

You’ll use this URL in Step 6.

---

## Step 3: Open Terminal in Your Project Folder

In Cursor (or PowerShell / Command Prompt):

```powershell
cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"
```

(Or open the integrated terminal when your project folder is already open in Cursor.)

---

## Step 4: Initialize Git and Make the First Commit

Run these commands **one by one**:

```powershell
# Initialize a new Git repo in this folder
git init

# Add all files (node_modules and dist are ignored by .gitignore)
git add .

# Create the first commit
git commit -m "Initial commit: Manish Scale e-commerce (React + Express)"
```

If Git asks you to set your name and email (first time only):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Then run `git add .` and `git commit ...` again if needed.

---

## Step 5: Rename Branch to main (Optional but Recommended)

GitHub’s default branch is `main`. Make sure you’re on it:

```powershell
git branch -M main
```

---

## Step 6: Connect to GitHub and Push

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repo name.

**If you use HTTPS:**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**If you use SSH:**

```powershell
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

- GitHub may ask you to **log in** (HTTPS) or use a **passphrase** (SSH).  
- After a successful push, refresh your repo on GitHub – you should see all your code.

---

## Step 7: Later – Making More Changes and Pushing Again

Whenever you change code and want to update GitHub:

```powershell
cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"

git add .
git commit -m "Short description of what you changed"
git push
```

---

## Quick Reference

| Step | Command / Action |
|------|-------------------|
| 1 | Install Git, restart terminal, `git --version` |
| 2 | Create new repo on GitHub (no README/.gitignore), copy repo URL |
| 3 | `cd "d:\Projects\Kimi_Agent_Industrial Scale E-Commerce Project"` |
| 4 | `git init` → `git add .` → `git commit -m "Initial commit: ..."` |
| 5 | `git branch -M main` |
| 6 | `git remote add origin <YOUR_REPO_URL>` → `git push -u origin main` |

---

## Troubleshooting

- **"git is not recognized"**  
  Install Git (Step 1) and restart the terminal.

- **"Permission denied" or "Authentication failed"**  
  - HTTPS: use a **Personal Access Token** instead of password: GitHub → Settings → Developer settings → Personal access tokens.  
  - SSH: set up an SSH key and add it to GitHub (GitHub → Settings → SSH and GPG keys).

- **"node_modules" or "dist" showing in git**  
  The project root now has a `.gitignore` that excludes them. If you already ran `git add .` before adding `.gitignore`, run:
  ```powershell
  git rm -r --cached app/node_modules backend/node_modules app/dist 2>$null; git add . ; git commit -m "Apply .gitignore"
  ```
  then `git push`.

- **Large files / push rejected**  
  Make sure `node_modules` and `app/dist` are in `.gitignore` and not tracked. The `.gitignore` in this project already includes them.
