import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col items-center space-y-6">
          {/* Brand Name and Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="HomeEase Logo" className="w-8 h-8" />
            <h2 className="text-xl font-bold">HomeEase</h2>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link to="/about" className="hover:text-blue-400 transition">
              About Us
            </Link>
            <Link to="/services" className="hover:text-blue-400 transition">
              Services
            </Link>
            <Link to="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
            <Link to="/privacy-policy" className="hover:text-blue-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-400 transition">
              Terms of Service
            </Link>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center text-sm text-gray-400 space-y-2">
            <div className="flex items-center space-x-2">
              <FaEnvelope />
              <a href="mailto:support@homeease.com" className="hover:text-blue-400">
                support@homeease.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone />
              <a href="tel:+917590889608" className="hover:text-blue-400">
                +91 75908 89608
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            &copy; 2025 HomeEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;