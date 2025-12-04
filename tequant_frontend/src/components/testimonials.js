import { Star } from "lucide-react";


export default function Testimonials () {
    const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    name: "Ngozi Ekwueme",
    role: "Data Analyst at OilServ",
    text: "TE Quant changed my career path. The instructors in Port Harcourt were very hands-on. I went from knowing nothing about Excel to building predictive models in Python.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Tamuno Jaja",
    role: "Freelance Developer",
    text: "The coding bootcamp during the August break was intense but worth it. I built my first full website in just 4 weeks. Highly recommend for any student in Rivers State.",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Emeka Okafor",
    role: "Computer Science Student, RSU",
    text: "Accessing the LMS notes and videos made revision so easy. The assignments really tested my knowledge. Best tech school in PH!",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

return(
  <section className="py-5 bg-dark text-white position-relative overflow-hidden">
    <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" 
         style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
    </div>
    <div className="container position-relative z-1">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Student Success Stories</h2>
        <p className="text-white-50">Hear from our alumni making waves in the industry.</p>
      </div>
      <div className="row g-4">
        {SAMPLE_TESTIMONIALS.map(item => (
          <div key={item.id} className="col-md-4">
            <div className="bg-white text-dark p-4 rounded-4 h-100 position-relative">
              <div className="d-flex align-items-center mb-3">
                <img src={item.image} alt={item.name} className="rounded-circle me-3" style={{width: "50px", height: "50px", objectFit: "cover"}} />
                <div>
                  <h6 className="fw-bold mb-0">{item.name}</h6>
                  <small className="text-muted">{item.role}</small>
                </div>
              </div>
              <p className="small fst-italic">"{item.text}"</p>
              <div className="text-warning">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="d-inline" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
};