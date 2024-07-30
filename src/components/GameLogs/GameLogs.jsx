export default function GameLogs({ turns }) {
    return (
        <ol id='log'>
            {turns.map((turn) => {
                const { square, player } = turn
                const { row, col } = square
                return (<li key={`${row}-${col}`}>
                    {`${player} - (${row}, ${col})`}
                </li>)
            })}
        </ol>
    )
}