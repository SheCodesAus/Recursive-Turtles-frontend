import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-brand">
        <h3>Workshop Navigator</h3>
        <p>Helping facilitators create engaging workshop experiences.</p>
      </div>

      <div className="footer-socials">
        <a
          href="https://www.instagram.com/scott_millar_?igsh=b3ZidTZsM3FnbWx6"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.linkedin.com/in/smillar1"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-links">
        <a
          href="https://www.bopindustries.com/"
          target="_blank"
          rel="noreferrer"
        >
          BOP Industries
        </a>

        <a
          href="https://www.iamscottmillar.com/"
          target="_blank"
          rel="noreferrer"
        >
          Scott Millar Website
        </a>
      </div>
    </footer>
  );
}

export default Footer;