import { Linkedin, Facebook, Twitter, Terminal, MapPin, Phone, Mail } from "lucide-react";

export default function Footer  ({ onNavigate }) {
    return(
  <footer className="bg-dark text-white pt-5 pb-3">
    <div className="container">
      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div className="d-flex align-items-center mb-3">
            <Terminal className="me-2 text-primary" size={28} />
            <h4 className="mb-0 fw-bold">TE Quant</h4>
          </div>
          <p className="text-white-50">
            Empowering the next generation of African tech talents. 
            Based in Port Harcourt, serving the world.
          </p>
          <div className="d-flex gap-3 mt-3">
            <a href="#" className="text-white-50 hover-white"><Facebook size={20} /></a>
            <a href="#" className="text-white-50 hover-white"><Twitter size={20} /></a>
            <a href="#" className="text-white-50 hover-white"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <h6 className="fw-bold mb-3">Company</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2">
              <a href="#" className="text-decoration-none text-reset" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a>
            </li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Careers</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Partners</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="col-sm-6 col-lg-2">
          <h6 className="fw-bold mb-3">Resources</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Blog</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Student Portal</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">Teacher Login</a></li>
            <li className="mb-2"><a href="#" className="text-decoration-none text-reset">FAQs</a></li>
          </ul>
        </div>
        <div className="col-lg-4">
          <h6 className="fw-bold mb-3">Contact Us</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2 d-flex"><MapPin size={18} className="me-2 text-primary" /> 12 Aba Road, Garrison, Port Harcourt, Nigeria</li>
            <li className="mb-2 d-flex"><Phone size={18} className="me-2 text-primary" /> +234 800 123 4567</li>
            <li className="mb-2 d-flex"><Mail size={18} className="me-2 text-primary" /> hello@tequant.com</li>
          </ul>
        </div>
      </div>
      <div className="border-top border-secondary pt-3 text-center text-white-50 small">
        <p className="mb-0">&copy; {new Date().getFullYear()} TE Quant Resources Ltd. All rights reserved.</p>
      </div>
    </div>
 
  </footer>
  )

};