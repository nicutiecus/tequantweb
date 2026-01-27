import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  LogOut, 
  User, 
  Bell, 
  Search,
  Award,
  TrendingUp,
  MoreVertical,
  Settings,
  Shield,
  Save
} from 'lucide-react';

const StudentDashboard = ({user }) => {
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: '',
        email: '',
        password: '',
        interested_categories: '',
        profile_img: null

  })
  // 1. SECURITY FIX: Get email from Storage instead of URL
  const studentID = localStorage.getItem('studentId') || user?.id;
  const studentEmail = localStorage.getItem('studentEmail' || user?.email);



  // 2. BACKEND CONNECTION: Fetch Real Courses
  useEffect(() => {
    if (!studentID) {
      alert("Please log in first.");
      navigate('/');
      return;
    }

    axios.get(`http://127.0.0.1:8000/lmsapi/my-courses/${studentEmail}/`)
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching courses", err);
        setLoading(false);
      });
  }, [studentEmail, navigate]);
  //dummy
  const studentName = "tamar"
  // Mock Data
  const enrolledCourses = [
    { 
      id: 1, 
      title: 'Full-Stack Software Development', 
      instructor: 'Dr. Alan Turing',
      progress: 65, 
      total_modules: 12, 
      completed_modules: 8, 
      last_accessed: '2 hours ago',
      image_color: 'bg-primary'
    },
    { 
      id: 2, 
      title: 'Algorithmic Trading Strategies', 
      instructor: 'Jane Doe',
      progress: 20, 
      total_modules: 8, 
      completed_modules: 2, 
      last_accessed: '1 day ago',
      image_color: 'bg-success'
    },
    { 
      id: 3, 
      title: 'Python for Data Science', 
      instructor: 'John Smith',
      progress: 0, 
      total_modules: 10, 
      completed_modules: 0, 
      last_accessed: 'Never',
      image_color: 'bg-warning'
    }
  ];

  const assignments = [
    { id: 1, title: 'Build a React Todo App', course: 'Full-Stack Software Development', due: 'Oct 30, 2023', status: 'Pending', type: 'Project' },
    { id: 2, title: 'Market Analysis Report', course: 'Algorithmic Trading', due: 'Nov 05, 2023', status: 'Pending', type: 'Essay' },
    { id: 3, title: 'Python Syntax Quiz', course: 'Python for Data Science', due: 'Oct 15, 2023', status: 'Graded', score: '85%' },
  ];

  

  const handleLogout = () => {
    localStorage.removeItem('studentEmail');
    navigate('/');
  };

  return (
    <div className="d-flex min-vh-100 bg-light font-sans overflow-hidden" style={{marginTop: '80px'}}>
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`bg-dark text-white d-flex flex-column transition-all ${sidebarOpen ? 'w-250px' : 'w-80px'}`} 
        style={{ minWidth: sidebarOpen ? '250px' : '80px', transition: 'width 0.3s' }}
      >
        <div className="p-4 d-flex align-items-center justify-content-between">
          {sidebarOpen && <span className="fw-bold h5 mb-0 text-white">TE Quant <span className="text-info">Student</span></span>}
          <button className="btn btn-link text-white-50 p-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
          </button>
        </div>

        <nav className="flex-grow-1 px-3 mt-4">
          <NavItem 
            icon={BookOpen} 
            label="My Courses" 
            active={activeTab === 'courses'} 
            onClick={() => setActiveTab('courses')} 
            expanded={sidebarOpen} 
          />
          <NavItem 
            icon={FileText} 
            label="Assignments" 
            active={activeTab === 'assignments'} 
            onClick={() => setActiveTab('assignments')} 
            expanded={sidebarOpen} 
          />
          <NavItem 
            icon={Award} 
            label="Certificates" 
            active={activeTab === 'certificates'} 
            onClick={() => setActiveTab('certificates')} 
            expanded={sidebarOpen} 
          />
          <NavItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            expanded={sidebarOpen} 
          />
        </nav>

        <div className="p-3 border-top border-secondary mt-auto">
          <button className="btn btn-link text-danger text-decoration-none d-flex align-items-center w-100" onClick={handleLogout}>
            <LogOut size={20} className={sidebarOpen ? "me-3" : "mx-auto"} />
            {sidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow-1 d-flex flex-column h-100 overflow-auto">
        
        {/* Top Header */}
        <header className="bg-white border-bottom p-3 px-4 d-flex justify-content-between align-items-center sticky-top shadow-sm">
          <div>
            <h4 className="mb-0 fw-bold text-dark">{activeTab === 'courses' ? 'My Learning' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h4>
            <p className="text-muted small mb-0">Welcome back, {studentName}!</p>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-block position-relative">
               <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
               <input type="text" className="form-control bg-light border-0 ps-5 rounded-pill" placeholder="Search..." />
            </div>
            
            <button className="btn btn-light position-relative rounded-circle p-2">
              <Bell size={20} className="text-secondary" />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            
            <div className="d-flex align-items-center gap-2 border-start ps-3 ms-2">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 35, height: 35}}>
                {studentName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 flex-grow-1">
          
          {/* --- COURSES TAB --- */}
          {activeTab === 'courses' && (
            <>
              {/* Stats Overview */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm bg-primary text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="mb-1 opacity-75">Courses in Progress</p>
                          <h2 className="fw-bold mb-0">2</h2>
                        </div>
                        <div className="bg-white bg-opacity-25 p-2 rounded">
                          <TrendingUp size={24} />
                        </div>
                      </div>
                      <div className="mt-3 small opacity-75">Keep it up!</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                   <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted mb-1">Completed Modules</p>
                          <h2 className="fw-bold mb-0 text-dark">10</h2>
                        </div>
                        <div className="bg-success bg-opacity-10 text-success p-2 rounded">
                          <CheckCircle size={24} />
                        </div>
                      </div>
                      <div className="mt-3 small text-success">Total across all courses</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                   <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="text-muted mb-1">Pending Assignments</p>
                          <h2 className="fw-bold mb-0 text-dark">2</h2>
                        </div>
                        <div className="bg-warning bg-opacity-10 text-warning p-2 rounded">
                          <Clock size={24} />
                        </div>
                      </div>
                      <div className="mt-3 small text-warning">Next due: Oct 30</div>
                    </div>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold mb-3">Enrolled Courses</h5>
              <div className="row g-4">
                {enrolledCourses.map(course => (
                  <div className="col-lg-6 col-xl-4" key={course.id}>
                    <div className="card border-0 shadow-sm h-100 hover-shadow transition">
                      {/* Course Image Placeholder */}
                      <div className={`card-img-top ${course.image_color} d-flex align-items-center justify-content-center text-white`} style={{height: 140}}>
                        <BookOpen size={48} className="opacity-50" />
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between mb-2">
                           <span className="badge bg-light text-dark border">Software Dev</span>
                           <button className="btn btn-link p-0 text-muted"><MoreVertical size={18} /></button>
                        </div>
                        <h5 className="card-title fw-bold mb-1">{course.title}</h5>
                        <p className="card-text text-muted small mb-3">Instr. {course.instructor}</p>
                        
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>{course.progress}% Complete</span>
                            <span>{course.completed_modules}/{course.total_modules} Modules</span>
                          </div>
                          <div className="progress mb-3" style={{height: 6}}>
                            <div 
                              className={`progress-bar ${course.progress === 100 ? 'bg-success' : 'bg-primary'}`} 
                              role="progressbar" 
                              style={{width: `${course.progress}%`}}
                            ></div>
                          </div>
                          
                          <button 
                            className="btn btn-outline-primary w-100 fw-bold d-flex align-items-center justify-content-center"
                            onClick={() => navigate && navigate({ page: 'CourseDetail', id: course.id })}
                          >
                            {course.progress > 0 ? 'Continue Learning' : 'Start Course'} 
                            <PlayCircle size={16} className="ms-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Course Card */}
                <div className="col-lg-6 col-xl-4">
                    <div className="card border-0 shadow-sm h-100 border-dashed bg-light d-flex align-items-center justify-content-center" style={{borderStyle: 'dashed', minHeight: 300}}>
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-circle shadow-sm d-inline-block mb-3">
                                <Search size={24} className="text-primary" />
                            </div>
                            <h6 className="fw-bold">Explore New Courses</h6>
                            <p className="text-muted small mb-3">Browse our catalog to find<br/>your next skill.</p>
                            <button className="btn btn-sm btn-primary" onClick={() => navigate && navigate('Home')}>Browse Catalog</button>
                        </div>
                    </div>
                </div>
              </div>
            </>
          )}

          {/* --- ASSIGNMENTS TAB --- */}
          {activeTab === 'assignments' && (
             <div className="card border-0 shadow-sm">
               <div className="card-header bg-white py-3">
                 <h5 className="mb-0 fw-bold">Assignment Board</h5>
               </div>
               <div className="table-responsive">
                 <table className="table table-hover align-middle mb-0">
                   <thead className="bg-light">
                     <tr>
                       <th className="px-4 py-3 border-0 text-muted small text-uppercase">Assignment</th>
                       <th className="py-3 border-0 text-muted small text-uppercase">Course</th>
                       <th className="py-3 border-0 text-muted small text-uppercase">Type</th>
                       <th className="py-3 border-0 text-muted small text-uppercase">Due Date</th>
                       <th className="py-3 border-0 text-muted small text-uppercase">Status</th>
                       <th className="py-3 border-0 text-muted small text-uppercase text-end px-4">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {assignments.map(assign => (
                       <tr key={assign.id}>
                         <td className="px-4 fw-bold">{assign.title}</td>
                         <td className="text-muted">{assign.course}</td>
                         <td><span className="badge bg-light text-dark border">{assign.type}</span></td>
                         <td className={assign.status === 'Pending' ? 'text-danger fw-bold' : 'text-muted'}>{assign.due}</td>
                         <td>
                            {assign.status === 'Pending' && <span className="badge bg-warning text-dark">Pending</span>}
                            {assign.status === 'Graded' && <span className="badge bg-success">Graded ({assign.score})</span>}
                            {assign.status === 'Submitted' && <span className="badge bg-info">Submitted</span>}
                         </td>
                         <td className="text-end px-4">
                           {assign.status === 'Pending' ? (
                             <button className="btn btn-sm btn-primary">Submit</button>
                           ) : (
                             <button className="btn btn-sm btn-light text-muted">View</button>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* --- CERTIFICATES TAB --- */}
          {activeTab === 'certificates' && (
            <div className="text-center py-5">
                <div className="bg-light p-5 rounded-circle d-inline-block mb-3">
                    <Award size={48} className="text-muted opacity-50" />
                </div>
                <h4>No Certificates Yet</h4>
                <p className="text-muted">Complete a course to earn your first certificate!</p>
            </div>
          )}

          {/* --- SETTINGS TAB --- */}
          {activeTab === 'settings' && (
             <SettingsSection initialUser={{name: studentName, email: studentEmail}} />
          )}

        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENT: Sidebar Items ---
const NavItem = ({ icon: Icon, label, active, onClick, expanded }) => (
  <button 
    onClick={onClick}
    className={`btn w-100 d-flex align-items-center mb-2 border-0 py-3 ${active ? 'bg-primary text-white shadow' : 'text-white-50 hover-bg-dark-light'}`}
    style={{ borderRadius: '8px' }}
  >
    <Icon size={20} className={expanded ? "me-3" : "mx-auto"} />
    {expanded && <span>{label}</span>}
  </button>
);

// --- SUB-COMPONENT: Settings Section ---
const SettingsSection = ({ initialUser }) => {
  const [profileData, setProfileData] = useState({
    full_name: initialUser.name,
    email: initialUser.email,
    bio: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const studentID = localStorage.getItem('studentId');

  const handleProfileUpdate = (e) => {
        e.preventDefault();
        
        const uploadData = new FormData();
        uploadData.append('full_name', profileData.full_name);
        uploadData.append('interested_categories', profileData.interested_categories);
        
        // Only send password if the user actually typed something new
        if (profileData.password) {
            uploadData.append('password', profileData.password);
        }
        
        // Only send image if it's a new file (not just the URL string)
        if (profileData.profile_img instanceof File) {
            uploadData.append('profile_img', profileData.profile_img);
        }

        axios.put(`http://127.0.0.1:8000/lmsapi/student/profile/${studentID}/`, uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            alert("Profile Updated Successfully!");
            window.location.reload(); // Reload to clear password field & show new image
        })
        .catch(err => {
            console.log(err);
            alert("Error updating profile");
        });
    };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      alert("Password changed successfully!");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="row g-4">
      {/* Profile Details Card */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white py-3 border-bottom-0">
            <h5 className="fw-bold mb-0 d-flex align-items-center">
              <User size={20} className="me-2 text-primary" /> Profile Details
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  value={profileData.full_name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Email Address</label>
                <input 
                  type="email" 
                  className="form-control bg-light" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled
                />
                <small className="text-muted">Contact support to change email.</small>
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">Bio</label>
                <textarea 
                  className="form-control bg-light" 
                  rows="3" 
                  placeholder="Tell us a little about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Saving...' : <><Save size={18} className="me-2" /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white py-3 border-bottom-0">
            <h5 className="fw-bold mb-0 d-flex align-items-center">
              <Shield size={20} className="me-2 text-danger" /> Security
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Current Password</label>
                <input 
                  type="password" 
                  className="form-control bg-light" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">New Password</label>
                <input 
                  type="password" 
                  className="form-control bg-light" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-control bg-light" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-danger" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;