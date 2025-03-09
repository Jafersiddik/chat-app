import { Request, Response } from "express";
import * as userService from '../services/user';
import { errorResponse, failureResponse, successResponse, unAuthResponse } from "../utils/response";
import User from "../models/user";
import jwt from 'jsonwebtoken'
import config from "../config/config";
const jwtSecretKey = config.jwtSecret;
import * as messageService from '../services/message';
import Messages from "../models/messages";
import { send } from "process";
import mongoose from "mongoose";


export const userlist = async (req: Request, res: Response) => {
    try {
        const user_id = req.user.id;
        const result = await userService.userList({ except_id: user_id });
        return successResponse(req, res, { data: result, message: "user list" })

    } catch (e) {
        console.log(e)
        return errorResponse(req, res, { data: [] })
    }
}

export const messageList = async (req: Request, res: Response) => {
    try {
        const user_id = req.user.id;
        console.log(req.query)
        const { receiverId } = req.params;
        console.log(receiverId)
        let chk_user = await User.findById(receiverId);
        if (chk_user) {
            const participants = [user_id, receiverId].sort();
            const conversation = await messageService.getConversationId(participants)
            const conversationId = new mongoose.Types.ObjectId(conversation.id);
            // const result = await Messages.find({ conversationId: conversation.id }).sort({ createdAt: 1 });
            const result = await Messages.aggregate([
                {
                    $match: { conversationId },
                },
                {
                    $sort: { createdAt: 1 }
                },
                {
                    $addFields: {
                        send: { $eq: ['$senderId', new mongoose.Types.ObjectId(user_id)] }
                    }
                }
            ])
            return successResponse(req, res, { data: result, message: "message list" })
        } else {
            return failureResponse(req, res, { message: "Receiver not found" })
        }

    } catch (e) {
        return errorResponse(req, res, { data: [] })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // const header = req.headers['authorization']
        // const token = header?.split(' ')[1] as string;
        // jwt.verify(token, 'dd', async (err, decoded) => {
        //     if (err) {
        //         console.log(err);
        //         return unAuthResponse(req, res, { data: [], message: "unauthorized" })
        //     }
        return successResponse(req, res, { data: [], message: "logour successful" })
        // })

    } catch (e) {
        return errorResponse(req, res, { data: [] })
    }
}