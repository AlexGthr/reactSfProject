// Importer React et la fonction useState depuis la bibliothèque React
import React, { useState } from 'react';

// Composant Square : représente un carré dans le jeu
function Square({value, onSquareClick}) {
  // Renvoie un bouton avec une valeur et une fonction de clic
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// Composant Board : représente le plateau de jeu
function Board({ nextPlayer, squares, onPlay }) {
  // Fonction handleClick : gère le clic sur un carré
  function handleClick(i) {
    // Vérifie si le carré est déjà rempli ou s'il y a un gagnant
    if (squares[i] || calculWinner(squares)) {
      return;
    }
    // Crée une copie des carrés
    const nextSquares = squares.slice();
    // Modifie la copie en fonction du joueur actuel
    if (nextPlayer) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    // Appelle la fonction de gestion du jeu avec les nouveaux carrés
    onPlay(nextSquares);
  }

  // Détermine s'il y a un gagnant
  const winner = calculWinner(squares);
  let status;
  // Définit le statut du jeu en fonction du gagnant ou du prochain joueur
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player : " + (nextPlayer ? "X" : "O");
  }

  // Renvoie le rendu du plateau de jeu avec des carrés et le statut
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
  );

  // Fonction pour déterminer le gagnant
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
        return squares[a];
      }
    }
    return null;
  }
}

// Composant Game : composant principal qui gère le jeu
export default function Game() {
  // État pour suivre le joueur suivant
  const [nextPlayer, setNextPlayer] = useState(true);
  // État pour suivre l'historique des mouvements
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // État pour suivre le mouvement actuel
  const [currentMove, setCurrentMove] = useState(0);
  // Carrés actuels basés sur l'historique et le mouvement actuel
  const currentSquares = history[currentMove];

  // Fonction pour gérer un mouvement
  function handlePlay(nextSquares) {
    // Met à jour l'historique avec les nouveaux carrés
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // Met à jour le mouvement actuel
    setCurrentMove(nextHistory.length - 1);
    // Change le joueur suivant
    setNextPlayer(!nextPlayer);
  }

  // Fonction pour sauter à un mouvement spécifique
  function jumpTo(nextMove) {
    // Met à jour le mouvement actuel
    setCurrentMove(nextMove);
    // Met à jour le joueur suivant
    setNextPlayer(nextMove % 2 === 0);
  }

  // Liste des mouvements sous forme de boutons
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Renvoie le rendu du jeu avec le plateau de jeu et les mouvements
  return (
    <div className="game">
      <div className="game-board">
        <Board nextPlayer={nextPlayer} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
