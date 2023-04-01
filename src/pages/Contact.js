import React from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
function Contact() {
    document.title = "Contact";
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_rd3e3m5', 'template_1wj842v', form.current, 'kkB2bORj1CV1rV0ml')
        .then((result) => {
            alert("Email sent");
            console.log(result.text);
        }, (error) => {
            alert(error.text);
        });
    };
    return (
        <>
            <NavBar/>
            <div className="Page" style={{display:"flex", flexDirection:"column"}}>
                <h1>About</h1>
                <p>My name is Scott Harrison, I am freelance developer who works on all kinds of projects.</p>
                <p></p>
                <h1>Contact</h1>
                <form ref={form} onSubmit={sendEmail}>
                    <p><label>Name</label></p>
                    <p><input type="text" name="user_name" required /></p>
                    <p><label>Reason For Contact</label></p>
                    <p><select name="reason_for_contact" id="pet-select" required>
                        <option value="">--choose reason for contact--</option>
                        <option value="App/Project Bug">App/Project Bug</option>
                        <option value="Bussiness_Related_Reasons">Bussiness Related Reasons</option>
                        <option value="Plugin Support">Plugin Support</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="Other">Other</option>
                    </select></p>
                    <p><label>Email</label></p>
                    <p><input type="email" name="user_email" required /></p>
                    <p><label>Message</label></p>
                    <p><textarea name="message" required /></p>
                    <p><input type="submit" value="Send" /> </p>
                </form>
                <Footer/>
            </div>
        </>
    );
}

export default Contact;
