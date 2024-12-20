import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

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
        <>
            <NavBar />
            <div className="flex flex-col items-center px-4 py-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About</h1>
                <p className="text-lg text-gray-700 mb-8">
                    My name is Scott Harrison. I am a freelance developer who works on all kinds of
                    projects.
                </p>

                <h1 className="text-4xl font-bold mb-6">Contact</h1>
                <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="user_name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Reason For Contact
                        </label>
                        <select
                            name="reason_for_contact"
                            id="reason"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-- Choose a reason --</option>
                            <option value="App/Project Bug">App/Project Bug</option>
                            <option value="Business_Related_Reasons">Business Related Reasons</option>
                            <option value="Plugin Support">Plugin Support</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="user_email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
