import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

function Contact() {
  document.title = 'Contact – Scott H Tech';

  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_rd3e3m5', 'template_1wj842v', formRef.current, 'kkB2bORj1CV1rV0ml')
      .then(
        () => { alert('Email sent successfully!'); },
        (error) => { alert(`Failed to send email: ${error.text}`); }
      );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <div className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">About</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Hi! I'm Scott Harrison, a freelance developer passionate about crafting effective solutions for all kinds of projects. Let's work together!
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a question or want to collaborate? Fill out the form below and I'll get back to you.
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="Your name"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Reason for Contact
              </label>
              <select
                name="reason_for_contact"
                id="reason"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              >
                <option value="" disabled defaultValue>-- Select a reason --</option>
                <option value="App/Project Bug">App/Project Bug</option>
                <option value="Business_Related_Reasons">Business Inquiry</option>
                <option value="Plugin Support">Plugin Support</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
