import home from "./Home.module.css";
import { Link } from "react-router-dom";
import Timeline from "../Timeline/Timeline";
import image from "./image.webp";
import Footer from "../Footer/Footer.jsx";

const Home = () => {
  return (
    <>
      <div className={home.homeContainer}>
        <div className={home.content}>
          <div className={home.textSection}>
            <h1 className={home.title}>Welcome to ChatBot Tech</h1>
            <p className={home.description}>
              Experience seamless interaction with our advanced chatbot
              technology. From answering questions to guiding you through
              documents, our bot is designed to assist you effortlessly. Upload
              a PDF and get started today!
            </p>
            <Link to="/Bot">
              <button className={home.btn}>Get Started</button>
            </Link>
          </div>
          <div className={home.imageContainer}>
            <img
              src={image}
              alt="Chatbot Illustration"
              className={home.image}
            />
          </div>
        </div>
      </div>
      <div className={home.timelineContainer}>
        <p className={home.timelineHeading}>How to use Our ChatBot ?</p>
        <Timeline />
      </div>
      <Footer />
    </>
  );
};

export default Home;
