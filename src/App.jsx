import { useState } from "react"
import Nav from "./components/Nav"
import AlertBar from "./components/AlertBar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import ThreatFeed from "./components/ThreatFeed"
import About from "./components/About"
import Footer from "./components/Footer"
import SubscribeModal from "./components/SubscribeModal"
import Portal from "./components/Portal"
import IntakeModal from "./components/IntakeModal"
import "./App.css"

export default function App() {
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [showIntake, setShowIntake] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleSubscribed = (user) => {
    setCurrentUser(user)
    setShowSubscribe(false)
    setShowPortal(true)
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
          onClose={() => setShowPortal(false)}
          onOpenIntake={() => setShowIntake(true)}
        />
      )}
      {showIntake && (
        <IntakeModal
          user={currentUser}
          onClose={() => setShowIntake(false)}
        />
      )}
    </div>
  )
}