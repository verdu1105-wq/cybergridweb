import { useState } from "react"
import { collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import "./PersonalLanding.css"

export default function PersonalLanding({ persona, onSubscribed }) {
  const [step, setStep] = useState("landing")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleActivate = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    try {
      await setDoc(doc(collection(db, "subscribers"), email.trim()), {
        name: name.trim(),
        email: email.trim(),
        subscribedAt: serverTimestamp(),
        tier: "free",
        source: `ref_${persona.intakeType}`,
        persona: persona.intakeType,
      })
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
    setStep("intake")
  }

  const selectAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, "intakes"), {
        ...answers,
        clientName: name.trim(),
        clientEmail: email.trim(),
        intakeType: persona.intakeType,
        persona: persona.intakeType,
        submittedAt: serverTimestamp(),
        source: "cybergridsolutions.tech",
      })
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
    setDone(true)
    setTimeout(() => {
      onSubscribed({ name: name.trim(), email: email.trim() })
    }, 2000)
  }

  const allAnswered = persona.questions.every(q => answers[q.field])

  if (done) {
    return (
      <div className="pl-done">
        <div className="pl-done-card">
          <div className="pl-done-icon">✓</div>
          <h2>YOU ARE IN.</h2>
          <p>Vernon will personally review your submission and reach out within 24 hours. Opening your portal now...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pl-wrap">
      <div className="pl-nav">
        <div className="pl-logo">
          <div className="logo-icon">CG</div>
          <div>
            <div className="logo-text">CYBERGRID</div>
            <span className="logo-sub">SOLUTIONS LLC</span>
          </div>
        </div>
        <div className="pl-nav-badge">{persona.intakeLabel}</div>
      </div>

      {step === "landing" && (
        <div className="pl-hero">
          <div className="pl-hero-left">
            <div className="pl-eyebrow">PERSONAL ACCESS — CYBERGRID SOLUTIONS</div>
            <h1 className="pl-title" style={{color: persona.color}}>{persona.greeting.toUpperCase()}</h1>
            <p className="pl-sub">{persona.sub}</p>

            <div className="pl-pipeline">
              <div className="pl-pipeline-label">YOUR CONTENT PIPELINE</div>
              {persona.intakeType === "deep6intel" ? (
                <div className="pl-pipeline-steps">
                  <div className="pl-step"><div className="pl-step-icon">🎙️</div><div><div className="pl-step-name">PODCAST STUDIO</div><div className="pl-step-desc">AI-assisted script + ElevenLabs voice + Adobe Podcast</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">📰</div><div><div className="pl-step-name">SUBSTACK PUBLISHER</div><div className="pl-step-desc">Transcript + audio post + automated distribution</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">🔬</div><div><div className="pl-step-name">MINDSTACK RESEARCH HUB</div><div className="pl-step-desc">Deep6INTEL secure intelligence environment</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">📡</div><div><div className="pl-step-name">SITREP CROSS-PROMOTION</div><div className="pl-step-desc">Your research amplified across SitRep Intel network</div></div></div>
                </div>
              ) : (
                <div className="pl-pipeline-steps">
                  <div className="pl-step"><div className="pl-step-icon">🎬</div><div><div className="pl-step-name">FITNESS CONTENT STUDIO</div><div className="pl-step-desc">AI script + Firefly visuals + ElevenLabs voice</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">📱</div><div><div className="pl-step-name">SOCIAL PUBLISHER</div><div className="pl-step-desc">YouTube, TikTok, Instagram — one pipeline</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">💪</div><div><div className="pl-step-name">FITNESS BRAND WEBSITE</div><div className="pl-step-desc">Professional site built by Cybergrid</div></div></div>
                  <div className="pl-step"><div className="pl-step-icon">📡</div><div><div className="pl-step-name">SITREP SPORTS CHANNEL</div><div className="pl-step-desc">Fitness and sports science content network</div></div></div>
                </div>
              )}
            </div>
          </div>

          <div className="pl-card">
            <div className="pl-card-label">ACTIVATE YOUR ACCESS</div>
            <h3>GET STARTED</h3>
            <p>Enter your details to unlock your personalized portal and content pipeline.</p>
            <form onSubmit={handleActivate}>
              <div className="form-group">
                <input className="form-input" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <input className="form-input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button className="btn-submit" type="submit" disabled={loading} style={{background: persona.color, color: "#000"}}>
                {loading ? "ACTIVATING..." : "ACTIVATE MY ACCESS →"}
              </button>
            </form>
            <p className="form-note">Your information is private and secure.</p>
          </div>
        </div>
      )}

      {step === "intake" && (
        <div className="pl-intake">
          <div className="pl-intake-header">
            <div className="pl-eyebrow">{persona.intakeLabel} — QUICK INTAKE</div>
            <h2>HELP US SCOPE YOUR PROJECT</h2>
            <p>Just {persona.questions.length} quick questions so Vernon can prepare for your conversation.</p>
          </div>
          <div className="pl-intake-questions">
            {persona.questions.map((q, i) => (
              <div key={i} className="pl-question">
                <div className="pl-question-label">{q.label}</div>
                <div className="pl-choices">
                  {q.choices.map(choice => (
                    <button
                      key={choice}
                      className={`pl-choice ${answers[q.field] === choice ? "selected" : ""}`}
                      onClick={() => selectAnswer(q.field, choice)}
                      style={answers[q.field] === choice ? {borderColor: persona.color, color: persona.color} : {}}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={!allAnswered || loading}
              style={{background: persona.color, color: "#000", marginTop: 20}}
            >
              {loading ? "SUBMITTING..." : "SUBMIT AND ENTER PORTAL →"}
            </button>
          </div>
        </div>
      )}

      <div className="pl-footer">
        <span>Cybergrid Solutions LLC — cybergridsolutions.tech</span>
        <span style={{color: persona.color}}>POWERED BY SITREP MEDIA + DEEP6INTEL</span>
      </div>
    </div>
  )
}