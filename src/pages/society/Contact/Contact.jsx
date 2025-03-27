import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./Contact.css";
import logo from "../../../assets/icons/logo.svg";
// import.meta.env.WEB_API_KEY;

function Contact() {
  // State for form data
  // web3_api_key =import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    drive_link: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the data to Web3Forms
    const form = new FormData(e.target);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "", drive_link: "" });
        } else {
          alert("Failed to send message. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
    <div className="contact-container">
 
      <img src={logo} alt="GFST Logo" className="logo" />
      <h2 className="contact-title">Connect with Us</h2>
      <p className="contact-description">
        If you have any questions or need further information, feel free to contact us:
      </p>

      
      <div className="contact-info">
  <a href="mailto:gfcsmsd@gmail.com?subject=Inquiry&body=Hello," className="contact-link">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
      alt="Gmail Logo"
      className="contact-icon"
    />
    <span className="gmail-text">gfcsmsd@gmail.com</span>
  </a>
  <span className="contact-phone">
    <FaPhoneAlt className="call-icon" /> +91 9733542533 (Sarifur Rahaman )
  </span>
  <span className="contact-phone">
    <FaPhoneAlt className="call-icon" /> +91 7029121433 (Ayub Sk )
  </span>
</div>

      {/* Contact Form */}
      <div className="contact-form">
        <h3>Drop Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="00f26a47-eede-40e5-86d1-aaafc0190942" />

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="url"
              name="drive_link"
              placeholder="If you want to attach a file, please provide a drive link."
              value={formData.drive_link}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </div>

      
    </div>
    {/* Contact Section */}
    <div className="contact-section">
    <h4>Talk to Us</h4>
    <p>
      <FaMapMarkerAlt />{" "}
      <a
        href="https://maps.app.goo.gl/6vDD1xGuAweKyEVHA"
        target="_blank"
        rel="noopener noreferrer"
        className="map-link"
      >
        Office Location
      </a>
    </p>
    <p>© 2025 Golden Future Supportive Trust. All Rights Reserved.</p>
    <p>
      Developed by:{"  "}
      <a
        href="https://jakirulsk.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="developer-link"
      >
        Jakirul Sk
      </a>
    </p>
  </div>
  </>
  );
}

export default Contact;
