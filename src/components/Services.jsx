import "./Services.css"
const services = [
  { icon: "🛡️", title: "CYBERSECURITY ARCHITECTURE", desc: "Zero-trust frameworks, SIEM deployment, vulnerability management, and compliance (PCI DSS, HIPAA, NIST). Built by a 20-year Fortune 500 security architect.", tag: "ENTERPRISE SECURITY" },
  { icon: "🤖", title: "AI-POWERED AUTOMATION", desc: "Custom AI agents, workflow automation, and intelligent systems that reduce operational overhead and accelerate decision-making across your organization.", tag: "INTELLIGENT SYSTEMS" },
  { icon: "☁️", title: "CLOUD SECURITY & MSP", desc: "Microsoft 365, Azure, and Google Cloud security hardening. Managed service provider support for SMBs, schools, and educational institutions.", tag: "CLOUD DEFENSE" },
  { icon: "📊", title: "THREAT INTELLIGENCE", desc: "Real-time threat monitoring, incident response, and AEGIS-powered defensive operations. Proactive protection before threats become breaches.", tag: "ACTIVE DEFENSE" },
  { icon: "🔧", title: "CUSTOM TECHNOLOGY BUILD", desc: "Full-stack development, platform architecture, and custom software solutions tailored to your business requirements and growth trajectory.", tag: "TECH ENGINEERING" },
  { icon: "📋", title: "COMPLIANCE & GOVERNANCE", desc: "ITIL framework implementation, IT governance, MIS reporting, and regulatory compliance management for regulated industries.", tag: "GOVERNANCE & RISK" },
]
export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section">
        <div className="section-label">What We Do</div>
        <h2 className="section-title">ENTERPRISE-GRADE <span className="cyan">SOLUTIONS</span></h2>
        <p className="section-sub">From cybersecurity architecture to AI-powered automation — we deliver the technology infrastructure your business needs to compete and stay protected.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <span className="service-tag">→ {s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}