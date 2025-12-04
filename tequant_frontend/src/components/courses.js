import { useState, useMemo } from "react";
import { Zap, Star } from "lucide-react";

 const CourseCard = ({ course }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="card h-100 border-0 shadow-sm hover-lift transition-all">
      <div className="position-relative">
        <img src={course.image} className="card-img-top" alt={course.title} style={{height: "200px", objectFit: "cover"}} />
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
        <button className="btn btn-outline-primary w-100">View Syllabus</button>
      </div>
    </div>
  </div>
);

const COURSES = [
  {
    id: 1,
    title: "Data Analytics with Python",
    category: "Data Science",
    price: "₦150,000",
    rating: 4.8,
    students: 120,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Master data visualization and analysis using Python, Pandas, and Matplotlib.",
    isRecent: false
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    category: "Programming",
    price: "₦200,000",
    rating: 4.9,
    students: 85,
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Build dynamic websites from scratch using React, Django, and MySQL.",
    isRecent: false
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    category: "Security",
    price: "₦180,000",
    rating: 4.7,
    students: 60,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn to protect networks and systems from digital attacks and threats.",
    isRecent: false
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    price: "₦140,000",
    rating: 4.8,
    students: 45,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn Figma, wireframing, and design thinking principles.",
    isRecent: true
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    price: "₦120,000",
    rating: 4.6,
    students: 90,
    image: "https://images.unsplash.com/photo-1533750349088-cd877a9239d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "SEO, SEM, and Social Media Marketing strategies for Nigerian businesses.",
    isRecent: true
  },
  {
    id: 6,
    title: "Mobile App Dev with Flutter",
    category: "Programming",
    price: "₦180,000",
    rating: 4.9,
    students: 30,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Build native iOS and Android apps with a single codebase using Dart.",
    isRecent: true
  }
];

export default function CoursesPage ()  {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Extract Categories
  const categories = useMemo(() => {
    return ['All', ...new Set(COURSES.map(c => c.category))];
  }, []);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'All') return COURSES;
    return COURSES.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const recentCourses = useMemo(() => {
    return COURSES.filter(c => c.isRecent);
  }, []);

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
               <div key={course.id} className="col-lg-4 col-md-6 mb-4">
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
                        <a href="#" className="btn btn-sm btn-outline-dark">Details</a>
                      </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Main Course Catalog */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4">Browse All Courses</h2>
            
            {/* Filter Pills */}
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
                 <CourseCard key={course.id} course={course} />
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