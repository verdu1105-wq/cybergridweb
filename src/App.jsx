import { useState, useEffect } from "react"
import Nav from "./components/Nav"
import AlertBar from "./components/AlertBar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import ThreatFeed from "./components/ThreatFeed"
import About from "./components/About"
import Footer from "./components/Footer"
import SubscribeModal from "./components/SubscribeModal"
import Portal from "./components/Portal"
import PersonalLanding from "./components/PersonalLanding"
import "./App.css"

const PERSONAS = {
  viera: {
    name: "Dr. Viera",
    greeting: "Welcome, Dr. Viera",
    sub: "Your MindStack collaboration portal is ready. Let us scope your Deep6INTEL research initiative.",
    color: "#00f2ff",
    intakeType: "deep6intel",
    intakeLabel: "MINDSTACK INITIATIVE",
    questions: [
      { label: "What phase is your research in?", field: "researchPhase", choices: ["Early concept", "Active research", "Ready to deploy", "Seeking collaboration"] },
      { label: "What does MindStack need most right now?", field: "need", choices: ["Secure data infrastructure", "AI analysis tools", "Intelligence briefing integration", "Custom agent development"] },
      { label: "What is your timeline?", field: "timeline", choices: ["Immediate", "Within 60 days", "This quarter", "Planning phase"] },
    ]
  },
  tim: {
    name: "Tim",
    greeting: "Welcome, Tim",
    sub: "Your personal Cybergrid client portal. Let us build something great for your fitness brand.",
    color: "#39ff14",
    intakeType: "commercial",
    intakeLabel: "FITNESS BRAND PROJECT",
    questions: [
      { label: "What does your fitness brand need?", field: "serviceType", choices: ["Professional website", "Client management system", "AI-powered coaching tools", "Brand and marketing tech"] },
      { label: "Do you currently have a website?", field: "currentSite", choices: ["No website yet", "Have a basic site", "Have a site but need a rebuild", "Just need updates"] },
      { label: "What is your timeline?", field: "timeline", choices: ["ASAP", "Within 30 days", "1-3 months", "Planning phase"] },
    ]
  }
}

export default function App() {
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [persona, setPersona] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get("ref")
    if (ref && PERSONAS[ref]) {
      setPersona(PERSONAS[ref])
    }
  }, [])

  const handleSubscribed = (user) => {
    setCurrentUser(user)
    setShowSubscribe(false)
    setShowPortal(true)
  }

  if (persona && !showPortal) {
    return (
      <>
        <PersonalLanding
          persona={persona}
          onSubscribed={handleSubscribed}
          onGetAccess={() => setShowSubscribe(true)}
        />
        {showSubscribe && (
          <SubscribeModal
            onClose={() => setShowSubscribe(false)}
            onSubscribed={handleSubscribed}
          />
        )}
      </>
    )
  }

  return (
    <div className="app">
      <Nav onGetAccess={() => setShowSubscribe(true)} />
      <AlertBar />
      <Hero onGetAccess={() => setShowSubscribe(true)} />
      <Services />
      <ThreatFeed />
      <About />
      <Footer />
      {showSubscribe && (
        <SubscribeModal
          onClose={() => setShowSubscribe(false)}
          onSubscribed={handleSubscribed}
        />
      )}
      {showPortal && currentUser && (
        <Portal
          user={currentUser}
          persona={persona}
          onClose={() => setShowPortal(false)}
        />
      )}
    </div>
  )
}