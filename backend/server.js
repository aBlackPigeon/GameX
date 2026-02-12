import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
        methods : ["GET" , "POST"]
    }
});

const rooms = {};

function generateRoomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on("connection" , socket => {
    console.log("User connected : " , socket.id);

    // room creation

    socket.on("create-room" , ({username, gameId}) => {
        const roomCode = generateRoomCode();
        rooms[roomCode] = {
            gameId,
            users : [{id : socket.id , username, ready : false}],
        };

        socket.join(roomCode);
        io.emit("room-update" , {roomCode, gameId , users: rooms[roomCode].users});

         console.log("Create room request:", username, gameId);
    })

    // join room

    socket.on("join-room" , ({roomCode,username}) => {
        const room = rooms[roomCode];

        if(!room){
            socket.emit("room-error" , "Room does not exist");
            return;
        }

        if(room.users.length >= 2){
            socket.emit("room-error" , "Room is full");
            return;
        }

        room.users.push({id : socket.id , username , ready : false});
        socket.join(roomCode);

        io.to(roomCode).emit("room-update" , {
            roomCode,
            gameId : room.gameId,
            users : room.users
        });
    });

    // players ready

    socket.on("toggle-ready" , ({roomCode}) => {
        const room = rooms[roomCode];
        if(!room) return;

        const player = room.users.find(u => u.id === socket.id);
        if(!player) return;

        player.ready = !player.ready;

        io.to(roomCode).emit("room-update" , {roomCode, users : room.users});

        // both ready start
        if(room.users.length === 2 && room.users.every(u => u.ready)){
            io.to(roomCode).emit("start-game" , {roomCode, gameId : room.gameId});
        }
    });

    socket.on("disconnect" , () => {
        console.log("User disconnected" , socket.id);

        for(const roomCode in rooms){
            const room = rooms[roomCode];
            room.users = room.users.filter(u => u.id !== socket.id);

            if(room.users.length === 0){
                delete rooms[roomCode];
            }else{
                io.to(roomCode).emit("user-left", room.users);
            }
        }
    })
})

app.get("/" , (req,res) => {
    res.send("Backend running perfectly");
})

server.listen(8000, () => {
    console.log("Server is running at port 8000");
})