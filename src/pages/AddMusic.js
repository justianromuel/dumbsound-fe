import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import NavbarAdmin from "../components/navbar/NavbarAdmin"

import { UserContext } from '../context/userContext';
import { API } from '../config/api';

import IconAttach from '../assets/IconAttach.png'
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddMusic() {
    const titleWeb = 'Add Music';
    document.title = 'DumbSound | ' + titleWeb;

    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [user, setUser] = useState({});

    const loadUser = async () => {
        try {
            const response = await API.get(`/user/${state.user.id}`);
            setUser(response.data.user.name);
        } catch (error) { }
    };

    useEffect(() => {
        loadUser();
    }, [state]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [message, setMessage] = useState(null)
    const [artiss, setArtiss] = useState([]);
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        year: "",
        attache: "",
        idArtis: "",
    })
    const { title, year, thumbnail, attache, idArtis } = form


    //  Fetching artist from database
    const fetchArtis = async () => {
        const response = await API.get("/artis");
        console.log(response.data.data.artiss);
        setArtiss(response.data.data.artiss);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.id === "attache" ? e.target.files : e.target.value && e.target.id === "thumbnail" ? e.target.files : e.target.value,
        })
        /**
         * Set preview file name if user uploaded new file
         */
        if (e.target.id === "thumbnail") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            console.log(url);
        }
    }

    /**
     * Clear all field when submit success
     */
    const clearForm = () => {
        setForm({
            title: "",
            thumbnail: "",
            year: "",
            attache: "",
            idArtis: "",
        })
    }

    /**
     * Handle when user click submit
     * Create new form-data object and send it to backend using API
     * Set alert message when success or failed
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit");
        setLoadingSubmit(true);

        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "multipart/form-data",
                },
            }
            console.log("check form", form);

            const formData = new FormData()
            formData.set("title", form.title);
            formData.set("year", form.year);
            formData.set("attache", form.attache[0], form.attache[0].name);
            formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
            formData.set("idArtis", form.idArtis);


            const response = await API.post("/add-music", formData, config)
            console.log("check response", response);
            if (response.status == 200) {
                clearForm()
                const alert = (
                    <Alert variant="success" className="py-1">
                        Add Music Success
                    </Alert>
                )
                setMessage(alert)
            }
            setLoadingSubmit(false);
            navigate('/transactions')
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Add Failed
                </Alert>
            )
            setMessage(alert)
            setLoadingSubmit(false);
            console.log("error pas add", error)
        }
    }

    useEffect(() => {
        fetchArtis();
    }, []);

    return (
        <>
            <NavbarAdmin title={titleWeb} nameUser={user} />
            <Container className='text-white pt-5 mt-5'>
                <h3 className="fw-bold">
                    Add Music
                </h3>
                <Row className="d-flex justify-content-left">
                    <Col lg="11">
                        {true && message}
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Row>
                                    <Col lg={9}>
                                        <Form.Control
                                            className="form-color"
                                            onChange={handleChange}
                                            name="title"
                                            size="sm"
                                            type="text"
                                            placeholder="Title"
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <input
                                            id="thumbnail"
                                            className="d-none"
                                            onChange={handleChange}
                                            name="thumbnail"
                                            type="file"
                                            placeholder='Attache Thumbnail'
                                            accept='image/*'
                                            required
                                            hidden
                                        />
                                        <label for='thumbnail' className=' p-1 rounded bg-white'>
                                            <span className='text-black'>Attach Thumbnail</span> <img alt="" src={IconAttach} className="text-end" height={25} />
                                        </label>
                                    </Col>
                                    {preview && (
                                        <div>
                                            <img
                                                src={preview}
                                                style={{
                                                    maxWidth: "150px",
                                                    maxHeight: "150px",
                                                    objectFit: "cover",
                                                    marginBlock: "1rem",
                                                }}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicYear">
                                <Form.Control
                                    className="form-color"
                                    onChange={handleChange}
                                    name="year"
                                    type="number"
                                    placeholder="Year"
                                    required
                                    size="sm"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicSinger">
                                <Form.Select
                                    className="form-color"
                                    onChange={handleChange}
                                    name="idArtis"
                                    type='text'
                                    placeholder="Singer"
                                    // required
                                    aria-label="Default select example"
                                    size="sm"
                                >
                                    <option value="" disabled selected>
                                        Singer
                                    </option>
                                    {artiss.map((item) => {
                                        return <option key={item.id} name="type" value={item.id}>{item.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <input
                                    id="attache"
                                    className="d-none"
                                    onChange={handleChange}
                                    name="attache"
                                    type="file"
                                    placeholder='Attache Music'
                                    accept='audio/*'
                                    required
                                    hidden
                                />
                                <label for='attache' className=' p-1 rounded bg-white'>
                                    <span className='text-black'>Attach Music</span> <img alt="" src={IconAttach} className="text-end" height={25} />
                                </label>

                            </Form.Group>

                            <div className="d-flex justify-content-center mt-3">
                                {!loadingSubmit ? (
                                    <>
                                        <Button
                                            className="w-100 text-white "
                                            type="submit"
                                            variant="success"
                                        >
                                            Add Music
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
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
