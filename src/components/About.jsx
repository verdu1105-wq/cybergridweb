import "./About.css"
const cards = [
  { icon: "🏛️", title: "FORTUNE 500 ROOTS", desc: "Enterprise architecture at the highest level across financial services, technology, and managed services — now deployed for your organization." },
  { icon: "🤝", title: "MICROSOFT PARTNER", desc: "Certified Microsoft Partner with deep expertise in M365, Azure, and enterprise cloud security deployments." },
  { icon: "⚡", title: "AI-FIRST APPROACH", desc: "We build with AI at the core — AEGIS, custom automation agents, and intelligent defense systems for the modern threat landscape." },
]
export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section">
        <div className="section-label">The Team</div>
        <h2 className="section-title">BUILT BY <span className="cyan">PRACTITIONERS</span></h2>
        <p className="section-sub">Cybergrid Solutions was founded by Vernon Dunbar — a 20+ year cybersecurity architect with Fortune 500 and enterprise experience. We don't just advise on security. We've built it at enterprise scale. Now we bring that same architecture to businesses that deserve enterprise-grade protection without the enterprise price tag.</p>
        <div className="about-grid">
          {cards.map((c, i) => (
            <div className="about-card" key={i}>
              <div className="about-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}