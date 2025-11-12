import express, { Request, Response } from 'express';

const router = express.Router();

// Mock user database
const users = new Map();
const userCallsUsed = new Map();
const userPlans = new Map();

/**
 * Get User Profile
 */
router.get('/profile/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = users.get(userId) || { id: userId, email: 'user@example.com' };

    res.json({
      user,
      plan: userPlans.get(userId) || 'free',
      callsUsed: userCallsUsed.get(userId) || 0,
      callsLimit: userPlans.get(userId) === 'pro' ? 10 : userPlans.get(userId) === 'premium' ? Infinity : 1,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

/**
 * Update User Plan
 */
router.post('/update-plan/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ error: 'Plan is required' });
    }

    userPlans.set(userId, plan);

    res.json({
      message: 'Plan updated successfully',
      plan,
      newCallsLimit: plan === 'pro' ? 10 : plan === 'premium' ? Infinity : 1,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

/**
 * Get User Call History
 */
router.get('/calls/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Mock call history
    const calls = [
      {
        id: '1',
        company: 'Marriott',
        targetDiscount: 20,
        achievedDiscount: 15,
        savings: 3750,
        date: new Date().toISOString(),
        status: 'completed',
      },
    ];

    res.json({
      userId,
      calls,
      totalCalls: calls.length,
      totalSavings: calls.reduce((sum, call) => sum + call.savings, 0),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get call history' });
  }
});

/**
 * Check Call Limit
 */
router.get('/check-call-limit/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const plan = userPlans.get(userId) || 'free';
    const callsUsed = userCallsUsed.get(userId) || 0;
    
    let callsLimit: number;
    if (plan === 'premium') callsLimit = Infinity;
    else if (plan === 'pro') callsLimit = 10;
    else callsLimit = 1;

    const canMakeCall = callsUsed < callsLimit;

    res.json({
      userId,
      plan,
      callsUsed,
      callsLimit: callsLimit === Infinity ? 'Unlimited' : callsLimit,
      canMakeCall,
      callsRemaining: callsLimit === Infinity ? 'Unlimited' : callsLimit - callsUsed,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check call limit' });
  }
});

/**
 * Increment Call Usage
 */
router.post('/increment-call-count/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentCount = userCallsUsed.get(userId) || 0;
    userCallsUsed.set(userId, currentCount + 1);

    res.json({
      userId,
      callsUsed: currentCount + 1,
      message: 'Call usage updated',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update call count' });
  }
});

export default router;

