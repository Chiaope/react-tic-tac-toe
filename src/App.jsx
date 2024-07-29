import { useState } from "react"
import GameBoard from "./components/GameBoard/GameBoard"
import PlayerListItem from "./components/PlayerListItem/PlayerListItem"


let player1Symbol = 'X'
let player2Symbol = 'O'

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

  function handleOnSelect(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivePlayer(prevGameTurns)
      console.log('current player')
      console.log(currentPlayer)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <PlayerListItem initialName={'Player 1'} symbol={player1Symbol} />
          <PlayerListItem initialName={'Player 2'} symbol={player2Symbol} />
        </ol>
        <GameBoard turns={gameTurns} onSelect={handleOnSelect} />
      </div>
      LOG
    </main>
  )
}

export default App
