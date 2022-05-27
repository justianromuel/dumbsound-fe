import React, { useState, useContext } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function Login(props) {
  const title = "Login";
  document.title = "DumbSound | " + title;

  const [show, setShow] = useState(props.isOpen);

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);


  const handleClose = () => setShow(false);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert data menjadi string, untuk dikirim ke database
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response);

      navigate("/");
      setShow(false);

      // set loading false
      setLoadingSubmit(false);

      // Checking Process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data, // data disimpan ke state global
        });
      }

      if (response.data.data.status === "admin") {
        navigate("/transactions");
      } else {
        navigate("/");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 text-center">
          Failed
        </Alert>
      );

      setLoadingSubmit(false);
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="rounded" centered>
        <Modal.Body className="bg-var-dark">
          <h2 className="mb-4 text-var-red">Login</h2>
          <div className="card-auth px-3">
            {message}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="mb-3 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div className="d-grid">
                {!loadingSubmit ? (
                  <>
                    <Button
                      className="text-light"
                      variant="danger"
                      type="submit"
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="text-light"
                      variant="danger"
                      type="submit"
                      disabled
                    >
                      Please Wait
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
