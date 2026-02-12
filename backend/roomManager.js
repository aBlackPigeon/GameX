const rooms = {};

function generateRoomCode(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createRoom = (socket , {username , gameId}) => {
    const roomCode = generateRoomCode();

    rooms[roomCode] = {
        gameId,
        players : [{id : socket.id , username , ready : false}],
        gameInstance : null
    };

    socket.join(roomCode);

    return {roomCode , room : rooms[roomCode]};
}

export const joinRoom = (socket, {username, roomCode}) => {
    const room = rooms[roomCode];
    if(!room) return {error : "Room does not exist"};
    if(room.players.length >= 2) return {error : "Room is full"};

    room.players.push({id : socket.id , username , ready : false});
    socket.join(roomCode);
    return {roomCode,room};
}

export const toggleReady = (socket , roomCode) => {
    const room = rooms[roomCode];
    if(!room) return null;

    const player = room.players.find(p => p.id === socket.id);
    if(!player) return null;

    player.ready = !player.ready;

    return room;
}

export const removePlayer = (socket) => {
    for(const roomCode in rooms){
        const room = rooms[roomCode];
        room.players = room.players.filter(p => p.id !== socket.id);

        if(room.players.length === 0){
            delete rooms[roomCode];
        }
    }
}