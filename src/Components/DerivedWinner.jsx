// import GameBoard from './GameBoard';
import { WINNING_COMBOS } from './winning_combinations';
export default function derivedWinner(gameBoard, players) {
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
