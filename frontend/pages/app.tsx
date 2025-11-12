import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import styles from '../styles/app.module.css';

interface CallResult {
  id: string;
  company: string;
  targetDiscount: number;
  achievedDiscount: number;
  savings: number;
  transcript: string[];
  date: string;
  status: 'in-progress' | 'completed' | 'failed';
}

export default function AppPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'input' | 'transcript' | 'results'>('input');
  
  // Form state
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [targetDiscount, setTargetDiscount] = useState(20);

  // Call state
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isCallActive, setIsCallActive] = useState(false);

  // Check auth
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

  const handleStartCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('transcript');
    setIsCallActive(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calls/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          negotiationId: Math.random().toString(36),
          phoneNumber: phone,
          company,
          targetDiscount,
        }),
      });

      const data = await response.json();
      
      // Simulate live transcript
      const simulatedTranscript = [
        `Agent: Hi! I'm calling on behalf of a customer about ${need}...`,
        `${company}: Sure, what can I help with?`,
        `Agent: We're looking for a ${targetDiscount}% discount. Here's why we think it's fair...`,
        `${company}: That's lower than we usually offer.`,
        `Agent: But consider the long-term relationship and volume...`,
        `${company}: Okay, I can do 15% for you.`,
        `Agent: Perfect! Let me confirm those terms...`,
      ];

      // Add transcript lines gradually
      simulatedTranscript.forEach((line, index) => {
        setTimeout(() => {
          setTranscript((prev) => [...prev, line]);
        }, (index + 1) * 2000);
      });

      // Simulate call completion
      setTimeout(() => {
        setIsCallActive(false);
        setCallResult({
          id: data.call_id,
          company,
          targetDiscount,
          achievedDiscount: 15,
          savings: 3750,
          transcript: simulatedTranscript,
          date: new Date().toISOString(),
          status: 'completed',
        });
        setStep('results');
      }, simulatedTranscript.length * 2000);
    } catch (error) {
      console.error('Call failed:', error);
      setIsCallActive(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.appContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>{user?.email?.[0].toUpperCase()}</div>
          <div className={styles.userInfo}>
            <p className={styles.username}>{user?.displayName || user?.email}</p>
            <p className={styles.plan}>Free Plan</p>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <a href="#" className={styles.navItem}>📞 Make Call</a>
          <a href="/dashboard" className={styles.navItem}>📊 Dashboard</a>
          <a href="/pricing" className={styles.navItem}>💳 Upgrade</a>
          <a href="/settings" className={styles.navItem}>⚙️ Settings</a>
          <button onClick={() => auth.signOut()} className={styles.navItem}>
            🚪 Sign Out
          </button>
        </nav>
      </div>

      <div className={styles.mainContent}>
        {step === 'input' && (
          <div className={styles.formSection}>
            <h1>Make a Negotiation Call</h1>
            <p>Get better deals with AI negotiation</p>

            <form onSubmit={handleStartCall} className={styles.form}>
              <div className={styles.formGroup}>
                <label>What do you need?</label>
                <textarea
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  placeholder="e.g., hotel room discount, restaurant reservation upgrade"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Marriott, Local Pizza Place"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Location (Optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Seattle, WA"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number to Call</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Target Discount %</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={targetDiscount}
                  onChange={(e) => setTargetDiscount(Number(e.target.value))}
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                Start Negotiation Call
              </button>
            </form>
          </div>
        )}

        {step === 'transcript' && (
          <div className={styles.transcriptSection}>
            <h2>Live Call Transcript</h2>
            <div className={styles.transcript}>
              {transcript.map((line, i) => (
                <div key={i} className={styles.transcriptLine}>
                  {line}
                </div>
              ))}
              {isCallActive && <div className={styles.transcriptLoading}>...</div>}
            </div>
            {!isCallActive && (
              <button onClick={() => setStep('results')} className={styles.btnSecondary}>
                View Results
              </button>
            )}
          </div>
        )}

        {step === 'results' && callResult && (
          <div className={styles.resultsSection}>
            <h2>Negotiation Complete! 🎉</h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultRow}>
                <span>Company:</span>
                <strong>{callResult.company}</strong>
              </div>
              <div className={styles.resultRow}>
                <span>Target Discount:</span>
                <strong>{callResult.targetDiscount}%</strong>
              </div>
              <div className={styles.resultRow}>
                <span>Achieved Discount:</span>
                <strong style={{ color: '#10B981' }}>{callResult.achievedDiscount}%</strong>
              </div>
              <div className={styles.resultRow}>
                <span>Amount Saved:</span>
                <strong style={{ color: '#FF6B5B', fontSize: '1.5rem' }}>
                  ${callResult.savings.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={() => {
                setStep('input');
                setTranscript([]);
                setCompany('');
                setPhone('');
                setNeed('');
              }} className={styles.btnPrimary}>
                Make Another Call
              </button>
              <a href="/dashboard" className={styles.btnSecondary}>
                View All Calls
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

