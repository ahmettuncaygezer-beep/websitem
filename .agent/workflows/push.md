---
description: Push all changes to GitHub and auto-deploy to Vercel
---

# Push to GitHub & Deploy

This workflow commits all pending changes and pushes them to GitHub. Vercel will automatically pick up the changes and redeploy the site.

// turbo-all

1. Refresh the PATH so Git is available in this shell session:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

2. Stage all changed files:
```powershell
git add .
```
Run this in `c:\xampp\htdocs\2mobilya`.

3. Show a short summary of what will be committed:
```powershell
git status --short
```
Run this in `c:\xampp\htdocs\2mobilya`.

4. Commit with a descriptive message summarising the changes. Generate the message yourself based on the diff/status output. Use Turkish or English depending on the context:
```powershell
git commit -m "<generated commit message>"
```
Run this in `c:\xampp\htdocs\2mobilya`.

5. Push to GitHub (origin/master):
```powershell
git push
```
Run this in `c:\xampp\htdocs\2mobilya`.

6. After push succeeds, inform the user with:
   - ✅ Commit message
   - 🔗 GitHub link: https://github.com/ahmettuncaygezer-beep/2mobilya
   - 🌍 Live site: https://2mobilya.vercel.app (auto-deploys in ~60s)
