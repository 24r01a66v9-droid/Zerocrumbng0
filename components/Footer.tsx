
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-2xl font-bold">ZeroCrumb</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Empowering communities to eliminate food waste through intelligent redistribution. 
              Together, we can achieve zero hunger and a sustainable planet.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-green-500">How it Works</a></li>
              <li><a href="#" className="hover:text-green-500">Donor Dashboard</a></li>
              <li><a href="#" className="hover:text-green-500">Impact Stats</a></li>
              <li><a href="#" className="hover:text-green-500">Trust System</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-green-500">Help Center</a></li>
              <li><a href="#" className="hover:text-green-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ZeroCrumb AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
