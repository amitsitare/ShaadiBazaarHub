import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const services = [
    { icon: 'fa-utensils', label: 'Catering' },
    { icon: 'fa-music', label: 'Band & DJ' },
    { icon: 'fa-people-group', label: 'Event Team' },
    { icon: 'fa-palette', label: 'Decor' },
    { icon: 'fa-house', label: 'Venue' },
    { icon: 'fa-campground', label: 'Tent' },
    { icon: 'fa-chair', label: 'Furniture' },
    { icon: 'fa-user-chef', label: 'Cook' },
    { icon: 'fa-drum', label: 'Band Baja' },
  ];

  const primaryMandap = 'https://cdn0.weddingwire.in/article/8612/3_2/960/jpg/122168-plushaffairs-cover.jpeg';
  const fallbackMandap = 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&w=1600&q=80';

  const onMandapError = (e) => {
    if (e.currentTarget.src !== fallbackMandap) {
      e.currentTarget.src = fallbackMandap;
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left: Service chips (no circles) */}
          <div className="col-lg-6">
            <h1 className="fw-bold mb-3">All Wedding Services, One Place</h1>
            <p className="text-muted mb-4">Catering, decor, tent, music, venue, furniture and more.</p>

            <div className="service-chips d-flex flex-wrap gap-2">
              {services.map((s, i) => (
                <div key={i} className="service-chip shadow-sm">
                  <i className={`fas ${s.icon} me-2`}></i>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <Link to="/services" className="btn btn-lg" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', color: 'white' }}>
                Browse Services
              </Link>
              <Link to="/register" className="btn btn-outline-secondary btn-lg">
                Become a Provider
              </Link>
            </div>
          </div>

          {/* Right: Arch-shaped mandap image (not circle/rectangle) */}
          <div className="col-lg-6">
            <div className="arch-frame overflow-hidden shadow-lg">
              <img 
                src={primaryMandap}
                onError={onMandapError}
                alt="Bride in red saree and groom in sherwani with mandap"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



