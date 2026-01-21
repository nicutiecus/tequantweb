import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PenTool, LogOut, PlusCircle, Layout, Users } from 'lucide-react';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('blogs'); // 'blogs' or 'students'
    const [blogs, setBlogs] = useState([]);
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    // Get Staff Data
    const staffName = localStorage.getItem('staffName');
    const staffId = localStorage.getItem('staffId');
    const permissions = JSON.parse(localStorage.getItem('staffPermissions') || '{}');

    // Blog Form Data state
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: staffId
    });

    useEffect(() => {
        if (!staffId) {
            navigate('/staff-login');
            return;
        }
        fetchBlogs();
        // Fetch students only if they have permission
        if (permissions.can_view_students) {
            fetchStudents();
        }
    }, [navigate, staffId]);

    const fetchBlogs = () => {
        axios.get('http://127.0.0.1:8000/lmsapi/blogs/')
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    };

    const fetchStudents = () => {
        // Pass staff_id to verify permission on backend
        axios.get(`http://127.0.0.1:8000/lmsapi/staff/students/?staff_id=${staffId}`)
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    // ... (handleSubmit for Blogs remains same) ...
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple slug generation
        const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const payload = {
            ...formData,
            slug: slug,
            author: staffId,
            is_published: permissions.can_publish // Auto-publish if they have permission
        };

        axios.post('http://127.0.0.1:8000/lmsapi/blogs/', payload)
            .then(res => {
                alert("Blog Created Successfully!");
                setShowForm(false);
                setFormData({ title: '', content: '', author: staffId });
                fetchBlogs();
            })
            .catch(err => alert("Error creating blog"));
    };

    return (
        <div className="container-fluid bg-light min-vh-100" style={{ marginTop: '80px' }}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 bg-white border-end min-vh-100 p-3">
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{width: '60px', height: '60px'}}>
                            <Layout size={30} />
                        </div>
                        <h6 className="mb-0">{staffName}</h6>
                        <small className="text-muted">Staff Panel</small>
                    </div>
                    <hr />
                    
                    {/* Navigation Buttons */}
                    <nav className="nav flex-column gap-2">
                        <button 
                            className={`btn text-start ${view === 'blogs' ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => setView('blogs')}
                        >
                            <PenTool size={18} className="me-2"/> Blog Posts
                        </button>

                        {/* Only show button if they have permission */}
                        {permissions.can_view_students && (
                            <button 
                                className={`btn text-start ${view === 'students' ? 'btn-primary' : 'btn-light'}`}
                                onClick={() => setView('students')}
                            >
                                <Users size={18} className="me-2"/> Students
                            </button>
                        )}
                    </nav>

                    <hr className="mt-auto"/>
                    <button onClick={() => { localStorage.clear(); navigate('/'); }} className="btn btn-outline-danger w-100">
                        <LogOut size={18} className="me-2"/> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4">
                    
                    {/* VIEW: BLOGS */}
                    {view === 'blogs' && (
                        <>
                            <div className="d-flex justify-content-between mb-4">
                                <h3>Blog Management</h3>
                                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                                    <PlusCircle size={18} className="me-2"/> New Post
                                </button>
                            </div>
                            {/* ... (Existing Blog List / Form UI goes here) ... */}
                            {/* Insert your existing blog rendering logic here */}
                        </>
                    )}

                    {/* VIEW: STUDENTS */}
                    {view === 'students' && (
                        <div>
                            <h3>Student List</h3>
                            <div className="card border-0 shadow-sm mt-3">
                                <div className="card-body p-0">
                                    <table className="table table-hover mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="p-3">Full Name</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Interests</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.length > 0 ? students.map(student => (
                                                <tr key={student.id}>
                                                    <td className="p-3 fw-bold">{student.full_name}</td>
                                                    <td className="p-3">{student.email}</td>
                                                    <td className="p-3">{student.interested_categories}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center p-5 text-muted">
                                                        No students found or permission denied.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;