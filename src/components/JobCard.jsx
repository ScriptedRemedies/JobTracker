import React, { useState } from 'react';

function JobCard({ job, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedJob, setEditedJob] = useState(job);

    const handleSave = (e) => {
        e.stopPropagation();
        onEdit(job.id, editedJob);
        setIsEditing(false);
    };

    // Helper to stop clicks from bubbling up
    const stopProp = (e) => e.stopPropagation();

    if (isEditing) {
        return (
            <div className="card mb-2 p-2 shadow-sm" onClick={stopProp}>
                <input
                    className="form-control mb-1 form-control-sm"
                    name="position"
                    value={editedJob.position}
                    onChange={(e) => setEditedJob({ ...editedJob, position: e.target.value })}
                />
                <input
                    className="form-control mb-1 form-control-sm"
                    name="company"
                    value={editedJob.company}
                    onChange={(e) => setEditedJob({ ...editedJob, company: e.target.value })}
                />
                <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm flex-fill" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary btn-sm flex-fill" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div className="card mb-2 shadow-sm border-0">
            <div className="card-body p-2">
                {/* Badge for Work Model */}
                <span className="badge bg-light text-dark border mb-1">
                    {job.workModel || 'Remote'}
                </span>

                <h6 className="card-title mb-0 fw-bold">{job.position}</h6>
                <p className="card-text text-muted small mb-2">{job.company}</p>

                {/* Edit/Delete Buttons (Small) */}
                <div className="d-flex justify-content-end gap-1">
                    <button
                        className="btn btn-outline-secondary btn-sm py-0 px-1"
                        style={{fontSize: '0.7rem'}}
                        onClick={(e) => {
                            e.stopPropagation(); // Don't open details
                            setIsEditing(true);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm py-0 px-1"
                        style={{fontSize: '0.7rem'}}
                        onClick={(e) => {
                            e.stopPropagation(); // Don't open details
                            onDelete(job.id);
                        }}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobCard;
