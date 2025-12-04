import axios from 'axios'

export default function BlogSection (){

 const BLOG_POSTS = [
  {
    id: 1,
    title: "The Rise of Data Science in Nigeria",
    category: "Data Science",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Why Port Harcourt Needs More Python Developers",
    category: "Career Growth",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "5 Tips for Cracking Cybersecurity Jobs",
    category: "Cybersecurity",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];
return(
  <section className="py-5 bg-light" id="blog">
    <div className="container">
      <h2 className="fw-bold mb-4">Latest Insights</h2>
      <div className="row g-4">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <img src={post.image} className="card-img-top" alt={post.title} style={{height: "180px", objectFit: "cover"}} />
              <div className="card-body">
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h5 className="card-title fw-bold">
                  <a href="#" className="text-decoration-none text-dark">{post.title}</a>
                </h5>
                <a href="#" className="small text-primary fw-bold text-decoration-none">Read More →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
