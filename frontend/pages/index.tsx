import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/home.module.css';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    setLogoAnimated(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Delven - AI-Powered Negotiation Agent</title>
        <meta name="description" content="Get better deals with AI negotiation on your behalf" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Fixed Header */}
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.navLogo}>
            <span className={styles.logoText}>Delven</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="/login" className={styles.btnSmall}>
              Sign In
            </Link>
            <Link href="/signup" className={styles.btnPrimarySmall}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Animated Logo */}
          <div className={`${styles.animatedLogo} ${logoAnimated ? styles.animated : ''}`}>
            <span className={styles.logoParticle}>delve</span>
            <span className={styles.splitAnimation}></span>
            <span className={styles.logoParticle}>in</span>
          </div>

          <h1 className={styles.title}>
            Get Better Deals with AI Negotiation
          </h1>
          <p className={styles.subtitle}>
            Stop leaving money on the table. Our AI agent negotiates on your behalf to get you the best prices on hotels, restaurants, services, and more.
          </p>

          <div className={styles.heroCTA}>
            <Link href="/app" className={styles.btnLarge}>
              Make Your First Call (Free)
            </Link>
            <Link href="#how-it-works" className={styles.btnOutlineLarge}>
              See How It Works
            </Link>
          </div>

          <div className={styles.socialProof}>
            <p>✨ 1 free call included • No credit card required • Used by thousands</p>
          </div>
        </div>

        <div className={styles.heroAnimation}>
          <div className={styles.floatingCard}>
            <div className={styles.callResult}>
              <span className={styles.badge}>Success!</span>
              <p>Saved <strong>$3,750</strong></p>
              <p className={styles.small}>15% discount negotiated</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How Delven Works</h2>

          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Describe Your Need</h3>
              <p>Tell us what you need: a hotel room, restaurant discount, or service upgrade</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Pick a Location</h3>
              <p>Use our location search to select the exact business or service provider</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>AI Strategizes</h3>
              <p>Our AI creates a custom negotiation strategy with proven tactics</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3>Call Placed</h3>
              <p>Our agent calls on your behalf with natural, conversational speech</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>5</div>
              <h3>Live Transcript</h3>
              <p>Watch the negotiation in real-time with live call transcription</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>6</div>
              <h3>Get Results</h3>
              <p>See what discount was achieved and confirm the deal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Delven?</h2>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3>AI-Powered Negotiation</h3>
              <p>Our AI uses proven negotiation tactics to get you the best possible deal</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Natural Conversation</h3>
              <p>Our agent sounds human and negotiates like an expert - no scripts</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👁️</div>
              <h3>Live Monitoring</h3>
              <p>Watch every call in real-time with live transcription</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔐</div>
              <h3>Your Privacy</h3>
              <p>Your phone number stays private - we do the calling</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Lightning Fast</h3>
              <p>Results in minutes, not hours of back-and-forth</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Save Money</h3>
              <p>Average savings: $500-5000 per negotiation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>

          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Free</h3>
              <div className={styles.price}>$0</div>
              <ul className={styles.priceFeatures}>
                <li>✓ 1 free negotiation call</li>
                <li>✓ Full live transcription</li>
                <li>✓ Real results</li>
              </ul>
              <Link href="/signup" className={styles.btnPrimary}>
                Try Free
              </Link>
            </div>

            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.badge}>Most Popular</div>
              <h3>Pro</h3>
              <div className={styles.price}>$9<span className={styles.priceMonth}>/month</span></div>
              <ul className={styles.priceFeatures}>
                <li>✓ 10 calls per month</li>
                <li>✓ Priority support</li>
                <li>✓ Call history & analytics</li>
                <li>✓ Advanced negotiation tactics</li>
              </ul>
              <Link href="/signup" className={styles.btnSecondary}>
                Start Pro
              </Link>
            </div>

            <div className={styles.priceCard}>
              <h3>Premium</h3>
              <div className={styles.price}>$29<span className={styles.priceMonth}>/month</span></div>
              <ul className={styles.priceFeatures}>
                <li>✓ Unlimited calls</li>
                <li>✓ 24/7 priority support</li>
                <li>✓ Custom negotiation strategies</li>
                <li>✓ API access</li>
                <li>✓ Team collaboration</li>
              </ul>
              <Link href="/signup" className={styles.btnSecondary}>
                Go Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Stop Leaving Money on the Table?</h2>
          <p>Try your first negotiation completely free. No credit card required.</p>
          <Link href="/signup" className={styles.btnLarge}>
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>Delven</h4>
              <p>AI-powered negotiation that works for you</p>
              <div className={styles.appLinks}>
                <Link href="#" className={styles.appBadge}>
                  📱 iOS App Coming Soon
                </Link>
                <Link href="#" className={styles.appBadge}>
                  🤖 Android App Coming Soon
                </Link>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Product</h4>
              <Link href="/how-it-works">How It Works</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/faq">FAQ</Link>
            </div>

            <div className={styles.footerSection}>
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className={styles.footerSection}>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; 2024 Delven. All rights reserved.</p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Email">✉</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
