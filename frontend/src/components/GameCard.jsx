import React from "react";

const GameCard = ({ title, description, onPlay }) => {
  return (
    <div
      className="bg-gray-900 border border-gray-700 rounded-2xl p-6
                 hover:border-purple-500 hover:shadow-purple-500/30
                 hover:shadow-xl transition-all duration-300
                 flex flex-col justify-between"
    >
      {/* Game Info */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Play Button */}
      <button
        onClick={onPlay}
        className="mt-6 w-full py-3 rounded-xl font-semibold
                   bg-purple-600 hover:bg-purple-700
                   text-white transition-all duration-200"
      >
        Play
      </button>
    </div>
  );
};

export default GameCard;
