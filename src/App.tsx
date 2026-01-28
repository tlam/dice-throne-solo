import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameSessionProvider } from './contexts/GameSessionProvider';
import GamePage from "./Game";
import HomePage from "./Home";

function App() {
  return (
    <BrowserRouter basename="/dice-throne-solo">
      <GameSessionProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GamePage />} />
          </Routes>
        </div>
      </GameSessionProvider>
    </BrowserRouter>
  );
}

export default App;
