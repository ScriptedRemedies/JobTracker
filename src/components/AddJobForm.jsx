import React, {useState} from 'react'

function AddJobForm({ onAdd }) {
    const [formState, setFormState] = useState({
        position: '',
        company: '',
        location: '',
        workModel: 'Remote',
        salary: '',
        status: '',
        dateApplied: '',
        stage: '',
        contact: '',
        notes: ''
    })
    const WORK_MODEL = ["Remote", "Hybrid", "On-Site"]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState({ ...formState, [name]: value })
    }
    const handleSubmit = () => {
        if (!formState.company || !formState.position) return

        onAdd(formState)

        setFormState({
            position: '',
            company: '',
            location: '',
            workModel: 'Remote',
            salary: '',
            status: '',
            dateApplied: '',
            stage: '',
            contact: '',
            notes: ''
        })
    }

    return (
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <h3>Add New Application</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                {/* Position : String */}
                <input
                    name="position"
                    type="text"
                    placeholder="Position Title"
                    value={formState.position}
                    onChange={handleChange}
                    style={{ padding: '8px', flex: 1 }}
                />
                {/* Company Name : String */}
                <input
                    name="company"
                    type="text"
                    placeholder="Company Name"
                    value={formState.company}
                    onChange={handleChange}
                    style={{ padding: '8px', flex: 1 }}
                />
                {/* Location : String */}
                <input
                    name="location"
                    type="text"
                    placeholder="Location"
                    value={formState.location}
                    onChange={handleChange}
                    style={{ padding: '8px', flex: 1 }}
                />
                {/* Work Model : Option */}
                <select
                    name="workModel"
                    value={formState.workModel}
                    onChange={handleChange}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    {WORK_MODEL.map(model => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSubmit}
                    style={{ padding: '8px 16px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default AddJobForm
