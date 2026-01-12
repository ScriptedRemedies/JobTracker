import React, { useState, useEffect } from 'react'
import AddJobForm from './components/AddJobForm'
import {confirmAction, notifySuccess} from "./utils/Toast.js";
import StatusChart from "./components/StatusChart.jsx";
import AddActionItemForm from "./components/AddActionItemForm.jsx";
import JobTable from "./components/JobTable.jsx";
import Goals from "./components/Goals.jsx";
import InProgressApps from "./components/InProgressApps.jsx";

function App() {
    // JOBS ITEMS
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

    // GOALS
    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem('my-goals')
        return savedGoals ? JSON.parse(savedGoals) : { position: '', workModel: 'Remote', salary: '' }
    })

    useEffect(() => {
        localStorage.setItem('my-goals', JSON.stringify(goals))
    }, [goals])

    const updateGoals = (newGoals) => {
        setGoals(newGoals)
    }

    return (
        <div className="container-fluid bg-light min-vh-100 p-4">

            {/* MAIN DASHBOARD GRID */}
            <div className="row">

                {/* LEFT SIDEBAR: Chart, Stats, Goals */}
                <div className="col-md-3 mb-4">
                    <StatusChart jobs={jobs} />
                    <AddActionItemForm tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
                    <Goals onUpdate={updateGoals} initialData={goals} />
                </div>

                {/* RIGHT CONTENT: The Job Board */}
                <div className="col-md-9">

                    {/* Add Job Form */}
                    <div className="mb-4 bg-white p-3 rounded shadow-sm">
                        <AddJobForm onAdd={addJob} />
                    </div>

                    {/* In Progress Apps */}
                    <div className="mb-4 bg-white p-3 rounded shadow-sm">
                        <InProgressApps jobs={jobs} onEdit={editJob} onDelete={deleteJob} />
                    </div>

                    {/* Table */}
                    <div className="mb-4 bg-white p-3 rounded shadow-sm">
                        <JobTable jobs={jobs} onEdit={editJob} onDelete={deleteJob} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default App
