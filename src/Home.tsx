import { useNavigate } from "react-router-dom";
import { useGameSession } from "./App";

function HomePage() {
  const navigate = useNavigate();
  const { createGameSession } = useGameSession();

  const handleStart = (): void => {
    createGameSession(1);
    navigate("/game/1");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-lg shadow-xl p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to the Game
        </h1>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default HomePage;
