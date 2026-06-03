import { useState } from "react"
import IntakeModal from "./IntakeModal"
import "./Portal.css"

export default function Portal({ user, onClose }) {
  const [showIntake, setShowIntake] = useState(false)
  const firstName = user.name.split(" ")[0]

  const cards = [
    { icon: "📋", title: "START PROJECT INTAKE", desc: "Tell us what you need. Our AI-assisted intake captures your requirements and routes to the right solution.", action: () => setShowIntake(true), highlight: true },
    { icon: "📰", title: "TECH BITES ARCHIVE", desc: "Access all previous Tech Bites newsletters and intelligence briefings.", href: "https://sitrepintelmedia.substack.com" },
    { icon: "📡", title: "SITREP INTEL", desc: "Real-time geopolitical and cybersecurity intelligence from the SitRep media network.", href: "https://sitrep.media" },
    { icon: "💬", title: "DIRECT CONTACT", desc: "Reach Vernon Dunbar directly for urgent security matters or project discussions.", href: "mailto:v.dunbar@cybergridsolutions.com" },
  ]

  return (
    <div className="portal-overlay">
      <div className="portal-header">
        <div className="portal-logo">
          <div className="logo-icon">CG</div>
          <div>
            <div className="logo-text">CYBERGRID</div>
            <span className="logo-sub">CLIENT PORTAL</span>
          </div>
        </div>
        <button className="portal-exit" onClick={onClose}>EXIT PORTAL</button>
      </div>
      <div className="portal-body">
        <div className="portal-welcome-label">WELCOME BACK</div>
        <h2 className="portal-title">WELCOME, <span className="cyan">{firstName.toUpperCase()}</span></h2>
        <p className="portal-sub">You are inside the Cybergrid client portal, {firstName}. Start a project intake or explore our resources below.</p>
        <div className="portal-cards">
          {cards.map((card, i) => (
            card.action ? (
              <button key={i} className={`portal-card ${card.highlight ? "portal-card-highlight" : ""}`} onClick={card.action}>
                <div className="portal-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </button>
            ) : (
              <a key={i} className="portal-card" href={card.href} target={card.href.startsWith("mailto") ? "_self" : "_blank"} rel="noreferrer">
                <div className="portal-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </a>
            )
          ))}
        </div>
      </div>
      {showIntake && (
        <IntakeModal user={user} onClose={() => setShowIntake(false)} />
      )}
    </div>
  )
}