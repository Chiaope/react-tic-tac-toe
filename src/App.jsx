import GameBoard from "./components/GameBoard/GameBoard"
import PlayerListItem from "./components/PlayerListItem/PlayerListItem"

function App() {


  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <PlayerListItem initialName={'Player 1'} symbol={'X'}/>
          <PlayerListItem initialName={'Player 2'} symbol={'O'}/>
        </ol>
        <GameBoard />
      </div>
      LOG
    </main>
  )
}

export default App
