import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff,
  User,
  ArrowLeft
} from 'lucide-react';

const TeacherLoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (status.error) setStatus({ ...status, error: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });

    const loginUrl = 'http://127.0.0.1:8000/lmsapi/teacher-login/';

    axios.post(loginUrl, formData)
      .then(res => {
        if (res.data.bool === true) {
          // 1. Save email to LocalStorage (Required for Dashboard)
          localStorage.setItem('teacherEmail', res.data.email);
          localStorage.setItem('teacherId', res.data.teacher_id); // Optional: if needed later
          localStorage.setItem('teacherName', res.data.full_name);
          // 2. Save Permissions (Required for Dashboard logic)
          // We must stringify it because localStorage only stores strings
          //localStorage.setItem('staffPermissions', JSON.stringify(res.data.permissions));

          // 2. Redirect to Dashboard
          navigate('/teacher-dashboard');
        } else {
          setStatus({ loading: false, error: 'Invalid Email or Password' });
        }
      })
      .catch(err => {
        console.error(err);
        setStatus({ 
          loading: false, 
          error: err.response?.data?.msg || 'Login Failed. Please try again.' 
        });
      });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4" style={{ marginTop: '80px' }}>
      <div className="card shadow-lg border-0 overflow-hidden" style={{ maxWidth: '1000px', width: '100%', borderRadius: '20px' }}>
        <div className="row g-0">
          
          {/* Left Side - Visual */}
          <div className="col-lg-6 bg-primary text-white p-5 d-flex flex-column justify-content-between position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)',
                   backgroundSize: '100% 100%' 
                 }}>
            </div>
            
            <div className="position-relative z-1">
              <button onClick={() => navigate('/')} className="btn btn-outline-light btn-sm mb-4 border-0 d-flex align-items-center gap-2 ps-0">
                <ArrowLeft size={18} /> Back to Home
              </button>
              <h2 className="display-5 fw-bold mb-4">Staff Portal</h2>
              <p className="lead text-white-50 mb-4">
                Manage blog posts, view student data, and handle administrative tasks.
              </p>
            </div>

            <div className="position-relative z-1 text-center">
               {/* Illustration placeholder or icon */}
               <User size={120} className="text-white-50" />
            </div>
            
            <div className="text-center position-relative z-1 mt-4">
               <small className="text-white-50">TE Quant Resources Learning Portal</small>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 p-5 bg-white">
            <div className="text-center mb-5">
              <h3 className="fw-bold text-dark mb-2">Teacher Login</h3>
              <p className="text-muted">Enter your credentials to access your account</p>
            </div>

            {status.error && (
              <div className="alert alert-danger d-flex align-items-center mb-4 border-0 bg-danger bg-opacity-10 text-danger rounded-3">
                <AlertCircle size={20} className="me-2 flex-shrink-0" />
                <small>{status.error}</small>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Mail size={20} />
                  </span>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control bg-light border-start-0 ps-0 py-3" 
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                  <a href="#" className="small text-primary text-decoration-none fw-bold">Forgot Password?</a>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Lock size={20} />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    className="form-control bg-light border-start-0 border-end-0 ps-0 py-3" 
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button"
                    className="input-group-text bg-light border-start-0 text-muted cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember me for 30 days</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 fw-bold d-flex align-items-center justify-content-center shadow-sm"
                disabled={status.loading}
              >
                {status.loading ? 'Signing In...' : <>Sign In <ArrowRight size={18} className="ms-2" /></>}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-muted">
                <small>
                Need access? Contact the Main Administrator to create your teacher account.
                </small>
    
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginPage;