import { CheckCircle } from "lucide-react";

export default function Hero (){


  return (
    <header className="bg-light pt-5 pb-5 mt-5">
      <div className="container pt-5 pb-5">
        <div className="row align-items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill">
              🚀 #1 Tech School in Port Harcourt
            </div>
            <h1 className="display-4 fw-bold mb-4 text-dark">
              Launch Your Tech Career in <span className="text-primary">Nigeria</span> & Beyond
            </h1>
            <p className="lead text-secondary mb-4">
              Master Data Analytics, Data Science, and Software Programming. 
              Join over 50+ students transforming their future with TE Quant's 
              hands-on training and mentorship.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#" className="btn btn-primary btn-lg px-4">
                Browse Courses
              </a>
              <a href="#" className="btn btn-outline-dark btn-lg px-4">
                Join August Bootcamp
              </a>
            </div>
            <div className="mt-4 pt-3 border-top d-flex gap-4">
              <div>
                <h3 className="fw-bold mb-0">50+</h3>
                <small className="text-muted">Graduates</small>
              </div>
              <div>
                <h3 className="fw-bold mb-0">15+</h3>
                <small className="text-muted">Corporate Partners</small>
              </div>
              <div>
                <h3 className="fw-bold mb-0">100%</h3>
                <small className="text-muted">Practical Training</small>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 mb-5 mb-lg-0">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Students collaborating" 
                className="img-fluid rounded-4 shadow-lg"
              />
              <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded shadow-sm d-none d-md-block">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success text-white p-2 rounded-circle">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="mb-0 fw-bold">Certified Training</p>
                    <small className="text-muted">Industry Recognized</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};