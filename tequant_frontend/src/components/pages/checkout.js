import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:8000'


const Checkout = () => {
    const { enrollment_id } = useParams();
    const navigate = useNavigate();
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Enrollment Details
    useEffect(() => {
        axios.get(`${API_BASE}/lmsapi/checkout-info/${enrollment_id}/`)
            .then(res => {
                setEnrollment(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching checkout info", err);
                setLoading(false);
            });
    }, [enrollment_id]);

    // 2. The Manual Paystack Function
    const payWithPaystack = (e) => {
        e.preventDefault();

        // Check if script loaded
        if (!window.PaystackPop) {
            alert("Paystack failed to load. Please refresh and try again.");
            return;
        }

        const handler = window.PaystackPop.setup({
            key: 'pk_test_8da51ceba21d91b9e0d6578f217fc0a7b6ba0939', // REPLACE WITH YOUR PUBLIC KEY
            email: enrollment.email,
            amount: Math.ceil(enrollment.course.price * 100), // Convert to kobo/cents
            currency: 'NGN',
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a random ref
            metadata: {
                custom_fields: [
                    {
                        display_name: "Full Name",
                        variable_name: "full_name",
                        value: enrollment.first_name
                    },
                ]
            },
            callback: function(response) {
                // Payment Complete! Send reference to backend
                axios.post('http://127.0.0.1:8000/lmsapi/verify-payment/', {
                    reference: response.reference,
                    enrollment_id: enrollment_id
                })
                .then(res => {
                    localStorage.setItem('studentEmail', res.data.email);
                    localStorage.setItem('studentEmail', enrollment.email);
                    if (res.data.student_exists === true) {
            // CASE A: Student already has an account -> Dashboard
                        alert("Payment Verified! Welcome back.");
                        navigate('/student-dashboard');
                    } else {
            // CASE B: New Student -> Registration Page
                        alert("Payment Verified! Please create your password.");
                        navigate('/student-registration', { 
                        state: { 
                        email: res.data.email, 
                        first_name: res.data.first_name 
                } 
            });
        }
                })
                .catch(err => alert("Payment verified failed. Please contact support."));
            },
            onClose: function() {
                alert('Transaction was not completed, window closed.');
            }
        });

        handler.openIframe();
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    if (!enrollment) return <div className="p-5 text-center text-danger">Invalid Link</div>;

    return (
        <div className="container py-5 mt-5">
            <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-header bg-dark text-white text-center py-4">
                    <h3>Secure Checkout</h3>
                </div>
                <div className="card-body p-4">
                    <h5 className="text-muted">Course:</h5>
                    <h4>{enrollment.course.title}</h4>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <span className="fw-bold">Total Due:</span>
                        <span className="fs-4 text-success fw-bold">
                            ₦{Number(enrollment.course.price).toLocaleString()}
                        </span>
                    </div>

                    <button 
                        className="btn btn-success btn-lg w-100"
                        onClick={payWithPaystack} // <--- Calls our manual function
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;