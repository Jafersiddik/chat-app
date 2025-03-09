import mongoose, { Mongoose } from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    name: { type: String },
    createdAt: { type: Date, default: Date.now }
})
const Conversation = mongoose.model('conversation', conversationSchema);
export default Conversation;