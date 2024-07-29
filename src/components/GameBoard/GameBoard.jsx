let initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({ turns, onSelect }) {
    let gameBoard = initialGameBoard
    for (const turn of turns) {
        console.log(turn)
        const { square, player } = turn
        const { row, col } = square
        gameBoard[row][col] = player
    }
    console.log(gameBoard)

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelect(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}