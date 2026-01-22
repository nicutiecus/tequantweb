import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PenTool, LogOut, PlusCircle, Layout, Users, Image as ImageIcon } from 'lucide-react';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('blogs');
    const [blogs, setBlogs] = useState([]);
    const [students, setStudents] = useState([]);
    const [categories, setCategories] = useState([]); // Store categories
    const [showForm, setShowForm] = useState(false);
    
    // Staff Data
    const staffName = localStorage.getItem('staffName');
    const staffId = localStorage.getItem('staffId');
    const permissions = JSON.parse(localStorage.getItem('staffPermissions') || '{}');

    // Form State (Modified for File Upload)
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        category: '',
        image: null, // New field for file
        status: 'draft'
    });

    useEffect(() => {
        if (!staffId) {
            navigate('/staff-login');
            return;
        }
        fetchBlogs();
        fetchCategories(); // Get dropdown options
        
        if (permissions.can_view_students) {
            fetchStudents();
        }
    }, [navigate, staffId]);

    const fetchBlogs = () => {
        // Updated URL to point to the blog app
        axios.get('http://127.0.0.1:8000/blogapi/posts/')
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    };

    const fetchCategories = () => {
        axios.get('http://127.0.0.1:8000/blogapi/categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    };

    const fetchStudents = () => {
        axios.get(`http://127.0.0.1:8000/lmsapi/staff/students/?staff_id=${staffId}`)
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 1. Validation: Ensure a category is actually selected
        if (!formData.category) {
            alert("Please select a Category first.");
            return;
        }
        
        // 1. Create FormData Object (Required for Image Upload)
        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('body', formData.body); // Note: Model uses 'body' not 'content'
        uploadData.append('author', staffId);
        uploadData.append('category', parseInt(formData.category));
        uploadData.append('status', formData.status);
        if (formData.image) {
            uploadData.append('image', formData.image);
        }

        // 2. Post to Backend
        axios.post('http://127.0.0.1:8000/blogapi/posts/', uploadData)
        .then(res => {
            alert("Blog Created Successfully!");
            setShowForm(false);
            // Reset Form
            setFormData({ title: '', body: '', category: '', image: null, status: 'draft' });
            fetchBlogs();
        })
        .catch(err => {
            console.log(err.response); // Check Console for details
            
            // This will alert the specific field error
            if (err.response && err.response.data) {
                alert("Error: " + JSON.stringify(err.response.data));
            } else {
                alert("Error creating blog");
            }
            //console.error(err);
            //alert("Error creating blog. Check if category is selected.");
        });
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
                    
                    <nav className="nav flex-column gap-2 mt-4">
                        <button className={`btn text-start ${view === 'blogs' ? 'btn-primary' : 'btn-light'}`} onClick={() => setView('blogs')}>
                            <PenTool size={18} className="me-2"/> Blog Posts
                        </button>
                        {permissions.can_view_students && (
                            <button className={`btn text-start ${view === 'students' ? 'btn-primary' : 'btn-light'}`} onClick={() => setView('students')}>
                                <Users size={18} className="me-2"/> Students
                            </button>
                        )}
                    </nav>

                    <button onClick={() => { localStorage.clear(); navigate('/'); }} className="btn btn-outline-danger w-100 mt-5">
                        <LogOut size={18} className="me-2"/> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4">
                    
                    {/* BLOG SECTION */}
                    {view === 'blogs' && (
                        <>
                            <div className="d-flex justify-content-between mb-4">
                                <h3>Blog Management</h3>
                                {permissions.can_create && (
                                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                                        <PlusCircle size={18} className="me-2"/> New Post
                                    </button>
                                )}
                            </div>

                            {showForm ? (
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header bg-white">
                                        <h5 className="mb-0">Write New Article</h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-8 mb-3">
                                                    <label className="form-label">Title</label>
                                                    <input type="text" className="form-control" required 
                                                        value={formData.title} 
                                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                    />
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label className="form-label">Category</label>
                                                    <select className="form-select" required
                                                        value={formData.category} 
                                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    >
                                                        <option value="">Select Category...</option>
                                                        {categories.map(cat => (
                                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Featured Image</label>
                                                <input type="file" className="form-control" onChange={handleFileChange} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Content</label>
                                                <textarea className="form-control" rows="8" required
                                                    value={formData.body} 
                                                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                                                ></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Status</label>
                                                <select className="form-select" 
                                                    value={formData.status} 
                                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                >
                                                    <option value="draft">Draft</option>
                                                    {permissions.can_publish && <option value="published">Published</option>}
                                                </select>
                                                {!permissions.can_publish && <small className="text-muted">You do not have permission to publish directly.</small>}
                                            </div>

                                            <button className="btn btn-success" type="submit">Save Blog</button>
                                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {blogs.map(blog => (
                                        <div className="col-md-6 mb-3" key={blog.id}>
                                            <div className="card h-100 border-0 shadow-sm">
                                                {blog.image && <img src={blog.image} className="card-img-top" alt={blog.title} style={{height: '200px', objectFit: 'cover'}} />}
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <span className="badge bg-light text-dark mb-2">{blog.category_title}</span>
                                                        <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                            {blog.status}
                                                        </span>
                                                    </div>
                                                    <h5 className="card-title">{blog.title}</h5>
                                                    <p className="card-text text-muted small">{blog.body.substring(0, 100)}...</p>
                                                    <small className="text-muted">By {blog.author_name}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* STUDENT SECTION (Reused from previous step) */}
                    {view === 'students' && (
                        <div>
                            <h3>Student List</h3>
                            <div className="card border-0 shadow-sm mt-3">
                                <div className="card-body p-0">
                                    <table className="table table-hover mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Interests</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map(s => (
                                                <tr key={s.id}>
                                                    <td className="p-3 fw-bold">{s.full_name}</td>
                                                    <td className="p-3">{s.email}</td>
                                                    <td className="p-3">{s.interested_categories}</td>
                                                </tr>
                                            ))}
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