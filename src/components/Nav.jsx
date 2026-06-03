import "./Nav.css"
export default function Nav({ onGetAccess }) {
  return (
    <header className="nav">
      <a className="logo" href="#">
        <div className="logo-icon">CG</div>
        <div>
          <div className="logo-text">CYBERGRID</div>
          <span className="logo-sub">SOLUTIONS LLC</span>
        </div>
      </a>
      <nav className="nav-links">
        <a href="#services">Services</a>
        <a href="#threat">Threat Intel</a>
        <a href="#about">About</a>
        <button className="nav-cta" onClick={onGetAccess}>Get Access</button>
      </nav>
    </header>
  )
}