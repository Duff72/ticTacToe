import { useState } from 'react';

function Square({value, onSquareClick}) {
 
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay}) {

  function handleClick(i, id) {
    if (squares[i]  || calculateWinner(squares)) { 
      return; // if square is already clicked or game is over, do nothing
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
    nextSquares[i] = "X";
  } else {
    nextSquares[i] = "O";
  }
  console.log("Clicked square with ID:", id);
    onPlay(nextSquares);
    return id;
 
  }

  const winner = calculateWinner(squares);
  let status;
  let moveList;
  
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } return (
    <> 
      <div className="status">{status}</div>
      <div className="moveList">{moveList}</div>
      <div className="board-row">
        <Square id="a3" value={squares[0]} onSquareClick={() => handleClick(0, "a3")}/>
        <Square id="b3" value={squares[1]} onSquareClick={() => handleClick(1, "b3")}/>
        <Square id="c3" value={squares[2]} onSquareClick={() => handleClick(2, "c3")}/>
      </div>
      <div className="board-row">
        <Square id="a2" value={squares[3]} onSquareClick={() => handleClick(3, "a2")}/>
        <Square id="b2" value={squares[4]} onSquareClick={() => handleClick(4, "b2")}/>
        <Square id="c2" value={squares[5]} onSquareClick={() => handleClick(5, "c2")}/>
      </div>
      <div className="board-row">
        <Square id="a1" value={squares[6]} onSquareClick={() => handleClick(6, "a1")}/>
        <Square id="b1" value={squares[7]} onSquareClick={() => handleClick(7, "b1")}/>
        <Square id="c1" value={squares[8]} onSquareClick={() => handleClick(8, "c1")}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (<ul>
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li></ul>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

  

  


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
