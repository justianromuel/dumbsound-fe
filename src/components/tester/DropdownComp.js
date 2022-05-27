import React, { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"

import { Dropdown } from "react-bootstrap"
import IconUser from "../assets/IconUser.png"
import IconProfile from "../assets/IconProfile.png"
import IconPay from "../assets/IconPay.png"
import IconLogout from "../assets/IconLogout.png"
import IconChat from "../assets/IconChat.png"
import IconAddArtist from "../assets/IconAddArtist.png"
import IconAddMusic from "../assets/IconAddMusic.png"

function DropdownComp() {
    let navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext)

    const handlePay = (e) => {
        e.preventDefault()
        navigate("/user")
    }

    const handleAddMusic = (e) => {
        e.preventDefault()
        navigate("/admin/add-music")
    }

    const handleAddArtis = (e) => {
        e.preventDefault()
        navigate("/admin/add-artist")
    }
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch({ type: "LOGOUT" })
        navigate("/")
    }
    return (
        <>
            <Dropdown className="pe-1">
                <Dropdown.Toggle id="dropdown-basic">
                    <img
                        style={{ width: "55px", height: "55px", borderRadius: "50%" }}
                        src={state.user.profileImage ? state.user.profileImage : IconUser}
                        alt="avatar"
                    ></img>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {state.user?.listAs === 1 ? (
                        <>
                            <Dropdown.Item onClick={handleAddArtis}>
                                <img className="me-3" src={IconAddArtist} alt="pay" />
                                Add Artist
                            </Dropdown.Item>
                            <>
                                <Dropdown.Item onClick={handleAddMusic}>
                                    <img className="me-3" src={IconAddMusic} alt="pay" />
                                    Add Music
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/admin/chat")}>
                                    <img
                                        className="me-3"
                                        style={{ width: "30px", height: "30px" }}
                                        src={IconChat}
                                        alt="chat"
                                    />
                                    Chat
                                </Dropdown.Item>
                            </>
                        </>
                    ) : (
                        <>
                            <Dropdown.Item onClick={() => navigate("/user/profile")}>
                                <img
                                    className="me-3"
                                    src={IconProfile}
                                    alt="profile"
                                />
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handlePay}>
                                <img className="me-3" src={IconPay} alt="pay" />
                                Pay
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate("/user/chat")}>
                                <img
                                    className="me-3"
                                    style={{ width: "30px", height: "30px" }}
                                    src={IconChat}
                                    alt="chat-admin"
                                />
                                Chat Admin
                            </Dropdown.Item>
                        </>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                        <img className="me-3" src={IconLogout} alt="logout" />
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropdownComp
