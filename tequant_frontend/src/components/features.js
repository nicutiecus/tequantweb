import { BookOpen, User, Shield } from "lucide-react";

export default function Features ()  {
  return (
    <section className="py-5 bg-light" id="features">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Why Choose TE Quant?</h2>
            <p className="text-muted">We don't just teach code; we build careers. Our curriculum is tailored for the Nigerian tech ecosystem.</p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-center text-md-start">
              <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                <BookOpen size={32} />
              </div>
              <h4>Practical Curriculum</h4>
              <p className="text-muted">Learn with real-world datasets from Nigerian industries like FinTech, Oil & Gas, and Telecoms.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-center text-md-start">
              <div className="d-inline-flex p-3 rounded-circle bg-success-subtle text-success mb-3">
                <User size={32} />
              </div>
              <h4>Expert Mentors</h4>
              <p className="text-muted">Get guided by professionals working in top tech firms in Port Harcourt and Lagos.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-sm h-100 text-center text-md-start">
              <div className="d-inline-flex p-3 rounded-circle bg-warning-subtle text-warning mb-3">
                <Shield size={32} />
              </div>
              <h4>Job Support</h4>
              <p className="text-muted">We help refine your CV, optimize your LinkedIn, and connect you with hiring partners.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
