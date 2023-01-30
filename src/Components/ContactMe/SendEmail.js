import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import "./ContactMe.css"
export const SendEmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ael1zmy', 'template_7qz5pz8', form.current, 'SxCsnUXdXPis14lcN')
      .then((result) => {
          console.log(result);
      }, (error) => {
          console.log(error.text);
      });
     
  };

  return (
    <div className="row container m-auto pb-5">
   
    <form ref={form} onSubmit={sendEmail} className="bg-white form container border mt-5 py-5  m-auto rounded-4">
      <label className="form-label text-start w-100 fw-bold fs-6">Name</label>
      <input type="text" name="name" className="form-control" />
      <label className="form-label text-start w-100 fw-bold fs-6">Email</label>
      <input type="email" name="userEmail"  className="form-control"/>
      <label className="form-label text-start w-100 fw-bold fs-6">Message</label>
      <textarea rows={4} name="message" className="form-control" />
      <input type="submit" value="Send Your Email" className="form-control btn btn-primary mt-4" />
    </form></div>
    
  );
};

