import React, { useState, useEffect } from 'react'
import JobCard from './components/JobCard'
import AddJobForm from './components/AddJobForm'
import {confirmAction, notifySuccess} from "./utils/Toast.js";
import StatusChart from "./components/StatusChart.jsx";
import AddActionItemForm from "./components/AddActionItemForm.jsx";
import JobTable from "./components/JobTable.jsx";

function App() {
    // JOBS ITEMS
    const STATUS_COLUMNS = ["Applied", "Interviewing", "Offered", "Rejected", "Ghosted"]
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
    const deleteJob = async (id) => {
        const result = await confirmAction('Do you want to delete this job?')
        if (result.isConfirmed) {
            setJobs(jobs.filter((j) => j.id !== id))
            notifySuccess('Job Deleted')
        }
    }
    const editJob = (id, updatedJob) => {
        setJobs(jobs.map((j) => (j.id === id ? updatedJob : j)))
    }
    const handleJobClick = (job) => {
        console.log("Open Details for:", job.company)
        // FUTURE: navigate('/job/' + job.id) or setIsModalOpen(true)
    }

    // TASK ITEMS
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('my-tasks')
        return savedTasks ? JSON.parse(savedTasks) : []
    })

    useEffect(() => {
        localStorage.setItem('my-tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (taskText) => {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        }
        setTasks([...tasks, newTask])
    }
    const toggleTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId)

        if (!task) return

        if (!task.completed) {
            notifySuccess('Action Item Completed!')
        } else {
            notifySuccess('Action Item Unchecked')
        }

        setTasks(tasks.map(t => t.id === taskId ? {...t, completed: !task.completed } : t))
    }
    const deleteTask = async (taskId) => {
        const result = await confirmAction('Do you want to delete this Action Item?')
        if (result.isConfirmed) {
            setTasks(tasks.filter(t => t.id !== taskId))
            notifySuccess('Action Item Deleted')
        }

    }


    return (
        <div className="container-fluid bg-light min-vh-100 p-4">

            {/* MAIN DASHBOARD GRID */}
            <div className="row">

                {/* LEFT SIDEBAR: Chart & Stats */}
                <div className="col-md-3 mb-4">
                    <StatusChart jobs={jobs} />
                    <AddActionItemForm tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
                </div>

                {/* RIGHT CONTENT: The Job Board */}
                <div className="col-md-9">

                    {/* The Add Form (Kept at top for now) */}
                    <div className="mb-4 bg-white p-3 rounded shadow-sm">
                        <AddJobForm onAdd={addJob} />
                    </div>

                    <h4 className="mb-3">Applications in Progress</h4>

                    {/* KANBAN COLUMNS */}
                    <div className="row g-3">
                        {STATUS_COLUMNS.map(status => {
                            // Filter jobs that belong to this column
                            const jobsInColumn = jobs.filter(j => j.status === status)

                            return (
                                <div key={status} className="col-md-6 col-lg-3">
                                    <div className="p-2 rounded" style={{ backgroundColor: '#e9ecef', minHeight: '100%' }}>
                                        {/* Column Header */}
                                        <h6 className="fw-bold text-uppercase text-secondary small mb-3 ps-1">
                                            {status} <span className="badge bg-secondary rounded-pill">{jobsInColumn.length}</span>
                                        </h6>

                                        {/* Job Cards List */}
                                        {jobsInColumn.length === 0 ? (
                                            <p className="text-muted small text-center fst-italic">Empty</p>
                                        ) : (
                                            jobsInColumn.map(job => (
                                                // Wrapper Div for "Click to Open Details"
                                                <div
                                                    key={job.id}
                                                    onClick={() => handleJobClick(job)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <JobCard
                                                        job={job}
                                                        onEdit={editJob}
                                                        onDelete={deleteJob}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="w-100">
                <JobTable jobs={jobs} onEdit={editJob} onDelete={deleteJob} />
            </div>
        </div>
    )
}

export default App
