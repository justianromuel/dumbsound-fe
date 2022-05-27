import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { UserContext } from "../../context/userContext";

import Avatar from "react-avatar";
import Logo from "../../assets/Logo.png";
import Pay from "../../assets/IconPay.png";
import IconChat from "../../assets/IconChat.png";
import Logout from "../../assets/IconLogout.png";

import Login from "../modal/Login";
import Register from "../modal/Register";


export default function NavbarUser({ title, nameUser }) {
  console.log(nameUser);
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  // console.log("userContext", state);

  const [isClickLogin, setIsClickLogin] = useState(false);
  const [isClickRegister, setIsClickRegister] = useState(false);

  const handleClickLogin = () => setIsClickLogin(!isClickLogin);
  const handleClickRegister = () => setIsClickRegister(!isClickRegister);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const content = (
    <Popover variant="dark" id="dropdown" className="list-dropdown ">
      <Popover.Body className="bg-var-dark-gray">
        <ul class="list-unstyled">
          {title === "Error" ? (
            <>
              <li className="mb-3">
                <Link to="/">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/pay">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Pay</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/user-chat">
                  <img src={IconChat} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Complain</span>
                </Link>
              </li>
              <li>
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          ) : title === "Subscribe" ? (
            <>
              <li className="mb-3">
                <Link to="/">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/user-chat">
                  <img src={IconChat} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Complain</span>
                </Link>
              </li>
              <li>
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          ) : title === "Complain User" ? (
            <>
              <li className="mb-3">
                <Link to="/">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/pay">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Pay</span>
                </Link>
              </li>
              <li>
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3">
                <Link to="/pay">
                  <img src={Pay} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Pay</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/user-chat">
                  <img src={IconChat} alt="" width="30" className="me-2" />
                  <span className="fw-bold ">Complain</span>
                </Link>
              </li>
              <li>
                <button className="btn-transparent" onClick={logout}>
                  <img src={Logout} alt="" width="25" className="me-2" />
                  <span className="fw-bold ">Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {!state.isLogin ? (
        <>
          <Navbar fixed="top" variant="dark" expand="sm">
            <Container>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src={Logo}
                  width="30"
                  className="d-inline-block align-top me-2" />
                <p className="d-inline light-color">
                  <span className="red-color">DUMB</span>SOUND
                </p>
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Button className="navBtnLogin" onClick={handleClickLogin}>
                    Login
                  </Button>
                  <Button className="navBtnRegister" onClick={handleClickRegister}>
                    Register
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* Modal */}
          {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
          {isClickRegister ? <Register isOpen={isClickRegister} /> : null}
        </>
      ) : (
        <>
          <Navbar fixed="top" variant="dark" expand="sm">
            <Container>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src={Logo}
                  width="30"
                  className="d-inline-block align-top me-2"
                />
                <span className="red-color">DUMB</span>SOUND
              </Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <OverlayTrigger trigger="click" placement="bottom" overlay={content}>
                    <Avatar color="#3A3A3A" name={nameUser} size="40" round={true} />
                  </OverlayTrigger>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
}
