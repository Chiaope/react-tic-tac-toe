import { useState } from "react"
import GameBoard from "./components/GameBoard/GameBoard"
import PlayerListItem from "./components/PlayerListItem/PlayerListItem"
import GameLogs from "./components/GameLogs/GameLogs"
import { WINNING_COMBINATIONS } from "./winning-condition"
import GameOver from "./components/GameOver/GameOver"


let player1Symbol = 'X'
let player2Symbol = 'O'

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivePlayer(gameTurns) {
  let player = player1Symbol
  if (gameTurns.length > 0 && gameTurns[0].player === player1Symbol) {
    player = player2Symbol
  }
  return player
}

function checkWinningCondition(gameBoard) {
  for (const winning_combination of WINNING_COMBINATIONS) {
    let currSymbols = [null, null, null]
    for (const i in winning_combination) {
      const { row, column } = winning_combination[i]
      currSymbols[i] = gameBoard[row][column]
    }
    if (currSymbols.every(function (v) { return v === currSymbols[0]; })) {
      return currSymbols[0]
    }
  }
  return null
}

function App() {
  const [player, setPlayer] = useState({
    player1Symbol: 'Player 1',
    player2Symbol: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([])

  let winner = null
  let draw = false
  let activePlayer = derivePlayer(gameTurns)

  if (gameTurns.length >= 9) {
    draw = true
  }

  let gameBoard = JSON.parse(JSON.stringify(initialGameBoard))
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  winner = checkWinningCondition(gameBoard)
  

  function handleOnSelect(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivePlayer(prevGameTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <PlayerListItem initialName={'Player 1'} symbol={player1Symbol} active={activePlayer === player1Symbol} />
          <PlayerListItem initialName={'Player 2'} symbol={player2Symbol} active={activePlayer === player2Symbol} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard gameBoard={gameBoard} onSelect={handleOnSelect} />
      </div>
      <GameLogs turns={gameTurns} />
    </main>
  )
}

export default App
