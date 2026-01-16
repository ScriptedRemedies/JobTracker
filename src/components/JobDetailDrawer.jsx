import React, { useState, useEffect } from 'react';
import {
    WORK_MODEL,
    STATUS,
    FIT_STATUS,
    STAGE,
    DELETE_BTN,
    SAVE_BTN,
    BTN_CONTAINER,
    FORM_LABEL_SMALL,
    INPUT_FIELD,
    SELECT_FIELD,
    FLEX_BETWEEN_CENTER, FORM_LABEL
} from '../utils/Constants';
import { notifySuccess, notifyError } from '../utils/Toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helper to render only if data exists
const DetailItem = ({ label, value, col = "col-6" }) => {
    if (!value || value === "") return null;
    return (
        <div className={`${col} mb-2`}>
            <label className="text-muted small fw-bold d-block mb-0">{label}</label>
            <span className="fw-bold">{value}</span>
        </div>
    );
};

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
    };
    const handleCancelDrawer = () => {
        if (isEditing) notifyError('Changes Not Saved', 'Edit cancelled.');
        onClose();
    };
    const handleCancelEdit = () => {
        notifyError('Changes Not Saved', 'Edit cancelled.');
        setIsEditing(false);
        setFormData(job);
    };

    const getFitColor = (fitStatus) => {
        switch (fitStatus) {
            case 'Would Prefer' : return 'bg-pastel-green';
            case 'Average' : return 'bg-pastel-yellow';
            case 'No Preference' : return 'bg-pastel-pink';
            default: return 'bg-pastel-yellow';
        }
    }

    return (
        <>
            {/* BACKDROP - Simplified transition */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                style={{
                    opacity: isOpen ? 0.5 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    zIndex: 1040,
                    transition: 'opacity 0.3s ease-in-out'
                }}
                onClick={handleCancelDrawer}
            ></div>

            {/* DRAWER - Uses retro styling */}
            <div
                className="position-fixed top-0 end-0 h-100 bg-white"
                style={{
                    width: '65%',
                    maxWidth: '90%',
                    zIndex: 1050,
                    borderLeft: '4px solid black',
                    boxShadow: '-10px 0px 0px 0px rgba(0,0,0,1)',
                    transform: isOpen ? 'translateX(0)' : 'translateX(110%)',
                    transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    overflowY: 'auto'
                }}
            >
                <div className="p-4 shadow-gutter">
                    {/* Header */}
                    <div className={`${FLEX_BETWEEN_CENTER} mb-4 border-bottom border-2 border-dark pb-2`}>
                        <h4 className="fw-bold m-0">
                            {isEditing ? 'Edit Application' : 'Application Details'}
                        </h4>
                        <div className="d-flex gap-2">
                            {!isEditing && (
                                <button className={SAVE_BTN} onClick={() => setIsEditing(true)}>
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                            )}
                            <button onClick={handleCancelDrawer} className={DELETE_BTN}>
                                <FontAwesomeIcon icon="times" />
                            </button>
                        </div>
                    </div>

                    {!isEditing ? (
                        /* --- CLEAN READ-ONLY VIEW --- */
                        <div className="row g-3">
                            <div className="row">
                                <DetailItem label="Position" value={formData.position} col="col-6"/>
                                <DetailItem label="Company" value={formData.company} col="col-3"/>
                                <DetailItem label="Company Location" value={formData.location} col="col-3"/>
                            </div>
                            <div className="row">
                                <DetailItem label="Salary" value={formData.salary ? `$${Number(formData.salary).toLocaleString()}` : null} col="col-3" />
                                <DetailItem label="Work Model" value={formData.workModel} col="col-3" />
                                <DetailItem label="Application Status" value={formData.status} col="col-3" />
                                <DetailItem label="Applied On" value={formData.dateApplied} col="col-3" />
                            </div>
                            <div className="row">
                                <DetailItem label="Fit Status" value={formData.fitStatus} col="col-3" />
                                {formData.fitReason && (
                                    <div className="col-9">
                                        <div className={`${getFitColor(formData.fitStatus)} neo-card p-3`}>
                                            <label className="text-muted small fw-bold d-block mb-1">Fit Reason</label>
                                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{formData.fitReason}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row g-2">
                                <DetailItem label="Applied Via" value={formData.appliedThrough} col="col-3" />
                                <DetailItem label="Current Stage" value={formData.stage} col="col-3" />
                                <DetailItem label="Next Interview Date" value={formData.interviewDate} col="col-3" />
                            </div>
                            <div className="row">
                                {formData.contact && (
                                    <div className="col-12 mt-3">
                                        <div className="bg-pastel-blue neo-card p-3">
                                            <label className="text-muted small fw-bold d-block mb-1">Contact Info</label>
                                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{formData.contact}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                {formData.notes && (
                                    <div className="col-12 mt-3">
                                        <div className="bg-pastel-yellow neo-card p-3">
                                            <label className="text-muted small fw-bold d-block mb-1">Notes</label>
                                            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{formData.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Link Buttons */}
                            <div className="col-12 d-flex gap-2 mt-3">
                                {formData.jobPostingLink && (
                                    <a href={formData.jobPostingLink} target="_blank" rel="noreferrer" className={SAVE_BTN}>
                                        View Posting
                                    </a>
                                )}
                                {formData.jobAppPortalLink && (
                                    <a href={formData.jobAppPortalLink} target="_blank" rel="noreferrer" className={SAVE_BTN}>
                                        View Portal
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* --- EDIT MODE --- */
                        <div className="row g-3 shadow-gutter">
                            {/* Position */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Position Title *</label>
                                <input name="position" className={INPUT_FIELD} value={formData.position || ''} onChange={handleChange} />
                            </div>

                            {/* Company */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Company *</label>
                                <input name="company" className={INPUT_FIELD} value={formData.company || ''} onChange={handleChange} />
                            </div>

                            {/* Location */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Location</label>
                                <input name="location" className={INPUT_FIELD} value={formData.location || ''} onChange={handleChange} />
                            </div>

                            {/* Work Model */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Work Model</label>
                                <select name="workModel" className={SELECT_FIELD} value={formData.workModel || ''} onChange={handleChange}>
                                    {WORK_MODEL.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            {/* Salary */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Salary</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        name="salary"
                                        type="number"
                                        className={INPUT_FIELD}
                                        value={formData.salary || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 65000"
                                    />
                                </div>
                            </div>

                            {/* Fit Status */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Fit Status</label>
                                <select name="fitStatus" className={SELECT_FIELD} value={formData.fitStatus || ''} onChange={handleChange}>
                                    {FIT_STATUS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>

                            {/* Fit Reason */}
                            <div className="col-md-6">
                                <label className={FORM_LABEL}>Fit Reason</label>
                                <textarea name="fitReason" className={INPUT_FIELD} value={formData.fitReason || ''} onChange={handleChange} />
                            </div>

                            {/* Job Posting Link */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Job Posting Link</label>
                                <input name="jobPostingLink" className={INPUT_FIELD} value={formData.jobPostingLink || ''} onChange={handleChange} />
                            </div>

                            {/* Job Application Portal Link */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Job Portal Link</label>
                                <input name="jobAppPortalLink" className={INPUT_FIELD} value={formData.jobAppPortalLink || ''} onChange={handleChange} />
                            </div>

                            {/* Status */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Status</label>
                                <select name="status" className={SELECT_FIELD} value={formData.status || ''} onChange={handleChange}>
                                    {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* Date Applied */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Date Applied</label>
                                <input name="dateApplied" type="date" className={INPUT_FIELD} value={formData.dateApplied || ''} onChange={handleChange} />
                            </div>

                            {/* Applied Through */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Applied through</label>
                                <input name="appliedThrough" type="text" className={INPUT_FIELD} value={formData.appliedThrough || ''} onChange={handleChange} />
                            </div>

                            {/* Stage */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Current Interview Stage</label>
                                <select name="stage" className={SELECT_FIELD} value={formData.stage || ''} onChange={handleChange}>
                                    {STAGE.map(st => <option key={st} value={st}>{st}</option>)}
                                </select>
                            </div>

                            {/* Interview Date */}
                            <div className="col-md-3">
                                <label className={FORM_LABEL}>Next Interview Date</label>
                                <input name="interviewDate" type="date" className={INPUT_FIELD} value={formData.interviewDate || ''} onChange={handleChange} />
                            </div>

                            {/* Contacts */}
                            <div className="col-md-6">
                                <label className={FORM_LABEL}>Contact Info</label>
                                <textarea name="contact" className={INPUT_FIELD} rows="4" value={formData.contact || ''} onChange={handleChange} />
                            </div>

                            {/* Notes */}
                            <div className="col-md-6">
                                <label className={FORM_LABEL}>Notes</label>
                                <textarea name="notes" className={INPUT_FIELD} rows="4" value={formData.notes || ''} onChange={handleChange} />
                            </div>

                            <div className="col-12 mt-4">
                                <div className={BTN_CONTAINER}>
                                    <button onClick={handleSubmit} className={SAVE_BTN}>
                                        <FontAwesomeIcon icon="floppy-disk" />
                                    </button>
                                    <button onClick={handleCancelEdit} className={DELETE_BTN}>
                                        <FontAwesomeIcon icon="ban" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default JobDetailDrawer;
