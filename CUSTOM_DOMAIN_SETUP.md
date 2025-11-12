# Connect Your Squarespace Domain to Fly.io

## Step 1: Get Your Domain Name

What domain did you buy on Squarespace?
- Example: `beacon.com`, `baybeacon.org`, etc.

## Step 2: Add DNS Records in Squarespace

### For Frontend (Main App)

**In Squarespace Dashboard:**
1. Go to Settings → Domains → Your Domain
2. Click "Connect to Fly.io" or "Manage DNS"
3. Add these records:

| Type | Host | Value |
|------|------|-------|
| CNAME | @ (or your domain) | beacon-frontend.fly.dev |
| CNAME | www | beacon-frontend.fly.dev |

### For Backend (Optional - if you want api.yourdomain.com)

| Type | Host | Value |
|------|------|-------|
| CNAME | api | beacon-backend.fly.dev |

---

## Step 3: Add Domain to Fly.io

### For Frontend:

```bash
# Replace "yourdomain.com" with your actual domain
cd /Users/rainazabasajja/Desktop/IBM/frontend

flyctl certs add yourdomain.com
```

**If asked:** Choose to verify DNS

### For Backend (Optional):

```bash
cd /Users/rainazabasajja/Desktop/IBM/backend

# For api.yourdomain.com
flyctl certs add api.yourdomain.com
```

---

## Step 4: Verify DNS Propagation

Wait 5-15 minutes for DNS to update, then:

```bash
# Check if domain resolves
dig yourdomain.com

# Should show Fly.io's IP
```

---

## Step 5: Test Your Domain

Once DNS propagates:
- Frontend: https://yourdomain.com
- Backend: https://api.yourdomain.com (if configured)

---

## Quick Squarespace Setup

**In Squarespace:**
1. Go to Settings → Domains
2. Select your domain
3. Click "Settings" icon
4. Go to "Nameservers"
5. Look for "DNS Records" section
6. Add the CNAME records above

---

## Troubleshooting

### Domain not resolving?
```bash
# Wait longer (DNS can take 24 hours max)
# Usually only 5-15 minutes

# Check DNS status
nslookup yourdomain.com
```

### Certificate issues?
```bash
# Renew certificate
flyctl certs remove yourdomain.com
flyctl certs add yourdomain.com
```

### Want to revert to fly.dev domain?
- Frontend still works at: https://beacon-frontend.fly.dev
- Backend still works at: https://beacon-backend.fly.dev

---

## Your Current URLs

**Without Custom Domain:**
- Frontend: https://beacon-frontend.fly.dev ✅
- Backend: https://beacon-backend.fly.dev ✅

**With Custom Domain (After Setup):**
- Frontend: https://yourdomain.com
- Backend: https://api.yourdomain.com

---

## Need Help?

Tell me your domain name and I'll:
1. Create the exact DNS records for Squarespace
2. Run the Fly CLI commands
3. Verify everything works

