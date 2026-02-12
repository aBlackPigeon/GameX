import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";

const GameScreen = () => {
  const { gameId, roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    socket.on("room-update", ({ users }) => {
      setPlayers(users);
    });

    socket.on("start-game", () => {
      setStarted(true);
    });

    return () => {
      socket.off("room-update");
      socket.off("start-game");
    };
  }, []);

  const toggleReady = () => {
    socket.emit("toggle-ready", { roomCode });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-4">{gameId}</h1>
      <p className="text-gray-400 mb-6">Room: {roomCode}</p>

      {!started ? (
        <div className="bg-gray-900 p-6 rounded-2xl w-96">

          <h2 className="text-xl font-semibold mb-4 text-center">
            Lobby
          </h2>

          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
              >
                <span>{player.username}</span>
                <span
                  className={
                    player.ready
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {player.ready ? "Ready" : "Not Ready"}
                </span>
              </div>
            ))}
          </div>

          {players.length === 2 && (
            <button
              onClick={toggleReady}
              className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold"
            >
              Toggle Ready
            </button>
          )}

        </div>
      ) : (
        <div className="text-2xl text-green-400">
          Game Starting...
        </div>
      )}
    </div>
  );
};

export default GameScreen;
