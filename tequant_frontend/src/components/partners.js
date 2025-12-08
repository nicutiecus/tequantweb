export default function Partners () {
  const partnersList = ["NCDMB", "FoodCrowdy", "NLNG", "Lujo Heights"];
  
  return (
    <section className="py-4 bg-white border-bottom">
      <div className="container">
        <p className="text-center text-muted small fw-bold mb-4 text-uppercase">Trusted by top companies in Nigeria</p>
        <div className="row justify-content-center align-items-center grayscale-logos">
          {partnersList.map((partner, index) => (
            <div key={index} className="col-4 col-md-2 text-center mb-3 mb-md-0">
              <span className="h5 text-secondary opacity-50 fw-bold">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};