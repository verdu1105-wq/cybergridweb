import { useState } from "react"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import "./Hero.css"

export default function Hero({ onGetAccess }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    try {
      await setDoc(doc(collection(db, "subscribers"), email.trim()), {
        name: name.trim(),
        email: email.trim(),
        subscribedAt: serverTimestamp(),
        tier: "free",
        source: "hero",
      })
    } catch (err) {
      console.error(err)
    }
    setDone(true)
    setLoading(false)
    setTimeout(() => onGetAccess(), 1200)
  }

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-label">Cybergrid Solutions LLC — Waterbury, CT</div>
          <h1>DEFEND.<br /><span className="cyan">INNOVATE.</span><br /><span className="red-text">DOMINATE.</span></h1>
          <p className="hero-desc">Enterprise-grade cybersecurity and AI-powered technology solutions for businesses that cannot afford to be vulnerable. 20+ years of Fortune 500 security architecture now available to your organization.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onGetAccess}>Get Free Access</button>
            <a href="#services" className="btn btn-outline">View Services</a>
          </div>
          <div className="stats-row">
            <div className="stat"><div className="stat-num">20+</div><div className="stat-label">Years Experience</div></div>
            <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Enterprise Clients</div></div>
            <div className="stat"><div className="stat-num">99.9%</div><div className="stat-label">Uptime SLA</div></div>
          </div>
        </div>
        <div className="sub-card">
          <div className="sub-card-label">Free Membership</div>
          <h3>TECH BITES ACCESS</h3>
          <p>Subscribe free and get weekly AI and cybersecurity intelligence delivered to your inbox plus access to client resources.</p>
          <div className="free-badge">FREE — NO CREDIT CARD</div>
          <ul className="perks">
            <li><div className="perk-icon">✓</div>Weekly Tech Bites newsletter</li>
            <li><div className="perk-icon">✓</div>AI and cybersecurity briefings</li>
            <li><div className="perk-icon">✓</div>Client resource portal access</li>
            <li><div className="perk-icon">✓</div>Threat intelligence updates</li>
            <li><div className="perk-icon">✓</div>Custom onboarding consultation</li>
          </ul>
          {!done ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input className="form-input" type="email" placeholder="Business email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button className="btn-submit" type="submit" disabled={loading}>
                {loading ? "ACTIVATING..." : "ACTIVATE FREE ACCESS"}
              </button>
            </form>
          ) : (
            <div className="hero-success">Access granted — opening portal...</div>
          )}
          <p className="form-note">No spam. Unsubscribe anytime. Your data stays private.</p>
        </div>
      </div>
    </section>
  )
}