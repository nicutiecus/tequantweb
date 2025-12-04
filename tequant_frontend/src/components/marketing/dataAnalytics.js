import React from 'react';

const LandingPage = () => {
  // Define the dark brown theme color for easy reuse in inline styles
  const themeColor = '#664d3e';

  return (
    <div className="font-sans">
      {/* NAVIGATION */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Changed text-primary to custom inline color */}
          <a className="navbar-brand fw-bold" style={{ color: themeColor }} href="#">DataPro NG</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3 align-items-center">
              <li className="nav-item"><a className="nav-link" href="#curriculum">Curriculum</a></li>
              <li className="nav-item"><a className="nav-link" href="#audience">Who is this for?</a></li>
              <li className="nav-item">
                {/* Changed btn-primary to btn-dark for better contrast with brown theme, or could use custom styles */}
                <a href="#register" className="btn btn-dark btn-sm px-4 py-2">Enroll Now</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      {/* Added a slight brown tint to the hero gradient overlay */}
      <header className="bg-dark text-white text-center py-5" style={{ backgroundImage: `linear-gradient(rgba(60, 40, 30, 0.8), rgba(60, 40, 30, 0.8)), url("https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">Stop Guessing. Start Using Data to Grow Your Business & Career.</h1>
              <p className="lead mb-4 text-light opacity-75">
                Master Excel, Power BI, and SQL. Whether you are a 9-5 professional in Lagos looking for a promotion, or a business owner in Port Harcourt trying to cut costs—data is your new oil.
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                {/* btn-warning (yellow) works well with brown */}
                <a href="#register" className="btn btn-warning btn-lg px-5 fw-bold text-dark">Get Syllabus</a>
                <a href="#audience" className="btn btn-outline-light btn-lg px-5">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PAIN POINTS / VALUE PROP */}
      <section className="py-5 bg-light" id="audience">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold">Why Data Analytics?</h2>
              <p className="text-muted">The Nigerian market is competitive. Here is how you stand out.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  {/* Changed text-primary icon color to theme color */}
                  <div className="h1 mb-3" style={{ color: themeColor }}>📈</div>
                  <h4 className="card-title fw-bold">For Business Owners</h4>
                  <p className="card-text">Stop wasting money on ads that don't convert. Learn to analyze customer behavior, track inventory, and predict sales trends to maximize your Naira.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  {/* Changed text-primary icon color to theme color */}
                  <div className="h1 mb-3" style={{ color: themeColor }}>💼</div>
                  <h4 className="card-title fw-bold">For Employees</h4>
                  <p className="card-text">Data Analysts are among the highest-paid professionals. Upskill to demand a higher salary or prepare yourself for remote international jobs (earn in USD).</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body text-center">
                  {/* Changed text-primary icon color to theme color */}
                  <div className="h1 mb-3" style={{ color: themeColor }}>🌍</div>
                  <h4 className="card-title fw-bold">Global Relevance</h4>
                  <p className="card-text">The skills we teach (SQL, Python, Power BI) are the same ones used by Google and Amazon. Become globally competitive from right here in Nigeria.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SNAPSHOT */}
      <section id="curriculum" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Data Dashboard" 
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">What You Will Learn</h2>
              <ul className="list-group list-group-flush">
                {/* Changed text-primary checkmarks to theme color */}
                <li className="list-group-item border-0 ps-0">
                  <span className="fw-bold" style={{ color: themeColor }}>✔ Microsoft Excel (Advanced):</span> Pivot tables, VLOOKUP, and cleaning messy data.
                </li>
                <li className="list-group-item border-0 ps-0">
                  <span className="fw-bold" style={{ color: themeColor }}>✔ SQL for Databases:</span> How to talk to databases and extract the info you need.
                </li>
                <li className="list-group-item border-0 ps-0">
                  <span className="fw-bold" style={{ color: themeColor }}>✔ Power BI / Tableau:</span> Create stunning visual dashboards for your boss or investors.
                </li>
                <li className="list-group-item border-0 ps-0">
                  <span className="fw-bold" style={{ color: themeColor }}>✔ Business Intelligence:</span> How to translate numbers into actual business strategy.
                </li>
              </ul>
              <div className="mt-4">
                 <p className="small text-muted">* Weekend and Evening classes available for working professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      {/* Changed bg-primary to inline dark brown background color */}
      <section className="py-5 text-white text-center" style={{ backgroundColor: themeColor }}>
        <div className="container">
          <h2 className="fw-bold mb-5">What Our Students Say</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <blockquote className="blockquote">
                <p className="mb-3">"I run a logistics business in Ikeja. After this course, I used Excel to optimize my delivery routes and saved 20% on fuel costs in one month."</p>
                <footer className="blockquote-footer text-white opacity-75">Chinedu O., <cite title="Source Title">SME Owner</cite></footer>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p className="mb-3">"I was stuck in customer service. Learning SQL helped me transition to a Data Analyst role at a fintech company. My salary doubled."</p>
                <footer className="blockquote-footer text-white opacity-75">Funke A., <cite title="Source Title">Data Analyst</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / PRICING */}
      <section id="register" className="py-5">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {/* Changed border-primary to inline dark brown border color */}
              <div className="card shadow-lg" style={{ borderColor: themeColor }}>
                {/* Changed bg-primary to inline dark brown background color */}
                <div className="card-header text-white py-3" style={{ backgroundColor: themeColor }}>
                  <h3 className="mb-0">Next Cohort Starts Soon</h3>
                </div>
                <div className="card-body py-5">
                  <h2 className="display-4 fw-bold">₦150,000</h2>
                  <p className="text-muted">Flexible payment plans available (Pay in 2 installments)</p>
                  <hr className="my-4" />
                  <p className="lead">Secure your spot today. Only 20 seats available for personalized attention.</p>
                  
                  <form className="row g-3 justify-content-center mt-4 text-start">
                    <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter your name" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter your email" />
                    </div>
                    <div className="col-12 text-center mt-4">
                        {/* Changed button color to match theme, using inline style for background/border */}
                        <button type="submit" className="btn btn-lg w-50 text-white" style={{ backgroundColor: themeColor, borderColor: themeColor }}>Join Waitlist / Register</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">&copy; 2025 DataPro Nigeria. All Rights Reserved.</p>
          <small className="text-muted">Located in Port Harcourt | Available Online Nationwide</small>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;