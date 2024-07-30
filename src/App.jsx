import { useState } from "react"
import GameBoard from "./components/GameBoard/GameBoard"
import PlayerListItem from "./components/PlayerListItem/PlayerListItem"
import GameLogs from "./components/GameLogs/GameLogs"
import { WINNING_COMBINATIONS } from "./winning-condition"


let player1Symbol = 'X'
let player2Symbol = 'Y'

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

function App() {
  const [gameTurns, setGameTurns] = useState([])

  let activePlayer = derivePlayer(gameTurns)

  let gameBoard = initialGameBoard
  for (const turn of gameTurns) {
      const { square, player } = turn
      const { row, col } = square
      gameBoard[row][col] = player
  }

  function checkWinningCondition(gameBoard) {
    for (const winning_combination of WINNING_COMBINATIONS) {
      let currSymbols = [null, null, null]
      for (const i in winning_combination) {
        const { row, column } = winning_combination[i]
        currSymbols[i] = gameBoard[row][column]
      }
      if (currSymbols.every(function(v) { return v === currSymbols[0]; })) {
        return currSymbols[0]
      }
    }
    return null
  }

  const winner = checkWinningCondition(gameBoard)

  if (winner) {
    console.log('winner')
    console.log(winner)
  }

  function handleOnSelect(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivePlayer(prevGameTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <PlayerListItem initialName={'Player 1'} symbol={player1Symbol} active={activePlayer === player1Symbol} />
          <PlayerListItem initialName={'Player 2'} symbol={player2Symbol} active={activePlayer === player2Symbol} />
        </ol>
        <GameBoard gameBoard={gameBoard} onSelect={handleOnSelect} />
      </div>
      <GameLogs turns={gameTurns} />
    </main>
  )
}

export default App
