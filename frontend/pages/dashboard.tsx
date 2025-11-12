import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import styles from '../styles/dashboard.module.css';

interface CallHistory {
  id: string;
  company: string;
  achievedDiscount: number;
  savings: number;
  date: string;
  status: 'completed' | 'failed';
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callsUsed, setCallsUsed] = useState(1);
  const [callsLimit, setCallsLimit] = useState(1);
  const [totalSavings, setTotalSavings] = useState(3750);
  const [calls, setCalls] = useState<CallHistory[]>([
    {
      id: '1',
      company: 'Marriott',
      achievedDiscount: 15,
      savings: 3750,
      date: new Date().toISOString(),
      status: 'completed',
    },
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome back, {user?.displayName || user?.email}!</h1>
        <button onClick={() => auth.signOut()} className={styles.signOutBtn}>
          Sign Out
        </button>
      </header>

      <div className={styles.container}>
        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Calls Used</h3>
            <div className={styles.statValue}>
              {callsUsed} <span className={styles.statLimit}>/ {callsLimit}</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${(callsUsed / callsLimit) * 100}%` }}
              />
            </div>
            {callsUsed >= callsLimit && (
              <p className={styles.limitWarning}>Upgrade to make more calls</p>
            )}
          </div>

          <div className={styles.statCard}>
            <h3>Total Saved</h3>
            <div className={styles.statValue} style={{ color: '#10B981' }}>
              ${totalSavings.toLocaleString()}
            </div>
            <p className={styles.statSubtext}>From successful negotiations</p>
          </div>

          <div className={styles.statCard}>
            <h3>Current Plan</h3>
            <div className={styles.planBadge}>Free</div>
            <a href="/pricing" className={styles.upgradeLink}>
              Upgrade to Pro →
            </a>
          </div>

          <div className={styles.statCard}>
            <h3>Success Rate</h3>
            <div className={styles.statValue}>100%</div>
            <p className={styles.statSubtext}>1 of 1 negotiations successful</p>
          </div>
        </div>

        {/* Call History */}
        <div className={styles.historySection}>
          <div className={styles.historyHeader}>
            <h2>Recent Calls</h2>
            <a href="/app" className={styles.btnPrimary}>
              Make New Call
            </a>
          </div>

          {calls.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No calls yet. Start your first negotiation!</p>
              <a href="/app" className={styles.btnPrimary}>
                Make Your First Call
              </a>
            </div>
          ) : (
            <div className={styles.callsList}>
              {calls.map((call) => (
                <div key={call.id} className={styles.callItem}>
                  <div className={styles.callInfo}>
                    <h4>{call.company}</h4>
                    <p className={styles.callDate}>
                      {new Date(call.date).toLocaleDateString()} at{' '}
                      {new Date(call.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={styles.callStats}>
                    <div className={styles.stat}>
                      <span className={styles.label}>Discount:</span>
                      <span className={styles.value}>{call.achievedDiscount}%</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.label}>Saved:</span>
                      <span className={styles.value} style={{ color: '#10B981' }}>
                        ${call.savings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.status} ${styles[call.status]}`}>
                    {call.status === 'completed' ? '✓ Success' : '✗ Failed'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plan Comparison */}
        <div className={styles.planComparison}>
          <h2>Upgrade Your Plan</h2>
          <div className={styles.plansGrid}>
            <div className={styles.planOption}>
              <h3>Free</h3>
              <p className={styles.price}>$0/month</p>
              <ul>
                <li>✓ 1 call/month</li>
                <li>✓ Live transcription</li>
              </ul>
              <button className={styles.btnDisabled} disabled>
                Current Plan
              </button>
            </div>

            <div className={styles.planOption + ' ' + styles.featured}>
              <div className={styles.badge}>Popular</div>
              <h3>Pro</h3>
              <p className={styles.price}>$9/month</p>
              <ul>
                <li>✓ 10 calls/month</li>
                <li>✓ Priority support</li>
                <li>✓ Call analytics</li>
              </ul>
              <a href="/pricing?plan=pro" className={styles.btnSecondary}>
                Upgrade to Pro
              </a>
            </div>

            <div className={styles.planOption}>
              <h3>Premium</h3>
              <p className={styles.price}>$29/month</p>
              <ul>
                <li>✓ Unlimited calls</li>
                <li>✓ 24/7 support</li>
                <li>✓ API access</li>
              </ul>
              <a href="/pricing?plan=premium" className={styles.btnSecondary}>
                Go Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

