// import React from 'react';
// import './Footer.css'; // Import the CSS file

// function Footer() {
//     return (
//         <footer className="footer">
//             <div>
//                 <p>Developed by Jakirul Sk</p>
//                 <p>

//                     <a href="mailto:jakirulsk312@gmail.com" className="email-link"> jakirulsk312@gmail.com</a>
//                 </p>
//             </div>
//         </footer>
//     );
// }

// export default Footer;



import React from 'react';
import './Footer.css'; // Import the CSS file
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section footer-about">
                
           
{/* 
            <div className="footer-section footer-contact">
                <h4>Contact Us</h4>
                <p>
                    <FaMapMarkerAlt />
                    <a
                        href="https://maps.app.goo.gl/6vDD1xGuAweKyEVHA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        Mukundabag, Murshodabad, West Bengal
                    </a>
                </p>

                <p><FaPhone />  91 7029121433</p>
                <p><FaEnvelope /> <a href="mailto:gfcsmsd@gmail.com@gmail.com" className="email-link">gfcsmsd@gmail.com@gmail.com</a></p>
            </div>

            <div className="footer-section footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <a href="/home">Home  </a>
                    <a href="/about"> About   </a>
                    <a href="/contact"> Contact Us</a>
                </ul>
            </div>

            <div className="footer-section footer-social">
                <h4>Follow Us</h4>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div> */}

<h4>Contact Us</h4>
                <p>
                    <FaMapMarkerAlt />
                    <a
                        href="https://maps.app.goo.gl/6vDD1xGuAweKyEVHA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        Mukundabag, Murshodabad, West Bengal
                    </a>
                </p>
                <p>© 2025 Golden Future Supportive Trust. All Rights Reserved.</p>
                <p>
                    Developed by :  
                    <a
                        href=" https://jakirulsk.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-link"
                    >
                         Jakirul Sk
                    </a>
                </p>

            </div>
        </footer>
    );
}

export default Footer;
