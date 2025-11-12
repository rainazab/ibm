const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Delven - AI Negotiation</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F8FAFB; color: #1A1A1A; }
        nav { background: white; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        nav h1 { font-size: 1.5rem; color: #0B5B5B; }
        nav button { padding: 0.5rem 1rem; margin-left: 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: bold; }
        .btn-outline { border: 2px solid #0B5B5B; background: white; color: #0B5B5B; }
        .btn-primary { background: #0B5B5B; color: white; border: none; }
        .container { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }
        .hero { text-align: center; margin-bottom: 4rem; }
        .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.1rem; color: #666; margin-bottom: 2rem; }
        .hero button { padding: 1rem 2rem; background: linear-gradient(135deg, #0B5B5B 0%, #0D7C7C 100%); color: white; border: none; border-radius: 1rem; font-size: 1rem; cursor: pointer; font-weight: bold; }
        .section h2 { font-size: 2rem; text-align: center; margin-bottom: 2rem; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 4rem; }
        .card { padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center; }
        .card h3 { font-size: 1.25rem; margin-bottom: 1rem; }
        .card p { color: #666; }
        .badge { width: 50px; height: 50px; background: #0B5B5B; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; margin: 0 auto 1rem; }
        .price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .price-card { padding: 2rem; background: white; border: 2px solid #E8EAED; border-radius: 1rem; }
        .price-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .price-card .price { font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        .price-card .price span { font-size: 1rem; color: #999; }
        .price-card ul { list-style: none; padding: 1rem 0; margin: 1rem 0; border-top: 1px solid #E8EAED; border-bottom: 1px solid #E8EAED; }
        .price-card li { padding: 0.5rem 0; }
        .price-card button { width: 100%; padding: 0.75rem; margin-top: 1rem; background: #0B5B5B; color: white; border: none; border-radius: 0.5rem; font-weight: bold; cursor: pointer; }
        footer { text-align: center; padding: 2rem; border-top: 1px solid #E8EAED; color: #666; }
      </style>
    </head>
    <body>
      <nav>
        <h1>delven</h1>
        <div>
          <button class="btn-outline">Sign In</button>
          <button class="btn-primary">Get Started</button>
        </div>
      </nav>

      <div class="container">
        <div class="hero">
          <h1>Get Better Deals with AI Negotiation</h1>
          <p>Our AI agent negotiates on your behalf to get you the best prices</p>
          <button>Make Your First Call (Free)</button>
        </div>

        <div class="section">
          <h2>How It Works</h2>
          <div class="grid">
            <div class="card">
              <div class="badge">1</div>
              <h3>Describe Your Need</h3>
              <p>Tell us what you need</p>
            </div>
            <div class="card">
              <div class="badge">2</div>
              <h3>Pick a Company</h3>
              <p>Select the business to negotiate with</p>
            </div>
            <div class="card">
              <div class="badge">3</div>
              <h3>Get Results</h3>
              <p>Watch the AI negotiate in real-time</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Pricing</h2>
          <div class="price-grid">
            <div class="price-card">
              <h3>Free</h3>
              <div class="price">$0<span>/month</span></div>
              <p>1 call/month</p>
              <ul>
                <li>✓ Live transcription</li>
                <li>✓ Real results</li>
              </ul>
              <button>Get Started</button>
            </div>
            <div class="price-card" style="border-color: #FF6B5B; transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 107, 91, 0.2);">
              <h3>Pro</h3>
              <div class="price" style="color: #FF6B5B;">$9<span>/month</span></div>
              <p>10 calls/month</p>
              <ul>
                <li>✓ Priority support</li>
                <li>✓ Analytics</li>
              </ul>
              <button style="background: #FF6B5B;">Choose Plan</button>
            </div>
            <div class="price-card">
              <h3>Premium</h3>
              <div class="price">$29<span>/month</span></div>
              <p>Unlimited calls</p>
              <ul>
                <li>✓ 24/7 support</li>
                <li>✓ API access</li>
              </ul>
              <button>Go Premium</button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Delven. All rights reserved.</p>
      </footer>
    </body>
    </html>
  `);
});

// Backend API
app.post('/api/negotiate', (req, res) => {
  res.json({ success: true, saved: 3750, discount: 15 });
});

app.listen(3000, () => console.log('🚀 App running on http://localhost:3000'));
