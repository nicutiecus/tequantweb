import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../staff/sidebar';
import axios from 'axios';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    // useCallback ensures this function is stable for the useEffect dependency array
    const fetchPostData = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            // Parallel requests for efficiency
            const [postRes, commentRes] = await Promise.all([
                axios.get(`http://127.0.0.1:8000/blog/posts/${id}/`, config),
                axios.get(`http://127.0.0.1:8000/blog/comments/?post=${id}`, config)
            ]);

            setPost(postRes.data);
            setComments(commentRes.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPostData();
    }, [fetchPostData]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        try {
            // Axios POST: URL, Data, Config
            await axios.post(
                'http://127.0.0.1:8000/api/comments/', 
                { post: id, content: newComment }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewComment('');
            fetchPostData(); // Refresh comments
        } catch (error) {
            console.error("Error posting comment:", error);
            alert('Failed to post comment.');
        }
    };

    if (loading) return <div className="p-5 text-center">Loading...</div>;
    if (!post) return <div className="p-5 text-center">Post not found.</div>;

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4 bg-white" style={{ height: '100vh', overflowY: 'auto' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    
                    <Link to="/staff-dashboard" className="btn btn-outline-secondary mb-4">
                        &larr; Back to Dashboard
                    </Link>

                    <article className="mb-5">
                        <div className="mb-2">
                            <span className={`badge ${post.status === 'published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {post.status.toUpperCase()}
                            </span>
                            <span className="text-muted ms-3">
                                {new Date(post.publish).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 className="display-4 fw-bold mb-3">{post.title}</h1>

                        <div className="text-muted fst-italic mb-4">
                            Author ID: {post.author}
                        </div>

                        {post.image && (
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="img-fluid rounded mb-4 w-100"
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        )}

                        <div className="fs-5 lh-lg" style={{ whiteSpace: 'pre-wrap' }}>
                            {post.body}
                        </div>
                    </article>

                    <hr />

                    <section className="mt-5 mb-5">
                        <h3>Comments ({comments.length})</h3>
                        
                        <div className="list-group mb-4 mt-3">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="list-group-item p-3">
                                        <div className="d-flex justify-content-between">
                                            <h6 className="fw-bold mb-1">User {comment.author}</h6>
                                            <small className="text-muted">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </small>
                                        </div>
                                        <p className="mb-1">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No comments yet.</p>
                            )}
                        </div>

                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Leave a Comment</h5>
                                <form onSubmit={handleCommentSubmit}>
                                    <div className="mb-3">
                                        <textarea 
                                            className="form-control" 
                                            rows="3" 
                                            placeholder="Write your comment here..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit Comment</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;