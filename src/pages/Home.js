import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Container, Navbar as NavbarMusic } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar/Navbar";
import PlayerMusic from "../components/musicPlayer/PlayerMusic";
import "../styles/pages.css";
import Login from "../components/modal/Login";


export default function Home() {
    const title = "Home";
    document.title = "Dumbsound | " + title;

    const [isClickLogin, setIsClickLogin] = useState(false);
    const handleClickLogin = () => setIsClickLogin(!isClickLogin);

    const [state, dispatch] = useContext(UserContext);
    const [musicId, setMusicId] = useState("");
    console.log(musicId);

    // Fetch Music
    let { data: musics, isLoading } = useQuery("musicCache", async () => {
        const response = await API.get("/musics");
        return response.data.data.musics;
    });
    console.log(musics);

    return (
        <>
            <Navbar title={title} nameUser={state.user.name} />

            <Container fluid className="header-wrapper">
                <div className="header-desc light-color text-center">
                    <h1 className="heading-font-header">Connect on DumbSound</h1>
                    <p>
                        Discovery, Stream, and share a constantly expanding mix of music
                        from emerging and major artists around the world
                    </p>
                </div>
            </Container>

            <Container className="content-wrapper p-4" fluid>
                <div className="container" style={{ marginBottom: "100px" }}>
                    <p className="red-color fw-700 f-24 text-center">
                        Dengarkan Dan Rasakan
                    </p>
                    <div className="musics d-flex flex-wrap mt-2 text-white">
                        {!state.isLogin ? (
                            <>
                                {/* {Belum Login} */}
                                {musics?.map((item) => (
                                    <Card key={item.id} className="text-nolink card-music bg-var-dark-gray mb-2 mx-2">
                                        <div onClick={handleClickLogin}>
                                            <img src={item.thumbnail} class="card-image" alt="" />
                                        </div>
                                        <div className="d-flex justify-content-between mt-2 ">
                                            <span className="fw-bold ">{item.title}</span>
                                            <span>{item.year}</span>
                                        </div>
                                        <div className="d-flex justify-content-start mt-2 ">
                                            <span className="text-small">{item.artis.name}</span>
                                        </div>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <>
                                {/* {Sudah Login} */}
                                {!state.user.subscribe ? (
                                    <>
                                        {/* {Belum Subscribe} */}
                                        {musics?.map((item) => (
                                            <Card key={item.id} className="text-nolink card-music bg-var-dark-gray mb-2 mx-2">
                                                <Link to="/pay">
                                                    <img src={item.thumbnail} class="card-image" alt="" />
                                                </Link>
                                                <div className="d-flex justify-content-between mt-2 ">
                                                    <span className="fw-bold ">{item.title}</span>
                                                    <span>{item.year}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2 ">
                                                    <span className="text-small">{item.artis.name}</span>
                                                </div>
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {/* {Sudah Subscribe} */}
                                        {musics?.map((item) => (
                                            <Card key={item.id} className="text-nolink card-music bg-var-dark-gray mb-2 mx-2">
                                                <div onClick={() => setMusicId(item)}>
                                                    <img src={item.thumbnail} class="card-image" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between mt-2 ">
                                                    <span className="fw-bold ">{item.title}</span>
                                                    <span>{item.year}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mt-2 ">
                                                    <span className="text-small">{item.artis.name}</span>
                                                </div>
                                            </Card>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Container>

            {/* Player Music */}
            {musicId === "" ? (
                <></>
            ) : (
                <NavbarMusic className="fixed-bottom">
                    <PlayerMusic musicId={musicId} />
                </NavbarMusic>
            )}

            {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
        </>
    );
}
