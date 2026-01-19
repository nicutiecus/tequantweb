import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffLoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Axios automatically converts objects to JSON
            const response = await axios.post('http://127.0.0.1:8000/lmsapi/token/', credentials);

            // Access data directly via response.data
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('username', credentials.email);
            
            navigate('/staff-dashboard');

        } catch (err) {
            console.error(err);
            // Axios wraps the backend error response in err.response
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Server error. Ensure Django is running.');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Staff Portal</h2>
                    
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" name="username" className="form-control" 
                                value={credentials.username} onChange={handleChange} required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" name="password" className="form-control" 
                                value={credentials.password} onChange={handleChange} required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StaffLoginPage;