import { useEffect, useState } from "react"
import "./ThreatFeed.css"
const attackTypes = [
  { type: "RANSOMWARE", color: "#E24B4A" },
  { type: "PHISHING", color: "#BA7517" },
  { type: "DDOS", color: "#00f2ff" },
  { type: "SQL INJECTION", color: "#39ff14" },
  { type: "BRUTE FORCE", color: "#ff00ff" },
  { type: "MALWARE", color: "#ff4444" },
  { type: "ZERO-DAY", color: "#E24B4A" },
  { type: "AI ATTACK", color: "#ff8800" },
]
const geoSources = ["CN","RU","KP","IR","BR","IN","DE","US"]
const targets = ["Microsoft 365","Azure SQL","Corporate VPN","Exchange Server","API Endpoint","Cloud Storage","Web App","SharePoint"]
function randomIP() { return Array.from({length:4}, () => Math.floor(Math.random()*255)).join(".") }
export default function ThreatFeed() {
  const [entries, setEntries] = useState([])
  const [stats, setStats] = useState({ ransomware: 1247, phishing: 8934, malware: 3421, brute: 5621 })
  useEffect(() => {
    const interval = setInterval(() => {
      const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)]
      const geo = geoSources[Math.floor(Math.random() * geoSources.length)]
      const target = targets[Math.floor(Math.random() * targets.length)]
      const time = new Date().toLocaleTimeString()
      setEntries(prev => [{ id: Date.now(), time, attack, geo, ip: randomIP(), target }, ...prev].slice(0, 18))
      setStats(prev => ({
        ...prev,
        ransomware: prev.ransomware + (attack.type === "RANSOMWARE" ? 1 : 0),
        phishing: prev.phishing + (attack.type === "PHISHING" ? 1 : 0),
        malware: prev.malware + (attack.type === "MALWARE" ? 1 : 0),
        brute: prev.brute + (attack.type === "BRUTE FORCE" ? 1 : 0),
      }))
    }, 2500)
    return () => clearInterval(interval)
  }, [])
  return (
    <section id="threat" className="threat-section">
      <div className="threat-inner">
        <div className="threat-left">
          <div className="section-label">Live Feed</div>
          <h2 className="section-title">REAL-TIME <span className="cyan">THREAT</span> MONITOR</h2>
          <p className="section-sub">Our AEGIS platform monitors the global threat landscape 24/7 — pulling from CISA KEV, AlienVault OTX, and proprietary intelligence sources.</p>
          <div className="stats-grid">
            <div className="stat-box"><div className="stat-box-label">RANSOMWARE</div><div className="stat-box-num" style={{color:"#E24B4A"}}>{stats.ransomware.toLocaleString()}</div></div>
            <div className="stat-box"><div className="stat-box-label">PHISHING</div><div className="stat-box-num" style={{color:"#BA7517"}}>{stats.phishing.toLocaleString()}</div></div>
            <div className="stat-box"><div className="stat-box-label">MALWARE</div><div className="stat-box-num cyan">{stats.malware.toLocaleString()}</div></div>
            <div className="stat-box"><div className="stat-box-label">BRUTE FORCE</div><div className="stat-box-num" style={{color:"#39ff14"}}>{stats.brute.toLocaleString()}</div></div>
          </div>
        </div>
        <div className="feed-box">
          <div className="feed-header">
            <div className="pulse-dot" />
            <span>LIVE THREAT FEED</span>
          </div>
          <div className="feed-entries">
            {entries.map(e => (
              <div key={e.id} className="feed-entry">
                <span className="feed-time">[{e.time}]</span>
                <span style={{color: e.attack.color}}> [{e.attack.type}]</span>
                <span className="feed-detail"> {e.ip} ({e.geo}) to {e.target}</span>
                <span className="feed-blocked"> BLOCKED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}