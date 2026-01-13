import React, {useState} from 'react'
import {notifyError, notifySuccess} from "../utils/Toast.js";
import {DELETE_BTN, SAVE_BTN} from "../utils/Constants.js";

function SavedLinks({ links, onAdd, onEdit, onDelete }) {
    const [formState, setFormState] = useState({
        title: '',
        link: ''
    })
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({ title: '', link: '' })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormState({...formState, [name]: value })
    }
    const handleAdd = () => {
        if (!formState.title || !formState.link) {
            notifyError('Missing Required Fields', 'Please enter a Title and Link.')
            return
        }

        onAdd(formState)
        notifySuccess('Platform Link Added!')
        setFormState({ title: '', link: '' })
    }

    const handleEditClick = (linkItem) => {
        setEditingId(linkItem.id)
        setEditForm({ title: linkItem.title, link: linkItem.link })
    }
    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditForm({ ...editForm, [name]: value })
    }
    const handleCancelEdit = () => {
        setEditingId(null)
        setEditForm({ title: '', link: '' })
    }
    const handleSaveEdit = () => {
        if (!editForm.title || !editForm.link) {
            notifyError('Missing Required Fields', 'Please enter a Title and Link.')
            return
        }
        onEdit(editingId, { id: editingId, ...editForm })
        notifySuccess('Link Updated!')
        setEditingId(null)
    }

    return (
        <div className="card p-3 mt-3 shadow-sm">
            <h6 className="fw-bold mb-3">Saved Links</h6>

            <ul className="list-unstyled mb-3">
                {links.length === 0 && <li className="text-muted small fst-italic">No Current Links</li>}

                {links.map((link) => {
                    const isEditing = editingId === link.id;

                    return (
                        <li key={link.id} className="mb-2">
                            {isEditing ? (
                                <div>
                                    {/* Title Input */}
                                    <div className="mb-2">
                                        <label className="form-label small text-muted mb-0">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control form-control-sm"
                                            value={editForm.title}
                                            onChange={handleEditChange}
                                        />
                                    </div>

                                    {/* Link Input */}
                                    <div className="mb-2">
                                        <label className="form-label small text-muted mb-0">URL</label>
                                        <input
                                            type="text"
                                            name="link"
                                            className="form-control form-control-sm"
                                            value={editForm.link}
                                            onChange={handleEditChange}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className={SAVE_BTN}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className={DELETE_BTN}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="text-truncate" style={{ maxWidth: '180px' }}>
                                        <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                            {link.title}
                                        </a>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(link)}
                                            className={SAVE_BTN}
                                            title="Edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(link.id)}
                                            className={DELETE_BTN}
                                            title="Delete"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>

            <div className="border-top pt-3">
                <h6 className="small text-muted mb-2">Add New Link</h6>
                <div className="d-flex flex-column gap-2">
                    <input
                        type="text"
                        name="title"
                        className="form-control form-control-sm"
                        placeholder="Title"
                        value={formState.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="link"
                        className="form-control form-control-sm"
                        placeholder="https://..."
                        value={formState.link}
                        onChange={handleChange}
                    />
                    <button
                        className={SAVE_BTN}
                        onClick={handleAdd}
                    >
                        Add Link
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SavedLinks;
