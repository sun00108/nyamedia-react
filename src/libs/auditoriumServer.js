const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    socket.on("auditorium_guest_join", (data) => {
        console.log("auditorium_guest_join: " + data.roomID);
        // 将当前用户订阅至指定roomID
        socket.join(data.roomID);
        // 发送给连接者当前放映室内信息
        socket.emit("auditorium_guest_info", {
            video: {
                id: 114,
                name: "test",
                name_cn: "测试",
            }
        });
    })
    socket.on("auditorium_host_sync", (data) => {
        console.log("来自ROOM " + data.roomID + " 主持人发送的同步请求 - 动作: " + data.action + " 时间（可选）： " + data.value
            + "将发送给房间所有人。");
        // 发送给 data.roomID 房间内所有人
        socket.to(data.roomID).emit("auditorium_guest_sync", {
            action: data.action,
            value: data.value
        })
    })
    socket.on("auditorium_host_switch", (data) => {
        console.log("来自ROOM " + data.roomID + " 主持人发送的换碟请求 - 视频ID: " + data.videoID);
        // 发送给 data.roomID 房间内所有人
        socket.to(data.roomID).emit("auditorium_guest_switch", {
            videoID: data.videoID
        })
    })
    socket.on("auditorium_host_chat", (data) => {
        console.log("来自ROOM " + data.roomID + " 用户 " + data.username + " 发送的聊天信息： " + data.message);
        // 发送给 data.roomID 房间内所有人
        socket.to(data.roomID).emit("auditorium_guest_chat", {
            username: data.username,
            message: data.message
        })
    })
});

io.listen(2999);