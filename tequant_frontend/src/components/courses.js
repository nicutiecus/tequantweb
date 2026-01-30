import { useState, useMemo, useEffect } from "react";
import { Zap, Star } from "lucide-react";
import { Link } from "react-router-dom"; // Ensure this is imported
import axios from "axios";

const API_BASE = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:8000'

const CourseCard = ({ course }) => {
  // Fallback: Check for 'id', 'pk', or 'course_id' to ensure we have a valid link
  // This prevents the "undefined" URL error
  const validId = course.id || course.pk || course.course_id;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
        <div className="position-relative">
          <img 
            src={course.image} 
            className="card-img-top" 
            alt={course.title} 
            style={{height: "200px", objectFit: "cover"}} 
          />
          <span className="position-absolute top-0 end-0 m-3 badge bg-white text-primary shadow-sm">
            {course.category}
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center text-warning">
              <Star size={16} fill="currentColor" />
              <span className="ms-1 fw-bold text-dark">{course.rating}</span>
              <span className="text-muted small ms-1">({course.students})</span>
            </div>
            <span className="fw-bold text-primary">{course.price}</span>
          </div>
          <h5 className="card-title fw-bold mb-2">{course.title}</h5>
          <p className="card-text text-muted small mb-3">{course.description}</p>
          
          {/* FIXED: Dynamic Link with valid ID */}
          <Link 
            to={`/course-details/${validId}`} 
            className="btn btn-outline-primary w-100"
          >
            View Syllabus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/lmsapi/courses/`);
        
        // DEBUG: Check your browser console to see exactly what Django sends
        console.log("API Response:", response.data);

        // FIXED: Handle Django Pagination (response.data.results) vs Flat Array (response.data)
        if (Array.isArray(response.data)) {
            // Backend returned a simple list []
            setCourses(response.data);
        } else if (response.data.results && Array.isArray(response.data.results)) {
            // Backend returned paginated data { count: 5, results: [...] }
            setCourses(response.data.results);
        } else {
            console.error("Unexpected data format:", response.data);
            setCourses([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  const categories = useMemo(() => {
    if (!courses) return ['All'];
    return ['All', ...new Set(courses.map(c => c.category))];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    if (selectedCategory === 'All') return courses;
    return courses.filter(c => c.category === selectedCategory);
  }, [selectedCategory, courses]);

  // Handle recent courses safely
  const recentCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter(c => c.isRecent === true || c.is_recent === true);
  }, [courses]);

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center d-flex justify-content-center align-items-center" style={{minHeight: "50vh"}}>
         <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
    );
  }

  if (error) {
     return (
        <div className="container py-5 mt-5 text-center">
           <h3 className="text-danger">{error}</h3>
        </div>
     );
  }

  return (
    <div className="animate-fade-in mt-5 pt-5">
      {/* Course Hero */}
      <div className="bg-dark text-white py-5">
        <div className="container py-4 text-center">
          <span className="badge bg-warning text-dark mb-3">Learn In-Demand Skills</span>
          <h1 className="display-4 fw-bold mb-3">Invest in Your Future</h1>
          <p className="lead opacity-90 mx-auto" style={{maxWidth: "700px"}}>
            From beginner to advanced, our courses are designed to get you job-ready for the global tech market.
          </p>
        </div>
      </div>

      {/* Recent Courses Section */}
      {recentCourses.length > 0 && (
        <section className="py-5 bg-light border-bottom">
          <div className="container">
            <div className="d-flex align-items-center mb-4">
               <div className="bg-primary text-white p-2 rounded-circle me-2">
                 <Zap size={20} /> 
               </div>
               <h3 className="fw-bold mb-0">New Arrivals</h3>
            </div>
            
            <div className="row">
               {recentCourses.map(course => (
                 <div key={course.id || course.pk} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm border-start border-4 border-primary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="badge bg-primary-subtle text-primary">{course.category}</span>
                          <small className="text-success fw-bold">New</small>
                        </div>
                        <h5 className="fw-bold mb-2">{course.title}</h5>
                        <p className="text-muted small mb-3">{course.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{course.price}</span>
                          
                          {/* FIXED: Link for Recent Courses */}
                          {/* We check id, pk, and course_id to catch whatever the DB sends */}
                          <Link 
                             to={`/course-details/${course.id || course.pk || course.course_id}`}
                             className="btn btn-sm btn-outline-dark"
                           >
                             Details
                           </Link>
                      
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Course Catalog */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4">Browse All Courses</h2>
            
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`btn rounded-pill px-4 ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            {filteredCourses.length > 0 ? (
               filteredCourses.map(course => (
                 <CourseCard key={course.id || course.pk} course={course} />
               ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No courses found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ / Support CTA */}
      <section className="bg-primary-subtle py-5">
         <div className="container text-center">
           <h3 className="fw-bold mb-3">Not sure where to start?</h3>
           <p className="mb-4">Our academic advisors are available to guide you on the right path.</p>
           <button className="btn btn-primary btn-lg">Chat with an Advisor</button>
         </div>
      </section>
    </div>
  );
};