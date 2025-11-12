const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'BEACON Backend is running', uptime: process.uptime() });
});

app.post('/api/negotiations/create', (req, res) => {
  res.json({ negotiation_id: 'neg_123', strategy: 'Custom strategy', ready_to_call: true });
});

app.post('/api/calls/initiate', (req, res) => {
  res.json({ call_id: 'call_123', status: 'ringing' });
});

app.get('/api/calls/:id/results', (req, res) => {
  res.json({ achieved_discount: 15, savings: 3750, status: 'completed' });
});

app.listen(3001, () => console.log('🚀 Backend running http://localhost:3001'));
