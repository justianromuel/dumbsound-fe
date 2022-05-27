import React, { useState, useEffect, useContext } from 'react'
import NavbarAdmin from "../components/navbar/NavbarAdmin"

import { Button, Form, Container, Col, Alert } from "react-bootstrap";
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

export default function AddArtist() {
    const title = 'Add Artist';
    document.title = 'DumbSound | ' + title;

    const [state, dispatch] = useContext(UserContext);
    const [user, setUser] = useState({});

    const loadUser = async () => {
        try {
            const response = await API.get(`/user/${state.user.id}`);
            console.log(response.data.user.name);
            setUser(response.data.user.name);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadUser();
    }, [state]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        name: "",
        old: "",
        type: "",
        startCareer: "",
    })
    const { name, old, type, startCareer } = form

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoadingSubmit(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const body = JSON.stringify(form)
            const response = await API.post("/add-artis", body, config)

            setLoadingSubmit(false);
            if (response?.status === 200) {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Add Success
                    </Alert>
                )
                setForm({
                    name: "",
                    old: "",
                    type: "",
                    startCareer: "",
                })
                setMessage(alert)
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Add Failed
                </Alert>
            )
            setMessage(alert)
            setLoadingSubmit(false);
            console.log(error)
        }
    }

    return (
        <>
            <NavbarAdmin title={title} nameUser={state.user.name} />
            <Container className="text-white pt-5 mt-5">
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <h3 className="fw-bold">Add Artist</h3>
                    <div className="my-4">
                        {true && message}
                        <Form.Control
                            className="mx-auto mt-4 form-color"
                            onChange={handleOnChange}
                            value={name}
                            name="name"
                            type="text"
                            placeholder="Name"
                            required
                        />

                        <Form.Control
                            className="mx-auto my-4 form-color"
                            onChange={handleOnChange}
                            value={old}
                            name="old"
                            type="number"
                            placeholder="Old"
                            required
                        />
                        <Form.Select
                            className="mx-auto my-4 form-color"
                            onChange={handleOnChange}
                            value={type}
                            name="type"
                            type="text"
                            placeholder='Type'
                            required
                        >
                            <option value="" disabled selected>Type</option>
                            <option name="type">Solo</option>
                            <option name="type">Band</option>
                        </Form.Select>
                        <Form.Control
                            className="mx-auto my-4 form-color"
                            onChange={handleOnChange}
                            value={startCareer}
                            name="startCareer"
                            type="number"
                            placeholder="Start a Career"
                            required
                        />
                    </div>
                    <Col className="mx-auto">
                        {!loadingSubmit ? (
                            <>
                                <Button
                                    className="w-100 text-white "
                                    type="submit"
                                    variant="success"
                                >
                                    Add Artist
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="w-100 text-white"
                                    variant="success"
                                    type='submit'
                                    disabled
                                >
                                    Please Wait
                                </Button>
                            </>
                        )}
                    </Col>
                </Form>
            </Container>
        </>
    )
}
