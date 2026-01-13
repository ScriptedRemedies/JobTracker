import React, {useState} from 'react'
import { notifySuccess, notifyError } from '../utils/Toast'
import {WORK_MODEL, STATUS, FIT_STATUS, STAGE, SAVE_BTN} from '../utils/Constants'

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
        status: 'Not Applied',
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
            status: 'Not Applied',
            dateApplied: getTodayString(),
            appliedThrough: '',
            stage: 'Not Started',
            interviewDate: '',
            contact: '',
            notes: ''
        })
    }

    return (
        <div className="container mb-4 p-4 border rounded shadow-sm bg-light w-80">
            <h3 className="mb-4">Add New Application</h3>

            <div className="row g-3">

                {/* Position */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Position Title *</label>
                    <input name="position" type="text" className="form-control" value={formState.position} onChange={handleChange} />
                </div>

                {/* Company */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Company *</label>
                    <input name="company" type="text" className="form-control" value={formState.company} onChange={handleChange} />
                </div>

                {/* Location */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Location</label>
                    <input name="location" type="text" className="form-control" value={formState.location} onChange={handleChange} />
                </div>

                {/* Work Model */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Work Model</label>
                    <select name="workModel" className="form-select" value={formState.workModel} onChange={handleChange}>
                        {WORK_MODEL.map(model => <option key={model} value={model}>{model}</option>)}
                    </select>
                </div>

                {/* Salary */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Salary</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            name="salary"
                            type="number"
                            className="form-control"
                            value={formState.salary}
                            onChange={handleChange}
                            placeholder="e.g. 65000"
                        />
                    </div>
                </div>

                {/* Fit Status */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">How Good of a Fit?</label>
                    <select name="fitStatus" className="form-select" value={formState.fitStatus} onChange={handleChange}>
                        {FIT_STATUS.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>

                {/* Fit Reason */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Fit Reason</label>
                    <input name="fitReason" type="text" className="form-control" value={formState.fitReason} onChange={handleChange} />
                </div>

                {/* Job Posting Link */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Job Posting Link</label>
                    <input name="jobPostingLink" type="text" className="form-control" value={formState.jobPostingLink} onChange={handleChange} />
                </div>

                {/* Job Application Portal Link */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Job Portal Link</label>
                    <input name="jobAppPortalLink" type="text" className="form-control" value={formState.jobAppPortalLink} onChange={handleChange} />
                </div>

                {/* Status */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Status</label>
                    <select name="status" className="form-select" value={formState.status} onChange={handleChange}>
                        {STATUS.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>

                {/* Date Applied */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Date Applied</label>
                    <input name="dateApplied" type="date" className="form-control" value={formState.dateApplied} onChange={handleChange} />
                </div>

                {/* Applied Through */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Applied Through</label>
                    <input name="appliedThrough" type="text" className="form-control" value={formState.appliedThrough} onChange={handleChange} />
                </div>

                {/* Stage */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Current Stage</label>
                    <select name="stage" className="form-select" value={formState.stage} onChange={handleChange}>
                        {STAGE.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                    </select>
                </div>

                {/* Interview Date */}
                <div className="col-md-3">
                    <label className="form-label fw-bold">Interview Date</label>
                    <input name="interviewDate" type="date" className="form-control" value={formState.interviewDate} onChange={handleChange} />
                </div>

                {/* Contact */}
                <div className="col-md-6">
                    <label className="form-label fw-bold">Contact Info</label>
                    <textarea name="contact" className="form-control" value={formState.contact} onChange={handleChange} />
                </div>

                {/* Notes (Takes up remaining space) */}
                <div className="col-md-12">
                    <label className="form-label fw-bold">Notes</label>
                    <textarea name="notes" className="form-control" value={formState.notes} onChange={handleChange} />
                </div>

                {/* Add Button */}
                <div className="col-12 mt-4 text-end">
                    <button onClick={handleSubmit} className={SAVE_BTN}>
                        Add Job Application
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddJobForm
