import React, { useState } from 'react'
import { notifySuccess } from "../utils/Toast.js";
import {FORM_LABEL, INPUT_FIELD, SAVE_BTN, SELECT_FIELD, SIDEBAR_COMPONENTS, WORK_MODEL} from "../utils/Constants.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Goals({ onUpdate, initialData }) {

    const [formState, setFormState] = useState(initialData || {
        position: '',
        workModel: '',
        salary: '',
        appFrequency: '',
        appAmount: 0
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
        <div className={SIDEBAR_COMPONENTS}>

            <h6 className="fw-bold mb-3">Goals</h6>
            <p className="text-muted small fst-italic">All fields optional.</p>

            {/* Position */}
            <div className="row mb-3">
                <label className={FORM_LABEL}>Position Title</label>
                <input name="position" type="text" className={INPUT_FIELD} value={formState.position} onChange={handleChange}/>
            </div>

            {/* Work Model */}
            <div className="row mb-3">
                <label className={FORM_LABEL}>Work Model</label>
                <select name="workModel" className={SELECT_FIELD} value={formState.workModel} onChange={handleChange}>
                    {WORK_MODEL.map(model => <option key={model} value={model}>{model}</option>)}
                </select>
            </div>

            {/* Salary */}
            <div className="row mb-3">
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

            {/* Application Frequency (radio buttons) */}
            <div className="row mb-3">
                <div className="col-12">
                    <label className={FORM_LABEL}>Application Frequency</label>
                    <div className="d-flex gap-4 mt-1">
                        {/* Weekly Option */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="appFrequency"
                                id="freqWeekly"
                                value="Weekly"
                                checked={formState.appFrequency === 'Weekly'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                Weekly
                            </label>
                        </div>

                        {/* Daily Option */}
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="appFrequency"
                                id="freqDaily"
                                value="Daily"
                                checked={formState.appFrequency === 'Daily'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                Daily
                            </label>
                        </div>
                    </div>
                </div>
                {formState.appFrequency === 'Weekly' && (
                    <p className="text-muted small fst-italic m-0">Week starts on Monday.</p>
                )}
            </div>

            {/* Application Goal (number) */}
            <div className="row mb-3">
                <label className={FORM_LABEL}>Application Amount</label>
                <input
                    name="appAmount"
                    type="number"
                    className={INPUT_FIELD}
                    value={formState.appAmount}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    min="1"
                />
            </div>

            {/* Submit Button */}
            <div className="mt-4 text-end">
                <button onClick={handleSubmit} className={SAVE_BTN}>
                    <FontAwesomeIcon icon="floppy-disk" />
                </button>
            </div>
        </div>
    )
}

export default Goals
