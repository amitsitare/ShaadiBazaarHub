import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-auto border-top">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} ShaadiSphere</small>
      </div>
    </footer>
  );
}



