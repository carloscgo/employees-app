import { useLocation, NavLink, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import orderBy from "lodash/orderBy";

import { searchRoute } from "../../utils/services";
import { VITE_APP } from "../../utils/constants";

import logo from "../../assets/react.svg";

import { PropsSidebar, PropsRoute } from '../../utils/interfaces';

const Sidebar = ({ color, image, routes }: PropsSidebar) => {
  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo px-0 d-flex align-items-center justify-content-center">
          <Link to={searchRoute('home')} className="logo-mini d-flex align-items-center mx-1">
            <div className="logo-img">
              <img src={logo} alt="..." />
            </div>

            <div className="simple-text">
              {VITE_APP.APP_NAME}
            </div>
          </Link>
        </div>

        <Nav>
          {orderBy(routes.filter((route: PropsRoute) => route.isMenu), ['index'], ['asc']).map((prop: PropsRoute, key: number) => {
            return (
              <li
                className={activeRoute(prop.path)}
                key={key}
              >
                <NavLink
                  to={prop.path}
                  className="nav-link"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
