import BlogSidebar from "./blogSidebar";
import { useState, useMemo } from "react";
import BlogCardHorizontal from "./blogCardHorizontal";
import { Search, Mail} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";



const BLOG_POSTS = [
  {
    id: 1,
    title: "The Rise of Data Science in Nigeria",
    category: "Data Science",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Exploring how data analytics is transforming industries in Lagos and Abuja." // Added missing field
  },
  {
    id: 2,
    title: "Why Port Harcourt Needs More Python Developers",
    category: "Career Growth",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "The demand for backend automation is growing. Here is why you should learn Python now." // Added missing field
  },
  {
    id: 3,
    title: "5 Tips for Cracking Cybersecurity Jobs",
    category: "Cybersecurity",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "From certifications to networking, here is your roadmap to a security career." // Added missing field
  }
];

export default function BlogPage ()  {
  const [Categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState();



  const fetchBlogs = () => {  
        // Updated URL to point to the blog app
        axios.get('http://127.0.0.1:8000/blogapi/posts/')
            .then(res => setBlogPosts(res.data))
            .catch(err => console.log(err));
    };

  const fetchCategories = () => {
        axios.get('http://127.0.0.1:8000/blogapi/categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(BLOG_POSTS.map(post => post.category))];
  }, []);

  // Filter and Sort Logic
  const filteredPosts = useMemo(() => {
    let result = BLOG_POSTS;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Sort by Date
    return result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [selectedCategory, sortOrder, searchQuery]);

  return (
    <div className="animate-fade-in mt-5 pt-5">
      <div className="bg-dark text-white py-5 mb-5">
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">TE Quant Insights</h1>
              <p className="lead opacity-90">
                Latest news, tech tips, and career advice from Nigeria's leading tech educators.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 pb-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-5 mb-lg-0">
            <BlogSidebar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">
                {selectedCategory === 'All' ? 'All Posts' : `${selectedCategory} Posts`}
                <span className="text-muted fw-normal ms-2 fs-6">({filteredPosts.length} results)</span>
              </h4>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="animate-fade-in">
                {filteredPosts.map(post => (
                  <BlogCardHorizontal key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-light rounded-3">
                <Search size={48} className="text-muted mb-3 opacity-50" />
                <h5 className="text-muted">No posts found matching your criteria.</h5>
                <button 
                  className="btn btn-link text-primary"
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination UI (Static) */}
            {filteredPosts.length > 0 && (
              <nav aria-label="Page navigation" className="mt-5">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled"><Link className="page-link" to="#">Previous</Link></li>
                  <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                  <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                   <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                   <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-success text-white py-5">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Mail size={32} className="mb-3" />
              <h3 className="fw-bold mb-3">Subscribe to our Newsletter</h3>
              <p className="mb-4">Get the latest articles and course updates sent directly to your inbox weekly.</p>
              <div className="input-group mb-3 w-75 mx-auto">
                <input type="email" className="form-control form-control-lg border-0" placeholder="Enter your email address" />
                <button className="btn btn-dark px-4 fw-bold" type="button">Subscribe</button>
              </div>
              <small className="opacity-75">No spam. Unsubscribe anytime.</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
