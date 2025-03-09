import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Types.ObjectId, require: true, ref: 'users' },
    conversationId: { type: mongoose.Types.ObjectId, require: true, ref: 'conversation' },
    message: { type: String, require: true },
    createdAt: { type: Date, default: Date.now }
})
const Messages = mongoose.model('messages', messageSchema)
export default Messages;