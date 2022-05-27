import React from "react";
import Navbar from "../components/navbar/Navbar";
import Image from "../assets/undraw_page_not_found_re_e9o6.svg";

export const Error = () => {
    const title = "Error";
    document.title = "Dumbsound | " + title;
    return (
        <>
            <Navbar title={title} />
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "" }}>
                <img src={Image} style={{ maxWidth: "50vh" }} />
                <h1 className="mt-3 fw-bold text-danger">Page Not Found</h1>
            </div>
        </>
    );
};

export default Error;