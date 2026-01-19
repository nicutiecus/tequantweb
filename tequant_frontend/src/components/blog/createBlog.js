import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../staff/sidebar';
import axios from 'axios';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        category: '',
        status: 'draft',
        image: null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setPostData({ ...postData, image: e.target.files[0] });
        } else {
            setPostData({ ...postData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        
        formData.append('title', postData.title);
        formData.append('body', postData.body);
        formData.append('category', postData.category);
        formData.append('status', postData.status);
        if (postData.image) {
            formData.append('image', postData.image);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Axios handles Content-Type for FormData automatically
                }
            });

            alert('Blog post created successfully!');
            navigate('/staff-dashboard');

        } catch (error) {
            console.error('Error:', error);
            // Safe access to error message
            const errMsg = error.response?.data ? JSON.stringify(error.response.data) : 'Failed to create post';
            alert(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4 bg-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="mb-4">Write a New Blog Post</h2>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input 
                                        type="text" name="title" className="form-control" 
                                        value={postData.title} onChange={handleChange} required 
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Category ID</label>
                                        <input 
                                            type="number" name="category" className="form-control" 
                                            placeholder="e.g. 1"
                                            value={postData.category} onChange={handleChange} required 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Status</label>
                                        <select 
                                            name="status" className="form-select" 
                                            value={postData.status} onChange={handleChange}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Featured Image</label>
                                    <input 
                                        type="file" name="image" className="form-control" 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Content</label>
                                    <textarea 
                                        name="body" className="form-control" rows="10" 
                                        value={postData.body} onChange={handleChange} required
                                    ></textarea>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                        {loading ? 'Publishing...' : 'Publish Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;