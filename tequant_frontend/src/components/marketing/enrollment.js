import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  CheckCircle, 
  ArrowLeft, 
  BookOpen, 
  Send 
} from 'lucide-react';

/**
 * Enrollment Page Component
 * Handles the registration logic for new students joining a specific course.
 * * Props:
 * - onNavigate: Function to handle navigation back to home or other pages.
 * - selectedCourse: (Optional) Name of the course to enroll in. Defaults to "Software Development".
 */
const EnrollmentPage = ({ onNavigate, selectedCourse = "Full-Stack Software Development" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    // 1. Get API URL from environment variables (best practice)
    // For Vite use import.meta.env.VITE_API_URL, for CRA use process.env.REACT_APP_API_URL
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000'; 

    try {
      // 2. Prepare the payload matching your "Enrollment" database table structure
      const payload = {
        name: formData.name,
        email: formData.email,
        course: selectedCourse 
      };

      // 3. Send POST request to backend
      // Note: You will need to create a corresponding view in your Django backend at /api/enroll/
      const response = await fetch(`${API_BASE}/lmsapi/enroll/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({
          loading: false,
          message: `Successfully enrolled in ${selectedCourse}! Check your email for next steps.`,
          type: 'success'
        });
        setFormData({ name: '', email: '' }); // Clear form
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Enrollment failed. Please try again.');
      }

    } catch (error) {
      console.error("Enrollment error:", error);
      // Fallback for demo purposes if backend isn't ready
      // Remove this block when real backend is connected
      if (error.message.includes('Failed to fetch')) {
        // Simulate success for UI testing
        setTimeout(() => {
            setStatus({
                loading: false,
                message: `(Demo) Successfully enrolled in ${selectedCourse}!`,
                type: 'success'
              });
        }, 1000);
        return;
      }

      setStatus({
        loading: false,
        message: error.message || 'An error occurred. Please try again later.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5 font-sans">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            
            {/* Back Button */}
            <button 
              onClick={() => onNavigate && onNavigate('Home')} 
              className="btn btn-link text-decoration-none text-muted mb-4 d-flex align-items-center p-0"
            >
              <ArrowLeft size={18} className="me-2" /> Back to Course Details
            </button>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Header Section */}
                <div className="col-12 bg-primary text-white p-4 p-md-5 text-center position-relative overflow-hidden">
                    <div className="position-relative z-1">
                        <div className="bg-white bg-opacity-25 rounded-circle p-3 d-inline-flex mb-3">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="fw-bold mb-2">Secure Your Spot</h2>
                        <p className="opacity-90 mb-0">
                            Join the next cohort for <span className="fw-bold text-warning">{selectedCourse}</span>
                        </p>
                    </div>
                    {/* Decorative Background Circles */}
                    <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-white opacity-10" style={{width: 200, height: 200}}></div>
                    <div className="position-absolute bottom-0 end-0 translate-middle-x rounded-circle bg-white opacity-10" style={{width: 150, height: 150}}></div>
                </div>

                {/* Form Section */}
                <div className="col-12 bg-white p-4 p-md-5">
                  
                  {status.message && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-4`} role="alert">
                       {status.type === 'success' ? <CheckCircle size={18} className="me-2" /> : null}
                       {status.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label fw-bold text-secondary small text-uppercase">Full Name</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <User size={20} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-light border-start-0 ps-0"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-bold text-secondary small text-uppercase">Email Address</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <Mail size={20} className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className="form-control bg-light border-start-0 ps-0"
                          id="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-text mt-2">
                        We'll send the syllabus and fee payment details to this email.
                      </div>
                    </div>

                    <div className="d-grid mt-5">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg fw-bold py-3 shadow-sm hover-lift"
                        disabled={status.loading}
                      >
                        {status.loading ? (
                          <>Processing...</>
                        ) : (
                          <>
                            Complete Enrollment <Send size={18} className="ms-2" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <small className="text-muted">
                        By clicking "Complete Enrollment", you agree to our <Link to="" className="text-decoration-none">Terms</Link> and <Link to="" className="text-decoration-none">Privacy Policy</Link>.
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="text-center mt-4 text-muted opacity-75">
                <small className="d-flex justify-content-center gap-3 align-items-center">
                    <span>🔒 SSL Secured</span>
                    <span>•</span>
                    <span>24/7 Support</span>
                    <span>•</span>
                    <span>Money-back Guarantee</span>
                </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;