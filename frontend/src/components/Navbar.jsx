import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          1Fi
          <span className="logo-badge">EMI Store</span>
        </Link>

        <div className="navbar-right">
          <div className="mf-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Mutual Fund Backed EMI
          </div>

          <nav>
            <Link to="/">Products</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;