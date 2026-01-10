import React, { useState } from 'react'
import { notifySuccess } from "../utils/Toast.js";
import { WORK_MODEL } from "../utils/constants.js";

function Goals({ onUpdate, initialData }) {

    const [formState, setFormState] = useState(initialData || {
        position: '',
        workModel: '',
        salary: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    }
    const handleSubmit = () => {
        onUpdate(formState);
        notifySuccess('Goals saved.')
    }

    return (
        <div className="card p-3 mt-3 shadow-sm">
            <h6 className="fw-bold mb-3">Goals</h6>
            <p>*All fields optional.*</p>

            {/* Position */}
            <div className="row mb-3">
                <label className="form-label fw-bold">Position Title</label>
                <input name="position" type="text" value={formState.position} onChange={handleChange}/>
            </div>

            {/* Work Model */}
            <div className="row mb-3">
                <label className="form-label fw-bold">Work Model</label>
                <select name="workModel" className="form-select" value={formState.workModel} onChange={handleChange}>
                    {WORK_MODEL.map(model => <option key={model} value={model}>{model}</option>)}
                </select>
            </div>

            {/* Salary */}
            <div className="row mb-3">
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

            {/* Submit Button */}
            <div className="mt-4 text-end">
                <button onClick={handleSubmit} className="btn btn-outline-secondary btn-sm">
                    Save Goals
                </button>
            </div>
        </div>
    )
}

export default Goals
