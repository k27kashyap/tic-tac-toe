import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import { useState } from 'react';
import Log from './Components/Log';

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X');

    function handleActivePlayer() {
        setActivePlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));

        setGameTurns((prevTurns) => {
            let currentPlayer = 'X';

            if (prevTurns.lenght > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: activePlayer,
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
            </div>
            <Log />
        </main>
    );
}

export default App;
