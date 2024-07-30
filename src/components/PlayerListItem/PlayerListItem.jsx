import { useState } from "react"

export default function PlayerListItem({ initialName, symbol, active, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    let editiablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editiablePlayerName = <input type="text" required value={playerName} onChange={handlePlayerNameChange}></input>
    }

    function handlePlayerNameChange(event) {
        const newName = event.target.value
        setPlayerName(newName)
        onNameChange(symbol, newName)
    }

    function handleEdit() {
        setIsEditing((isEditing) => {return (!isEditing)})
    }

    return (
        <li className={active ? 'active' : undefined}>
            <span className='player'>
                {editiablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}