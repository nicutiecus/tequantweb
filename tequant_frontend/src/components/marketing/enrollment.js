import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  CheckCircle, 
  ArrowLeft, 
  BookOpen, 
  Send,
  Layers 
} from 'lucide-react';

const EnrollmentPage = ({ onNavigate, selectedCourse = "" }) => {
  // Initialize course with prop if provided, otherwise empty
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: selectedCourse
  });
  
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  // Use process.env for standard React App variable access or fallback
  const API_BASE = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:8000'; 

  // --- Fetch Courses on Mount ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE}/lmsapi/courses/`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch course list");
          // Fallback for demo if API fails
          setCourses([
            { id: 1, title: 'Full-Stack Software Development' },
            { id: 2, title: 'Data Analytics with Python' },
            { id: 3, title: 'Algorithmic Trading' }
          ]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback for demo
        setCourses([
            { id: 1, title: 'Full-Stack Software Development' },
            { id: 2, title: 'Data Analytics with Python' },
            { id: 3, title: 'Algorithmic Trading' }
        ]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [API_BASE]);

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

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        course: formData.course // Use the selected course from form data
      };

      const response = await fetch(`${API_BASE}/lmsapi/enrollment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({
          loading: false,
          message: `Successfully enrolled in ${formData.course}! Check your email for next steps.`,
          type: 'success'
        });
        setFormData({ name: '', email: '', course: '' }); 
      } else {
        const errorData = await response.json();
        // Handle specific serializer errors (e.g., course not found)
        const errorMsg = errorData.course ? `Course Error: ${errorData.course}` : (errorData.detail || 'Enrollment failed.');
        throw new Error(errorMsg);
      }

    } catch (error) {
      console.error("Enrollment error:", error);
      
      // Fallback Demo Logic
      if (error.message && error.message.includes('Failed to fetch')) {
        setTimeout(() => {
            setStatus({
                loading: false,
                message: `(Demo) Successfully enrolled in ${formData.course}!`,
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
          <div className="col-lg-10 col-xl-9">
            
            {/* Back Button */}
            <button 
              onClick={() => onNavigate && onNavigate('Home')} 
              className="btn btn-link text-decoration-none text-muted mb-4 d-flex align-items-center p-0"
            >
              <ArrowLeft size={18} className="me-2" /> Back to Home
            </button>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                
                {/* Header Section (Bootstrap Styles) */}
                <div className="col-md-5 bg-primary text-white p-5 text-center position-relative overflow-hidden d-flex flex-column justify-content-center">
                    <div className="position-relative z-1">
                        <div className="bg-white bg-opacity-25 rounded-circle p-3 d-inline-flex mb-3">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="fw-bold mb-2">Secure Your Spot</h2>
                        <p className="text-white-50 mb-0">
                            Join our next cohort and <br/><span className="fw-bold text-warning">Start Learning</span>
                        </p>
                    </div>
                    {/* Decorative Background Circles */}
                    <div className="position-absolute top-0 start-0 translate-middle rounded-circle bg-white opacity-10" style={{width: '200px', height: '200px'}}></div>
                    <div className="position-absolute bottom-0 end-0 translate-middle rounded-circle bg-white opacity-10" style={{width: '150px', height: '150px'}}></div>
                </div>

                {/* Form Section */}
                <div className="col-md-7 p-5 bg-white">
                  
                  {status.message && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-4`} role="alert">
                       {status.type === 'success' && <CheckCircle size={18} className="me-2 flex-shrink-0" />}
                       <div>{status.message}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    
                    {/* Full Name Input */}
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><User size={20} className="text-muted" /></span>
                        <input
                          type="text"
                          className="form-control bg-light border-start-0"
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><Mail size={20} className="text-muted" /></span>
                        <input
                          type="email"
                          className="form-control bg-light border-start-0"
                          id="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Course Selection Dropdown */}
                    <div className="mb-4">
                      <label htmlFor="course" className="form-label small fw-bold text-muted text-uppercase">Select Course</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0"><Layers size={20} className="text-muted" /></span>
                        <select
                          className="form-select bg-light border-start-0"
                          id="course"
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          required
                          disabled={loadingCourses}
                        >
                          <option value="" disabled>
                            {loadingCourses ? "Loading courses..." : "Choose a course..."}
                          </option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.title}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="d-grid mt-5">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg fw-bold d-flex align-items-center justify-content-center"
                        disabled={status.loading || loadingCourses}
                      >
                        {status.loading ? (
                          'Processing...'
                        ) : (
                          <>
                            Complete Enrollment <Send size={18} className="ms-2" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <small className="text-muted">
                        By clicking "Complete Enrollment", you agree to our <a href="#" className="text-decoration-none">Terms</a>.
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="text-center mt-4 text-muted small d-flex justify-content-center gap-3">
                <span>🔒 SSL Secured</span>
                <span>•</span>
                <span>24/7 Support</span>
                <span>•</span>
                <span>Money-back Guarantee</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;