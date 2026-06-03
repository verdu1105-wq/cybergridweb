import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import "./IntakeModal.css"

const STEPS = [
  { id: 1, label: "Step 1 of 5", question: "What type of help are you looking for?", field: "serviceType",
    choices: [
      { label: "🛡️ Cybersecurity and Defense", value: "Cybersecurity & Defense" },
      { label: "🤖 AI and Automation", value: "AI & Automation" },
      { label: "☁️ Cloud and Infrastructure", value: "Cloud & Infrastructure" },
      { label: "🔧 Custom Tech Build", value: "Custom Technology Build" },
      { label: "📋 Compliance and Governance", value: "Compliance & Governance" },
      { label: "🤔 Not Sure Yet", value: "Not Sure Yet" },
    ]},
  { id: 2, label: "Step 2 of 5", question: "What is the size of your organization?", field: "orgSize",
    choices: [
      { label: "👤 Solo / Individual", value: "Solo / Individual" },
      { label: "🏢 Small (2-25)", value: "Small (2-25)" },
      { label: "🏛️ Mid-size (26-200)", value: "Mid-size (26-200)" },
      { label: "🌐 Enterprise (200+)", value: "Enterprise (200+)" },
    ]},
  { id: 3, label: "Step 3 of 5", question: "What is your timeline and urgency?", field: "timeline",
    choices: [
      { label: "🚨 URGENT — Need help now", value: "URGENT" },
      { label: "📅 Within 30 days", value: "Within 30 days" },
      { label: "🗓️ 1-3 months", value: "1-3 months" },
      { label: "💡 Planning phase", value: "Planning phase" },
    ]},
  { id: 4, label: "Step 4 of 5", question: "Describe your project or challenge in your own words.", field: "projectDescription", type: "textarea" },
  { id: 5, label: "Step 5 of 5", question: "What is your approximate budget range?", field: "budget",
    choices: [
      { label: "💰 Under $1K", value: "Under $1,000" },
      { label: "💰 $1K - $5K", value: "$1,000 - $5,000" },
      { label: "💰 $5K - $25K", value: "$5,000 - $25,000" },
      { label: "💰 $25K+", value: "$25,000+" },
      { label: "🤔 Need pricing guidance", value: "Need pricing guidance" },
      { label: "🏛️ Enterprise contract", value: "Enterprise contract" },
    ]},
]

export default function IntakeModal({ user, onClose }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const currentStep = STEPS[step - 1]
  const progress = (step / STEPS.length) * 100

  const selectChoice = (field, value) => setData(prev => ({ ...prev, [field]: value }))

  const canProceed = () => {
    if (currentStep.type === "textarea") return description.trim().length > 5
    return !!data[currentStep.field]
  }

  const handleNext = () => {
    if (step < STEPS.length) setStep(s => s + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await addDoc(collection(db, "intakes"), {
        ...data,
        projectDescription: description,
        clientName: user?.name || "Unknown",
        clientEmail: user?.email || "Unknown",
        clientCompany: user?.company || "",
        submittedAt: serverTimestamp(),
        source: "cybergridsolutions.tech",
      })
      console.log("Intake saved successfully")
    } catch (err) {
      console.error("Intake error:", err)
    }
    setLoading(false)
    setDone(true)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal intake-modal">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-header">
          <h2>PROJECT INTAKE</h2>
          <p>{user ? `${user.name} — lets scope your project` : "Tell us about your project"}</p>
        </div>
        <div className="modal-body">
          {!done ? (
            <>
              <div className="intake-progress">
                <div className="intake-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="step-label">{currentStep.label}</div>
              <div className="step-question">{currentStep.question}</div>
              {currentStep.choices && (
                <div className="choice-grid">
                  {currentStep.choices.map((choice) => (
                    <button key={choice.value} className={`choice-btn ${data[currentStep.field] === choice.value ? "selected" : ""}`} onClick={() => selectChoice(currentStep.field, choice.value)}>
                      {choice.label}
                    </button>
                  ))}
                </div>
              )}
              {currentStep.type === "textarea" && (
                <textarea className="form-input" placeholder="Tell us what you are trying to accomplish, what problems you are facing, or what you want to build..." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} autoFocus />
              )}
              <div className="intake-nav">
                {step > 1 ? <button className="btn-back" onClick={() => setStep(s => s - 1)}>BACK</button> : <div />}
                <button className="btn-next" onClick={handleNext} disabled={!canProceed() || loading}>
                  {loading ? "SUBMITTING..." : step === STEPS.length ? "SUBMIT PROJECT" : "NEXT"}
                </button>
              </div>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h3>INTAKE RECEIVED</h3>
              <p>Your project brief has been logged. Vernon will personally review your submission and reach out within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}