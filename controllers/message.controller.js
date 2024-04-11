import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run pparallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSocketId = getRecieverSocketId(recieverId);

    if (recieverSocketId) {
      // io.to(<scoket.id>).emit() is used to send events to specific client
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
    console.log("error in sending message: ", error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
    console.log("error in getting conversation: ", error.message);
  }
};
