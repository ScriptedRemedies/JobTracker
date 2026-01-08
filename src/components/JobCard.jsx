import React, { useState } from 'react';

function JobCard(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedJob, setEditedJob] = useState(props.job)
    const handleSave = () => {
        props.onEdit(props.job.id, editedJob)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div style={{ border: '1px solid blue', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
                <input
                    type="text"
                    name="position"
                    value={editedJob.position}
                    onChange={(e) => setEditedJob({ ...editedJob, position: e.target.value })}
                />
                <input
                    type="text"
                    name="company"
                    value={editedJob.company}
                    onChange={(e) => setEditedJob({ ...editedJob, company: e.target.value })}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        )
    }
    return (
        <div style={{
            border: '1px solid gray',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            background: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <h3 style={{ margin: 0 }}>{props.job.company}</h3>
                <p style={{ margin: 0 }}>{props.job.position}</p>
            </div>
            <div>
                <button onClick={() => setIsEditing(true)} style={{ marginRight: '5px' }}>
                    Edit
                </button>
                <button
                    onClick={() => props.onDelete(props.job.id)}
                    style={{
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default JobCard
