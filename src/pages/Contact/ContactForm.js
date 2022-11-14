import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactForm.css';
const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <div className='Contact-form-container'>
    <form onSubmit={handleSubmit} className='Contact-form'>
    <div className='Contact-form-content'>
        <h3 className='Contact-form-title'>Lasă-ne un mesaj</h3>
      <div className='Contact-form-content'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required  className="form-control mt-1"/>
      </div>
      <div className='Contact-form-content'>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required  className='form-control mt-1'/>
      </div>
      <div className='Contact-form-content'>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required className='form-control mt-1' />
      </div>
      <div className='d-grid gap-2 mt-3'>
      <button type="submit" className='btn btn-primary'>{status}</button>
      </div>
      </div>
    </form>
    </div>
  );
};

export default ContactForm;