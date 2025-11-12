import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'BEACON Backend is running', uptime: process.uptime() });
});

// Root
app.get('/', (req, res) => {
  res.json({ platform: 'BEACON', version: '2.0.0' });
});

// Create negotiation
app.post('/api/negotiations/create', (req, res) => {
  const { category, details, targetDiscount } = req.body;
  res.json({
    negotiation_id: 'neg_' + Math.random().toString(36),
    status: 'strategy_generated',
    strategy: `Strategy for ${category}: Focus on ${details}. Target: ${targetDiscount}%`,
    estimated_time: '3-5 minutes',
    ready_to_call: true,
  });
});

// Initiate call
app.post('/api/calls/initiate', (req, res) => {
  res.json({
    call_id: 'call_' + Math.random().toString(36),
    status: 'ringing',
    message: 'Call initiated',
  });
});

// Get call status
app.get('/api/calls/:callId/status', (req, res) => {
  res.json({
    call_id: req.params.callId,
    status: 'in-progress',
    sentiment: 'positive',
    transcript: ['Agent: Hello...', 'Business: Hi there...'],
    elapsed_time: '2m 45s',
  });
});

// Get results
app.get('/api/calls/:callId/results', (req, res) => {
  res.json({
    call_id: req.params.callId,
    status: 'completed',
    results: {
      goal_discount: 20,
      achieved_discount: 15,
      success_rate: 75,
      savings_amount: 3750,
      final_price: 21250,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BEACON Backend running on http://localhost:${PORT}`);
  console.log(`📞 Ready to negotiate...`);
});

