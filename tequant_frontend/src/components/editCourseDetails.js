import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronDown, 
  ChevronRight,
  Video,
  FileText
} from 'lucide-react';

const EditCourseDetails = ({ onNavigate, courseId }) => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    subject: '',
    modules: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  // Mock API URL
  const API_BASE = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || 'http://localhost:8000';

  useEffect(() => {
    const fetchCourse = async () => {
      // In a real app, fetch from API using courseId
      // For now, we simulate loading data
      setTimeout(() => {
        setCourse({
          id: courseId || 1,
          title: "Full-Stack Development Bootcamp",
          description: "Comprehensive guide to web development.",
          price: "200000",
          subject: "Software Development",
          modules: [
            {
              id: 1,
              title: "Introduction to Web",
              topics: [
                { id: 101, title: "HTML Basics", type: 'video' },
                { id: 102, title: "CSS Fundamentals", type: 'reading' }
              ]
            },
            {
              id: 2,
              title: "React Essentials",
              topics: [
                { id: 201, title: "Components & Props", type: 'video' }
              ]
            }
          ]
        });
        setLoading(false);
        // Auto-expand first module
        setExpandedModules({ 1: true });
      }, 800);
    };

    fetchCourse();
  }, [courseId]);

  // --- Handlers for Course Info ---
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  // --- Handlers for Modules ---
  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const addModule = () => {
    const newModule = {
      id: Date.now(), // Temporary ID
      title: "New Module",
      topics: []
    };
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    setExpandedModules(prev => ({ ...prev, [newModule.id]: true }));
  };

  const updateModuleTitle = (moduleId, newTitle) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === moduleId ? { ...m, title: newTitle } : m)
    }));
  };

  const removeModule = (moduleId) => {
    if (window.confirm("Are you sure? This will delete all topics inside this module.")) {
      setCourse(prev => ({
        ...prev,
        modules: prev.modules.filter(m => m.id !== moduleId)
      }));
    }
  };

  // --- Handlers for Topics ---
  const addTopic = (moduleId) => {
    const newTopic = {
      id: Date.now(),
      title: "New Topic",
      type: 'video'
    };
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          return { ...m, topics: [...m.topics, newTopic] };
        }
        return m;
      })
    }));
  };

  const updateTopic = (moduleId, topicId, field, value) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          const updatedTopics = m.topics.map(t => 
            t.id === topicId ? { ...t, [field]: value } : t
          );
          return { ...m, topics: updatedTopics };
        }
        return m;
      })
    }));
  };

  const removeTopic = (moduleId, topicId) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.map(m => {
        if (m.id === moduleId) {
          return { ...m, topics: m.topics.filter(t => t.id !== topicId) };
        }
        return m;
      })
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    alert("Course saved successfully!");
    if (onNavigate) onNavigate('TeacherDashboard');
  };

  if (loading) return <div className="p-5 text-center">Loading course editor...</div>;

  return (
    <div className="bg-light min-vh-100 font-sans pb-5">
      {/* Header */}
      <div className="mt-5 bg-white border-bottom sticky-top shadow-sm z-1">
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button 
              onClick={() => onNavigate && onNavigate('TeacherDashboard')} 
              className="btn btn-light me-3 border"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h5 className="mb-0 fw-bold">Edit Course Content</h5>
              <small className="text-muted">Editing: {course.title}</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => onNavigate && onNavigate('TeacherDashboard')}>Cancel</button>
            <button className="btn btn-primary d-flex align-items-center" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : <><Save size={18} className="me-2" /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          
          {/* Left Column: Basic Info */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold">Course Details</h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-bold">Course Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title"
                    value={course.title}
                    onChange={handleInfoChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Subject Area</label>
                  <select 
                    className="form-select" 
                    name="subject"
                    value={course.subject}
                    onChange={handleInfoChange}
                  >
                    <option>Software Development</option>
                    <option>Data Science</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Price (₦)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="price"
                    value={course.price}
                    onChange={handleInfoChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    name="description"
                    value={course.description}
                    onChange={handleInfoChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Curriculum Builder */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Curriculum</h5>
              <button className="btn btn-sm btn-dark d-flex align-items-center" onClick={addModule}>
                <Plus size={16} className="me-1" /> Add Module
              </button>
            </div>

            <div className="accordion" id="curriculumAccordion">
              {course.modules.map((module, index) => (
                <div className="card border-0 shadow-sm mb-3" key={module.id}>
                  <div className="card-header bg-white py-2 px-3 d-flex align-items-center">
                    <button 
                      className="btn btn-link text-dark p-0 me-2 text-decoration-none" 
                      onClick={() => toggleModule(module.id)}
                    >
                      {expandedModules[module.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    
                    <span className="text-muted me-2 small fw-bold">Module {index + 1}:</span>
                    <input 
                      type="text" 
                      className="form-control form-control-sm border-0 bg-transparent fw-bold" 
                      value={module.title}
                      onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                      style={{ boxShadow: 'none', width: 'auto', flexGrow: 1 }}
                    />
                    
                    <div className="ms-auto d-flex align-items-center">
                      <button className="btn btn-link text-danger p-1" onClick={() => removeModule(module.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedModules[module.id] && (
                    <div className="card-body bg-light border-top">
                      <div className="list-group">
                        {module.topics.map((topic, tIndex) => (
                          <div className="list-group-item d-flex align-items-center p-2 border-0 mb-1 rounded" key={topic.id}>
                            <GripVertical size={16} className="text-muted me-2 cursor-grab" />
                            {topic.type === 'video' ? <Video size={16} className="text-primary me-2" /> : <FileText size={16} className="text-warning me-2" />}
                            
                            <input 
                              type="text" 
                              className="form-control form-control-sm border-0 bg-transparent" 
                              value={topic.title}
                              onChange={(e) => updateTopic(module.id, topic.id, 'title', e.target.value)}
                              placeholder="Topic Title"
                            />
                            
                            <select 
                              className="form-select form-select-sm w-auto border-0 bg-transparent text-muted small"
                              value={topic.type}
                              onChange={(e) => updateTopic(module.id, topic.id, 'type', e.target.value)}
                            >
                              <option value="video">Video</option>
                              <option value="reading">Reading</option>
                              <option value="quiz">Quiz</option>
                            </select>

                            <button className="btn btn-link text-danger p-1 ms-2" onClick={() => removeTopic(module.id, topic.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-sm btn-link text-decoration-none mt-2 ps-0" onClick={() => addTopic(module.id)}>
                        <Plus size={16} className="me-1" /> Add Lesson Item
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {course.modules.length === 0 && (
                <div className="text-center p-5 border border-dashed rounded text-muted">
                  <p>No modules yet.</p>
                  <button className="btn btn-outline-primary btn-sm" onClick={addModule}>Add First Module</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseDetails;