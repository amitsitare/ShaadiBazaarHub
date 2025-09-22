import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          minHeight: '80vh',
          backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.7), rgba(185, 28, 28, 0.7)), url("https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Couple Image */}
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Indian Wedding Couple" 
                  className="rounded-circle shadow-lg"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    border: '4px solid rgba(220, 38, 38, 0.3)'
                  }}
                />
              </div>
              
              {/* Welcome Text */}
              <h1 className="display-4 fw-bold mb-3">
                Welcome to ShaadiBazaarHub
              </h1>
              <p className="lead mb-4 fs-5">
                Your trusted partner for traditional Indian weddings.<br/>
                From sherwani to lehenga, we make your shaadi unforgettable.
              </p>
              
              {/* CTA Buttons */}
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/services" className="btn btn-lg px-4 py-3" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', color: 'white' }}>
                  <i className="fas fa-search me-2"></i>Browse Services
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg px-4 py-3">
                  <i className="fas fa-user-plus me-2"></i>Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-dark">Our Shaadi Services</h2>
              <p className="lead text-muted">Everything you need for your perfect Indian wedding</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="service-icon mb-3">
                  <i className="fas fa-utensils" style={{ fontSize: '3rem', color: '#dc2626' }}></i>
                </div>
                <h5 className="fw-bold">Catering</h5>
                <p className="text-muted small">Authentic Indian cuisine for your guests</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="service-icon mb-3">
                  <i className="fas fa-music" style={{ fontSize: '3rem', color: '#dc2626' }}></i>
                </div>
                <h5 className="fw-bold">Band & DJ</h5>
                <p className="text-muted small">Traditional and modern music for your shaadi</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="service-icon mb-3">
                  <i className="fas fa-home" style={{ fontSize: '3rem', color: '#dc2626' }}></i>
                </div>
                <h5 className="fw-bold">Venue</h5>
                <p className="text-muted small">Traditional and modern wedding venues</p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="service-icon mb-3">
                  <i className="fas fa-palette" style={{ fontSize: '3rem', color: '#dc2626' }}></i>
                </div>
                <h5 className="fw-bold">Decoration</h5>
                <p className="text-muted small">Beautiful Indian wedding decorations</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
                <Link to="/services" className="btn btn-lg" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626', color: 'white' }}>
                  View All Services <i className="fas fa-arrow-right ms-2"></i>
                </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 text-white" style={{ backgroundColor: '#dc2626' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold">500+</h3>
                <p className="lead">Happy Couples</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold">1000+</h3>
                <p className="lead">Services</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold">50+</h3>
                <p className="lead">Cities</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold">24/7</h3>
                <p className="lead">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold">What Our Customers Say</h2>
              <p className="lead text-muted">Real stories from happy couples</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-quote-left text-danger" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <p className="card-text">"ShaadiBazaarHub made our wedding planning so easy! Found everything we needed in one place."</p>
                  <div className="mt-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="rounded-circle mb-2"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <h6 className="mb-0">Priya Sharma</h6>
                    <small className="text-muted">Mumbai</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-quote-left text-danger" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <p className="card-text">"Amazing service providers and great prices. Our wedding was absolutely perfect!"</p>
                  <div className="mt-3">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="rounded-circle mb-2"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <h6 className="mb-0">Rajesh Kumar</h6>
                    <small className="text-muted">Delhi</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className="fas fa-quote-left text-danger" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <p className="card-text">"Professional service and excellent quality. Highly recommended for wedding planning!"</p>
                  <div className="mt-3">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Customer" 
                      className="rounded-circle mb-2"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <h6 className="mb-0">Anita Singh</h6>
                    <small className="text-muted">Bangalore</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



