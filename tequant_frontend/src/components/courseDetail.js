import { Layers, ClockIcon, ChevronDown, Star, Monitor, HardHat, CheckCircle,
  Calendar, User, Award, Link
 } from "lucide-react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom"; 
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const ModuleAccordion = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card mb-2 border-0 shadow-sm rounded-3 overflow-hidden">
      <div 
        className="card-header bg-white p-3 cursor-pointer d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
          <Layers size={20} className="me-2 text-primary" />
          {module.title}
        </h6>
        <div className="d-flex align-items-center text-muted small">
          <ClockIcon size={14} className="me-1" />
          <span className="me-3">{module.duration}</span>
          <ChevronDown size={20} className={`transition-all ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="card-body bg-light">
          <ul className="list-unstyled mb-0 small text-muted">
            {module.topics && module.topics.map((topic, index) => (
              <li key={index} className="py-1 d-flex align-items-center">
                <CheckCircle size={14} className="me-2 text-success opacity-75 flex-shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function CourseDetailPage() {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // State for data
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState(null);
  const [teachers, setTeachers] = useState([]); // State to hold all fetched teachers
  
  // State for UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Course, Modules, and Teachers in parallel
        const [courseRes, moduleRes, teacherRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/lmsapi/courses/${course_id}`),
          axios.get(`http://127.0.0.1:8000/lmsapi/course-module/${course_id}`),
          axios.get(`http://127.0.0.1:8000/lmsapi/teacher`) // Fetching teachers from API
        ]);

        setCourse(courseRes.data);
        setModules(moduleRes.data);
        setTeachers(teacherRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    if (course_id) {
      fetchData();
    }
  }, [course_id]);

  // Filter the fetched teachers based on the course's teacher ID(s)
  const tutors = useMemo(() => {
    if (!course || !course.teacher || teachers.length === 0) return [];
    
    // Handle case where course.teacher might be a single ID or an array of IDs
    const teacherIds = Array.isArray(course.teacher) ? course.teacher : [course.teacher];
    
    // Filter the 'teachers' state derived from the API
    return teachers.filter(tutor => teacherIds.includes(tutor.id));
  }, [course, teachers]);

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h1 className="fw-bold text-danger">404 - Course Not Found</h1>
        <p className="lead">{error || "The course you are looking for does not exist."}</p>
        <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/courses')}>
          Back to Course Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in mt-5 pt-5">
      
      {/* Hero Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <span className="badge bg-primary-subtle text-primary mb-3 text-uppercase fw-bold">
                {course.category || "General"}
              </span>
              <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
              <p className="lead text-secondary">{course.description}</p>
              
              <div className="d-flex align-items-center mt-3 gap-4">
                <div className="d-flex align-items-center text-warning">
                  <Star size={20} fill="currentColor" />
                  <span className="ms-1 fw-bold text-dark me-2">{course.rating}</span>
                  <span className="text-muted small">({course.students} enrolled)</span>
                </div>
                <div className="d-flex align-items-center text-primary">
                  <Monitor size={20} className="me-1" />
                  <span className="fw-bold small">{course.level || "All Levels"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          
          {/* Main Content Area */}
          <div className="col-lg-8">
            <h3 className="fw-bold mb-4 border-bottom pb-2">Course Curriculum</h3>
            
            {modules && modules.length > 0 ? (
                <div className="accordion">
                  {modules.map((module, idx) => (
                    <ModuleAccordion key={module.id || idx} module={module} />
                  ))}
                </div>
            ) : (
                <div className="alert alert-info">
                    Module details are coming soon! This course covers all essentials for a job-ready portfolio.
                </div>
            )}
            
            <h3 className="fw-bold my-4 border-bottom pb-2">Tutors & Mentors</h3>
            <div className="row g-3">
              {tutors.length > 0 ? tutors.map(tutor => (
                <div key={tutor.id} className="col-md-6">
                  <div className="d-flex p-3 bg-light rounded-3 shadow-sm align-items-center">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name} 
                      className="rounded-circle me-3 flex-shrink-0" 
                      style={{width: "70px", height: "70px", objectFit: "cover"}} 
                    />
                    <div>
                      <h6 className="fw-bold mb-0">{tutor.name}</h6>
                      <small className="text-primary fw-bold">{tutor.role || "Instructor"}</small>
                      <p className="small text-muted mb-0 mt-1 line-clamp-2">{tutor.bio}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-12 text-muted">
                    {/* Fallback if no matching tutors found */}
                    Instructor details updating...
                </div>
              )}
            </div>

            <h3 className="fw-bold my-4 border-bottom pb-2">Prerequisites</h3>
            <div className="d-flex flex-wrap gap-2">
              {course.prerequisites && course.prerequisites.length > 0 ? (
                course.prerequisites.map((req, index) => (
                  <span key={index} className="badge bg-secondary-subtle text-secondary py-2 px-3 rounded-pill d-flex align-items-center">
                    <HardHat size={14} className="me-1" /> {req}
                  </span>
                ))
              ) : (
                 <span className="text-muted">No specific prerequisites listed.</span>
              )}
            </div>
            
          </div>

          {/* Sidebar (CTA and Info) */}
          <div className="col-lg-4">
            <div className="card shadow-lg border-0 sticky-top" style={{top: '100px'}}>
              <img 
                src={course.image} 
                className="card-img-top object-fit-cover" 
                alt={course.title}
                style={{height: '220px'}}
              />
              <div className="card-body p-4">
                <h2 className="card-title fw-bold text-primary mb-3">
                  {course.price}
                </h2>
                
                <div className="d-grid mb-3">
                  <RouterLink to={`/enrollment/${course.id}`}>
                  <button className="btn btn-primary btn-lg fw-bold">
                    Register for this Course
                  </button>
                  </RouterLink>
                </div>
                <button className="btn btn-outline-dark w-100 mb-4">
                    Download Full Syllabus
                </button>
                
                <h6 className="fw-bold mb-3 text-muted">What you will gain:</h6>
                <ul className="list-unstyled small">
                  <li className="mb-2 d-flex align-items-center">
                    <ClockIcon size={18} className="me-2 text-primary" /> 
                    {course.durationWeeks} Weeks of Intensive Training
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <Calendar size={18} className="me-2 text-primary" /> 
                    Next Start Date: {course.startDate ? new Date(course.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBA'}
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <Award size={18} className="me-2 text-primary" /> 
                    TE Quant Professional Certificate
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <User size={18} className="me-2 text-primary" /> 
                    Lifetime Access to LMS Materials
                  </li>
                </ul>

                <hr className="my-3"/>
                <p className="small text-center text-muted mb-0">
                  Got questions? Call us on +234 800 123 4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grounding Image/Concept */}
      <div className="container pb-5 text-center">
        <p className="text-muted small mt-5">Visualizing the outcome of your {course.title} skills:</p>
      </div>
    </div>
  );
};