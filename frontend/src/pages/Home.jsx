import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const services = [
    { icon: 'fa-utensils', label: 'Catering', description: 'Delicious wedding meals' },
    { icon: 'fa-music', label: 'Band & DJ', description: 'Music for your celebration' },
    { icon: 'fa-palette', label: 'Decoration', description: 'Beautiful wedding decor' },
    { icon: 'fa-campground', label: 'Tent', description: 'Elegant tent setups' },
    { icon: 'fa-house', label: 'Venue', description: 'Perfect wedding venues' },
    { icon: 'fa-chair', label: 'Furniture', description: 'Premium furniture rental' },
    { icon: 'fa-user-chef', label: 'Cook', description: 'Professional chefs' },
    { icon: 'fa-drum', label: 'Band Baja', description: 'Traditional music' },
    { icon: 'fa-camera', label: 'Photography', description: 'Capture your moments' },
  ];

  const features = [
    {
      icon: 'fa-shield-alt',
      title: 'Trusted Vendors',
      description: 'Verified and reliable service providers'
    },
    {
      icon: 'fa-rupee-sign',
      title: 'Best Prices',
      description: 'Competitive pricing for all services'
    },
    {
      icon: 'fa-clock',
      title: '24/7 Support',
      description: 'Round the clock customer assistance'
    },
    {
      icon: 'fa-star',
      title: 'Quality Assured',
      description: 'Premium quality services guaranteed'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Couples' },
    { number: '200+', label: 'Service Providers' },
    { number: '50+', label: 'Cities' },
    { number: '1000+', label: 'Successful Events' }
  ];

  const testimonials = [
    {
      name: 'Priya & Raj',
      location: 'Mumbai',
      text: 'ShaadiBazaarHub made our wedding planning so easy! Found the best caterer and decorator in one place.',
      rating: 5
    },
    {
      name: 'Anjali & Vikram',
      location: 'Delhi',
      text: 'Amazing platform! Booked tent, music, and catering all from here. Highly recommended!',
      rating: 5
    },
    {
      name: 'Sneha & Arjun',
      location: 'Bangalore',
      text: 'The best wedding service platform. Everything was perfect and within our budget.',
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Browse Services',
      description: 'Explore our wide range of wedding services'
    },
    {
      step: '2',
      title: 'Choose & Book',
      description: 'Select your preferred service and book online'
    },
    {
      step: '3',
      title: 'Pay Securely',
      description: 'Complete payment through secure gateway'
    },
    {
      step: '4',
      title: 'Enjoy Your Day',
      description: 'Relax and enjoy your special day'
    }
  ];

  const primaryMandap = 'https://cdn0.weddingwire.in/article/8612/3_2/960/jpg/122168-plushaffairs-cover.jpeg';
  const fallbackMandap = 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?auto=format&fit=crop&w=1600&q=80';

  const onMandapError = (e) => {
    if (e.currentTarget.src !== fallbackMandap) {
      e.currentTarget.src = fallbackMandap;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#dc2626' }}>
                Your Dream Wedding,<br />One Platform Away
              </h1>
              <p className="lead text-muted mb-4">
                Connect with the best wedding service providers. From catering to decoration, 
                we have everything you need to make your special day unforgettable.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/services" className="btn btn-lg text-white fw-bold" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>
                  Explore Services
                </Link>
                <Link to="/register" className="btn btn-outline-secondary btn-lg fw-bold">
                  Become a Provider
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="overflow-hidden shadow-lg rounded">
                <img 
                  src={primaryMandap}
                  onError={onMandapError}
                  alt="Beautiful wedding ceremony"
                  className="w-100"
                  style={{ height: '500px', objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">All Wedding Services</h2>
            <p className="text-muted">Everything you need for your perfect wedding</p>
          </div>
          <div className="row g-4">
            {services.map((service, i) => (
              <div key={i} className="col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm text-center p-4 hover-lift">
                  <div className="mb-3">
                    <i className={`fas ${service.icon} fa-3x`} style={{ color: '#dc2626' }}></i>
                  </div>
                  <h5 className="fw-bold">{service.label}</h5>
                  <p className="text-muted small mb-0">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose ShaadiBazaarHub?</h2>
            <p className="text-muted">We make wedding planning simple and stress-free</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <i className={`fas ${feature.icon} fa-3x`} style={{ color: '#dc2626' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
                <p className="lead mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="text-muted">Simple steps to book your wedding services</p>
          </div>
          <div className="row g-4">
            {howItWorks.map((item, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3">
                    <div 
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{ width: '80px', height: '80px', backgroundColor: '#dc2626', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted">Real experiences from happy couples</p>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <i key={idx} className="fas fa-star text-warning"></i>
                    ))}
                  </div>
                  <p className="text-muted mb-3">"{testimonial.text}"</p>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <br />
                    <small className="text-muted">{testimonial.location}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}>
        <div className="container">
          <h2 className="display-5 fw-bold mb-3">Ready to Plan Your Dream Wedding?</h2>
          <p className="lead mb-4">Join thousands of happy couples who chose ShaadiBazaarHub</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/services" className="btn btn-light btn-lg fw-bold">
              Browse All Services
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg fw-bold">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
