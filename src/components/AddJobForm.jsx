import React, {useState} from 'react'
import { notifySuccess, notifyError } from '../utils/Toast'

function AddJobForm({ onAdd }) {
    const WORK_MODEL = ["Remote", "Hybrid", "On-Site"]
    const STATUS = ["Not Applied", "Applied", "Interviewing", "Offered", "Rejected", "Ghosted"]
    const STAGE = ["Not Started", "Screening - Phone", "Screening - Video", "Hiring Manager Interview", "Skills Assessment", "Team/Panel Interview", "Final Interview", "Reference & Background Check", "Offer", "Rejection"]
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
        status: 'Not Applied',
        dateApplied: getTodayString(),
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
            status: 'Not Applied',
            dateApplied: getTodayString(),
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
                    <input name="salary" type="text" className="form-control" value={formState.salary} onChange={handleChange} />
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
                <div className="col-md-3">
                    <label className="form-label fw-bold">Contact Info</label>
                    <input name="contact" type="text" className="form-control" value={formState.contact} onChange={handleChange} />
                </div>

                {/* Notes (Takes up remaining space) */}
                <div className="col-md-6">
                    <label className="form-label fw-bold">Notes</label>
                    <input name="notes" type="text" className="form-control" value={formState.notes} onChange={handleChange} />
                </div>

                {/* Add Button */}
                <div className="col-12 mt-4 text-end">
                    <button onClick={handleSubmit} className="btn btn-primary px-4">
                        Add Job Application
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddJobForm
