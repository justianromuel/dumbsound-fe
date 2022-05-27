import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Nav, Navbar, Button } from "react-bootstrap"
import { UserContext } from "../../context/userContext"

import Logo from "../assets/Logo.png"
import Login from "../modal/Login"
import Register from "../modal/Register"
import DropdownComp from "./DropdownComp"

export default function MainNavbar({ background }) {
    const [state, dispatch] = useContext(UserContext)
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleShowLogin = () => setShowLogin(true)
    const handleShowRegister = () => setShowRegister(true)
    const closeLogin = () => setShowLogin(false)
    const closeRegister = () => setShowRegister(false)

    return (
        <>
            <Navbar
                className="nav-theme d-flex justify-content-between px-5"
                style={
                    background
                        ? {
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            backgroundColor: "#1F1F1F",
                            position: "relative",
                            marginBottom: "0px",
                        }
                        : {}
                }
            >
                <Navbar.Brand
                    as={Link}
                    to={state.user?.listAs === 1 ? "/admin" : "/"}
                    className="nav-title "
                >
                    <img
                        alt=""
                        src={Logo}
                        width="30"
                        className="d-inline-block align-top me-2"
                    />
                    <p className="d-inline light-color">
                        <span className="red-color">DUMB</span>SOUND
                    </p>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    {state.isLogin === true ? (
                        <DropdownComp />
                    ) : (
                        <>
                            <Button onClick={handleShowLogin} className="navBtnLogin">
                                Login
                            </Button>
                            <Button onClick={handleShowRegister} className="navBtnRegister">
                                Register
                            </Button>
                        </>
                    )}
                </Nav>
            </Navbar>

            <Login
                closeLogin={closeLogin}
                showLogin={showLogin}
                handleShowRegister={handleShowRegister}
            />
            <Register
                showRegister={showRegister}
                closeRegister={closeRegister}
            />
        </>
    )
}
