import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { OpenAI } from 'openai';

try {
  dotenv.config();
} catch (e) {
  console.log('No .env file found, using defaults');
}

// Initialize OpenAI client (optional - only if API key exists)
let openai: any = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage (replace with DB in production)
interface Negotiation {
  id: string;
  category: string;
  details: string;
  targetDiscount: number;
  strategy?: string;
  status: string;
  createdAt: Date;
}

interface Call {
  id: string;
  negotiationId: string;
  status: string;
  transcript: string[];
  sentiment: string;
  achievedDiscount: number;
  savings: number;
  originalPrice: number;
  startTime: Date;
  endTime?: Date;
}

const negotiations: Map<string, Negotiation> = new Map();
const calls: Map<string, Call> = new Map();

// ROUTES

/**
 * 1. Create Negotiation Request
 */
app.post('/api/negotiations/create', (req: Request, res: Response) => {
  try {
    const { category, details, targetDiscount, contactNumber } = req.body;

    if (!category || !details || !targetDiscount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const negotiationId = uuidv4();
    const negotiation: Negotiation = {
      id: negotiationId,
      category,
      details,
      targetDiscount,
      status: 'strategy_generated',
      createdAt: new Date(),
    };

    // Simulate watsonx.ai strategy generation
    const strategy = generateStrategy(category, details, targetDiscount);
    negotiation.strategy = strategy;

    negotiations.set(negotiationId, negotiation);

    res.json({
      negotiation_id: negotiationId,
      status: 'strategy_generated',
      strategy,
      estimated_time: '3-5 minutes',
      ready_to_call: true,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create negotiation' });
  }
});

/**
 * 2. Start Call Negotiation
 */
app.post('/api/calls/initiate', (req: Request, res: Response) => {
  try {
    const { negotiationId, phoneNumber } = req.body;

    if (!negotiationId || !phoneNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const negotiation = negotiations.get(negotiationId);
    if (!negotiation) {
      return res.status(404).json({ error: 'Negotiation not found' });
    }

    const callId = uuidv4();
    const call: Call = {
      id: callId,
      negotiationId,
      status: 'in_progress',
      transcript: [],
      sentiment: 'neutral',
      achievedDiscount: 0,
      savings: 0,
      originalPrice: 25000,
      startTime: new Date(),
    };

    calls.set(callId, call);

    // Simulate call progression
    simulateCallProgression(callId, negotiation);

    res.json({
      call_id: callId,
      status: 'dialing',
      message: 'Placing call... Do not close this tab',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate call' });
  }
});

/**
 * 3. Get Call Status (Real-time updates)
 */
app.get('/api/calls/:callId/status', (req: Request, res: Response) => {
  try {
    const call = calls.get(req.params.callId);

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    res.json({
      call_id: call.id,
      status: call.status,
      elapsed_time: formatElapsedTime(call.startTime),
      sentiment: call.sentiment,
      latest_transcript: call.transcript[call.transcript.length - 1] || '',
      transcript: call.transcript,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get call status' });
  }
});

/**
 * 4. Get Call Results
 */
app.get('/api/calls/:callId/results', (req: Request, res: Response) => {
  try {
    const call = calls.get(req.params.callId);

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    const negotiation = negotiations.get(call.negotiationId);

    res.json({
      call_id: call.id,
      negotiation_id: call.negotiationId,
      status: call.status,
      results: {
        goal_discount: negotiation?.targetDiscount || 0,
        achieved_discount: call.achievedDiscount,
        success_rate: Math.round(
          (call.achievedDiscount / (negotiation?.targetDiscount || 1)) * 100
        ),
        savings_amount: call.savings,
        original_price: call.originalPrice,
        final_price: call.originalPrice - call.savings,
        agreed_terms: `${call.achievedDiscount}% discount confirmed`,
        full_transcript: call.transcript.join('\n'),
      },
      confirmation_sent: true,
      duration_seconds: call.endTime
        ? Math.round(
            (call.endTime.getTime() - call.startTime.getTime()) / 1000
          )
        : 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get call results' });
  }
});

/**
 * 5. Generate Strategy (OpenAI)
 */
app.post('/api/watson/generate-strategy', async (req: Request, res: Response) => {
  try {
    const { category, details, target } = req.body;

    if (!category || !details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use OpenAI if API key is available, otherwise use mock
    let strategy: string;
    if (process.env.OPENAI_API_KEY) {
      strategy = await generateStrategyWithOpenAI(category, details, target || 20);
    } else {
      strategy = generateStrategy(category, details, target || 20);
    }

    res.json({
      strategy,
      confidence_score: 0.87,
      model: process.env.OPENAI_API_KEY ? 'OpenAI (GPT-4)' : 'Mock Strategy',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate strategy' });
  }
});

/**
 * 6. Analyze Sentiment (watsonx.ai)
 */
app.post('/api/watson/analyze-sentiment', (req: Request, res: Response) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Missing transcript' });
    }

    const sentiment = analyzeSentiment(transcript);

    res.json({
      sentiment,
      confidence: 0.85,
      key_signals: getSentimentSignals(sentiment),
      suggested_pivot: getPivotSuggestion(sentiment),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

/**
 * 7. Get User History
 */
app.get('/api/users/:userId/negotiations', (req: Request, res: Response) => {
  try {
    const allNegotiations = Array.from(negotiations.values());

    res.json({
      user_id: req.params.userId,
      total_negotiations: allNegotiations.length,
      total_savings: calculateTotalSavings(),
      success_rate: calculateSuccessRate(),
      negotiations: allNegotiations.map((n) => ({
        id: n.id,
        category: n.category,
        status: n.status,
        goal_discount: n.targetDiscount,
        created_at: n.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get negotiations' });
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'BEACON Backend is running', uptime: process.uptime() });
});

// HELPER FUNCTIONS

async function generateStrategyWithOpenAI(category: string, details: string, target: number): Promise<string> {
  try {
    const prompt = `You are an expert negotiation strategist. Generate a concise negotiation strategy for the following:

Category: ${category}
Details: ${details}
Target Discount: ${target}%

Provide a clear, actionable strategy including:
1. Opening statement
2. Key value propositions
3. Objection handlers
4. Fallback options

Keep the response concise and professional.`;

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    return generateStrategy(category, details, target);
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fall back to mock strategy if API fails
    return generateStrategy(category, details, target);
  }
}

function generateStrategy(category: string, details: string, target: number): string {
  const strategies: { [key: string]: string } = {
    hotel: `Strategy: Volume Leverage Approach
Opening: "We're coordinating a ${target}% group for a corporate event..."
Value Props:
- Guaranteed occupancy
- Potential recurring annual bookings
- Loyalty program commitment
Objection Handler: If they counter below ${target}%, emphasize future bookings`,

    restaurant: `Strategy: Group Commitment Approach
Opening: "We're organizing a team event and love your restaurant..."
Value Props:
- Regular monthly bookings potential
- Social media promotion
- Guaranteed party attendance
Fallback: If no discount, negotiate free appetizer/dessert`,

    government: `Strategy: Eligibility + Documentation
Opening: "I'm calling to understand assistance programs for..."
Value Props:
- Clear qualification documentation
- Prompt processing
- Long-term support
Follow-up: Referral to specific program`,
  };

  return (
    strategies[category] ||
    `Strategy: Value-Based Negotiation
Opening: "I'd like to discuss ${category} opportunities..."
Approach: Emphasis on mutual benefit and long-term relationship`
  );
}

function simulateCallProgression(callId: string, negotiation: Negotiation): void {
  const call = calls.get(callId);
  if (!call) return;

  let step = 0;
  const progressSteps = [
    { delay: 1000, transcript: 'Agent: Hi! I\'m calling about a group discount opportunity...', sentiment: 'neutral' },
    { delay: 3000, transcript: 'Hotel: Sure, what size group?', sentiment: 'neutral' },
    { delay: 5000, transcript: 'Agent: 50 people for 3 nights. We\'ve heard great things about your property...', sentiment: 'positive' },
    { delay: 7000, transcript: 'Hotel: We typically offer 10% for groups that size.', sentiment: 'cautious' },
    { delay: 9000, transcript: 'Agent: Given the volume and potential for recurring bookings, could you move to 15%?', sentiment: 'positive' },
    { delay: 11000, transcript: 'Hotel: That\'s lower than we usually go, but I can do 15% with a commitment to future bookings.', sentiment: 'positive' },
    { delay: 13000, transcript: 'Agent: Perfect! Let me confirm those terms...', sentiment: 'positive' },
  ];

  progressSteps.forEach((step) => {
    setTimeout(() => {
      const c = calls.get(callId);
      if (!c) return;

      c.transcript.push(step.transcript);
      c.sentiment = step.sentiment;

      if (step.delay === 13000) {
        c.status = 'completed';
        c.achievedDiscount = 15;
        c.savings = c.originalPrice * 0.15;
        c.endTime = new Date();
      }
    }, step.delay);
  });
}

function analyzeSentiment(
  transcript: string
): 'positive' | 'neutral' | 'cautious' | 'negative' {
  const lower = transcript.toLowerCase();
  if (lower.includes('perfect') || lower.includes('great') || lower.includes('love'))
    return 'positive';
  if (lower.includes('but') || lower.includes('however') || lower.includes('problem'))
    return 'cautious';
  if (lower.includes('no') || lower.includes('cannot') || lower.includes('impossible'))
    return 'negative';
  return 'neutral';
}

function getSentimentSignals(sentiment: string): string[] {
  const signals: { [key: string]: string[] } = {
    positive: ['interested', 'engaged', 'willing_to_negotiate'],
    neutral: ['listening', 'considering', 'need_more_info'],
    cautious: ['hesitant', 'budget_concerns', 'need_approval'],
    negative: ['not_interested', 'policy_constraint', 'out_of_scope'],
  };
  return signals[sentiment] || [];
}

function getPivotSuggestion(sentiment: string): string {
  const suggestions: { [key: string]: string } = {
    positive: 'Continue with discount pitch - momentum is positive',
    neutral: 'Emphasize value proposition - need stronger case',
    cautious: 'Offer compromise - maybe phased increase or trial period',
    negative: 'Escalate to manager - current negotiator may not have authority',
  };
  return suggestions[sentiment] || 'Continue conversation';
}

function formatElapsedTime(startTime: Date): string {
  const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  return `${minutes}m ${seconds}s`;
}

function calculateTotalSavings(): number {
  let total = 0;
  calls.forEach((call) => {
    total += call.savings;
  });
  return total;
}

function calculateSuccessRate(): number {
  if (calls.size === 0) return 0;
  let successful = 0;
  calls.forEach((call) => {
    if (call.achievedDiscount > 0) successful++;
  });
  return Math.round((successful / calls.size) * 100);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BEACON Backend running on http://localhost:${PORT}`);
  console.log(`📞 Ready to negotiate...`);
  console.log(`🔗 API Docs: http://localhost:${PORT}/health`);
});

export default app;

