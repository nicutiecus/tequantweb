import { Search, Filter } from "lucide-react";

export default function BlogSidebar ({ categories, selectedCategory, onSelectCategory, sortOrder, onSortChange, searchQuery, onSearchChange })
 {
  return (
    <div className="card border-0 shadow-sm p-4 sticky-top" style={{top: "100px"}}>
      {/* Search */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3">Search</h6>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0">
            <Search size={18} className="text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control bg-light border-start-0" 
            placeholder="Search blogs..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Filter / Sort */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 d-flex align-items-center">
          <Filter size={16} className="me-2 text-primary" /> Filter
        </h6>
        <label className="small text-muted mb-2">Sort by Date</label>
        <select 
          className="form-select form-select-sm" 
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h6 className="fw-bold mb-3">Categories</h6>
        <ul className="list-unstyled">
          <li className="mb-2">
            <button 
              className={`btn btn-sm w-100 text-start ${selectedCategory === 'All' ? 'btn-primary' : 'btn-light text-muted'}`}
              onClick={() => onSelectCategory('All')}
            >
              All Posts
            </button>
          </li>
          {categories.map((cat, idx) => (
            <li key={idx} className="mb-2">
              <button 
                className={`btn btn-sm w-100 text-start ${selectedCategory === cat ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tags (Visual Only) */}
      <div className="mt-4 pt-4 border-top">
        <h6 className="fw-bold mb-3">Popular Tags</h6>
        <div className="d-flex flex-wrap gap-2">
          {['Python', 'Lagos', 'Oil & Gas', 'Remote Work', 'React', 'Startup'].map((tag, i) => (
            <span key={i} className="badge bg-light text-secondary border fw-normal">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
