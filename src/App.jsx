import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function handleClick(index) {
    if (board[index] !== "" || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    if (checkWinner(newBoard)) return;
    setTurn(turn === "X" ? "O" : "X");
  }

  function checkWinner(newBoard) {
    for (let [a, b, c] of winLines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        setWinningCells([a, b, c]);
        setScore(prev => ({ ...prev, [newBoard[a]]: prev[newBoard[a]] + 1 }));
        return true;
      }
    }
    return false;
  }

  function restartGame() {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setWinningCells([]);
    setTurn("X");
  }

  // fireworks: fixed count with random positions & colors
  function renderFireworks() {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      const style = {
        left: Math.random() * 100 + "%",
        top: Math.random() * 60 + "%",
        background: `hsl(${Math.random() * 360}, 85%, 55%)`
      };
      arr.push(<div key={`fw-${i}`} className="firework-dot" style={style} />);
    }
    return arr;
  }

  // crackers: a few radial cracker bursts centered above the board
  function renderCrackers() {
    const arr = [];
    // place 3 crackers across the top center area
    const positions = [30, 50, 70];
    for (let i = 0; i < positions.length; i++) {
      const left = positions[i] + "%";
      arr.push(<div key={`cr-${i}`} className="cracker" style={{ left }} />);
    }
    return arr;
  }

  // confetti: multiple emoji pieces across a centered band
  function renderConfetti() {
    const colors = ["🎉", "✨", "🎊", "🎈", "⭐"];
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const left = (i * (100 / 14)) + Math.random() * 6 - 3;
      const delay = Math.random() * 0.6;
      const char = colors[Math.floor(Math.random() * colors.length)];
      arr.push(
        <span
          key={`c-${i}`}
          className="confetti"
          style={{ left: `${left}%`, animationDelay: `${delay}s` }}
        >
          {char}
        </span>
      );
    }
    return arr;
  }

  return (
    <div className="game-wrapper">

      <h1 className="game-title">🎮 Tic Tac Toe</h1>

      {/* Scoreboard */}
      <div className="scoreboard">
        <div className="score-box">
          <div className="avatar-and-label">
            <div className="avatar small">X</div>
            <div>X Score</div>
          </div>
          <div className="score-value">{score.X}</div>
        </div>

        <div className="score-box">
          <div className="avatar-and-label">
            <div className="avatar small">O</div>
            <div>O Score</div>
          </div>
          <div className="score-value">{score.O}</div>
        </div>
      </div>

      {/* Game Board */}
      <div className={`board ${winner ? "win-shake" : ""}`}>
        {board.map((value, index) => (
          <div
            key={index}
            className={`cell ${winningCells.includes(index) ? "win-cell" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Celebration overlays: full-screen + positioned effects */}
      {winner && (
        <>
          <div className="fullscreen-celebration" />

          {/* fireworks layer (full screen random) */}
          <div className="fireworks" aria-hidden>
            {renderFireworks()}
          </div>

          {/* crackers & sparkles positioned relative to the board center */}
          <div className="celebration" aria-hidden>
            <div className="crackers-wrapper">
              {renderCrackers()}
            </div>

            <div className="sparkles" />
            <div className="confetti-wrapper">
              {renderConfetti()}
            </div>
          </div>
        </>
      )}

      {/* Winner Box */}
      {winner && (
        <div className={`winner-box winner-${winner}`}>
          <h2 className="winner-text">🎉 Winner: {winner}!</h2>

          <img
            src="https://media1.tenor.com/m/RdYowW9KtNMAAAAC/dancing-happy-dance.gif"
            alt="Winner Dance"
            className="winner-gif"
          />
        </div>
      )}

      <button
        onClick={restartGame}
        onMouseMove={(e) => {
          const rect = e.target.getBoundingClientRect();
          e.target.style.setProperty("--x", e.clientX - rect.left + "px");
          e.target.style.setProperty("--y", e.clientY - rect.top + "px");
        }}
      >
        Restart Game
      </button>
    </div>
  );
}
