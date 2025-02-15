import "./About.css";
import Details from "./Details.jsx";
import Footer from "../Footer/Footer.jsx";
const About = () => {
  return (
    <>
      <div className="faq-main-container">
        <div className="faq-container">
          <h1>FAQ - frequently asked questions</h1>
          <p>
            Welcome! If you're here, you're likely seeking answers about how to
            interact with our "Chat With Author" application. Below, you'll find
            the most commonly asked questions about how to upload PDFs and
            receive responses based on the content of the documents.
          </p>
        </div>
      </div>
      <Details />
      <Footer />
    </>
  );
};
export default About;
