import { Calendar, User, ChevronRight } from "lucide-react"; 
 
 export default function BlogCardHorizontal  ({ post }) {
    return (
  <div className="card border-0 shadow-sm mb-4 overflow-hidden hover-lift">
    <div className="row g-0 h-100">
      <div className="col-md-4">
        <img 
          src={post.image} 
          className="img-fluid h-100 object-fit-cover" 
          alt={post.title}
          style={{minHeight: "200px", width: "100%"}} 
        />
      </div>
      <div className="col-md-8">
        <div className="card-body p-4 d-flex flex-column h-100 justify-content-center">
          <div className="d-flex align-items-center mb-2">
            <span className="badge bg-primary-subtle text-primary me-3">{post.category}</span>
            <small className="text-muted d-flex align-items-center">
              <Calendar size={14} className="me-1" /> 
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </small>
          </div>
          <h4 className="card-title fw-bold mb-2">
            <a href="#" className="text-decoration-none text-dark">{post.title}</a>
          </h4>
          <p className="card-text text-muted mb-3">{post.excerpt}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
             <div className="d-flex align-items-center">
               <div className="bg-light rounded-circle p-1 me-2 border d-flex justify-content-center align-items-center" style={{width: "32px", height: "32px"}}>
                 <User size={16} className="text-secondary" />
               </div>
               <small className="text-muted fw-bold">{post.author}</small>
             </div>
             <a href="#" className="text-primary fw-bold text-decoration-none small">Read Article <ChevronRight size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
 };
