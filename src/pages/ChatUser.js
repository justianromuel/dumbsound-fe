import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar';

import { Col, Container, Row } from 'react-bootstrap';
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'

import { io } from 'socket.io-client'
import { UserContext } from '../context/userContext'

let socket
const UserComplain = () => {
    const title = "Complain User"
    document.title = 'DumbSound | ' + title

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state, dispatch] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            },
            query: {
                id: state.user.id
            }
        })

        // define corresponding socket listener 
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })
        loadContact()
        loadMessages()

        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        // emit event load admin contact
        socket.emit("load admin contact")
        // listen event to get admin contact
        socket.on("admin contact", async (data) => {
            const dataContact = {
                ...data,
                message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
            }
            console.log(dataContact);
            setContacts([dataContact])
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        socket.on("admin contact", (data) => {
            socket.on("messages", async (data) => {
                if (data.length > 0) {
                    const dataMessages = data.map((item) => ({
                        idSender: item.sender.id,
                        message: item.message
                    }))
                    console.log(dataMessages);
                    setMessages(dataMessages)
                }
                const chatMessages = document.getElementById("chat-messages")
                chatMessages.scrollTop = chatMessages?.scrollHeight
            })
        })
    }

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            console.log(onSendMessage);
            socket.emit("send messages", data)
            e.target.value = ""
        }
    }

    return (
        <>
            <Navbar title={title} nameUser={state.user.name} />
            <div style={{ height: '10vh' }} />
            <Container fluid style={{ height: '89.5vh' }}>
                <Row>
                    <Col md={3} style={{ height: '89.5vh' }} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9} style={{ maxHeight: '89.5vh' }} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserComplain