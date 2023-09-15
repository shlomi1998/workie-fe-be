import { Server, Socket } from "socket.io";

type User = {
  userId: string;
  socketId: string;
};

let onlineUsers: User[] = [];

export default function (socket: Socket, io: Server) {
  socket.on("join", (user: string) => {
    socket.join(user);

    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }

    io.emit("get-online-users", onlineUsers);
    io.emit("setup socket", socket.id);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });

  socket.on("join conversation", (conversation: string) => {
    socket.join(conversation);
  });

  socket.on("send message", (message: any) => {  // 'any' can be replaced with the specific type of your message
    let conversation = message.conversation;
    if (!conversation.users) return;

    conversation.users.forEach((user: any) => {  // 'any' can be replaced with the specific type of your user
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  socket.on("typing", (conversation: string) => {
    socket.in(conversation).emit("typing", conversation);
  });

  socket.on("stop typing", (conversation: string) => {
    socket.in(conversation).emit("stop typing");
  });

  socket.on("call user", (data: any) => {  // 'any' can be replaced with the specific type of your data
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    if (userSocketId) {
      io.to(userSocketId.socketId).emit("call user", {
        signal: data.signal,
        from: data.from,
        name: data.name,
        picture: data.picture,
      });
    }
  });

  socket.on("answer call", (data: any) => {  // 'any' can be replaced with the specific type of your data
    io.to(data.to).emit("call accepted", data.signal);
  });

  socket.on("end call", (id: string) => {
    io.to(id).emit("end call");
  });
}
