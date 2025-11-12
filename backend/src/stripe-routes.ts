import express, { Request, Response } from 'express';

const router = express.Router();

// Stripe prices (update with your Stripe product IDs)
const STRIPE_PRICES = {
  pro: 'price_pro_monthly_9', // Update with real Stripe price ID
  premium: 'price_premium_monthly_29', // Update with real Stripe price ID
};

/**
 * Create Stripe Checkout Session
 */
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { plan, userId } = req.body;

    if (!plan || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const priceId = STRIPE_PRICES[plan as keyof typeof STRIPE_PRICES];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // In production, use the Stripe SDK to create a session
    const session = {
      id: `session_${Math.random().toString(36)}`,
      url: 'https://checkout.stripe.com/pay/demo',
      status: 'pending',
    };

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

/**
 * Handle Stripe Webhook
 */
router.post('/webhook', (req: Request, res: Response) => {
  try {
    const event = req.body;

    switch (event.type) {
      case 'checkout.session.completed':
        // Update user subscription in database
        console.log('Subscription created:', event.data.object);
        break;
      case 'customer.subscription.updated':
        // Handle subscription updates
        console.log('Subscription updated:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        console.log('Subscription cancelled:', event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

