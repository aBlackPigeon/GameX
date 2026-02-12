import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import GameModal from "./GameModal";
import socket from "../socket";
import { useNavigate } from "react-router-dom";


const games = [
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Challenge a friend in this classic strategy game."
  },
  {
    id: "snake",
    title: "Snake",
    description: "Eat, grow, and don’t hit the walls!"
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    description: "Quick reflexes. Simple rules. Endless fun."
  },
  {
    id: "chess",
    title: "Chess",
    description: "Think ahead and dominate the board."
  }
];

const Hero = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [error,setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room-update" , ({roomCode, gameId}) => {
      const id = gameId || selectedGame?.id;
      navigate(`/game/${id}/${roomCode}`);
    });

    socket.on("room-error" , (message) => {
      setError(message);
    });

    return () => {
      socket.off("room-update");
      socket.off("room-error");
    };
  }, [selectedGame]);

  const handleGameAction = (data) => {
    console.log("Game action:", data);
    /*
      data = {
        action: "create" | "join",
        username,
        roomCode,
        gameId
      }
    */

    // Next step:
    // socket.emit("game-action", data);
    setSelectedGame(null);
  };

  return (
    <section className="w-full py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Choose Your Game 🎮
        </h2>

        {/* Game Grid */}
        <div
          className="grid gap-8
                     grid-cols-1
                     sm:grid-cols-2
                     lg:grid-cols-3"
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              onPlay={() => setSelectedGame(game)}
            />
          ))}
        </div>

        {/* Game Modal */}
        {selectedGame && (
          <GameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
            onSubmit={handleGameAction}
            error={error}
          />
        )}

      </div>
    </section>
  );
};

export default Hero;
