import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clears token and username
        navigate('/staff-login');
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', minHeight: '100vh' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Staff Portal</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/staff-dashboard" className="nav-link text-white">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/create-blog" className="nav-link text-white">
                        <i className="bi bi-pencil-square me-2"></i>
                        Create Blog
                    </Link>
                </li>
                <li>
                    <Link to="/edit-profile" className="nav-link text-white">
                        <i className="bi bi-person-circle me-2"></i>
                        Edit Profile
                    </Link>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <button onClick={handleLogout} className="btn btn-danger w-100">
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;