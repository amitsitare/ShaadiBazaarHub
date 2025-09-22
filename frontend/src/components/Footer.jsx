import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold mb-3">
                <i className="fas fa-heart text-danger me-2"></i>
                ShaadiBazaarHub
              </h5>
              <p className="text-light-emphasis">
                Your trusted partner for all wedding services. We connect you with the best vendors 
                to make your special day unforgettable.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-4">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-white fs-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white fs-4">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white fs-4">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light-emphasis text-decoration-none">
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-light-emphasis text-decoration-none">
                  <i className="fas fa-list me-2"></i>Services
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-light-emphasis text-decoration-none">
                  <i className="fas fa-user-plus me-2"></i>Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-light-emphasis text-decoration-none">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Our Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-utensils me-2"></i>Catering
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-music me-2"></i>Band & DJ
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-home me-2"></i>Venue Booking
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-palette me-2"></i>Decoration
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-camera me-2"></i>Photography
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  123 Wedding Street, Mumbai, India
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-phone me-2"></i>
                  +91 98765 43210
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-envelope me-2"></i>
                  info@shaadibazaarhub.com
                </span>
              </li>
              <li className="mb-2">
                <span className="text-light-emphasis">
                  <i className="fas fa-clock me-2"></i>
                  Mon - Sun: 9:00 AM - 9:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Bottom Section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light-emphasis">
              © {new Date().getFullYear()} ShaadiBazaarHub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <a href="#" className="text-light-emphasis text-decoration-none small">
                Privacy Policy
              </a>
              <a href="#" className="text-light-emphasis text-decoration-none small">
                Terms of Service
              </a>
              <a href="#" className="text-light-emphasis text-decoration-none small">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



