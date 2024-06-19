import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import { act, useState } from 'react';
import Log from './Components/Log';
import { WINNING_COMBOS } from './Components/winning_combinations';
import GameOver from './Components/GameOver';

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: 'Player1',
    O: 'Player2',
};

function derivedActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function derivedWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBOS) {
        const firstSquare =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquare =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquare =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquare &&
            firstSquare === secondSquare &&
            firstSquare === thirdSquare
        ) {
            winner = players[firstSquare];
        }
    }

    return winner;
}

function derivedGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = derivedActivePlayer(gameTurns);
    const winner = derivedWinner(gameBoard, players);
    const gameBoard = derivedGameBoard(gameTurns);
    const hasDraw = gameTurns.length == 9 && !winner;

    function handleActivePlayer(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = derivedActivePlayer(prevTurns);

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];

            return updatedTurns;
        });
    }

    function handleRematch() {
        setGameTurns([]);
    }

    function handleNameChange(symbol, newName) {
        setPlayers((prevName) => {
            return {
                ...prevName,
                [symbol]: newName,
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onNameChange={handleNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onNameChange={handleNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRematch={handleRematch} />
                )}
                <GameBoard
                    onActivePlayer={handleActivePlayer}
                    board={gameBoard}
                />
                <Log turns={gameTurns} />
            </div>
        </main>
    );
}

export default App;
