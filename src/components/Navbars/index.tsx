import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

import routes from '../../utils/routes';
import { searchRoute } from "../../utils/services";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBrandText = () => {
    for (const route of routes) {
      if (location.pathname.indexOf(route.path) !== -1 || location.pathname.indexOf('/edit/') !== -1) {
        return route.name;
      }
    }

    return "Brand";
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={() => navigate(searchRoute('home'))}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
      </Container>
    </Navbar >
  );
}

export default Header;
