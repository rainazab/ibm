# BEACON: Quick Start Guide
## IBM Watson Hackathon - 3 Day Sprint

### What You Have Now (100% Submission Ready)

✅ **Problem & Solution Statement** (500 words) - Comprehensive, compelling narrative  
✅ **Watson Technology Statement** - Detailed technical implementation  
✅ **Video Demo Script** - Complete 3-minute script with exact timing  
✅ **API Documentation** - Full REST API specs with examples  
✅ **Project README** - Complete technical documentation

### What You Need to Do (Next 72 Hours)

1. **Build & Demo Frontend** (Day 1-2)
   - Create simple React app with input form
   - Add real-time call monitoring display
   - Integrate with backend

2. **Build & Deploy Backend** (Day 1-2)
   - Set up Express.js + watsonx.ai
   - Integrate Twilio for calls
   - Test all API endpoints

3. **Record 3-Minute Video** (Day 2-3)
   - Follow VIDEO_DEMO_SCRIPT.md exactly
   - Show live app + live call
   - Include Watson branding
   - Upload to public URL

4. **Push to GitHub** (Day 3)
   - Make repository public
   - Ensure README clearly explains APIs

### The Elevator Pitch (30 seconds)

"BEACON is an AI agent that negotiates for you. Input what you need—a hotel discount, restaurant deal, government assistance—and watsonx.ai generates a custom negotiation strategy. Our agent places the call and negotiates the deal automatically. Users get real savings without making a single call."

### Key Differentiators

1. **Actual negotiation** (not just automation)
2. **watsonx.ai for strategy** (not templates)
3. **Real outcomes** (measurable dollars saved)
4. **Minimal user effort** (2-minute setup)

### Video Demo Quick Reference

| Time | Content | Length |
|------|---------|--------|
| 0:00-0:20 | Problem hook | 20 sec |
| 0:20-0:50 | Solution intro | 30 sec |
| 0:50-2:20 | LIVE DEMO | 90 sec ← Most important |
| 2:20-2:50 | Watson tech | 30 sec |
| 2:50-3:00 | Closing | 10 sec |

**Total: 3:00 exactly**

### Building the Frontend (MVP)

**Must Have:**
```
Input Form:
  [ ] Category dropdown
  [ ] Details text area
  [ ] Target discount input
  [ ] "Let BEACON Negotiate" button

Results Display:
  [ ] Real-time call monitoring
  [ ] Sentiment meter
  [ ] Call transcript
  [ ] Final results card
```

### Building the Backend (MVP)

**Must Have Endpoints:**
```
POST /api/negotiations/create
POST /api/calls/initiate
GET /api/calls/:id/status
GET /api/calls/:id/results
POST /api/watson/generate-strategy
```

See README.md for full API specs.

### Watson Integration Points

**watsonx.ai:**
- Strategy generation
- Sentiment analysis
- Objection handling

**Watson Orchestrate:**
- Workflow automation
- Call monitoring
- State management

### GitHub Submission

```
Repository: https://github.com/YOUR_USERNAME/beacon

Structure:
- /backend (Express + Watson)
- /frontend (React)
- README.md (this explains APIs)
- /SUBMISSION (all docs)
```

### Submission Checklist

**Deliverables (4 required + 1 optional):**
- [ ] Problem & Solution Statement (PROBLEM_SOLUTION_STATEMENT.md)
- [ ] Watson Technology Statement (WATSON_TECHNOLOGY_STATEMENT.md)
- [ ] 3-Minute Video (publicly accessible link)
- [ ] Code Repository (GitHub public repo)
- [ ] Optional: Additional technical docs

**Before Submitting:**
- [ ] All links tested and working
- [ ] Video exactly 3 minutes or less
- [ ] GitHub repo is PUBLIC
- [ ] README clearly shows required APIs
- [ ] Narration clear and professional
- [ ] Watson tech prominently featured in video

### Timeline

**Day 1 (Today):**
- [ ] Set up project structure
- [ ] Start backend Express server
- [ ] Create frontend React app
- [ ] Test API endpoints locally

**Day 2 (Tomorrow):**
- [ ] Build out all frontend components
- [ ] Deploy/finalize backend
- [ ] Record video (follow script exactly)
- [ ] Upload to YouTube/Vimeo

**Day 3 (Final):**
- [ ] Push to GitHub (make public)
- [ ] Final review of all materials
- [ ] Submit everything

### Commands to Remember

**Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Test API:**
```bash
curl -X POST http://localhost:3001/api/negotiations/create \
  -H "Content-Type: application/json" \
  -d '{"category":"hotel","details":"50 people","target_discount":20}'
```

### Key Files

- **README.md** - Full API documentation
- **PROBLEM_SOLUTION_STATEMENT.md** - Problem/solution narrative
- **WATSON_TECHNOLOGY_STATEMENT.md** - Technical implementation
- **VIDEO_DEMO_SCRIPT.md** - Exact video script with timing
- **QUICK_START.md** - This file

### Success Criteria

✅ Video shows live demo with real app
✅ Watson tech clearly demonstrated
✅ API endpoints working
✅ Professional presentation
✅ Compelling narrative about the problem
✅ All 90+ seconds of demo included

### You've Got This! 🚀

This is a strong idea with clear commercial value. The judges have never seen an AI negotiation agent before. Focus on:

1. **Clarity** - Make it obvious what problem you're solving
2. **Live Demo** - Show it working (even if mocked)
3. **Watson Integration** - Make it clear why Watson is essential
4. **Results** - Emphasize real outcomes (actual discounts, savings)

**Start building. You have 72 hours.**

Questions? Review:
- README.md for API details
- VIDEO_DEMO_SCRIPT.md for demo flow
- WATSON_TECHNOLOGY_STATEMENT.md for technical details

