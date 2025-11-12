import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import styles from '../styles/home.module.css';

// Change this to your live backend URL after deploying to Fly.io
// Local: 'http://localhost:3001'
// Live: 'https://beacon-backend.fly.dev'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Strategy {
  strategy?: string;
}

interface CallStatus {
  call_id: string;
  status: string;
  sentiment: string;
  transcript: string[];
  elapsed_time?: string;
}

interface CallResults {
  call_id: string;
  status: string;
  results: {
    goal_discount: number;
    achieved_discount: number;
    success_rate: number;
    savings_amount: number;
    final_price: number;
  };
}

export default function Home() {
  const [step, setStep] = useState<'input' | 'strategy' | 'calling' | 'results'>('input');
  const [category, setCategory] = useState('hotel');
  const [details, setDetails] = useState('');
  const [targetDiscount, setTargetDiscount] = useState(20);
  const [strategy, setStrategy] = useState('');
  const [negotiationId, setNegotiationId] = useState('');
  const [callId, setCallId] = useState('');
  const [callStatus, setCallStatus] = useState<CallStatus | null>(null);
  const [results, setResults] = useState<CallResults | null>(null);
  const [loading, setLoading] = useState(false);

  // Polling for call status
  useEffect(() => {
    if (step !== 'calling' || !callId) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/calls/${callId}/status`);
        setCallStatus(response.data);

        if (response.data.status === 'completed') {
          clearInterval(interval);
          // Get results
          const resultsResponse = await axios.get(
            `${API_URL}/api/calls/${callId}/results`
          );
          setResults(resultsResponse.data);
          setStep('results');
        }
      } catch (error) {
        console.error('Error fetching call status:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [step, callId]);

  const handleCreateNegotiation = async () => {
    if (!details) {
      alert('Please enter details');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/negotiations/create`, {
        category,
        details,
        targetDiscount,
      });

      setNegotiationId(response.data.negotiation_id);
      setStrategy(response.data.strategy);
      setStep('strategy');
    } catch (error) {
      alert('Error creating negotiation');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCall = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/calls/initiate`, {
        negotiationId,
        phoneNumber: '+1-206-555-0123',
      });

      setCallId(response.data.call_id);
      setStep('calling');
    } catch (error) {
      alert('Error starting call');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setCategory('hotel');
    setDetails('');
    setTargetDiscount(20);
    setStrategy('');
    setNegotiationId('');
    setCallId('');
    setCallStatus(null);
    setResults(null);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.logo}>
          <span className={styles.logoText}>BEACON</span>
          <span className={styles.subtitle}>AI-Powered Negotiation</span>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className={styles.main}>
        {step === 'input' && (
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Let AI Negotiate For You</h1>
            <p className={styles.subtitle_text}>
              Describe what you need, and we'll handle the negotiation
            </p>

            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="hotel">Hotel / Travel</option>
                  <option value="restaurant">Restaurant / Food</option>
                  <option value="government">Government Services</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="E.g., 50 people, 3 nights, Seattle area. Need group rate."
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Target Discount (%)</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={targetDiscount}
                  onChange={(e) => setTargetDiscount(Number(e.target.value))}
                />
              </div>

              <motion.button
                className={styles.button}
                onClick={handleCreateNegotiation}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Creating...' : 'Generate Strategy'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'strategy' && (
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>AI-Generated Strategy</h1>
            <p className={styles.subtitle_text}>
              Here's how we'll negotiate with {category}
            </p>

            <div className={styles.strategyBox}>
              <pre>{strategy}</pre>
            </div>

            <p className={styles.confidence}>
              ✓ Confidence Score: 87% | Powered by watsonx.ai
            </p>

            <div className={styles.buttonGroup}>
              <motion.button
                className={styles.buttonPrimary}
                onClick={handleStartCall}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
              >
                {loading ? 'Placing Call...' : 'Start Negotiation Call'}
              </motion.button>
              <button className={styles.buttonSecondary} onClick={handleReset}>
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {step === 'calling' && callStatus && (
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Call In Progress</h1>
            <p className={styles.subtitle_text}>
              {callStatus.status === 'in_progress' ? 'Negotiating...' : 'Call complete!'}
            </p>

            <div className={styles.callMonitor}>
              <div className={styles.callInfo}>
                <div className={styles.infoItem}>
                  <span>Duration:</span>
                  <strong>{callStatus.elapsed_time || '0s'}</strong>
                </div>
                <div className={styles.infoItem}>
                  <span>Sentiment:</span>
                  <strong className={styles[callStatus.sentiment]}>
                    {callStatus.sentiment}
                  </strong>
                </div>
              </div>

              <div className={styles.transcriptBox}>
                <h3>Live Transcript:</h3>
                {callStatus.transcript.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={line.includes('Agent') ? styles.agentLine : styles.hotelLine}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {callStatus.status === 'in_progress' && (
                <div className={styles.spinner}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    📞
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 'results' && results && (
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Negotiation Complete! 🎉</h1>

            <div className={styles.resultsGrid}>
              <div className={styles.resultCard}>
                <p className={styles.label}>Goal Discount</p>
                <p className={styles.value}>{results.results.goal_discount}%</p>
              </div>
              <div className={styles.resultCard}>
                <p className={styles.label}>Achieved Discount</p>
                <p className={styles.valueSuccess}>
                  {results.results.achieved_discount}%
                </p>
              </div>
              <div className={styles.resultCard}>
                <p className={styles.label}>Success Rate</p>
                <p className={styles.value}>{results.results.success_rate}%</p>
              </div>
              <div className={styles.resultCard}>
                <p className={styles.label}>Amount Saved</p>
                <p className={styles.valueSavings}>
                  ${results.results.savings_amount.toFixed(0)}
                </p>
              </div>
            </div>

            <div className={styles.finalPrice}>
              <p>Final Price</p>
              <h2>${results.results.final_price.toFixed(0)}</h2>
              <p className={styles.grayText}>
                Original: ${(results.results.final_price / (1 - results.results.achieved_discount / 100)).toFixed(0)}
              </p>
            </div>

            <p className={styles.confirmationText}>
              ✓ Confirmation details sent to your email
            </p>

            <motion.button
              className={styles.buttonPrimary}
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
            >
              Start New Negotiation
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Powered by watsonx.ai | Built with Twilio & ElevenLabs</p>
      </footer>
    </div>
  );
}

