import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import GroupMessage from "../models/Groupmessage.js";
import Group from "../models/group.js";
import {
  getReceiverSocketId,
  getGrouproomname,
  getspecificSocket,
  io,
} from "../socket/socket.js";

export const SendGroupMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: GroupreceiverId } = req.params; //这条消息是属于哪个群聊的，并获取id
    const senderId = req.user._id;

    //找到那条群组会话
    let Groupconversation = await Group.findOne({ _id: GroupreceiverId });

    // if (!conversation) {
    //   conversation = await Conversation.create({
    //     participants: [senderId, receiverId],
    //   });
    // }

    //创建一条新消息
    const newMessage = new GroupMessage({
      senderId,
      GroupId: GroupreceiverId,
      content: message,
    });

    if (newMessage) {
      Groupconversation.Messages.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([Groupconversation.save(), newMessage.save()]);

    //既然是群聊，socket接受方就必须是 一个包含多个用户的群组
    // 通过 emit 方法向特定的房间（即群组）广播消息
    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const Groupname = getGrouproomname(senderId);
    const socket = getspecificSocket(senderId);
    if (Groupname) {
      //这个io.to(<roomname>)方法是向当前socket对象的所在的某个特定群组中的所有人发送广播消息
      //包括他自己
      // io.to(<roomname>).emit() used to send events to specific room
      // io.to(Groupname).emit("GroupnewMessage", newMessage);
      socket.to(Groupname).emit("GroupnewMessage", newMessage);
    }
    //这里是为了响应发送者 所以无法像socket做到实时响应
    //因为对于一个实时通信应用来讲，发送者的消息不一定要实时显示在他的页面中
    //主要是在于接收者的页面能不能实时接受到这个消息
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage); //这里是为了实时响应接收者
    }

    res.status(201).json(newMessage); //这里是为了响应发送者 虽然不是实时的socket 响应
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { id: GourpChatId } = req.params;
    // const senderId = req.user._id;

    const Groupconversation = await Group.findOne({
      _id: GourpChatId,
    }).populate("Messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!Groupconversation) return res.status(200).json([]);

    const messages = Groupconversation.Messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
