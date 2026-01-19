import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

export default function NewEnrollmentPage() {
  
  const { course_id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    email: ""
  });
  const [error, setError] = useState(null);

  console.log("The Course ID is:", course_id);

  // Fetch course name to display on the form
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/lmsapi/courses/${course_id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err));
  }, [course_id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Send data to backend
      const response = await axios.post('http://127.0.0.1:8000/lmsapi/enrollment/', {
        course: course_id,
        ...formData
      });
      
      // 2. If successful, show success message
      if (response.status === 201) {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Registration failed. Please check your details or try again.");
      console.error(err);
      if (err.response && err.response.data) {
          // This will print the specific Django error (e.g., {"course": ["Invalid pk"]})
          console.log("Server Validation Errors:", err.response.data); 
          alert(`Server Error: ${JSON.stringify(err.response.data)}`);
      } else {
          setError("Registration failed.");
      }
  

    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="card shadow-sm border-0 mx-auto" style={{maxWidth: '500px'}}>
          <div className="card-body p-5">
            <CheckCircle size={60} className="text-success mb-3" />
            <h2 className="fw-bold">Registration Successful!</h2>
            <p className="text-muted lead">
              We have sent a confirmation link to <strong>{formData.email}</strong>.
            </p>
            <div className="alert alert-info small">
              Please check your email (and spam folder) and click the link to proceed to the secure checkout page to complete your enrollment.
            </div>
            <button onClick={() => navigate('/')} className="btn btn-outline-primary">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary text-white p-4">
              <h3 className="mb-0 fw-bold">Student Enrollment</h3>
              <p className="mb-0 opacity-75">
                {course ? `Registering for: ${course.title}` : "Loading course details..."}
              </p>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <AlertCircle size={18} className="me-2" /> {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><User size={18}/></span>
                    <input 
                      type="text" 
                      name="first_name"
                      className="form-control" 
                      required 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text"><Mail size={18}/></span>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control" 
                      required 
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-text">We'll send your access link here.</div>
                </div>

                
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg fw-bold" disabled={loading}>
                    {loading ? "Processing..." : "Complete Enrollment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}