import { Linkedin, Facebook, Twitter, Terminal, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

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
            <Link to="#" className="text-white-50 hover-white"><Facebook size={20} /></Link>
             <Link to="#" className="text-white-50 hover-white"><Twitter size={20} /></Link>
             <Link to="#" className="text-white-50 hover-white"><Linkedin size={20} /></Link>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <h6 className="fw-bold mb-3">Company</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2">
              <Link href="#" className="text-decoration-none text-reset" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</Link>
            </li>
            <li className="mb-2"><Link to="#" className="text-decoration-none text-reset">Careers</Link></li>
            <li className="mb-2"><Link to="#" className="text-decoration-none text-reset">Partners</Link></li>
            <li className="mb-2"><Link to="#" className="text-decoration-none text-reset">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col-sm-6 col-lg-2">
          <h6 className="fw-bold mb-3">Resources</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2"><Link href="#" className="text-decoration-none text-reset">Blog</Link></li>
            <li className="mb-2"><Link href="#" className="text-decoration-none text-reset">Student Portal</Link></li>
            <li className="mb-2"><Link href="#" className="text-decoration-none text-reset">Teacher Login</Link></li>
            <li className="mb-2"><Link href="#" className="text-decoration-none text-reset">FAQs</Link></li>
          </ul>
        </div>
        <div className="col-lg-4">
          <h6 className="fw-bold mb-3">Contact Us</h6>
          <ul className="list-unstyled text-white-50 small">
            <li className="mb-2 d-flex"><MapPin size={18} className="me-2 text-primary" /> No. 3, Eliada Close, off Okporo Road, Rumuogba, Port Harcourt, Nigeria</li>
            <li className="mb-2 d-flex"><Phone size={18} className="me-2 text-primary" /> +2348114787211, +2347068177787 </li>
            <li className="mb-2 d-flex"><Mail size={18} className="me-2 text-primary" /> support@tequant.ng</li>
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
