import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from '../components/navbar/Navbar';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import Paid from "../assets/undraw_confirmed_re_sef7.svg"

export default function User() {
    const title = "Subscribe";
    document.title = "Dumbsound | " + title;

    const navigate = useNavigate();

    // Untuk Navbar Admin
    const [state] = useContext(UserContext);
    console.log(state.user.subscribe);

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Create config Snap payment with useEffect, untuk menampilkan modal pembayaran
    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-EE8tiwTmSuf6XKSV";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = async (price) => {
        setLoadingSubmit(true);
        try {
            // Get data from product
            const data = {
                price: price,
            };

            const body = JSON.stringify(data);

            // Configuration
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };

            // Insert transaction data
            const response = await API.post("/transaction", body, config);
            console.log("Response Transaction: ", response);

            // Create variabel for store token payment from response
            const token = response.data.payment.token;

            // Modify handle buy to display Snap payment page
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
            setLoadingSubmit(false);
        } catch (error) {
            setLoadingSubmit(false);
            console.log(error);
        }
    };

    return (
        <>
            <Navbar title={title} nameUser={state.user.name} />
            <Container className="center-div d-flex justify-content-center">
                <div style={{ marginTop: "10%" }}>
                    {!state.user.subscribe ? (
                        <>
                            <Row>
                                <Col md={12} className="text-center">
                                    <h2 className="fw-bold mb-4">Subscribe</h2>
                                    <p>
                                        Berlangganan Sekarang dan nikmati streaming music yang kekinian dari <span className="text-var-red fw-bold">DUMB</span>
                                        <span className="fw-bold">SOUND</span>
                                    </p>
                                </Col>
                                <Col md={12} className="d-flex justify-content-center gap-3">
                                    <Card className="card-price bg-var-dark-gray text-center">
                                        <Card.Header as="h5">Premium 1</Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <span className="fs-3 text-var-red">Rp.20.000</span>
                                                <span className="">/1 Bulan</span>
                                            </Card.Title>
                                            <button className="btn-red px-5 mt-3" onClick={() => handleBuy("20000")}>
                                                {" "}
                                                Subscribe
                                            </button>
                                        </Card.Body>
                                    </Card>

                                    <Card className="card-price bg-var-dark-gray text-center">
                                        <Card.Header as="h5">Premium 2</Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <span className="fs-3 text-var-red">Rp.100.000</span>
                                                <span className="">/6 Bulan</span>
                                            </Card.Title>
                                            <button className="btn-red px-5 mt-3" onClick={() => handleBuy("100000")}>
                                                {" "}
                                                Subscribe
                                            </button>
                                        </Card.Body>
                                    </Card>
                                    <Card className="card-price bg-var-dark-gray text-center">
                                        <Card.Header as="h5">Premium 3</Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <span className="fs-3 text-var-red">Rp.180.000</span>
                                                <span className="">/1 Tahun</span>
                                            </Card.Title>
                                            <button className="btn-red px-5 mt-3" onClick={() => handleBuy("180000")}>
                                                Subscribe
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <img
                                style={{
                                    width: "22rem",
                                    marginTop: "5rem",
                                    marginBottom: "1rem",
                                }}
                                alt="active"
                                src={Paid}
                            />
                            <h1>You have Subscribe.</h1>
                        </>
                    )}
                </div>
            </Container>
        </>
    )
}
