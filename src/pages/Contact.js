import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';
import "../pages/PluginDoc.css"
function Contact() {
    document.title = 'Contact';

    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_rd3e3m5', 'template_1wj842v', formRef.current, 'kkB2bORj1CV1rV0ml')
            .then(
                () => {
                    alert('Email sent successfully!');
                },
                (error) => {
                    alert(`Failed to send email: ${error.text}`);
                }
            );
    };

    return (
        <div className='tailwind-layout'>
            <NavBar />
            <div className="flex flex-col items-center px-4 py-12 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About</h1>
                <p className="text-lg text-gray-700 mb-8 text-center">
                    Hi! I’m Scott Harrison, a freelance developer passionate about crafting effective solutions for all kinds of projects. Let's work together!
                </p>

                <h1 className="text-4xl font-bold mb-6">Contact</h1>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Have a question or want to collaborate? Fill out the form below, and I'll get back to you as soon as possible.
                </p>

                <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
                >
                    <div className="mb-6 flex flex-col">
                        <div><label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name:
                        </label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="user_name"
                            aria-label="Your name"
                            placeholder="Enter your name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6 flex flex-col">
                        <div
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Reason for Contact
                        </div>
                        <select
                            name="reason_for_contact"
                            id="reason"
                            aria-label="Reason for contacting"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled selected>
                            -- Select a reason --
                            </option>
                            <option value="App/Project Bug">App/Project Bug</option>
                            <option value="Business_Related_Reasons">Business Inquiry</option>
                            <option value="Plugin Support">Plugin Support</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <div
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="user_email"
                            aria-label="Your email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <div
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Message
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            aria-label="Your message"
                            rows="5"
                            placeholder="Write your message here"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                    Send Message
                    </button>
                </form>
                </div>

            <Footer />
        </div>
    );
}

export default Contact;
