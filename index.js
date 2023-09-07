const express = require('express');
const routes = require('./Routes');
const cors = require('cors')
const cookieParser = require("cookie-parser")
const http = require('http')
const db = require("./db")
const app = express();
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})
app.use(express.json({}))
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const PORT = 8000
app.use('/api/v1', routes)

io.on("connection", (socket) => {
    console.log(socket.id, "connection");
    socket.on("chat", ({ message, room }) => {
        console.log(room,message,"mess");
        socket.join(room)
        io.to(room).emit(message)
    })
})

server.listen(PORT, () => console.log(`listening on ${PORT}`))