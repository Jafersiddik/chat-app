import express from "express";
import dotenv from "dotenv";
import { Response, Request } from "express";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import cors from "cors"
import { setupSocket } from "./services/socket";
import connectDB from './config/db'
import indexRouter from './routes/index'
import authRouter from './routes/auth'
import { json } from "stream/consumers";

dotenv.config();
const app = express()
const port = process.env.PORT || 8000;

app.use(express.json())
connectDB();

app.use(cors());
app.use('/api', indexRouter)
app.use('/api/auth', authRouter)


app.get('/', (req: Request, res: Response) => {
    res.send("Chat App1")
})

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

setupSocket(io)

server.listen(port, function () {
    console.log('server listen port - ', port)
}).on('error', (err) => {
    console.log('server error ', err)
});
