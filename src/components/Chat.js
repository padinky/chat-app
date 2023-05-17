import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { db,auth } from "../firebase-config";

import "../styles/Chat.css";

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const messageRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const getMessages = () => {
            const queryMessages = query(messageRef, where("room","==",room), orderBy("createdAt"));
            const unsubscribe = onSnapshot(queryMessages,(snapshot) => {
                console.log("NEW MESSAGE", snapshot.docs);
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id});
                });
                setMessages(messages);
            });

            return () => unsubscribe();
        }
        getMessages()

    },[room,messageRef])
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log(newMessage);
        if (newMessage === '') return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(), 
            user: auth.currentUser.displayName,
            email: auth.currentUser.email,
            room

        });
        setNewMessage("")
    }
    return (
        <div className="chat-app">
            <div className='header'>
                <h1>Welcome to : {room.toUpperCase()}</h1>
            </div>
            <div className="messages">
                {messages.map((m) => (
                    <div className="message" key={m.id}>
                        <span className="user">{m.email}</span>
                        {m.text}
                    </div>
                ))}
            </div>
            <form className="new-message-form" onSubmit={handleSubmitForm}>
                <input 
                    className="new-message-input" placeholder="type message here" 
                    onChange={ (e) => { setNewMessage(e.target.value) } }
                    value={newMessage}
                />
                <button type="submit" className="send-button">Send</button>
            </form> 
        </div>
    )
};