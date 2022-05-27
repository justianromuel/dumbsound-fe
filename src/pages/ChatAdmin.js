import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from '../components/navbar/NavbarAdmin'

import { Col, Container, Row } from 'react-bootstrap';
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'

import { io } from 'socket.io-client'
import { UserContext } from '../context/userContext'

let socket
const AdminComplain = () => {
    const title = "Complain Admin"
    document.title = 'DumbSound | ' + title

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state, dispatch] = useContext(UserContext)

    useEffect(() => {
        socket = io('https://dumbsound-justian.herokuapp.com', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })
        loadContacts()
        loadMessages()

        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customers contact")
        socket.on("customers contact", (data) => {
            // console.log("cek data customer contact:", data);
            // filter just customers which have sent a message
            let dataContacts = data.filter((item) => (item.status !== 'admin') && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))

            // manipulate customers to add message property with the newest message
            dataContacts = dataContacts.map((item) => ({
                ...item,
                // message: item.senderMessage.length > 0 ? item.senderMessagge[item.senderMessage.length -1].message : "Click here to start message" 
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }


    const loadMessages = (value) => {
        socket.on("messages", (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                console.log(dataMessages);
                setMessages(dataMessages)
            }
            loadContacts()
            const chatMessages = document.getElementById("chat-messages")
            chatMessages.scrollTop = chatMessages?.scrollHeight
        })
    }

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            socket.emit("send messages", data)
            e.target.value = ""
        }
    }

    return (
        <>
            <NavbarAdmin title={title} nameUser={state.user.name} />
            <div style={{ height: '10vh' }} />
            <Container fluid style={{ height: '89.5vh' }}>
                <Row>
                    <Col md={3} style={{ height: '89.5vh' }} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9}>
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminComplain