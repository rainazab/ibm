# Squarespace DNS Configuration for delven.app

## 📝 Add These Records to Squarespace

**Go to:** Settings → Domains → delven.app → DNS

### Step 1: Add A Records

| Type | Host | Value |
|------|------|-------|
| A | @ | 66.241.124.74 |

### Step 2: Add AAAA Records

| Type | Host | Value |
|------|------|-------|
| AAAA | @ | 2a09:8280:1::ae:f5f3:0 |
| AAAA | www | 2a09:8280:1::ae:f5f3:0 |

---

## 🎯 What This Does

- `@` (root domain) → Points delven.app to Fly.io frontend
- `www` → Points www.delven.app to Fly.io frontend
- Both point to your live BEACON app

---

## ✅ After Adding Records

Wait **5-15 minutes** for DNS to propagate, then verify:

```bash
# Check delven.app
flyctl certs check delven.app

# Check www.delven.app
flyctl certs check www.delven.app

# Should show: ✓ Certificate provisioned
```

---

## 🌐 Your New URLs

Once DNS propagates:
- **Frontend:** https://delven.app ✅
- **Frontend (www):** https://www.delven.app ✅
- **Backend:** https://beacon-backend.fly.dev (unchanged)

---

## ⚠️ Important Notes

1. Keep your old URLs working too:
   - https://beacon-frontend.fly.dev (still works)
   - https://beacon-backend.fly.dev (still works)

2. DNS propagation usually takes 5-15 minutes
   - Might take up to 24 hours in rare cases
   - Refresh browser if it doesn't work

3. HTTPS will be automatically provisioned by Let's Encrypt

---

## 🔧 Step-by-Step in Squarespace

1. Log in to Squarespace
2. Click "Settings" at bottom left
3. Go to "Domains"
4. Click on "delven.app"
5. Click "DNS" tab
6. Scroll to "Custom Records"
7. Click "Add Record"
8. Add each record from the table above:
   - Type: A
   - Host: @
   - Data: 66.241.124.74
   - TTL: 3600 (or default)
   - Click Save

9. Repeat for AAAA records:
   - Type: AAAA
   - Host: @
   - Data: 2a09:8280:1::ae:f5f3:0
   - Click Save

   - Type: AAAA
   - Host: www
   - Data: 2a09:8280:1::ae:f5f3:0
   - Click Save

---

## ✨ Verify Everything Works

```bash
# After 5-15 minutes:
cd /Users/rainazabasajja/Desktop/IBM/frontend

flyctl certs check delven.app
flyctl certs check www.delven.app
```

Should see:
```
Certificate provisioned - ✓
```

---

## 🚀 Once Verified

Your app will be live at:
- https://delven.app
- https://www.delven.app

You can use either URL for your demo!

---

## Need to Change Backend Domain?

To add API backend to custom domain:

```bash
cd /Users/rainazabasajja/Desktop/IBM/backend
flyctl certs add api.delven.app
```

Then add to Squarespace:
```
AAAA api → 2a09:8280:1::...  (get from flyctl certs add output)
```

---

**Go add those DNS records to Squarespace now!** 🎉

