import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-5">
      <h1>Welcome to ShaadiSphere</h1>
      <p className="lead">Book wedding essentials: chairs, tables, tents, band baja, catering, and more.</p>
      <Link to="/services" className="btn btn-primary">Browse Services</Link>
    </div>
  );
}



