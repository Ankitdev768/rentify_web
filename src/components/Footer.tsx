import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logo from '../assets/rentify_logo.png'; // Import your logo

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            {/* Replace house icon and Rentify text with your logo */}
            <div className="mb-4">
              <img
                src={logo} // Logo image path
                alt="coZyo"
                className="w-auto h-16 md:h-20" // Adjust the size of the logo
              />
            </div>
            <p className="text-gray-400">
              Making room hunting easier and more accessible for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => window.open('/mess-owner', '_blank')}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => window.open('/contact-page', '_blank')}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => window.open('/mess-owner', '_blank')}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Partner With Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => window.open('/mess-owner', '_blank')}
                >
                  For Mess Owner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => window.open('/room-owner', '_blank')}
                >
                  For Rent Owner
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 coZyo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
