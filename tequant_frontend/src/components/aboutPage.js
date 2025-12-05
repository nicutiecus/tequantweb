import { Link } from "react-router-dom";
import { Users, Lightbulb, Target, Rocket, Award, ArrowRight } from "lucide-react";

const TUTORS = [
  {
    id: 1,
    name: "Nikson Kejeh",
    role: "Founder & Lead Data Science Instructor",
    bio: "Ex-Google Data Scientist with a passion for bringing world-class tech education to the Niger Delta. Specializes in Python and ML.",
    image: ""
  },
  {
    id: 2,
    name: "OSamuyi Osaghae",
    role: "Digital Marketing",
    bio: "Marketing expert specializing in Social media marketing. Consults for companies in PH.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Comfort Asukwo",
    role: "Community Manager",
    bio: "Ensures every student gets the support they need. Sarah manages our bootcamps and student events.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];
export default function AboutPage ({onNavigate}) {
  return (
    <div className="animate-fade-in mt-5 pt-5">
      {/* About Hero Section */}
      <div className="bg-dark text-white py-5">
        <div className="container py-4 text-center">
          <h1 className="display-4 fw-bold mb-3">About TE Quant</h1>
          <p className="lead opacity-90 mx-auto" style={{maxWidth: "800px"}}>
            Empowering the Niger Delta's next generation of digital leaders. We provide practical, 
            job-focused training in Data Science, AI, and Software Development right here in Port Harcourt.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="#mission" className="btn btn-outline-light">Our Mission</a>
            <a href="#team" className="btn btn-primary">Meet the Tutors</a>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-3 text-uppercase fw-bold">Our Core</span>
              <h2 className="fw-bold mb-4">Driving Tech Innovation from the Heart of PH</h2>
              
              <div className="mb-4">
                <h4 className="fw-bold d-flex align-items-center text-primary"><Target size={24} className="me-2"/> Vision</h4>
                <p className="text-muted ps-4 mb-0">To be the foremost tech education institute in the South-South region, recognized globally for producing highly skilled, industry-ready talent.</p>
              </div>

              <div>
                <h4 className="fw-bold d-flex align-items-center text-primary"><Rocket size={24} className="me-2"/> Mission</h4>
                <p className="text-muted ps-4 mb-0">To provide intensive, project-based training and mentorship that bridges the gap between academic knowledge and industry demands, ensuring every graduate secures high-value employment.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1549492476-c5608c02824e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Port Harcourt city skyline" 
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Values</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "600px"}}>The principles that guide our teaching, our curriculum, and our community.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 rounded-4 h-100 text-center border">
                <Users size={40} className="text-primary mb-3" />
                <h4 className="fw-bold">Community Focus</h4>
                <p className="text-muted small">We build a strong support network, fostering collaboration and peer-to-peer learning among students and alumni.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 h-100 text-center border">
                <Lightbulb size={40} className="text-primary mb-3" />
                <h4 className="fw-bold">Practical Mastery</h4>
                <p className="text-muted small">Our teaching is 100% project-based, ensuring graduates have demonstrable skills and a strong portfolio, not just theory.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-4 h-100 text-center border">
                <Award size={40} className="text-primary mb-3" />
                <h4 className="fw-bold">Local Impact</h4>
                <p className="text-muted small">We tailor our curriculum to the needs of Nigerian companies, driving local tech ecosystem growth and relevance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Expert Tutors</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "700px"}}>
              Learn from the best. Our instructors bring real-world experience from international tech firms and leading Nigerian companies directly to the classroom.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {TUTORS.map(tutor => (
              <div key={tutor.id} className="col-md-6 col-lg-4">
                <div className="card h-100 text-center border-0 shadow-sm p-3 hover-lift">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="rounded-circle mx-auto mb-3 object-fit-cover" 
                    style={{width: "120px", height: "120px"}} 
                  />
                  <h5 className="fw-bold mb-1">{tutor.name}</h5>
                  <p className="text-primary fw-bold small mb-2">{tutor.role}</p>
                  <p className="text-muted small mb-0">{tutor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="lead mb-4 mx-auto" style={{maxWidth: "800px"}}>
            Whether you are a student, a professional looking to switch careers, or a corporate team needing upskilling, TE Quant is your partner for success.
          </p>
          <Link to="courses" className="btn btn-light btn-lg fw-bold" onClick={onNavigate}>
            Explore All Programs <ArrowRight size={20} className="ms-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};