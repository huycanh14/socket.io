var express = require("express");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers = ["AAA"];

io.on("connection", (socket) => {
    console.log("Co nguoi ket noi", socket.id);

    /*socket.on("disconnect", () => {
        console.log("Ngat ket noi", socket.id)
    });//Su kien ngat ket noi

    socket.on("Client-send-data", (data) => {
        console.log(socket.id + " vừa gửi: " + data);
        //server gui lại thông báo cho tất cả hệ thống
        //io.sockets.emit("Server-send-data", data + "888");
        //server gui lại thông báo cho nguoi gui thong bao
        // socket.emit("Server-send-data", data + "888");

        //server chỉ trả thông báo cho tất cả người khác trừ người gửi thông báo
        socket.broadcast.emit("Server-send-data", data + "888");
    }); //Bắt sự kiện emit phía client
    */

    socket.on('client-send-Username', (data) => {
        if(mangUsers.indexOf(data) >= 0){
            // false => đăng ký thất bại
            socket.emit('server-send-dki-thatbai');
        } else {
            // true => đăng ký thành công
            mangUsers.push(data);
            socket.Username = data; // Tự đặt tên mới
            socket.emit('server-send-dki-thanhcong', data);
            io.sockets.emit('server-send-danhsach-Users', mangUsers);
        }
    });

    socket.on('logout', () => {
       mangUsers.splice( mangUsers.indexOf(socket.Username), 1);
       socket.broadcast.emit('server-send-danhsach-Users', mangUsers);
    });

    socket.on('user-send-message', (data) => {
        io.sockets.emit('server-send-message', {un: socket.Username, nd: data});
    });

    socket.on('toi-dang-go-chu', () => {
        let s = socket.Username + ' dang go chu';
        io.sockets.emit('ai-do-dang-go', s);
    });

    socket.on('toi-ngung-go-chu', () => {
        let s = socket.Username + ' dang go chu';
        io.sockets.emit('ai-do-Sto-go');
    });
});//su kien lang nghe

app.get("/", (req, res) => {
    res.render("trangchu");
})
