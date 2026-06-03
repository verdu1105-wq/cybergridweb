import { useState } from "react"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"

export default function SubscribeModal({ onClose, onSubscribed }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
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
        company: company.trim(),
        subscribedAt: serverTimestamp(),
        tier: "free",
        source: "modal",
      })
    } catch (err) {
      console.error("Subscribe error:", err)
    }
    setDone(true)
    setLoading(false)
    setTimeout(() => {
      onSubscribed({ name: name.trim(), email: email.trim(), company: company.trim() })
    }, 1500)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-header">
          <h2>ACTIVATE FREE ACCESS</h2>
          <p>Join the Cybergrid network — Tech Bites + client portal</p>
        </div>
        <div className="modal-body">
          {!done ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input className="form-input" type="email" placeholder="Business email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Company / Organization (optional)" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
              <ul className="perks" style={{marginBottom: 20}}>
                <li><div className="perk-icon">✓</div>Weekly Tech Bites newsletter</li>
                <li><div className="perk-icon">✓</div>AI and cybersecurity briefings</li>
                <li><div className="perk-icon">✓</div>Client resource portal access</li>
                <li><div className="perk-icon">✓</div>Custom onboarding consultation</li>
              </ul>
              <button className="btn-submit" type="submit" disabled={loading}>
                {loading ? "ACTIVATING..." : "ACTIVATE FREE ACCESS"}
              </button>
              <p className="form-note">No spam. No credit card. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h3>ACCESS GRANTED</h3>
              <p>Welcome to the Cybergrid network. Opening your portal now...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}