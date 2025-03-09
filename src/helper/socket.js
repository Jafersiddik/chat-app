import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL;

const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const token = sessionStorage.getItem('jwtToken');


    useEffect(() => {

        const newSocket = io(SOCKET_URL);

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to the socket server');
            newSocket.emit('join', { token });
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from the socket server');
        });

        newSocket.on('reconnect', () => {
            setIsConnected(true);
            console.log('Reconnected to the socket server');
            newSocket.emit('join', { token });
        });

        return () => {
            newSocket.close();
            console.log('Socket connection closed');
        };
    }, []);

    return socket;
};

export default useSocket;
