# Next Steps — Task 10: Deploy to GitHub & Vercel

## Step 1 — Create GitHub repository

Go to https://github.com/new
- Name: `nathan-portfolio`
- Visibility: Public
- Do NOT initialize with README
- Click Create

## Step 2 — Push code to GitHub

Run these commands in PowerShell:

```powershell
cd "C:\Users\natha\Projects\nathan-portfolio"
git remote add origin https://github.com/NathanWang01/nathan-portfolio.git
git branch -M main
git push -u origin main
```

## Step 3 — Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Select `nathan-portfolio` from your repos
5. Leave all settings as default (Vercel auto-detects Next.js)
6. Click Deploy

## Step 4 — Set up Formspree (so the contact form works)

1. Go to https://formspree.io and sign up
2. Create a new form called "Portfolio Contact"
3. Copy your form ID (looks like `xpzgabcd`)
4. Open `components/Contact.tsx` and replace `YOUR_FORM_ID` with your actual ID

## Done!

Once deployed, your site will be live at a URL like:
`https://nathan-portfolio-xyz.vercel.app`
