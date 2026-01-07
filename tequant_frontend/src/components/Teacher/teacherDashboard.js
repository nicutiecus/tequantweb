import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  ClipboardList, 
  Plus, 
  Search, 
  LogOut, 
  Bell,
  Settings,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';

const TeacherDashboard = ({ onNavigate, user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Dummy User if not provided
  const teacherName = user?.name || "Instructor";

  const handleLogout = () => {
    // Implement logout logic here
    if (onNavigate) onNavigate('Home');
  };

  return (
    <div className="d-flex min-vh-100 bg-light font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className={`bg-dark text-white d-flex flex-column transition-all ${sidebarOpen ? 'w-250px' : 'w-80px'}`} style={{ minWidth: sidebarOpen ? '250px' : '80px', transition: '0.3s' }}>
        <div className="p-4 d-flex align-items-center justify-content-between">
          {sidebarOpen && <span className="fw-bold h5 mb-0 text-white">TE Quant <span className="text-primary">Admin</span></span>}
          <button className="btn btn-link text-white-50 p-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
            <div style={{ width: 20, height: 2, background: 'currentColor', margin: '4px 0' }}></div>
          </button>
        </div>

        <nav className="flex-grow-1 px-3 mt-4">
          <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} expanded={sidebarOpen} />
          <NavItem icon={BookOpen} label="My Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} expanded={sidebarOpen} />
          <NavItem icon={Users} label="Students" active={activeTab === 'students'} onClick={() => setActiveTab('students')} expanded={sidebarOpen} />
          <NavItem icon={ClipboardList} label="Assessments" active={activeTab === 'assessments'} onClick={() => setActiveTab('assessments')} expanded={sidebarOpen} />
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
        <header className="bg-white border-bottom p-3 px-4 d-flex justify-content-between align-items-center sticky-top">
          <h4 className="mb-0 fw-bold text-dark text-capitalize">{activeTab}</h4>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative rounded-circle p-2">
              <Bell size={20} className="text-secondary" />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 35, height: 35}}>
                {teacherName.charAt(0)}
              </div>
              <span className="small fw-bold d-none d-md-block">{teacherName}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-4 flex-grow-1">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'courses' && <CoursesSection />}
          {activeTab === 'students' && <StudentsSection />}
          {activeTab === 'assessments' && <AssessmentsSection />}
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENT: Sidebar Nav Item ---
const NavItem = ({ icon: Icon, label, active, onClick, expanded }) => (
  <button 
    onClick={onClick}
    className={`btn w-100 d-flex align-items-center mb-2 border-0 py-3 ${active ? 'bg-primary text-white' : 'text-white-50 hover-bg-dark-light'}`}
    style={{ borderRadius: '8px' }}
  >
    <Icon size={20} className={expanded ? "me-3" : "mx-auto"} />
    {expanded && <span>{label}</span>}
  </button>
);

// --- SECTION: Overview ---
const OverviewSection = () => (
  <div className="row g-4">
    {/* Stats Cards */}
    <div className="col-md-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-muted small mb-1">Total Students</p>
              <h3 className="fw-bold mb-0">1,240</h3>
            </div>
            <div className="p-2 bg-success bg-opacity-10 text-success rounded">
              <Users size={20} />
            </div>
          </div>
          <small className="text-success fw-bold mt-3 d-block">↑ 12% vs last month</small>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-muted small mb-1">Active Courses</p>
              <h3 className="fw-bold mb-0">8</h3>
            </div>
            <div className="p-2 bg-primary bg-opacity-10 text-primary rounded">
              <BookOpen size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-muted small mb-1">Pending Assignments</p>
              <h3 className="fw-bold mb-0">45</h3>
            </div>
            <div className="p-2 bg-warning bg-opacity-10 text-warning rounded">
              <FileText size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="text-muted small mb-1">Avg. Rating</p>
              <h3 className="fw-bold mb-0">4.8</h3>
            </div>
            <div className="p-2 bg-info bg-opacity-10 text-info rounded">
              <Settings size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Activity / Quick Actions */}
    <div className="col-lg-8">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-bottom py-3">
          <h5 className="mb-0 fw-bold">Recent Enrollments</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 text-muted small text-uppercase px-4">Student</th>
                  <th className="border-0 text-muted small text-uppercase">Course</th>
                  <th className="border-0 text-muted small text-uppercase">Date</th>
                  <th className="border-0 text-muted small text-uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 fw-bold">John Doe</td>
                  <td>Software Development</td>
                  <td>Oct 24, 2023</td>
                  <td><span className="badge bg-success bg-opacity-10 text-success">Active</span></td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Jane Smith</td>
                  <td>Algorithmic Trading</td>
                  <td>Oct 23, 2023</td>
                  <td><span className="badge bg-warning bg-opacity-10 text-warning">Pending</span></td>
                </tr>
                <tr>
                  <td className="px-4 fw-bold">Michael Brown</td>
                  <td>Data Analytics</td>
                  <td>Oct 22, 2023</td>
                  <td><span className="badge bg-success bg-opacity-10 text-success">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-header bg-white border-bottom py-3">
          <h5 className="mb-0 fw-bold">Quick Actions</h5>
        </div>
        <div className="card-body">
          <button className="btn btn-outline-primary w-100 mb-2 text-start d-flex align-items-center">
            <Plus size={18} className="me-2" /> Create New Course
          </button>
          <button className="btn btn-outline-dark w-100 mb-2 text-start d-flex align-items-center">
            <Bell size={18} className="me-2" /> Send Announcement
          </button>
          <button className="btn btn-outline-dark w-100 text-start d-flex align-items-center">
            <FileText size={18} className="me-2" /> Grade Assignments
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- SECTION: Courses ---
const CoursesSection = () => {
  const [showForm, setShowForm] = useState(false);
  
  // Mock API call to create course
  const handleCreateCourse = (e) => {
    e.preventDefault();
    alert("Course created successfully (Mock)!");
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0 fw-bold">Manage Courses</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} className="me-2" /> Add New Course
        </button>
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm mb-4 bg-light">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">Create New Course</h5>
            <form onSubmit={handleCreateCourse}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Course Title</label>
                  <input type="text" className="form-control" placeholder="e.g. Advanced React Patterns" required />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Subject</label>
                  <select className="form-select">
                    <option>Software Dev</option>
                    <option>Finance</option>
                    <option>Data Science</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Price (₦)</label>
                  <input type="number" className="form-control" placeholder="200000" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Course summary..."></textarea>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Publish Course</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course List Grid */}
      <div className="row g-4">
        {[1, 2, 3].map((id) => (
          <div className="col-md-4" key={id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span className="badge bg-info bg-opacity-10 text-info">Software Dev</span>
                  <div className="dropdown">
                    <button className="btn btn-link text-muted p-0" type="button">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
                <h5 className="fw-bold">Full-Stack Development Bootcamp</h5>
                <p className="text-muted small">12 weeks intensive training covering React, Django, and Cloud deployment.</p>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <small className="text-muted"><Users size={14} className="me-1" /> 45 Students</small>
                  <span className="fw-bold text-primary">₦200,000</span>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 d-flex gap-2">
               <Link to="/edit-course-details"> <button className="btn btn-outline-dark btn-sm flex-grow-1"><Edit size={14} className="me-1" /> Edit</button></Link>
                <button className="btn btn-outline-danger btn-sm"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SECTION: Students ---
const StudentsSection = () => (
  <div className="card border-0 shadow-sm">
    <div className="card-header bg-white py-3 border-bottom-0 d-flex justify-content-between align-items-center">
      <div className="position-relative w-50">
        <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
        <input type="text" className="form-control ps-5 bg-light border-0" placeholder="Search students by name or email..." />
      </div>
      <button className="btn btn-outline-dark"><FileText size={18} className="me-2" /> Export CSV</button>
    </div>
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="px-4 py-3 border-0 text-secondary small text-uppercase">Name</th>
            <th className="py-3 border-0 text-secondary small text-uppercase">Email</th>
            <th className="py-3 border-0 text-secondary small text-uppercase">Enrolled Course</th>
            <th className="py-3 border-0 text-secondary small text-uppercase">Progress</th>
            <th className="py-3 border-0 text-secondary small text-uppercase text-end px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-4 fw-bold">
                <div className="d-flex align-items-center">
                  <div className="bg-secondary bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center me-3" style={{width: 32, height: 32}}>
                    <span className="small text-secondary fw-bold">JD</span>
                  </div>
                  John Doe
                </div>
              </td>
              <td className="text-muted">john.doe@example.com</td>
              <td><span className="badge bg-light text-dark border">Software Dev</span></td>
              <td className="w-25">
                <div className="d-flex align-items-center">
                  <div className="progress flex-grow-1" style={{height: 6}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '65%'}}></div>
                  </div>
                  <small className="ms-2 text-muted">65%</small>
                </div>
              </td>
              <td className="text-end px-4">
                <button className="btn btn-sm btn-light text-primary fw-bold">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="card-footer bg-white py-3">
      <nav>
        <ul className="pagination justify-content-center mb-0">
          <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
);

// --- SECTION: Assessments ---
const AssessmentsSection = () => {
  const [type, setType] = useState('assignment'); // 'assignment' or 'exam'

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="btn-group">
          <button 
            className={`btn ${type === 'assignment' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setType('assignment')}
          >
            Assignments
          </button>
          <button 
            className={`btn ${type === 'exam' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setType('exam')}
          >
            Exams
          </button>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} className="me-2" /> 
          {type === 'assignment' ? 'Create Assignment' : 'Set Exam'}
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">{type === 'assignment' ? 'Active Assignments' : 'Scheduled Exams'}</h5>
            </div>
            <div className="list-group list-group-flush">
              {[1, 2, 3].map(i => (
                <div className="list-group-item p-4 d-flex justify-content-between align-items-center" key={i}>
                  <div>
                    <h6 className="fw-bold mb-1">
                      {type === 'assignment' ? 'Build a React Todo App' : 'Mid-Term Theory Assessment'}
                    </h6>
                    <p className="text-muted small mb-0">
                      Course: Software Development • Due: Oct 30, 2023
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-warning text-dark">24 Submitted</span>
                    <button className="btn btn-sm btn-outline-primary">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm bg-primary text-white">
             <div className="card-body p-4">
               <h5 className="fw-bold mb-3">Quick Guide</h5>
               <p className="small opacity-75">
                 {type === 'assignment' 
                   ? "Assignments allow students to upload files or submit GitHub links. You can set deadlines and maximum scores."
                   : "Exams are timed assessments. You can create multiple choice, short answer, or code-based questions."}
               </p>
               <button className="btn btn-light text-primary fw-bold w-100 mt-2">View Tutorial</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;