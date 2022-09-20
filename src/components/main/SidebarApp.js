import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IconSmallLogo, LogoOCBC } from "../../assets";
import { useScreenWidth } from "../../utils/checkscreen";
import { _nav } from "./_nav";

const SidebarApp = () => {
  const [active, setActive] = useState({
    dashboard: true,
    absensi: false,
    vpn: false,
  });
  const location = useLocation();
  const { pathname } = location;
  const screen = useScreenWidth();

  const isActive = (val) => {
    if (val === "Dashboard") {
      return active.dashboard;
    } else if (val === "Absensi") {
      return active.absensi;
    } else if (val === "Log Vpn") {
      return active.vpn;
    }
  };

  const changeActive = (namepath) => {
    if (namepath === "Dashboard") {
      setActive({
        dashboard: true,
        absensi: false,
        vpn: false,
      });
    } else if (namepath === "Absensi") {
      setActive({
        dashboard: false,
        absensi: true,
        vpn: false,
      });
    } else if (namepath === "Log Vpn") {
      setActive({
        dashboard: false,
        absensi: false,
        vpn: true,
      });
    }
  };

  const updateChangeActive = () => {
    if (pathname === "/") {
      setActive({
        dashboard: true,
        absensi: false,
        vpn: false,
      });
    } else if (pathname === "/absensi") {
      setActive({
        dashboard: false,
        absensi: true,
        vpn: false,
      });
    } else if (pathname === "/vpn") {
      setActive({
        dashboard: false,
        absensi: false,
        vpn: true,
      });
    }
  };

  useEffect(() => {
    updateChangeActive();
    changeActive();
  }, []);

  const NavItem = (props) => {
    const { name, link, icon } = props;

    return (
      <Nav.Item
        className={
          isActive(name) ? "nav-item mb-3 w-100 actives" : "nav-item mb-3 w-100"
        }
      >
        <Link
          className="nav-a"
          to={link}
          aria-current="page"
          onClick={() => changeActive(name)}
        >
          <div className="d-flex flex-row align-items-center px-1">
            <div>{icon}</div>
            {screen > 768 ? (
              <div style={{ marginLeft: "10px" }}>{name}</div>
            ) : null}
          </div>
        </Link>
      </Nav.Item>
    );
  };

  return (
    <div className="sidebar-content">
      <div className="logos text-left">
        <Link
          to="/"
          className="text-decoration-none text-white d-flex justify-content-center"
        >
          <div className="img-logos d-flex justify-content-center">
            {screen > 768 ? (
              <img src={LogoOCBC} className="w-100" />
            ) : (
              <img src={IconSmallLogo} />
            )}
          </div>
        </Link>
      </div>
      <nav className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
        {_nav.map((item, index) => (
          <NavItem
            key={index}
            name={item.name}
            link={item.to}
            icon={item.icon}
          />
        ))}
      </nav>
    </div>
  );
};

export default SidebarApp;
