import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";
import * as userService from './user';
import * as messageService from './message';

declare global {
    var onlineUsers: Map<string, any>;
}

declare global {
    namespace Express {
        interface Request {
            io: SocketIOServer;
        }
    }
}


global.onlineUsers = new Map<string, any>();

export const setupSocket = (io: SocketIOServer) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for a user to join with their name
        socket.on('join', async (data: any) => {
            // console.log("join", data)
            const senderResponse = await userService.getSender(data.token)
            if (senderResponse.status) {
                let sender = senderResponse.sender;
                if (sender) {
                    console.log("join", sender.id)
                    onlineUsers.set(sender.id, socket.id)
                    io.to(sender.id).emit('join-success', { id: sender.id })
                }
            }
        })


        socket.on('sendMessage', async (data: any) => {
            // console.log(`Private message from ${socket.id} to ${data.receiverId}: ${data.message}`);
            console.log(data)
            const senderResponse = await userService.getSender(data.senderToken)
            console.log("dds", senderResponse)
            if (senderResponse.status) {
                let sender = senderResponse.sender;
                if (sender) {
                    let senderId = sender.id;
                    let message: any = {
                        senderId: senderId,
                        receiverId: data.receiverId,
                        message: data.message,

                    }
                    const messagResponse = await messageService.addMessage(message);
                    if (messagResponse) {
                        message.send = true
                        message._id = messagResponse.id;
                        message.createdAt = messagResponse.createdAt;
                        const receiverSocketId = onlineUsers.get(data.receiverId);
                        const senderSocketId = onlineUsers.get(senderId);
                        console.log("xx", receiverSocketId, '-', senderSocketId)
                        io.to(senderSocketId).emit('receiveMessage', message);
                        message.send = false;
                        io.to(receiverSocketId).emit('receiveMessage', message);

                    }
                }

            }

        });

        socket.on('sendTypingResponse', async (data: any) => {
            // console.log(`Private message from ${socket.id} to ${data.receiverId}: ${data.message}`);
            console.log("typing", data)
            const senderResponse = await userService.getSender(data.senderToken)
            if (senderResponse.status) {
                let sender = senderResponse.sender;
                if (sender) {
                    let senderId = sender.id;
                    const receiverSocketId = onlineUsers.get(data.receiverId);
                    io.to(receiverSocketId).emit('receiveTypeResponse', { senderId, receiverId: data.receiverId, status: data.status });
                }
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // delete usersMap[socket.id];
        });
    });
};
