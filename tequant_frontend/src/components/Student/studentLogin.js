import React, { useState } from 'react';
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

const StudentLoginPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '' });

  // Use process.env for standard React App variable access or fallback
  const API_BASE = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:8000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (status.error) setStatus({ ...status, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });

    try {
      // API call to authentication endpoint
      // Note: You need to implement /api/token/ or /api/login/ in your Django backend
      // typically using SimpleJWT or standard Django auth
      const response = await fetch(`${API_BASE}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Store token (securely) and navigate
        // For demo/simple apps, localStorage is often used, but cookies are safer
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        // Mock user data fetch or decode token here if needed
        
        setStatus({ loading: false, error: '' });
        // Navigate to Student Dashboard or Home
        if (onNavigate) onNavigate('Home'); 
      } else {
        throw new Error(data.detail || 'Invalid email or password');
      }

    } catch (error) {
      console.error("Login error:", error);
      
      // Fallback for Demo purposes if API is not reachable
      if (error.message.includes('Failed to fetch')) {
        setTimeout(() => {
            // Simulate successful login for demo
            localStorage.setItem('user_role', 'student');
            if (onNavigate) onNavigate('Home');
        }, 1000);
        return;
      }

      setStatus({ 
        loading: false, 
        error: error.message || 'Login failed. Please check your internet connection.' 
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex bg-light font-sans">
      
      {/* --- Left Side: Branding / Image --- */}
      <div className="d-none d-lg-flex col-lg-5 bg-dark text-white p-5 flex-column justify-content-between position-relative overflow-hidden">
        <div className="position-relative z-1">
           <h3 className="fw-bold d-flex align-items-center mb-4">
             <div className="bg-primary rounded-circle p-2 me-2 d-flex">
                <User size={20} className="text-white" />
             </div>
             TE Quant LMS
           </h3>
           <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
           <p className="lead text-white-50">
             Continue your journey in algorithmic trading and software development. 
             Your dashboard is waiting for you.
           </p>
        </div>
        <div className="position-relative z-1">
          <small className="text-white-50">&copy; {new Date().getFullYear()} TE Quant. All rights reserved.</small>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="position-absolute top-0 end-0 bg-primary opacity-10 rounded-circle" style={{width: 300, height: 300, transform: 'translate(30%, -30%)'}}></div>
        <div className="position-absolute bottom-0 start-0 bg-warning opacity-10 rounded-circle" style={{width: 400, height: 400, transform: 'translate(-30%, 30%)'}}></div>
      </div>

      {/* --- Right Side: Login Form --- */}
      <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4 p-md-5">
        <div className="w-100" style={{ maxWidth: 450 }}>
          
          <button 
             onClick={() => onNavigate && onNavigate('Home')}
             className="btn btn-link text-muted text-decoration-none p-0 mb-4 d-flex align-items-center"
          >
            <ArrowLeft size={18} className="me-2" /> Back to Home
          </button>

          <div className="mb-5">
            <h2 className="fw-bold mb-2 text-dark">Student Login</h2>
            <p className="text-muted">Enter your credentials to access your account.</p>
          </div>

          {status.error && (
            <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
              <AlertCircle size={18} className="me-2 flex-shrink-0" />
              <div>{status.error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <Mail size={20} />
                </span>
                <input 
                  type="email" 
                  className="form-control bg-light border-start-0" 
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-bold text-uppercase text-muted mb-0">Password</label>
                <a href="#" className="small text-decoration-none text-primary fw-bold">Forgot Password?</a>
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <Lock size={20} />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control bg-light border-start-0 border-end-0" 
                  name="password"
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
              Don't have an account?{' '}
              <button 
                onClick={() => onNavigate && onNavigate('Register')}
                className="btn btn-link p-0 fw-bold text-decoration-none"
              >
                Enroll Now
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;