import React, {useState} from 'react'
import { notifySuccess, notifyError } from '../utils/Toast'
import {
    WORK_MODEL,
    STATUS,
    FIT_STATUS,
    STAGE,
    SAVE_BTN,
    FORM_LABEL,
    INPUT_FIELD,
    SELECT_FIELD
} from '../utils/Constants'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AddJobForm({ onAdd }) {

    const getTodayString = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
        return localDate.toISOString().split('T')[0];
    }

    const [formState, setFormState] = useState({
        position: '',
        company: '',
        location: '',
        workModel: 'Remote',
        salary: '',
        fitStatus: 'Average',
        fitReason: '',
        jobPostingLink: '',
        jobAppPortalLink: '',
        status: 'Applied',
        dateApplied: getTodayString(),
        appliedThrough: '',
        stage: 'Not Started',
        interviewDate: '',
        contact: '',
        notes: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState({ ...formState, [name]: value })
    }
    const handleSubmit = () => {
        if (!formState.company || !formState.position) {
            notifyError('Missing Required Fields', 'Please enter a Company and Position.')
            return
        }

        onAdd(formState)

        notifySuccess('Job Application Added!')

        setFormState({
            position: '',
            company: '',
            location: '',
            workModel: 'Remote',
            salary: '',
            fitStatus: 'Average',
            fitReason: '',
            jobPostingLink: '',
            jobAppPortalLink: '',
            status: 'Applied',
            dateApplied: getTodayString(),
            appliedThrough: '',
            stage: 'Not Started',
            interviewDate: '',
            contact: '',
            notes: ''
        })
    }

    return (
        <div className="row g-3 shadow-gutter">

            {/* Position */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Position Title *</label>
                <input name="position" type="text" className={INPUT_FIELD} value={formState.position}
                       onChange={handleChange}/>
            </div>

            {/* Company */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Company *</label>
                <input name="company" type="text" className={INPUT_FIELD} value={formState.company}
                       onChange={handleChange}/>
            </div>

            {/* Location */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Company Location</label>
                <input name="location" type="text" className={INPUT_FIELD} value={formState.location}
                       onChange={handleChange}/>
            </div>

            {/* Work Model */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Work Model</label>
                <select name="workModel" className={SELECT_FIELD} value={formState.workModel} onChange={handleChange}>
                    {WORK_MODEL.map(model => <option key={model} value={model}>{model}</option>)}
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
                        value={formState.salary}
                        onChange={handleChange}
                        placeholder="e.g. 65000"
                    />
                </div>
            </div>

            {/* Fit Status */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>How Good of a Fit?</label>
                <select name="fitStatus" className={SELECT_FIELD} value={formState.fitStatus} onChange={handleChange}>
                    {FIT_STATUS.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>

            {/* Fit Reason */}
            <div className="col-md-6">
                <label className={FORM_LABEL}>Fit Reason</label>
                <textarea name="fitReason" className={INPUT_FIELD} value={formState.fitReason} onChange={handleChange}/>
            </div>

            {/* Job Posting Link */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Job Posting Link</label>
                <input name="jobPostingLink" type="text" className={INPUT_FIELD} value={formState.jobPostingLink}
                       onChange={handleChange}/>
            </div>

            {/* Job Application Portal Link */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Job Portal Link</label>
                <input name="jobAppPortalLink" type="text" className={INPUT_FIELD} value={formState.jobAppPortalLink}
                       onChange={handleChange}/>
            </div>

            {/* Status */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Status</label>
                <select name="status" className={SELECT_FIELD} value={formState.status} onChange={handleChange}>
                    {STATUS.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>

            {/* Date Applied */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Date Applied</label>
                <input name="dateApplied" type="date" className={INPUT_FIELD} value={formState.dateApplied}
                       onChange={handleChange}/>
            </div>

            {/* Applied Through */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Applied Through</label>
                <input name="appliedThrough" type="text" className={INPUT_FIELD} value={formState.appliedThrough}
                       onChange={handleChange}/>
            </div>

            {/* Stage */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Current Interview Stage</label>
                <select name="stage" className={SELECT_FIELD} value={formState.stage} onChange={handleChange}>
                    {STAGE.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                </select>
            </div>

            {/* Interview Date */}
            <div className="col-md-3">
                <label className={FORM_LABEL}>Next Interview Date</label>
                <input name="interviewDate" type="date" className={INPUT_FIELD} value={formState.interviewDate}
                       onChange={handleChange}/>
            </div>

            {/* Contact */}
            <div className="col-md-6">
                <label className={FORM_LABEL}>Contact Info</label>
                <textarea name="contact" className={INPUT_FIELD} rows="4" value={formState.contact} onChange={handleChange}/>
            </div>

            {/* Notes */}
            <div className="col-md-6">
                <label className={FORM_LABEL}>Notes</label>
                <textarea name="notes" className={INPUT_FIELD} rows="4" value={formState.notes} onChange={handleChange}/>
            </div>

            {/* Add Button */}
            <div className="col-12 mt-4 text-end">
                <button onClick={handleSubmit} className={SAVE_BTN}>
                    <FontAwesomeIcon icon="floppy-disk" />
                </button>
            </div>

        </div>
    )
}

export default AddJobForm
