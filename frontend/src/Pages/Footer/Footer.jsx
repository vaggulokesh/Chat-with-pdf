import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer class="footer">
        <p className="footer-heading">Chat With PDF</p>
        <p className="footer-developer">
          Made by{" "}
          <a className="footer-anchor" href="https://github.com/vaggulokesh">
            Vaggu Lokesh
          </a>{" "}
          & Team
        </p>
      </footer>
    </>
  );
};
export default Footer;
