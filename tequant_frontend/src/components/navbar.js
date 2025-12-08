import { Terminal, X, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar  ({ activePage, onNavigate})  {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm fixed-top">
      <div className="container">
        <Link 
          className="navbar-brand fw-bold text-primary d-flex align-items-center" 
          to="#"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <Terminal className="me-2" size={28} />
          TE Quant
        </Link>
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
              <Link
                className={`nav-link ${activePage === 'home' ? 'active fw-bold text-primary' : ''}`} 
                to="/" 
              
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              
                <Link className="nav-link" onClick={onNavigate} activePage={activePage} to="/about">About Us</Link>
              
                
            
            </li>
             <li className="nav-item">
              <Link className="nav-link" onClick={onNavigate} activePage={activePage} to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Bootcamps</Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={onNavigate} activePage={activePage} to="/blog">Blog</Link>
            </li>
            
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-outline-primary me-2" to="#">Login</Link>
            </li>
            
            <li className="nav-item mt-2 mt-lg-0">
              <Link className="btn btn-primary" to="#">Get Started</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};
