import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../../component/chat';
import useSocket from '../../helper/socket';
import config from '../../config';
import { get, post } from "../../utils/axios";
import { DateComponent } from '../../helper/common';
import IconButton from '../../component/IconButton';
import { FaSignOutAlt } from 'react-icons/fa';

const Home = () => {
    const socket = useSocket();
    const [users, setusers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatuser, setChatuser] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [active_user, setActiveuser] = useState(null);
    const navigate = useNavigate();
    const handleOpenChat = async (receiver) => {
        setNewMessage([])
        setMessages([])
        get(`api/messages/${receiver._id}`, {}
        ).then((response) => {
            let result = response;
            setLoading(false)
            if (result.status) {
                console.log(receiver)
                setChatuser(receiver)
                setMessages(result.data);
                localStorage.setItem('active-user', JSON.stringify(receiver));
                setActiveuser(receiver)
                setIsTyping(false)
            } else {
                console.log(result.message)
                setError(result.message)
            }
        }).catch(err => {
            setError("Something went wrong")
            console.log(err)
        });
    }
    const handleLogout = () => {
        post('api/logout', {}
        ).then((response) => {
            // let result = response.data;
            sessionStorage.clear('jwtToken')
            localStorage.clear('active-user')
            navigate('/')
        }).catch(err => {
            console.log(err)
        });
    }

    const loadIntialMessage = () => {
        const storedUser = localStorage.getItem("active-user1");
        if (storedUser) {
            handleOpenChat(JSON.parse(storedUser))
            setChatuser(JSON.parse(storedUser))
          }
    }
    useEffect(() => {
        setLoading(true)
        console.log('dd')
        const storedUser = localStorage.getItem("active-user");
        if (storedUser) {
            setActiveuser(JSON.parse(storedUser));
        }
        const token = sessionStorage.getItem('jwtToken');
        console.log(socket,"socket")
        if (socket) {
            socket.emit('join', { token })
            socket.on('receiveMessage', (data) => {
                console.log(data)
                setMessages((prevMessages) => [...prevMessages, data]);
                // setNewMessage(data);
            })

            socket.on('receiveTypeResponse', (data) => {
                console.log('receiveTypeResponse', data)
                if (active_user === data.senderId) {
                    setIsTyping(data.status)
                }
                // setNewMessage(data);
            })


            socket.on('newUser', (data) => {
                console.log(data, "newUser")
                // console.log(data)
                // setMessages((prevMessages) => [...prevMessages, data]);
                // setNewMessage(data);
            })
        }

        get(`api/users`, {}
        ).then((response) => {
            let result = response;
            setLoading(false)
            if (result.status) {
                console.log(result.data)
                setusers(result.data);
                loadIntialMessage()
            } else {
                console.log(result.message)
                setError(result.message)
            }
        }).catch(err => {
            if (err.response.status === 403) {
                // Handle 400
                sessionStorage.clear('jwtToken');
                navigate('/')
            }
            setError("Something went wrong")
            console.log(err)
        });
        console.log(active_user)


    }, [socket])


    return (
        <>
            <div className="app-name">Chat App</div>
            <div className="chat-screen">

                <div className="user-list">
                    <div className='user-list-keader'><h3>Users</h3></div>

                    <ul id="userList">
                        {users && users.map((user, index) => {
                            return (
                                <li id={user._id} key={index} onClick={() => handleOpenChat(user)} className={active_user ? active_user._id == user._id ? 'active' : '' : ''}>
                                    <div class="left-side">
                                        <span class="user-name">{user.name}</span>
                                        <p class="message-text">{user.lastMessage ? user.lastMessage.message : ''}</p>
                                    </div>
                                    <div class="right-side">
                                        <span class="message-time">{user.lastMessage ? DateComponent(user.lastMessage.createdAt) : ''}</span>
                                        {/* <div class="message-badge">1</div> */}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {/* <button id="logoutButton" className="logout-button"
                        onClick={handleLogout}
                    >Logout</button> */}
                    <IconButton 
                            icon={FaSignOutAlt} 
                            label=""  
                            type="submit"
                            onClick={handleLogout}
                            size={20}
                            className="logout-button"
                             />
                </div>
                <ChatBox
                    messages={messages}
                    chatuser={chatuser}
                    newMessage={newMessage}
                    isTyping={isTyping}
                />

            </div>
        </>
    )
}

export default Home;