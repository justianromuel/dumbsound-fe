import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Popover, OverlayTrigger } from "react-bootstrap";
import { UserContext } from "../../context/userContext";

import Avatar from "react-avatar";
import Logo from "../../assets/Logo.png";
import Pay from "../../assets/IconPay.png";
import IconChat from "../../assets/IconChat.png";
import AddMusic from "../../assets/IconAddMusic.png";
import AddArtist from "../../assets/IconAddArtist.png";
import Logout from "../../assets/IconLogout.png";


export default function NavbarAdmin({ title, nameUser }) {
    const navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);
    // console.log("userContext", state);

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
                    {title === "Transactions" ? (
                        <>
                            <li className="mb-3">
                                <Link to="/add-artist">
                                    <img src={AddArtist} alt="" width="20" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Add Artist</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/add-music">
                                    <img src={AddMusic} alt="" width="25" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Add Music</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/admin-chat">
                                    <img src={IconChat} alt="" width="30" className="me-2" />
                                    <span className="fw-bold ">Complain</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <button className="btn-transparent" onClick={logout}>
                                    <img src={Logout} alt="" width="25" className="me-2" />
                                    <span className="fw-bold ">Logout</span>
                                </button>
                            </li>
                        </>
                    ) : title === "Add Artist" ? (
                        <>
                            <li className="mb-3">
                                <Link to="/transactions">
                                    <img src={Pay} alt="" width="25" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Transactions</span>
                                </Link>
                            </li>
                            <li className="mb-3 border ">
                                <Link to="/add-music">
                                    <img src={AddMusic} alt="" width="25" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Add Music</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/admin-chat">
                                    <img src={IconChat} alt="" width="30" className="me-2" />
                                    <span className="fw-bold ">Complain</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <button className="btn-transparent" onClick={logout}>
                                    <img src={Logout} alt="" width="25" className="me-2" />
                                    <span className="fw-bold ">Logout</span>
                                </button>
                            </li>
                        </>
                    ) : title === "Complain Admin" ? (
                        <>
                            <li className="mb-3">
                                <Link to="/transactions">
                                    <img src={Pay} alt="" width="25" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Transactions</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/add-artist">
                                    <img src={AddArtist} alt="" width="20" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Add Artist</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <button className="btn-transparent" onClick={logout}>
                                    <img src={Logout} alt="" width="25" className="me-2" />
                                    <span className="fw-bold ">Logout</span>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="mb-3">
                                <Link to="/transactions">
                                    <img src={Pay} alt="" width="25" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Transactions</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/add-artist">
                                    <img src={AddArtist} alt="" width="20" className="me-2" />
                                    <span className="fw-bold text-decoration-none text-white">Add Artist</span>
                                </Link>
                            </li>
                            <li className="mb-3">
                                <Link to="/admin-chat">
                                    <img src={IconChat} alt="" width="30" className="me-2" />
                                    <span className="fw-bold ">Complain</span>
                                </Link>
                            </li>
                            <li className="mb-3">
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
        <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand href="/transactions">
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
                            <Avatar color="#097d02" name={nameUser} size="40" round={true} />
                        </OverlayTrigger>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
