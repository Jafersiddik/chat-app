import Conversation from "../models/conversation";
import Messages from "../models/messages";



export const addMessage = async (data: any) => {
    try {
        const { senderId, receiverId, message } = data;
        const participants = [senderId, receiverId].sort();
        const conversation = await getConversationId(participants)

        const newMessage = new Messages({
            senderId,
            conversationId: conversation.id,
            message
        })
        await newMessage.save();

        return newMessage;
    } catch (e) {
        return false
    }
}

export const getConversationId = async (participants: any) => {
    let conversation = await Conversation.findOne({ participants });
    if (!conversation) {
        conversation = new Conversation({ participants });
        await conversation.save();
    }
    return conversation;
}