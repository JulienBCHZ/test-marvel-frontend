import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Made with</span>
      <a href="https://fr.react.dev/" target="_blank">
        React
      </a>
      <span>at</span>
      <a href="https://www.lerecateur.io" target="_blank">
        Le Reacteur
      </a>
      <span>by</span>{" "}
      <a href="https://github.com/JulienBCHZ" target="_blank">
        Julien Bouchez
      </a>
    </footer>
  );
};

export default Footer;
