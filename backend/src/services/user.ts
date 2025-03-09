import User from '../models/user';

import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import mongoose, { Types } from 'mongoose';
import config from "../config/config";
const jwtSecretKey = config.jwtSecret;
const { ObjectId } = mongoose.Types;

export const createUser = async (userData: any) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
}

export const userList = async (data: any) => {
    try {
        const user_id = data.except_id;
        console.log(user_id)
        // const users = await User.find({ _id: { $ne: user_id } }).select('name _id');
        const users = User.aggregate([
            {
                $match: {
                    _id: { $ne: new ObjectId(user_id) }  // Exclude the current user from results
                }
            },
            {
                $lookup: {
                    from: "conversations",  // Lookup the conversations
                    localField: "_id",
                    foreignField: "participants",
                    as: "userConversations"
                }
            },
            {
                $unwind: {
                    path: "$userConversations",
                    preserveNullAndEmptyArrays: true  // Keep users even if they have no conversations
                }
            },
            {
                $lookup: {
                    from: "messages",  // Join with the messages collection
                    localField: "userConversations._id",
                    foreignField: "conversationId",
                    as: "messages"
                }
            },
            {
                $addFields: {
                    // Filter messages to get only the ones sent by the current user (senderId match)
                    filteredMessages: {
                        $filter: {
                            input: "$messages",
                            as: "message",
                            cond: { $eq: ["$$message.senderId", new ObjectId(user_id)] }
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$filteredMessages",  // Unwind the filtered messages
                    preserveNullAndEmptyArrays: true  // Ensure users without messages still appear
                }
            },
            {
                $sort: { "filteredMessages.createdAt": -1 }  // Sort by createdAt to get the most recent message
            },
            {
                $group: {
                    _id: "$_id",  // Group by user _id
                    name: { $first: "$name" },
                    lastMessage: { $first: "$filteredMessages" },  // Get the most recent message
                    createdAt: { $first: "$createdAt" },
                    conversationId: { $first: "$userConversations._id" }
                }
            },
            {
                $project: {
                    _id: 1,
                    userId: "$_id",
                    name: 1,
                    lastMessage: {
                        message: 1,  // Include the message content if available
                        createdAt: 1  // Include the timestamp if available
                    },
                    conversationId: 1
                }
            },
            {
                $sort: { "name": 1 }  // Optionally, sort by user name or any other field
            }
        ]);
        
        
        
        
        
        return users;
    } catch (err) {
        console.log(err)
        return { status: false };
    }
}

export const getSender = async (token: any) => {
    try {
        // console.log(token)
        const user: any = await getUserId(token)
        // console.log(user)
        if (user) {
            // console.log(user)
            const users = await User.findOne({ _id: { $eq: user.id } }).select('name _id');
            // console.log("dd", users)
            return { status: true, sender: users };
        } else {
            return { status: false, type: 'auth' }
        }
    } catch (err) {
        console.log(err)
        return { status: false, type: 'server' }
    }
}


export const getUserId = async (token: string) => {
    const decoded = await new Promise<any>((resolve, reject) => {
        jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
            if (err) {
                console.log(err)
                reject(false);
            } else {
                resolve(decoded);
            }
        });
    });
    return decoded;
}