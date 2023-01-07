const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    socket.on("auditorium_join", (data) => {
        console.log("auditorium_join: " + data.roomID);
        // 将当前用户订阅至指定roomID
        socket.join(data.roomID);
        // 发送给连接者当前放映室内信息
        socket.emit("auditorium_info", {
            video: {
                id: 114,
                name: "test",
                name_cn: "测试",
            }
        });
    })
});

io.listen(2999);