# BEACON Quick Reference

## Local Development (Right Now)

```bash
# Terminal 1: Backend
cd /Users/rainazabasajja/Desktop/IBM/backend
npm run dev
# Runs on: http://localhost:3001

# Terminal 2: Frontend
cd /Users/rainazabasajja/Desktop/IBM/frontend
npm run dev
# Runs on: http://localhost:3000
```

Open browser: `http://localhost:3000`

---

## Record Demo (Local - Recommended)

1. Both apps running ✅
2. Open `http://localhost:3000`
3. Use screen recording (QuickTime, OBS)
4. Follow `/SUBMISSION/VIDEO_DEMO_SCRIPT.md`
5. Upload to YouTube/Vimeo

---

## Deploy to Live (Optional)

```bash
# One-time setup
brew install flyctl
flyctl auth login

# Deploy backend
cd /Users/rainazabasajja/Desktop/IBM
flyctl launch --name beacon-backend

# Deploy frontend
cd frontend
flyctl launch --name beacon-frontend

# Live URLs:
# Backend: https://beacon-backend.fly.dev
# Frontend: https://beacon-frontend.fly.dev
```

---

## File Locations

```
IBM/
├── backend/src/index.ts → All API endpoints
├── frontend/pages/index.tsx → React app UI
├── SUBMISSION/ → All hackathon documents
├── README.md → API documentation
├── STARTUP.md → Local startup guide
├── DEPLOYMENT.md → Full deployment guide
├── DEPLOY_NOW.md → Quick deployment
└── fly.toml → Production config
```

---

## Key Commands

```bash
# Local development
npm run dev  # Run both (from root)

# Backend only
npm run backend

# Frontend only
npm run frontend

# Build for production
npm run build

# View logs (Fly.io)
flyctl logs -a beacon-backend
flyctl logs -a beacon-frontend

# Restart apps (Fly.io)
flyctl restart -a beacon-backend
```

---

## Submission Checklist

- [ ] Backend running locally ✓
- [ ] Frontend running locally ✓
- [ ] Tested form → strategy → call → results ✓
- [ ] Record 3-minute demo ✓
- [ ] Upload to YouTube/Vimeo ✓
- [ ] Gather submission files:
  - [ ] Video URL
  - [ ] Problem & Solution: `/SUBMISSION/PROBLEM_SOLUTION_STATEMENT.md`
  - [ ] Watson Tech: `/SUBMISSION/WATSON_TECHNOLOGY_STATEMENT.md`
  - [ ] GitHub repo: `https://github.com/rainazab/ibm`
- [ ] Submit to IBM Hackathon ✓

---

## API Endpoints (Backend)

```
POST /api/negotiations/create
Body: { category, details, targetDiscount }
Returns: { strategy, confidence }

POST /api/calls/initiate
Body: { negotiationId }
Returns: { callId, status }

GET /api/calls/{callId}/status
Returns: { transcript, sentiment, elapsed_time }

GET /api/calls/{callId}/results
Returns: { achieved_discount, savings, success_rate }

POST /api/watson/generate-strategy
Body: { category, details, targetDiscount }
Returns: { strategy, confidence }

POST /api/watson/analyze-sentiment
Body: { text }
Returns: { sentiment, score }

GET /health
Returns: { status }
```

---

## Demo Script Summary

1. **Intro (30s):** Problem statement
2. **Input (30s):** Show form + submit
3. **Strategy (30s):** Show AI-generated strategy
4. **Call (60s):** Real-time negotiation
5. **Results (30s):** Show savings & results

**Total: 3 minutes exactly**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | `lsof -i :3000` and kill process |
| API 404 errors | Check backend is running |
| Blank page | Clear browser cache + hard refresh |
| Cold start delay | Normal on Fly.io (5-10s) |
| CORS errors | Backend is already configured |

---

## Environment Variables

### Backend (Already created)
Location: `/Users/rainazabasajja/Desktop/IBM/backend/.env`
- `PORT=3001`
- `NODE_ENV=development`
- (Optional) Watson, Twilio, SendGrid keys

### Frontend (Already created)
Location: `/Users/rainazabasajja/Desktop/IBM/frontend/.env.local`
- `NEXT_PUBLIC_API_URL=http://localhost:3001`

---

## Resources

- IBM Watson: https://www.ibm.com/watson
- Fly.io Docs: https://fly.io/docs
- Next.js Guide: https://nextjs.org/docs
- Express.js Guide: https://expressjs.com

---

## Contact & Support

GitHub: https://github.com/rainazab/ibm
Docs: See DEPLOYMENT.md, README.md, STARTUP.md

---

**You've got this! 🚀**

