import React, { useState, useEffect } from 'react'
import JobCard from './components/JobCard'
import AddJobForm from './components/AddJobForm'
import Swal from 'sweetalert2'

function App() {
    const [jobs, setJobs] = useState(() => {
        const saved = localStorage.getItem('my-job-tracker')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('my-job-tracker', JSON.stringify(jobs))
    }, [jobs])

    const addJob = (jobData) => {
        const newJob = {
            id: Date.now(),
            ...jobData
        }
        setJobs([...jobs, newJob])
    }

    const deleteJob = (id) => {
        setJobs(jobs.filter((j) => j.id !== id))

    }

    const editJob = (id, updatedJob) => {
        setJobs(jobs.map((j) => (j.id === id ? updatedJob : j)))
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Job Tracker</h1>

            <AddJobForm onAdd={addJob} />

            <div className="job-list">
                {jobs.length === 0 && <p style={{ textAlign: 'center', color: 'gray' }}>No jobs yet.</p>}

                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onEdit={editJob}
                        onDelete={deleteJob}
                    />
                ))}
            </div>
        </div>
    )
}

export default App
