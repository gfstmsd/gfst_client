
import './About.css';
import logo from '../../../assets/icons/logo.svg';
import { FaMapMarkerAlt } from "react-icons/fa";

function About() {
  return (
    <>
    <div className="about-container">
      <div className="logo-con">
        <img src={logo} alt="GFST Logo" className="logo" />
      </div>
      <h1>Golden Future Supportive Trust</h1>

      <div className="text-container">
        <h2>ভূমিকা</h2>
        <p>
          জুলুম নির্যাতনের বিবর্তনে কিছু মানুষ আজ অসহায়। তথাকথিত বিশ্বায়ন তাদেরকে করে তুলেছে মজলুম।
          এই মজলুমদের মসিহা কে হবে? কে তাদের কান্না মুছে দেবে? পৃথিবীতে ন্যায়বিচার প্রতিষ্ঠা করা যাদের দায়িত্ব ছিল
          তারাও আজ সুপথকে আঁকড়ে রাখতে ব্যর্থ হয়েছে। স্রষ্টার বিচারে তারা হারিয়েছে রাজ দ্ন্ড। বিশ্বায়নের গতিপথ নির্ধারণকারী
          এইসব জালেমেরা ধীরে ধীরে সমগ্র পৃথিবীর পরিকাঠামো কে হস্তগত করতে উদ্যত হয়েছে। এই বিশ্বযুদ্ধে আসুন সকল ভাল
          মানুষেরা একত্রিত হই।
        </p>

        <h2>Introduction</h2>
        <p>
          Some people today are helpless due to the evolution of oppression. The so-called globalization
          has made them oppressed. Who will be the Messiah of the oppressed? Who will wipe their tears?
          To establish justice in the world Even those who were responsible have failed to stick to the
          path today. InGod&apos;s judgment they have lost their kingdom. These tyrants who set the course of
          globalization have gradually taken over the infrastructure of the entire world. Let all good men
          unite in this world war.
        </p>
      </div>
    </div>
    <div className="contact-section">
            <h4>Contact with Us</h4>
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

export default About;


