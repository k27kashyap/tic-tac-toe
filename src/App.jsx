import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import { act, useState } from 'react';
import Log from './Components/Log';
// import { WINNING_COMBOS } from './Components/winning_combinations';
import GameOver from './Components/GameOver';
import derivedActivePlayer from './Components/DerivedActivePlayer';
import derivedWinner from './Components/DerivedWinner';
import derivedGameBoard from './Components/DerivedGameBoard';

const PLAYERS = {
    X: 'Player1',
    O: 'Player2',
};

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = derivedActivePlayer(gameTurns);
    const gameBoard = derivedGameBoard(gameTurns);
    const winner = derivedWinner(gameBoard, players);
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
