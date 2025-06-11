import React from 'react';
import '../../App.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 UNIVERSIDAD ESPE. TODOS LOS DERECHOS RESERVADOS.</p>
      <div className="socials">
        <a href="http://www.facebook.com/nafespe" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="http://www.instagram.com/nafespe" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@nafespe?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
