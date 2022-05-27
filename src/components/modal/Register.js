import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

import { API } from "../../config/api";

function Register(props) {
  const title = "Register";
  document.title = "DumbSound | " + title;

  const [show, setShow] = useState(props.isOpen);
  console.log(show);

  const handleClose = () => setShow(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { email, password, name, gender, phone, address } = form;

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
      const response = await API.post("/register", body, config);
      console.log(response);
      const alert = (
        <Alert variant="success" className="py-1">
          Register Success
        </Alert>
      );
      setMessage(alert)

      // set loading false
      setLoadingSubmit(false);
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="bg-var-dark">
          <h2 className="mb-4 text-var-red">Register</h2>
          <div className="card-auth px-3">
            {message}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="mb-3 form">
                <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} required />
              </div>
              <div class="mb-3 form">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Full Name" name="name" onChange={handleChange} value={name} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Gender (Male/Female)" name="gender" onChange={handleChange} value={gender} required />
              </div>
              <div class="mb-3 form">
                <input type="number" placeholder="Phone" name="phone" onChange={handleChange} value={phone} required />
              </div>
              <div class="mb-3 form">
                <input type="text" placeholder="Address" name="address" onChange={handleChange} value={address} required />
              </div>
              <div className="d-grid">
                {!loadingSubmit ? (
                  <>
                    <Button
                      className="text-light"
                      variant="danger"
                      type="submit"
                    >
                      Register
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

export default Register;