import { useState } from "react"
import GameBoard from "./components/GameBoard/GameBoard"
import PlayerListItem from "./components/PlayerListItem/PlayerListItem"
import GameLogs from "./components/GameLogs/GameLogs"
import { WINNING_COMBINATIONS } from "./winning-condition"
import GameOver from "./components/GameOver/GameOver"


const PLAYER_SYMBOL_1 = 'X'
const DEFAULT_PLAYER_NAME_1 = 'Player 1'
const PLAYER_SYMBOL_2 = 'O'
const DEFAULT_PLAYER_NAME_2 = 'Player 2'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivePlayer(gameTurns) {
  let player = PLAYER_SYMBOL_1
  if (gameTurns.length > 0 && gameTurns[0].player === PLAYER_SYMBOL_1) {
    player = PLAYER_SYMBOL_2
  }
  return player
}

function deriveWinner(gameBoard, player) {
  for (const winning_combination of WINNING_COMBINATIONS) {
    let currSymbols = [null, null, null]
    for (const i in winning_combination) {
      const { row, column } = winning_combination[i]
      currSymbols[i] = gameBoard[row][column]
    }
    if (currSymbols.every(function (v) { return v === currSymbols[0]; })) {
      return player[currSymbols[0]]
    }
  }
  return null
}

function deriveGameBoard(gameTurns) {
  let gameBoard = JSON.parse(JSON.stringify(INITIAL_GAME_BOARD))
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }
  return gameBoard
}

function App() {
  const [player, setPlayer] = useState({
    [PLAYER_SYMBOL_1]: DEFAULT_PLAYER_NAME_1,
    [PLAYER_SYMBOL_2]: DEFAULT_PLAYER_NAME_2
  })
  const [gameTurns, setGameTurns] = useState([])

  let draw = false
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = derivePlayer(gameTurns)
  const winner = deriveWinner(gameBoard, player)
  if (gameTurns.length >= 9) {
    draw = true
  }

  function handleOnNameChange(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

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
          <PlayerListItem
            initialName={'Player 1'}
            symbol={PLAYER_SYMBOL_1}
            active={activePlayer === PLAYER_SYMBOL_1}
            onNameChange={handleOnNameChange}
          />
          <PlayerListItem
            initialName={'Player 2'}
            symbol={PLAYER_SYMBOL_2}
            active={activePlayer === PLAYER_SYMBOL_2}
            onNameChange={handleOnNameChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard gameBoard={gameBoard} onSelect={handleOnSelect} />
      </div>
      <GameLogs turns={gameTurns} />
    </main>
  )
}

export default App
