import React, { useState, useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ensure that the form is correctly passed to emailjs
    if (formRef.current) {
      emailjs
        .sendForm(
          'service_v9wus7j',  // Your Service ID
          'template_229498r',  // Your Template ID
          formRef.current,     // Form ref
          'do_n1OngrjpAGETRA'  // Your Public API Key
        )
        .then(
          (result) => {
            console.log('Message sent successfully:', result.text);
            setStatus('Message sent successfully!');
            setLoading(false); // Hide loading animation after success
          },
          (error) => {
            console.log('Error sending message:', error.text);
            setStatus('An error occurred. Please try again.');
            setLoading(false); // Hide loading animation after error
          }
        );
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Get In Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto:rkystore4@gmail.com"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Mail className="w-5 h-5 mr-3" />
                rkystore4@gmail.com
              </a>
              <a
                href="https://github.com/Rishiraj10"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Github className="w-5 h-5 mr-3" />
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/rishiraj101/"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div>
            <form
              ref={formRef} // Ref for the form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // Make sure this matches the template variable in your EmailJS template
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email" // Ensure this matches the EmailJS template variable
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message" // Make sure this matches the template variable in your EmailJS template
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
