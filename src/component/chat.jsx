import { useEffect, useState, useRef } from "react";
import useSocket from "../helper/socket";
import { convertToTime } from "../helper/common";
import IconButton from "./IconButton";
import { FaPaperPlane, FaTrash } from 'react-icons/fa'; 
const ChatBox = (props) => {
    const { chatuser, messages, isTyping } = props;
    const socket = useSocket();
    const [typeMessage, setTypemessage] = useState('');
    const messageEndRef = useRef(null);
    const handleSendMessage = (e) => {
        e.preventDefault();
        let data = {
            senderToken: sessionStorage.getItem('jwtToken'),
            receiverId: chatuser._id,
            message: typeMessage
        }
        if (socket) {
            console.log("ff")
            setTypemessage('')
            socket.emit('sendMessage', data)
        }
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTypemessage(value);
        if (value) {
            let data = {
                senderToken: sessionStorage.getItem('jwtToken'),
                receiverId: chatuser._id,
                status: true
            }
            socket.emit('sendTypingResponse', data)
        } else {
            let data = {
                senderToken: sessionStorage.getItem('jwtToken'),
                receiverId: chatuser._id,
                status: false
            }
            socket.emit('sendTypingResponse', data)
        }
    };

    const handleFocus = (event) => {
        let data = {
            senderToken: sessionStorage.getItem('jwtToken'),
            receiverId: chatuser._id,
            status: true
        }
        socket.emit('sendTypingResponse', data)
    };

    const handleBlur = (event) => {
        // let data = {
        //     senderToken: sessionStorage.getItem('jwtToken'),
        //     receiverId: chatuser._id,
        //     status: false
        // }
        // socket.emit('sendTypingResponse', data)
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // useEffect(() => {
    //     if(socket){
    //         socket.on('')
    //     }
    // },[socket]);
    return (
        <div className="chat-box" id="chatBox">
            {chatuser ? (
                <>
                    <div id="selectedUser" className="chat-header">
                        <h3 >{chatuser.name}</h3>
                        <h1 className="typing-status">{isTyping ? 'Typing...' : ''}</h1>
                    </div>
                    <div id="messageList" className="message-list">
                        {messages && messages.map((message) => {
                            console.log(message);
                            return (<div className={`message ${message.send ? 'sent' : 'receive'}`} key={message._id}>{message.message}<div className={`timestamp ${message.send ? 'sent' : 'receive'}`}>{convertToTime(message.createdAt)}</div></div>)
                        })}
                        <div ref={messageEndRef} />
                    </div>
                        <div className="message-box">

                            <input type="text" className="message-input" id="messageInput" placeholder="Type a message..." required value={typeMessage} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                            
                            <IconButton 
                            icon={FaPaperPlane} 
                            label=""  
                            type="submit"
                            onClick={handleSendMessage}
                            size={20}
                             />

                        </div>
                </>
            ) : (
                <div id="selectedUser" className="chat-header">
                    <span>Select a user to chat</span>
                </div>
            )}
        </div>

    )
}

export default ChatBox;