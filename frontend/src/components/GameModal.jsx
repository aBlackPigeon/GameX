import React, { useState } from "react";
import socket from "../socket";

const GameModal = ({ game, onClose, onSubmit, error }) => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const handleCreate = () => {
    if (!username.trim()) return;
    onSubmit({
      action: "create",
      username: username.trim(),
      roomCode: null,
      gameId: game.id,
    });

    socket.connect();
    socket.emit("create-room" , {
      username,
      gameId : game.id,
    })

  };

  const handleJoin = () => {
    if (!username.trim() || !roomCode.trim()) return;
    onSubmit({
      action: "join",
      username: username.trim(),
      roomCode: roomCode.trim(),
      gameId: game.id,
    });

    if(!socket.connected){
      socket.connect();
    }

    socket.emit("join-room" , {
      roomCode,
      username
    })

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {error && (
        <p className="text-red-500 text-center mt-4">
          {error};
        </p>
      )}

      {/* Modal Card */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md z-10">
        
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {game.title}
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white
                     placeholder-gray-400 border border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Room Code */}
        <input
          type="text"
          placeholder="Enter room code (for joining)"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-gray-800 text-white
                     placeholder-gray-400 border border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleCreate}
            className="flex-1 py-3 rounded-xl bg-green-600
                       hover:bg-green-700 text-white font-semibold"
          >
            Create Room
          </button>

          <button
            onClick={handleJoin}
            className="flex-1 py-3 rounded-xl bg-purple-600
                       hover:bg-purple-700 text-white font-semibold"
          >
            Join Room
          </button>
        </div>

      </div>
    </div>
  );
};

export default GameModal;
