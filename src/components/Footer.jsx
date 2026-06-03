import "./Footer.css"
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">CG</div>
            <div>
              <div className="logo-text">CYBERGRID</div>
              <span className="logo-sub">SOLUTIONS LLC</span>
            </div>
          </div>
          <p>Enterprise cybersecurity and AI-powered technology solutions. Defending your mission. Owning your tech. Waterbury, CT.</p>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <a href="#services">Cybersecurity</a>
          <a href="#services">AI Automation</a>
          <a href="#services">Cloud Security</a>
          <a href="#services">MSP Services</a>
        </div>
        <div className="footer-col">
          <h5>Network</h5>
          <a href="https://sitrepintelmedia.substack.com" target="_blank" rel="noreferrer">Tech Bites</a>
          <a href="https://sitrep.media" target="_blank" rel="noreferrer">SitRep Intel</a>
          <a href="https://deep6intel.com" target="_blank" rel="noreferrer">Deep6INTEL</a>
          <a href="mailto:v.dunbar@cybergridsolutions.com">Contact</a>
        </div>
        <div className="footer-col">
          <h5>Legal</h5>
          <a href="/aegis-privacy.html">Privacy Policy</a>
          <a href="/aegis-tos.html">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>2026 Cybergrid Solutions LLC. All rights reserved.</span>
        <span className="footer-status">AEGIS DEFENSE SYSTEM: ACTIVE</span>
      </div>
    </footer>
  )
}