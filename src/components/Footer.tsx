import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>
            Conçu par
            <a href="https://www.linkedin.com/in/marlenedfr/" target="_blank">
              {" "}
              Marlène Dubois
            </a>
          </p>
          <p>
            Pensé par
            <a
              href="https://www.linkedin.com/in/melvyn-malherbe/"
              target="_blank"
            >
              {" "}
              Melvyn Malherbe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
