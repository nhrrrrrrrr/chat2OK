import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

//本质上 导出一个函数，形成了一个闭包，从而能在其他模块文件中
//访问当前模块中定义的userSocketMap groupSocketMap socketmap 变量数据
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
export const getGrouproomname = (id) => {
  return groupSocketMap[id];
};
export const getspecificSocket = (id) => {
  return socketmap[id];
};

//这里相当于维护了一个小型的 用来存储websocket连接用户id的 数据库
const userSocketMap = {}; // {userId: socketId}
const groupSocketMap = {}; // {userId: roomname}
const socketmap = {}; //{userId:socket}

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  //这里的socket参数是指客户端的创建的对象实例
  console.log(`用户${socket.id}已连接`);

  const userId = socket.handshake.query.userId;
  ////一旦有用户加入连接，就保存他的socket.id
  //这里有一个非常重要的映射：以这个用户user对象的_id作为键，保存这个用户的socket.id作为值
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
    socketmap[userId] = socket;
  }

  // io.emit() is used to send events to all the connected clients
  //也即是io对象不加to方法的话，默认是像所有的websocket连接的客户端的socket实例广播发送消息
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", (reason) => {
    console.log(`用户${socket.id} 断开连接因为 ${reason}`);
    delete userSocketMap[userId]; //一旦有用户断开连接，就删除 他的socket.id
    delete socketmap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  //实现群聊的socket方法
  //监听确定由用户打开了一个群聊加入进来，并把这个socket对象假如到这个特定的rooms中
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    groupSocketMap[userId] = roomName;
    console.log(`Socket with ID: ${socket.id} has joined room: ${roomName}`);
    // 获取当前客户端所在的房间
    const rooms = Array.from(socket.rooms);
    console.log(`Socket with ID: ${socket.id} is in rooms:`, rooms);

    //监听这个socket对象是否离开了群聊，如果是则
    socket.on("leaveRoom", (roomName) => {
      socket.leave(roomName);
      delete groupSocketMap[userId];
      console.log(`Socket with ID: ${socket.id} has left room: ${roomName}`);
      // 获取当前客户端所在的房间
      const rooms = Array.from(socket.rooms);
      console.log(`Socket with ID: ${socket.id} is in rooms:`, rooms);
    });
  });
});
export { app, io, server };
//向一个特定roomName的群聊发送消息
// socket.on("sendMessageToRoom", (data) => {
//   const roomName = data.room;
//   const message = data.message;
//   io.to(roomName).emit("message", { user: socket.id, text: message });
// });

// 监听这个群聊消息
// socket.on("sendMessageToRoom", (data) => {
//   const roomName = data.room;
//   const message = data.message;

//   // 广播消息给指定房间内的所有客户端，包括发送者自己
//   io.to(roomName).emit("groupmessage", { user: "admin", text: message });
//   // 或者如果你不想让发送者自己收到消息，可以使用以下方式
//   // socket.to(roomName).emit('groupmessage', { user: 'admin', text: message });
// });

// socket.on("message", (message) => {
//   console.log(message);
// });
// socket.on("message", async (client) => {
//   try {
//     const { reciver: receiverId, message, sender: senderId } = client;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }
//     await Promise.all([conversation.save(), newMessage.save()]);

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     const sender = getReceiverSocketId(senderId);
//     if (receiverSocketId || sender) {
//       // io.to(<socket_id>).emit() used to send events to specific client
//       io.to([receiverSocketId, sender]).emit("newMessage", newMessage);
//       // io.emit("newMessage", newMessage);
//     }
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// socket.on() is used to listen to the events. can be used both on client and server side

// // 客户端加入房间
// socket.on('joinRoom', (roomName) => {
//   socket.join(roomName);
//   console.log(`Socket with ID: ${socket.id} has joined room: ${roomName}`);
//   io.to(roomName).emit('message', { user: 'admin', text: `${socket.id} has joined the room` });

//   // 获取当前客户端所在的房间
//   const rooms = Array.from(socket.rooms);
//   console.log(`Socket with ID: ${socket.id} is in rooms:`, rooms);
// });

// // 客户端离开房间
// socket.on('leaveRoom', (roomName) => {
//   socket.leave(roomName);
//   console.log(`Socket with ID: ${socket.id} has left room: ${roomName}`);
//   io.to(roomName).emit('message', { user: 'admin', text: `${socket.id} has left the room` });

//   // 获取当前客户端所在的房间
//   const rooms = Array.from(socket.rooms);
//   console.log(`Socket with ID: ${socket.id} is in rooms:`, rooms);
// });

//   // 客户端加入房间
//   socket.on('joinRoom', (roomName) => {
//     socket.join(roomName);
//     console.log(`Socket with ID: ${socket.id} has joined room: ${roomName}`);
//     io.to(roomName).emit('message', { user: 'admin', text: `${socket.id} has joined the room` });

//     // 获取所有房间及其成员
//     const allRooms = io.sockets.adapter.rooms;
//     console.log('All rooms and their members:', allRooms);
// });

// // 客户端离开房间
// socket.on('leaveRoom', (roomName) => {
//     socket.leave(roomName);
//     console.log(`Socket with ID: ${socket.id} has left room: ${roomName}`);
//     io.to(roomName).emit('message', { user: 'admin', text: `${socket.id} has left the room` });

//     // 获取所有房间及其成员
//     const allRooms = io.sockets.adapter.rooms;
//     console.log('All rooms and their members:', allRooms);
// });

// // 监听客户端断开连接
// socket.on('disconnect', () => {
//     console.log(`Client with ID: ${socket.id} has disconnected`);

//     // 获取所有房间及其成员
//     const allRooms = io.sockets.adapter.rooms;
//     console.log('All rooms and their members:', allRooms);
// });
