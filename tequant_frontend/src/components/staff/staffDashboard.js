import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';

const StaffDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) setUsername(storedUser);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please login again.");
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        const token = localStorage.getItem('accessToken');
        
        try {
            await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh the list after successful delete
            fetchPosts(); 
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post.");
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4 bg-light">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 className="h3">Staff Dashboard</h1>
                            <p className="text-muted">Welcome back, <strong>{username || 'Staff Member'}</strong>!</p>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Your Blog History</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Title</th>
                                        <th>Date Created</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length > 0 ? (
                                        posts.map(post => (
                                            <tr key={post.id}>
                                                <td>{post.title}</td>
                                                <td>{new Date(post.created).toLocaleDateString()}</td>
                                                <td><span className="badge bg-secondary">{post.status}</span></td>
                                                <td>
                                                    <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4">No posts found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;