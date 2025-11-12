# Deploy BEACON to Live in 3 Minutes

## ⚡ Super Quick Version

### Step 1: Install Fly CLI
```bash
brew install flyctl
```

### Step 2: Login
```bash
flyctl auth login
```

### Step 3: Deploy Backend
```bash
cd /Users/rainazabasajja/Desktop/IBM
flyctl launch --name beacon-backend
# Choose region: sjc
# Postgres: No
# Deploy: Yes
```

**Wait for success**, then copy the URL (e.g., `https://beacon-backend.fly.dev`)

### Step 4: Deploy Frontend
```bash
cd frontend
flyctl launch --name beacon-frontend
# Same choices as above
```

### Step 5: Update Frontend Code
Edit `frontend/pages/index.tsx` line ~30:

Change:
```typescript
const response = await fetch('http://localhost:3001/api/negotiate', {
```

To:
```typescript
const response = await fetch('https://beacon-backend.fly.dev/api/negotiate', {
```

### Step 6: Redeploy Frontend
```bash
cd /Users/rainazabasajja/Desktop/IBM/frontend
flyctl deploy
```

---

## ✅ Done! You Now Have:

**Live Backend:**
```
https://beacon-backend.fly.dev
```

**Live Frontend:**
```
https://beacon-frontend.fly.dev
```

---

## 🎯 What to Do Now

1. Test frontend at: `https://beacon-frontend.fly.dev`
2. Fill form and click "Generate Strategy"
3. **Record demo at live domain** for better video quality
4. Share URLs with hackathon judges!

---

## 📊 Free Tier

✅ Included:
- 3 shared VMs
- 160GB transfer
- Perfect for demos

⚠️ May cold-start (5-10 sec)

---

## 🔧 If Something Goes Wrong

```bash
# View logs
flyctl logs -a beacon-backend
flyctl logs -a beacon-frontend

# Restart
flyctl restart -a beacon-backend
flyctl restart -a beacon-frontend
```

---

**That's it! Live in 3 minutes.** 🚀

