import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import styles from '../styles/pricing.module.css';

export default function Pricing() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(router.query.plan || 'pro');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = async (plan: string) => {
    if (!user) {
      router.push('/signup');
      return;
    }

    // In production, call your backend to create a Stripe session
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, userId: user.uid }),
    });

    const { sessionId } = await response.json();
    // Redirect to Stripe checkout
    window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
  };

  return (
    <div className={styles.pricingPage}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>delven</Link>
        {user ? (
          <Link href="/dashboard" className={styles.btnSmall}>
            Dashboard
          </Link>
        ) : (
          <Link href="/login" className={styles.btnSmall}>
            Sign In
          </Link>
        )}
      </header>

      <div className={styles.container}>
        <div className={styles.pricingHeader}>
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the perfect plan for your negotiation needs</p>
        </div>

        <div className={styles.pricingGrid}>
          {/* Free Plan */}
          <div className={styles.priceCard}>
            <h3>Free</h3>
            <div className={styles.price}>$0<span className={styles.period}>/month</span></div>
            <ul className={styles.features}>
              <li>✓ 1 call per month</li>
              <li>✓ Live transcription</li>
              <li>✓ Real-time sentiment analysis</li>
              <li>✓ Basic support</li>
            </ul>
            <button className={styles.btnOutline} disabled>
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`${styles.priceCard} ${styles.featured}`}>
            <div className={styles.badge}>Most Popular</div>
            <h3>Pro</h3>
            <div className={styles.price}>$9<span className={styles.period}>/month</span></div>
            <ul className={styles.features}>
              <li>✓ 10 calls per month</li>
              <li>✓ Live transcription</li>
              <li>✓ Real-time sentiment analysis</li>
              <li>✓ Priority email support</li>
              <li>✓ Call history & analytics</li>
              <li>✓ Advanced negotiation tactics</li>
            </ul>
            <button 
              className={styles.btnPrimary}
              onClick={() => handleCheckout('pro')}
            >
              Start Pro
            </button>
          </div>

          {/* Premium Plan */}
          <div className={styles.priceCard}>
            <h3>Premium</h3>
            <div className={styles.price}>$29<span className={styles.period}>/month</span></div>
            <ul className={styles.features}>
              <li>✓ Unlimited calls</li>
              <li>✓ Live transcription</li>
              <li>✓ Real-time sentiment analysis</li>
              <li>✓ 24/7 priority support</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Custom negotiation strategies</li>
              <li>✓ API access</li>
              <li>✓ Team collaboration</li>
            </ul>
            <button 
              className={styles.btnSecondary}
              onClick={() => handleCheckout('premium')}
            >
              Go Premium
            </button>
          </div>
        </div>

        {/* Comparison */}
        <div className={styles.comparison}>
          <h2>Detailed Comparison</h2>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Calls per month</td>
                <td>1</td>
                <td>10</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Live Transcription</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Sentiment Analysis</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Call History</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>-</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Advanced Tactics</td>
                <td>-</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>API Access</td>
                <td>-</td>
                <td>-</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Email</td>
                <td>Priority</td>
                <td>24/7</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Can I change plans anytime?</h4>
              <p>Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is there a contract?</h4>
              <p>No contract needed. Cancel anytime. Your service will remain active until the end of your current billing period.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards (Visa, Mastercard, Amex) and other payment methods through Stripe.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I get a refund?</h4>
              <p>We offer a 7-day money-back guarantee on new subscriptions. Contact support for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

