import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send the contact form
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#dc2626' }}>
                Contact Us
              </h1>
              <p className="lead text-muted">
                We'd love to hear from you! Get in touch with us for any queries, support, or feedback.
              </p>
            </div>

            <div className="row g-4">
              {/* Contact Information Cards */}
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-map-marker-alt fa-3x" style={{ color: '#dc2626' }}></i>
                    </div>
                    <h5 className="card-title fw-bold">Our Address</h5>
                    <p className="card-text text-muted">
                    Tiwariganj<br />
                      Lucknow, Uttar Pradesh (226028)<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-phone fa-3x" style={{ color: '#dc2626' }}></i>
                    </div>
                    <h5 className="card-title fw-bold">Phone Number</h5>
                    <p className="card-text text-muted">
                      <a href="tel:+916395490029" className="text-decoration-none text-muted">
                        +91 63954 90029
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-envelope fa-3x" style={{ color: '#dc2626' }}></i>
                    </div>
                    <h5 className="card-title fw-bold">Email Address</h5>
                    <p className="card-text text-muted">
                      <a href="mailto:amitdiwakar946@gmail.com" className="text-decoration-none text-muted">
                        amitdiwakar946@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="row mt-5">
              <div className="col-lg-8 mx-auto">
                <div className="card shadow-lg border-0">
                  <div className="card-body p-5">
                    <h3 className="card-title text-center mb-4 fw-bold">Send us a Message</h3>
                    
                    {submitted && (
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <i className="fas fa-check-circle me-2"></i>
                        Thank you for contacting us! We'll get back to you soon.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label fw-semibold">
                            <i className="fas fa-user me-2"></i>Full Name *
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label fw-semibold">
                            <i className="fas fa-envelope me-2"></i>Email Address *
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="phone" className="form-label fw-semibold">
                            <i className="fas fa-phone me-2"></i>Phone Number *
                          </label>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="subject" className="form-label fw-semibold">
                            <i className="fas fa-tag me-2"></i>Subject *
                          </label>
                          <select
                            className="form-select form-select-lg"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="booking">Booking Support</option>
                            <option value="provider">Become a Provider</option>
                            <option value="technical">Technical Support</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="col-12">
                          <label htmlFor="message" className="form-label fw-semibold">
                            <i className="fas fa-comment me-2"></i>Message *
                          </label>
                          <textarea
                            className="form-control form-control-lg"
                            id="message"
                            name="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us how we can help you..."
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-lg w-100 text-white fw-bold"
                            style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                          >
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="row mt-5">
              <div className="col-12 text-center">
                <h4 className="fw-bold mb-4">Follow Us</h4>
                <div className="d-flex justify-content-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-lg rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-danger btn-lg rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-info btn-lg rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-lg rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success btn-lg rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="row mt-5">
              <div className="col-lg-6 mx-auto">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <h5 className="card-title fw-bold mb-3">
                      <i className="fas fa-clock me-2" style={{ color: '#dc2626' }}></i>
                      Business Hours
                    </h5>
                    <div className="text-muted">
                      <p className="mb-2"><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                      <p className="mb-2"><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                      <p className="mb-0"><strong>Sunday:</strong> Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

