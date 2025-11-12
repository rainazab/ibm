# BEACON Deployment Guide

## Deploy to Fly.io (Free & Easy)

### Step 1: Create Fly.io Account

Go to https://fly.io and sign up (free tier available)

### Step 2: Install Fly CLI (if not already installed)

```bash
brew install flyctl
```

Verify:
```bash
flyctl version
```

### Step 3: Login to Fly

```bash
flyctl auth login
```

This will open your browser to authenticate.

### Step 4: Deploy Backend

```bash
cd /Users/rainazabasajja/Desktop/IBM

# Create Fly app for backend
flyctl launch --name beacon-backend --image-label latest

# When prompted:
# - Region: sjc (San Jose) or nearest to you
# - Postgres database: No (not needed for demo)
# - Deploy now: Yes
```

After deployment, you'll get a live URL like:
```
https://beacon-backend.fly.dev
```

### Step 5: Deploy Frontend

```bash
# Switch to frontend
cd frontend

# Initialize Fly app
flyctl launch --name beacon-frontend

# When prompted:
# - Region: sjc (same as backend)
# - Postgres database: No
# - Deploy now: Yes
```

You'll get a URL like:
```
https://beacon-frontend.fly.dev
```

### Step 6: Update Frontend to Call Live Backend

Edit `frontend/pages/index.tsx` and change:

```typescript
// Line ~30: Change from localhost to live backend
const response = await fetch('https://beacon-backend.fly.dev/api/negotiate', {
```

Then redeploy:
```bash
flyctl deploy
```

### Step 7: View Live Apps

Backend:
```
https://beacon-backend.fly.dev
```

Frontend:
```
https://beacon-frontend.fly.dev
```

---

## Monitoring & Logs

### View Backend Logs

```bash
flyctl logs -a beacon-backend
```

### View Frontend Logs

```bash
flyctl logs -a beacon-frontend
```

### Restart Apps

```bash
# Backend
flyctl restart -a beacon-backend

# Frontend
flyctl restart -a beacon-frontend
```

---

## Environment Variables

If you add API keys later:

```bash
# Set backend env vars
flyctl secrets set -a beacon-backend \
  WATSONX_API_KEY=your_key \
  TWILIO_ACCOUNT_SID=your_sid

# View secrets
flyctl secrets list -a beacon-backend
```

---

## Custom Domain (Optional)

To use your own domain (e.g., beacon.com):

```bash
# Add custom domain
flyctl certs add -a beacon-frontend beacon.com

# Point DNS to Fly:
# Add CNAME record: beacon.com -> beacon-frontend.fly.dev
```

---

## Free Tier Limits

✅ What you get free:
- 3 shared-cpu-1x 256MB VMs
- 160GB outbound data transfer
- Perfect for demo & testing

⚠️ Limits:
- Scales down when not in use (cold starts)
- Restart after inactivity

---

## Quick Deployment Command

All in one:

```bash
# From IBM root directory
cd /Users/rainazabasajja/Desktop/IBM
flyctl deploy --name beacon-backend
cd frontend
flyctl deploy --name beacon-frontend
```

---

## Troubleshooting

### App won't start
```bash
flyctl logs -a beacon-backend
# Check for errors
```

### Can't connect to backend
```bash
# Verify backend is running
curl https://beacon-backend.fly.dev/health
```

### Port conflicts
Fly.io handles ports automatically. Don't worry!

---

## Next Steps

1. Deploy backend first
2. Update frontend code to use live URL
3. Deploy frontend
4. Test live URLs in browser
5. Share URLs for demo judges!

**Total time: ~10 minutes** ⏱️

