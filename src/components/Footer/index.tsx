import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { searchRoute } from "../../utils/services";

const Footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <ul className="footer-menu">
            <li>
              <Link to={searchRoute('home')} className="text-dark">
                Home
              </Link>
            </li>
          </ul>

          <p className="copyright text-center">
            © {new Date().getFullYear()}
          </p>
        </nav>
      </Container>
    </footer>
  );
}

export default Footer;
