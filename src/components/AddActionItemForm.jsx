import React, {useState} from 'react'
import { notifySuccess, notifyError } from '../utils/Toast'

function AddActionItemForm({ tasks, onAdd, onToggle, onDelete }) {
    const [newItem, setNewItem] = useState('')

    const handleAdd = () => {
        if (!newItem.trim()) return
        onAdd(newItem)
        setNewItem('')
        notifySuccess('Action Item Added!')
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd()
        }
    }

    return (
        <div className="card p-3 mt-3 shadow-sm">
            <h6 className="fw-bold mb-3">Action Items</h6>
            <ul className="list-unstyled mb-3">
                {tasks.length === 0 && <li className="text-muted small fst-italic">No Active Tasks</li>}

                {tasks.map((task) => (
                    <li key={task.id} className="d-flex align-items-center mb-2">
                        <input type="checkbox" className="form-check-input me-2" checked={task.completed} onChange={() => onToggle(task.id)} />
                        <span style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#aaa' : 'inherit',
                            flex: 1
                        }}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="btn btn-sm text-danger border-0 p-0 ms-2"
                            title="Delete task"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>

            <div className="input-group input-group-sm">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add new task..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="btn btn-outline-primary"
                    onClick={handleAdd}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default AddActionItemForm
