import React, { useState } from 'react'
import { notifySuccess, notifyError } from '../utils/Toast'
import {BTN_CONTAINER, DELETE_BTN, INPUT_SM, SAVE_BTN, SIDEBAR_COMPONENTS} from "../utils/Constants.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AddActionItemForm({ tasks, onAdd, onToggle, onEdit, onDelete }) {

    const [newItem, setNewItem] = useState('')
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleAdd = () => {
        if (!newItem.trim()) {
            notifyError('Missing Required Fields', 'Please enter a item to complete.')
            return
        }
        onAdd(newItem)
        setNewItem('')
        notifySuccess('Action Item Added!')
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd()
    }
    const handleEditClick = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    }
    const handleSaveEdit = () => {
        if (!editText.trim()) {
            notifyError('Error', 'Task cannot be empty.');
            return;
        }
        onEdit(editingId, { id: editingId, text: editText, completed: false });

        notifySuccess('Action Item Updated!');
        setEditingId(null);
    }
    const handleCancelEdit = () => {
        setEditingId(null);
    }

    return (
        <div className={`${SIDEBAR_COMPONENTS} shadow-gutter`}>
            <h6 className="fw-bold mb-3">Action Items</h6>

            <ul className="list-unstyled mb-3">
                {tasks.length === 0 && <li className="text-muted small fst-italic">No Active Tasks</li>}

                {tasks.map((task) => {

                    const isEditing = editingId === task.id;

                    return (
                        <li key={task.id} className="d-flex align-items-center mb-2">

                            {isEditing ? (
                                <div className="d-flex w-100 gap-2">
                                    <input
                                        type="text"
                                        className={INPUT_SM}
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        autoFocus
                                    />
                                    <button onClick={handleSaveEdit} className={SAVE_BTN}>
                                        <FontAwesomeIcon icon="floppy-disk" />
                                    </button>
                                    <button onClick={handleCancelEdit} className={DELETE_BTN}>
                                        <FontAwesomeIcon icon="ban" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked={task.completed}
                                        onChange={() => onToggle(task.id)}
                                        style={{ border: '2px solid black' }}
                                    />

                                    <span style={{
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? '#aaa' : 'inherit',
                                        flex: 1
                                    }}>
                                        {task.text}
                                    </span>

                                    <div className={BTN_CONTAINER}>
                                        <button
                                            onClick={() => handleEditClick(task)}
                                            className={SAVE_BTN}
                                            title="Edit Task"
                                        >
                                            <FontAwesomeIcon icon="edit" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(task.id)}
                                            className={DELETE_BTN}
                                            title="Delete task"
                                        >
                                            <FontAwesomeIcon icon="trash" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="input-group input-group-sm">
                <input
                    type="text"
                    className={INPUT_SM}
                    placeholder="Add new task..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className={SAVE_BTN} onClick={handleAdd}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </div>
        </div>
    )
}

export default AddActionItemForm
