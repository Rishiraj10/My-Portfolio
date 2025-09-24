import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-xl font-bold">Let's Connect</h3>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/Rishiraj10" className="hover:text-indigo-400">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/rishiraj101/" className="hover:text-indigo-400">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=rkystore4@gmail.com&su=Portfolio%20Inquiry&body=Hi%20there,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20know%20more%20about..." 
                    className="hover:text-indigo-400" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 Rishi Raj. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
  );
}