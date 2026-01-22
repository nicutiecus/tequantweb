import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Users, LogOut, PlusCircle, Layout, DollarSign } from 'lucide-react';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('courses'); // 'courses' or 'students'
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    
    const teacherId = localStorage.getItem('teacherId');
    const teacherName = localStorage.getItem('teacherName');

    // Course Form State
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        techs: '', // Technologies/Tags
        course_image: null,
        teacher: teacherId
    });

    useEffect(() => {
        if (!teacherId) {
            navigate('/teacher-login'); // You need to create this login page
            return;
        }
        fetchMyCourses();
        fetchMyStudents();
    }, [teacherId, navigate]);

    const fetchMyCourses = () => {
        axios.get(`http://127.0.0.1:8000/lmsapi/teacher/courses/?teacher_id=${teacherId}`)
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    };

    const fetchMyStudents = () => {
        axios.get(`http://127.0.0.1:8000/lmsapi/teacher/students/?teacher_id=${teacherId}`)
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    const handleFileChange = (e) => {
        setCourseData({...courseData, course_image: e.target.files[0]});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('title', courseData.title);
        uploadData.append('description', courseData.description);
        uploadData.append('price', courseData.price);
        uploadData.append('techs', courseData.techs);
        uploadData.append('teacher', teacherId);
        if(courseData.course_image){
            uploadData.append('featured_img', courseData.course_image); // Check exact field name in Django Model
        }

        axios.post('http://127.0.0.1:8000/lmsapi/teacher/courses/', uploadData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(res => {
            alert("Course Created!");
            setShowForm(false);
            fetchMyCourses();
        })
        .catch(err => alert("Error creating course. Check field names."));
    };

    return (
        <div className="container-fluid bg-light min-vh-100" style={{ marginTop: '80px' }}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 bg-white border-end min-vh-100 p-3">
                    <div className="text-center mb-4">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" style={{width: '60px', height: '60px'}}>
                            <Layout size={30} />
                        </div>
                        <h6 className="mb-0">{teacherName}</h6>
                        <small className="text-muted">Instructor Panel</small>
                    </div>
                    
                    <nav className="nav flex-column gap-2 mt-4">
                        <button className={`btn text-start ${view === 'courses' ? 'btn-success text-white' : 'btn-light'}`} onClick={() => setView('courses')}>
                            <BookOpen size={18} className="me-2"/> My Courses
                        </button>
                        <button className={`btn text-start ${view === 'students' ? 'btn-success text-white' : 'btn-light'}`} onClick={() => setView('students')}>
                            <Users size={18} className="me-2"/> My Students
                        </button>
                    </nav>

                    <button onClick={() => { localStorage.clear(); navigate('/'); }} className="btn btn-outline-danger w-100 mt-5">
                        <LogOut size={18} className="me-2"/> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4">
                    
                    {view === 'courses' && (
                        <>
                            <div className="d-flex justify-content-between mb-4">
                                <h3>My Courses</h3>
                                <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                                    <PlusCircle size={18} className="me-2"/> Add Course
                                </button>
                            </div>

                            {showForm && (
                                <div className="card shadow-sm mb-4">
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label>Course Title</label>
                                                <input type="text" className="form-control" onChange={(e)=>setCourseData({...courseData, title:e.target.value})} required/>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label>Price</label>
                                                    <input type="number" className="form-control" onChange={(e)=>setCourseData({...courseData, price:e.target.value})} required/>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label>Technologies (Comma separated)</label>
                                                    <input type="text" className="form-control" onChange={(e)=>setCourseData({...courseData, techs:e.target.value})} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label>Description</label>
                                                <textarea className="form-control" rows="4" onChange={(e)=>setCourseData({...courseData, description:e.target.value})} required></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label>Cover Image</label>
                                                <input type="file" className="form-control" onChange={handleFileChange} />
                                            </div>
                                            <button className="btn btn-success">Save Course</button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                {courses.map(course => (
                                    <div className="col-md-4 mb-4" key={course.id}>
                                        <div className="card h-100 shadow-sm border-0">
                                            {/* Assuming serializer returns featured_img URL */}
                                            {course.featured_img && <img src={course.featured_img} className="card-img-top" style={{height:'180px', objectFit:'cover'}} alt="course"/>}
                                            <div className="card-body">
                                                <h5 className="card-title">{course.title}</h5>
                                                <p className="text-muted small">{course.description.substring(0,80)}...</p>
                                                <div className="d-flex justify-content-between fw-bold">
                                                    <span>${course.price}</span>
                                                    <span className="text-success">{course.techs}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {view === 'students' && (
                        <div>
                            <h3>Enrolled Students</h3>
                            <div className="card mt-3 border-0 shadow-sm">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Interests</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.full_name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.interested_categories}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;