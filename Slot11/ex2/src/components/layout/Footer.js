import React from "react";

function Footer() {
  return (
    <footer className="footer-custom">
      <p>© 2025 Student Management App</p>

      {/* CSS lồng trực tiếp */}
      <style>{`
        .footer-custom {
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb); /* ✅ giống navbar */
          color: #003366;
          text-align: center;
          padding: 12px 0;
          margin-top: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
        }
        .footer-custom p {
          margin: 0;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
