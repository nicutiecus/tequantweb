import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // We captured 'first_name' during enrollment/checkout
    const initialEmail = location.state?.email || '';
    const initialFirstName = location.state?.first_name || '';

    const [formData, setFormData] = useState({
        first_name: initialFirstName, // Prefilled
        surname: '',                  // User enters this
        other_name: '',               // Optional
        email: initialEmail,
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        // Send split data to backend
        axios.post('http://127.0.0.1:8000/lmsapi/student-register/', {
            email: formData.email,
            surname: formData.surname,
            first_name: formData.first_name,
            other_name: formData.other_name,
            password: formData.password
        })
        .then(res => {
            alert("Registration Complete! Welcome.");
            localStorage.setItem('studentEmail', formData.email);
            navigate('/student-dashboard');
        })
        .catch(err => {
            console.log(err);
            alert("Error creating profile. Please try again.");
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '100px', minHeight: '60vh' }}>
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 className="text-center mb-4">Complete Your Profile</h3>
                <div className="alert alert-success small text-center">
                    Payment verified! Please confirm your details below.
                </div>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* 1. FIRST NAME (First, Pre-filled & Compulsory) */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">First Name <span className="text-danger">*</span></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="first_name"
                            value={formData.first_name} 
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* 2. SURNAME (Second & Compulsory) */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Surname <span className="text-danger">*</span></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="surname"
                            value={formData.surname} 
                            onChange={handleChange} 
                            placeholder="e.g. Kejeh"
                            required
                        />
                    </div>

                    {/* 3. OTHER NAME (Optional) */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Other Name <span className="text-muted">(Optional)</span></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="other_name"
                            value={formData.other_name} 
                            onChange={handleChange}
                            placeholder="Middle name"
                        />
                    </div>

                    {/* EMAIL (Read Only) */}
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control bg-light" 
                            name="email"
                            value={formData.email} 
                            readOnly 
                        />
                    </div>

                    {/* PASSWORD FIELDS */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password <span className="text-danger">*</span></label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label className="form-label">Confirm <span className="text-danger">*</span></label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="confirm_password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                        Save & Go to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;