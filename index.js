var express = require("express");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", (socket) => {
    console.log("Co nguoi ket noi", socket.id);

    socket.on("disconnect", () => {
        console.log("Ngat ket noi", socket.id)
    });//Suw kien ngat ket noi
});//su kien lang nghe

app.get("/", (req, res) => {
    res.render("trangchu");
})
