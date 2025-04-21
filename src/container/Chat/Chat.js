import React, { useEffect, useMemo, useState } from 'react'
import { CHAT_URL } from '../../utils/base';
import { io } from 'socket.io-client';

export default function Chat() {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [to, setTo] = useState('')
    const [group, setGroup] = useState('')

    const socket = useMemo(() => io(CHAT_URL), []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Client connect at : ", socket.id);
        })

        socket.on("hello", (arg) => {
            console.log(arg);
        });

        socket.on("receive_message", (msg) => {
            console.log(msg);
            setMessages((prev) => [...prev, msg])
        });
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        socket.emit("Send_message", { message, to })

    }

    const handleGroupSubmit = (event) => {
        event.preventDefault();

        socket.emit("group_name", group)
    }

    console.log(messages);


    return (
        <div class="container-fluid contact py-5">
            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                <h1 className="text-primary">Get in touch</h1>
                                <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                            </div>
                            <div>

                                <form onSubmit={(e) => handleGroupSubmit(e)}>
                                    <input
                                        name='group'
                                        placeholder='Please enter group name'
                                        onChange={(e) => setGroup(e.target.value)}
                                    />
                                    <input type='submit' />
                                </form>

                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <input
                                        name='to'
                                        placeholder='Please enter name'
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                    <input
                                        name='message'
                                        placeholder='Please enter message'
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <input type='submit' />
                                </form>
                            </div>

                            {
                                messages?.map((m) => (
                                    <p>{m}</p>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
