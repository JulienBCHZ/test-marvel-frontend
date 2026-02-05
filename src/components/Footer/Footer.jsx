import "./footer.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Made with</span>
      <a href="https://fr.react.dev/" target="_blank">
        React
      </a>
      <span>by</span>
      <span>Julien Bouchez</span>
      <div className="network-logo">
        <a href="https://github.com/JulienBCHZ" target="_blank">
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/julien-bouchez-developer/"
          target="_blank"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
