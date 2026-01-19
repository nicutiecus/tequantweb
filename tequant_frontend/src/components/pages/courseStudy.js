import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseStudy = () => {
    const { course_id } = useParams();
    const navigate = useNavigate();
    const studentEmail = localStorage.getItem('studentEmail');

    const [permission, setPermission] = useState(null);
    const [modules, setModules] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    // 1. CHECK PERMISSION
    useEffect(() => {
        if (!studentEmail) {
            alert("Please login first");
            navigate('/');
            return;
        }

        axios.get(`http://127.0.0.1:8000/lmsapi/check-enrollment/${course_id}/${studentEmail}/`)
            .then(res => {
                setPermission(true);
                fetchCourseContent();
            })
            .catch(err => {
                setPermission(false);
            });
    }, [course_id, studentEmail, navigate]);

    const fetchCourseContent = () => {
        axios.get(`http://127.0.0.1:8000/lmsapi/course-modules/${course_id}/`)
            .then(res => {
                setModules(res.data);
            })
            .catch(err => console.log(err));
    };

    if (permission === null) {
        // LOADING STATE (With spacing)
        return <div className="text-center p-5" style={{ marginTop: '80px' }}>Checking Permission...</div>;
    }
    
    if (permission === false) {
        // DENIED STATE (With spacing)
        return (
            <div className="container text-center" style={{ marginTop: '100px' }}>
                <div className="alert alert-danger shadow-sm d-inline-block p-5">
                    <h3>🚫 Access Denied</h3>
                    <p>You have not purchased this course yet.</p>
                    <Link to={`/detail/${course_id}`} className="btn btn-danger mt-3">Go to Enrollment Page</Link>
                </div>
            </div>
        );
    }

    return (
        // APPLIED SPACING RULE HERE
        <div className="container-fluid" style={{ marginTop: '80px' }}>
            <div className="row">
                {/* VIDEO PLAYER SECTION */}
                <div className="col-md-9 bg-black p-5 text-center d-flex align-items-center justify-content-center" style={{minHeight: '85vh'}}>
                    {currentVideo ? (
                        <video controls className="w-100 shadow-lg" style={{maxHeight: '75vh', borderRadius: '10px'}}>
                            <source src={currentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="text-white">
                            <h3>Select a topic from the right to start watching</h3>
                            <p className="text-white-50">Click on any module to expand the lesson list.</p>
                        </div>
                    )}
                </div>

                {/* SIDEBAR (Now fits perfectly under navbar) */}
                <div className="col-md-3 bg-light border-start overflow-auto p-0" style={{height: '85vh'}}>
                    <div className="p-3 border-bottom bg-white sticky-top">
                        <h5 className="mb-0 fw-bold">Course Content</h5>
                    </div>
                    <div className="accordion accordion-flush" id="accordionExample">
                        {modules.map((module, index) => (
                            <div className="accordion-item" key={module.id}>
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                        {module.title}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body p-0">
                                        <ul className="list-group list-group-flush">
                                            {module.topics.map(topic => (
                                                <li key={topic.id} className="list-group-item list-group-item-action border-0 py-3" 
                                                    style={{cursor: 'pointer', fontSize: '0.95rem'}}
                                                    onClick={() => setCurrentVideo(topic.video)}
                                                >
                                                    <i className="bi bi-play-circle-fill me-2 text-primary"></i>
                                                    {topic.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseStudy;