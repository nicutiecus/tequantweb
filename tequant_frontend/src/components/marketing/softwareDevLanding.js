import React from 'react';
import { 
  Code, 
  Server, 
  Database, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  Briefcase
} from 'lucide-react';

const SoftwareDevLanding = ({ onNavigate }) => {
  return (
    <div className="bg-light min-vh-100 font-sans">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-bold text-uppercase rounded-pill">
                New Cohort Starts Feb 1st
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Become a <span className="text-primary">Full-Stack Developer</span> in 18 Weeks
              </h1>
              <p className="lead mb-4 opacity-75">
                Master React, Django, and Database Engineering. Build real projects, get mentored by industry experts, and launch your tech career in Port Harcourt.
              </p>
              <div className="d-flex gap-3 flex-column flex-sm-row">
                <button className="btn btn-primary btn-lg fw-bold px-5 py-3 shadow">
                  Apply Now
                </button>
                <button className="btn btn-outline-light btn-lg fw-bold px-5 py-3">
                  Download Syllabus
                </button>
              </div>
              <div className="mt-4 pt-3 border-top border-secondary d-flex gap-4">
                <div className="d-flex align-items-center">
                  <Star className="text-warning me-2" fill="currentColor" size={20} />
                  <span><strong>4.9/5</strong> Rating</span>
                </div>
                <div className="d-flex align-items-center">
                  <Users className="text-info me-2" size={20} />
                  <span><strong>500+</strong> Grads</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card bg-dark border-secondary shadow-lg rounded-4 p-2">
                <div className="card-header border-bottom border-secondary bg-transparent d-flex gap-2">
                  <div className="rounded-circle bg-danger" style={{width: 12, height: 12}}></div>
                  <div className="rounded-circle bg-warning" style={{width: 12, height: 12}}></div>
                  <div className="rounded-circle bg-success" style={{width: 12, height: 12}}></div>
                </div>
                <div className="card-body font-monospace text-success">
                  <p className="mb-0">
                    <span className="text-primary">const</span> <span className="text-warning">student</span> = <span className="text-light">{'{'}</span><br/>
                    &nbsp;&nbsp;name: <span className="text-info">"Future Dev"</span>,<br/>
                    &nbsp;&nbsp;skills: [<span className="text-info">"React"</span>, <span className="text-info">"Django"</span>, <span className="text-info">"SQL"</span>],<br/>
                    &nbsp;&nbsp;hired: <span className="text-danger">true</span><br/>
                    <span className="text-light">{'}'}</span>;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- VALUE PROPOSITION --- */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 text-primary mb-3">
                  <Briefcase size={32} />
                </div>
                <h3 className="h4 fw-bold">Job-Ready Portfolio</h3>
                <p className="text-muted">Don't just watch tutorials. Build 4 major projects including an E-commerce store and a Fintech dashboard.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 text-success mb-3">
                  <Users size={32} />
                </div>
                <h3 className="h4 fw-bold">1-on-1 Mentorship</h3>
                <p className="text-muted">Get weekly code reviews and career guidance from senior developers working at top Nigerian companies.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                <div className="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-10 text-warning mb-3">
                  <CheckCircle size={32} />
                </div>
                <h3 className="h4 fw-bold">Lifetime Access</h3>
                <p className="text-muted">Keep access to all course materials, updates, and our alumni community even after you graduate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM SECTION --- */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase ls-md">Curriculum</h6>
            <h2 className="display-5 fw-bold">What You Will Learn</h2>
            <p className="lead text-muted">A full-stack journey from "Hello World" to deployment.</p>
          </div>

          <div className="row g-4">
            {/* Frontend */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3 text-primary">
                    <Code size={28} className="me-2" />
                    <h4 className="card-title h5 fw-bold mb-0">Frontend</h4>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> HTML5, CSS3, JavaScript (ES6+)</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> React.js & Hooks</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Tailwind CSS & Bootstrap</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> State Management (Redux)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3 text-primary">
                    <Server size={28} className="me-2" />
                    <h4 className="card-title h5 fw-bold mb-0">Backend</h4>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Python Programming</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Django & Django REST Framework</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Authentication (JWT)</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> API Design & Testing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DevOps & DB */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3 text-primary">
                    <Database size={28} className="me-2" />
                    <h4 className="card-title h5 fw-bold mb-0">DevOps & Data</h4>
                  </div>
                  <ul className="list-unstyled">
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> PostgreSQL & MySQL</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Docker & Containerization</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Git & GitHub Workflow</li>
                    <li className="mb-2 d-flex"><CheckCircle size={18} className="me-2 text-success" /> Deployment (AWS/Heroku/Dokploy)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING CTA --- */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-4">
          <div className="row align-items-center bg-primary rounded-4 p-5 shadow-lg mx-1">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-2">Ready to Code Your Future?</h2>
              <p className="lead mb-0 opacity-90">
                Join the next cohort. Limited seats available for the physical class in Port Harcourt.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <h3 className="fw-bold mb-0">₦200,000</h3>
              <p className="small mb-3">Installment payments available</p>
              <button 
                className="btn btn-light text-primary btn-lg fw-bold w-100"
                onClick={() => onNavigate && onNavigate('Register')}
              >
                Enroll Now <ArrowRight size={20} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SoftwareDevLanding;