import { Terminal, X, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar  ({ activePage, onNavigate})  {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm fixed-top">
      <div className="container">
        <a 
          className="navbar-brand fw-bold text-primary d-flex align-items-center" 
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <Terminal className="me-2" size={28} />
          TE Quant
        </a>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a 
                className={`nav-link ${activePage === 'home' ? 'active fw-bold text-primary' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activePage === 'about' ? 'active fw-bold text-primary' : ''}`} 
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              >
                About Us
              </a>
            </li>
             <li className="nav-item">
              <Link className="nav-link" onClick={onNavigate} activePage={activePage} to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Bootcamps</a>

            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={onNavigate} activePage={activePage} to="/blog">Blog</Link>
            </li>
            
            <li className="nav-item ms-lg-3">
              <a className="btn btn-outline-primary me-2" href="#">Login</a>
            </li>
            
            <li className="nav-item mt-2 mt-lg-0">
              <a className="btn btn-primary" href="#">Get Started</a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};