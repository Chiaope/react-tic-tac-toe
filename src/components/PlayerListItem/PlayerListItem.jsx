import { useState } from "react"

export default function PlayerListItem({ initialName, symbol }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    let editiablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editiablePlayerName = <input type="text" value={playerName} onChange={handlePlayerNameChange}></input>
    }

    function handlePlayerNameChange(event) {
        setPlayerName(event.target.value)
    }

    function handleEdit() {
        setIsEditing((isEditing) => {return (!isEditing)})
    }

    return (
        <li>
            <span className='player'>
                {editiablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}