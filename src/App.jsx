import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import { act, useState } from 'react';
import Log from './Components/Log';
import { WINNING_COMBOS } from './Components/winning_combinations';

function derivedActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}
function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = derivedActivePlayer(gameTurns);

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

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={activePlayer === 'X'}
                    />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={activePlayer === 'O'}
                    />
                </ol>
                <GameBoard
                    onActivePlayer={handleActivePlayer}
                    turns={gameTurns}
                />
                <Log turns={gameTurns} />
            </div>
        </main>
    );
}

export default App;
