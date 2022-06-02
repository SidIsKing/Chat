// Node server which will handle socket io connections
var http = require("http");
var socket = require("socket.io");

const httpServer = http.createServer();
const io = new socket.Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const users = {};
io.on("connection", (socket) => {
    socket.on("new-user-joined", (name) => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });
    socket.on("send", (message) => {
        socket.broadcast.emit("receive", {
            message: message,
            name: users[socket.id],
        });
    });
    socket.on("disconnect", (message) => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    });
});
httpServer.listen(8000);