import React, { useState } from 'react';

function Square({value, onSquareClick}) {

  // Notre boutton
  return <button
            className="square"
            onClick={onSquareClick}
          >
              {value}
            </button>;
}

// L'affichage de notre code, fonction principal
export default function Board() {

  const [nextPlayer, setNextPlayer] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {

    if (squares[i] || calculWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (nextPlayer) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares);
    setNextPlayer(!nextPlayer);
    console.log(nextPlayer);
  }

  const winner = calculWinner(squares);
  let status;

  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player : " + (nextPlayer ? "X" : "O");
  }

  return (
    <>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>

    <div className="status">{status}</div>
    </>
  )

  function calculWinner(squares) {
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
        return squares[a]
      }
    }
    return null;
  }
}


// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// export default function Board() {
//   const [squares, setSquares] = useState(Array(9).fill(null));

//   function handleClick(i) {
//     const nextSquares = squares.slice();
//     nextSquares[i] = 'X';
//     setSquares(nextSquares);
//   }

//   return (
//     <>
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }
