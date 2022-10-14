import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";

import { MenuIcon, UserIconPng } from "../../assets";
import { useNavigate } from "react-router-dom";

const NavbarApp = () => {
  const navigation = useNavigate();

  const logout = () => {
    sessionStorage.clear("token");
    navigation("/", { replace: true });
  };

  return (
    <Navbar variant="dark" expanded>
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <button
              id="sidebar-toggle"
              className="sidebar-toggle me-2 d-none d-md-inline-block align-items-center justify-content-center btn btn-icon-only btn-lg"
              style={{ padding: "5px" }}
            >
              <img src={MenuIcon} width="50" />
            </button>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <div className="media-body me-2 text-dark align-items-center d-none d-lg-block">
                    <span
                      className="mb-0 font-small fw-bold"
                      style={{ color: "#e74c3c" }}
                    >
                      Renaldi // 14562
                    </span>
                  </div>
                  <span className="icon icon-sm">
                    <img src={UserIconPng} width="30" />
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={logout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />{" "}
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
