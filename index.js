/// es6 hint

const express = require("express");
const app = express();
const http = require ("http").createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

http.listen(port,()=>{
    console.log(`linstening to server ${port}`);
});

app.get('/', (req ,res)=>{
    res.sendfile( __dirname + "/index.html");
});

// socket setup

const io = require("socket.io")(http);

io.on('connection', (socket)=>{
console.log("connected ...");

socket.on("message", (msg)=>{
socket.broadcast.emit("message",msg)
})


});


