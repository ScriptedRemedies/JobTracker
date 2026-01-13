import React, { useState, useEffect } from 'react';
import {WORK_MODEL, STATUS, FIT_STATUS, STAGE, DELETE_BTN, SAVE_BTN} from '../utils/Constants';
import { notifySuccess, notifyError } from '../utils/Toast'; // Assuming you have a generic notify or notifyInfo

function JobDetailDrawer({ isOpen, onClose, job, onSave, initialEditMode = false }) {

    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(initialEditMode);

    useEffect(() => {
        if (job) {
            setFormData(job);
            setIsEditing(initialEditMode);
        }
    }, [job, isOpen, initialEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = () => {
        onSave(formData.id, formData);
        notifySuccess('Changes Saved Successfully');
        setIsEditing(false);
        setFormData(job);
    };
    const handleCancelDrawer = () => {
        if (isEditing) {
            notifyError('Changes Not Saved', 'Edit cancelled.');
        }
        onClose();
    };
    const handleCancelEdit = () => {
        if (isEditing) {
            notifyError('Changes Not Saved', 'Edit cancelled.');
        }
        setIsEditing(false);
        setFormData(job);
    }

    if (!isOpen) return null;

    return (
        <div>
            {/* BACKDROP */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                style={{ opacity: 0.5, zIndex: 1040 }}
                onClick={handleCancelDrawer}
            ></div>

            {/* DRAWER */}
            <div
                className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
                style={{
                    width: '600px',
                    maxWidth: '100%',
                    zIndex: 1050,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    overflowY: 'auto'
                }}
            >
                <div className="p-4">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                        <h4 className="m-0">
                            {isEditing ? 'Edit Application' : 'Application Details'}
                        </h4>
                        <div className="d-flex gap-2">
                            {/* Toggle Edit Mode Button (Only show in View Mode) */}
                            {!isEditing && (
                                <button
                                    className={SAVE_BTN}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Details
                                </button>
                            )}
                            <button onClick={handleCancelDrawer} className={DELETE_BTN}>&times;</button>
                        </div>
                    </div>

                    {/* --- READ ONLY VIEW MODE --- */}
                    {!isEditing ? (
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <h2 className="fw-bold mb-0">{formData.position}</h2>
                                <h5 className="text-muted">{formData.company}</h5>
                            </div>

                            <div className="row g-3">
                                <div className="col-6"><strong>Status:</strong> {formData.status}</div>
                                <div className="col-6"><strong>Stage:</strong> {formData.stage}</div>
                                <div className="col-6"><strong>Location:</strong> {formData.location || 'N/A'}</div>
                                <div className="col-6"><strong>Model:</strong> {formData.workModel}</div>
                                <div className="col-6"><strong>Salary:</strong> {formData.salary ? `$${formData.salary}` : 'N/A'}</div>
                                <div className="col-6"><strong>Fit:</strong> {formData.fitStatus}</div>
                                <div className="col-12"><strong>Fit Reason:</strong> {formData.fitReason || 'N/A'}</div>
                            </div>

                            <hr />

                            <div className="row g-3">
                                <div className="col-6"><strong>Applied:</strong> {formData.dateApplied}</div>
                                <div className="col-6"><strong>Via:</strong> {formData.appliedThrough || 'N/A'}</div>
                                <div className="col-6"><strong>Interview:</strong> {formData.interviewDate || 'N/A'}</div>
                                <div className="col-6"><strong>Contact:</strong> {formData.contact || 'N/A'}</div>
                            </div>

                            <div className="d-flex gap-3 mt-2">
                                {formData.jobPostingLink && <a href={formData.jobPostingLink} target="_blank" rel="noreferrer" className={SAVE_BTN}>Job Posting</a>}
                                {formData.jobAppPortalLink && <a href={formData.jobAppPortalLink} target="_blank" rel="noreferrer" className={SAVE_BTN}>Job Portal</a>}
                            </div>

                            <div className="bg-light p-3 rounded mt-2">
                                <strong>Notes:</strong>
                                <p className="mb-0 mt-1" style={{ whiteSpace: 'pre-wrap' }}>{formData.notes || 'No notes added.'}</p>
                            </div>
                        </div>
                    ) : (

                        /* EDIT MODE */
                        <div className="row g-3">
                            {/* Position & Company */}
                            <div className="col-6">
                                <label className="form-label fw-bold small">Position</label>
                                <input name="position" className="form-control" value={formData.position || ''} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold small">Company</label>
                                <input name="company" className="form-control" value={formData.company || ''} onChange={handleChange} />
                            </div>

                            {/* Location & Work Model */}
                            <div className="col-6">
                                <label className="form-label fw-bold small">Location</label>
                                <input name="location" className="form-control" value={formData.location || ''} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold small">Work Model</label>
                                <select name="workModel" className="form-select" value={formData.workModel || ''} onChange={handleChange}>
                                    {WORK_MODEL.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            {/* Salary & Fit */}
                            <div className="col-4">
                                <label className="form-label fw-bold small">Salary</label>
                                <input name="salary" type="number" className="form-control" value={formData.salary || ''} onChange={handleChange} />
                            </div>
                            <div className="col-4">
                                <label className="form-label fw-bold small">Fit Status</label>
                                <select name="fitStatus" className="form-select" value={formData.fitStatus || ''} onChange={handleChange}>
                                    {FIT_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="col-4">
                                <label className="form-label fw-bold small">Fit Reason</label>
                                <input name="fitReason" type="text" className="form-control" value={formData.fitReason || ''} onChange={handleChange} />
                            </div>

                            {/* Status & Stage */}
                            <div className="col-6">
                                <label className="form-label fw-bold small">Status</label>
                                <select name="status" className="form-select" value={formData.status || ''} onChange={handleChange}>
                                    {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold small">Stage</label>
                                <select name="stage" className="form-select" value={formData.stage || ''} onChange={handleChange}>
                                    {STAGE.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* Dates */}
                            <div className="col-6">
                                <label className="form-label fw-bold small">Date Applied</label>
                                <input name="dateApplied" type="date" className="form-control" value={formData.dateApplied || ''} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold small">Interview Date</label>
                                <input name="interviewDate" type="date" className="form-control" value={formData.interviewDate || ''} onChange={handleChange} />
                            </div>

                            {/* Contact & Portal */}
                            <div className="col-6">
                                <label className="form-label fw-bold small">Applied Through</label>
                                <input name="appliedThrough" className="form-control" value={formData.appliedThrough || ''} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold small">Contact Info</label>
                                <input name="contact" className="form-control" value={formData.contact || ''} onChange={handleChange} />
                            </div>

                            {/* Links */}
                            <div className="col-12">
                                <label className="form-label fw-bold small">Job Posting URL</label>
                                <input name="jobPostingLink" className="form-control" value={formData.jobPostingLink || ''} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-bold small">Job Portal URL</label>
                                <input name="jobAppPortalLink" className="form-control" value={formData.jobAppPortalLink || ''} onChange={handleChange} />
                            </div>

                            {/* Notes */}
                            <div className="col-12">
                                <label className="form-label fw-bold small">Notes</label>
                                <textarea name="notes" className="form-control" rows="5" value={formData.notes || ''} onChange={handleChange} />
                            </div>

                            {/* Action Buttons */}
                            <div className="col-12 mt-4">
                                <div className="d-grid gap-2">
                                    <button onClick={handleSubmit} className={SAVE_BTN}>Save Changes</button>
                                    <button onClick={handleCancelEdit} className={DELETE_BTN}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobDetailDrawer;
