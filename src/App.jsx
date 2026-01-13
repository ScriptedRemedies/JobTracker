import React, { useState, useEffect } from 'react'
import AddJobForm from './components/AddJobForm'
import {confirmAction, notifySuccess} from "./utils/Toast.js";
import StatusChart from "./components/StatusChart.jsx";
import AddActionItemForm from "./components/AddActionItemForm.jsx";
import JobTable from "./components/JobTable.jsx";
import Goals from "./components/Goals.jsx";
import InProgressApps from "./components/InProgressApps.jsx";
import CollapsibleSection from "./components/CollapsibleSection.jsx";
import { DragDropContext } from '@hello-pangea/dnd';
import JobDetailDrawer from "./components/JobDetailDrawer.jsx";
import SavedLinks from "./components/SavedLinks.jsx";

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
    // DRAG FUNCTION (for cards)
    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        // If dropped in the same place, do nothing
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Find the job that was dragged (draggableId should be the job ID)
        const draggedJobId = parseInt(draggableId);
        const draggedJob = jobs.find(j => j.id === draggedJobId);

        // Update the status of the job to the new column ID (destination.droppableId)
        const updatedJob = { ...draggedJob, status: destination.droppableId };

        // Update state
        editJob(draggedJobId, updatedJob);
    };

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
    const editTask = (id, updatedTask) => {
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)))
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

    // PLATFORM LINKS
    const [links, setLinks] = useState(() => {
        const savedLinks = localStorage.getItem('my-links')
        return savedLinks ? JSON.parse(savedLinks) : []
    })
    useEffect(() => {
        localStorage.setItem('my-links', JSON.stringify(links))
    }, [links])
    const addLink = (linkData) => {
        const newLink = {
            id: Date.now(),
            ...linkData
        }
        setLinks([...links, newLink])
    }
    const deleteLink = async (id) => {
        const result = await confirmAction('Do you want to delete this Link?')
        if (result.isConfirmed) {
            setLinks(links.filter(l => l.id !== id))
            notifySuccess('Link Deleted')
        }
    }
    const editLink = (id, updatedLink) => {
        setLinks(links.map((l) => (l.id === id ? updatedLink : l)))
    }

    // DRAWER STATE
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [drawerMode, setDrawerMode] = useState(false);
    const handleEditClick = (jobId) => {
        const jobToEdit = jobs.find(j => j.id === jobId);
        setSelectedJob(jobToEdit);
        setDrawerMode(true);
        setIsDrawerOpen(true);
    };
    const handleViewClick = (job) => {
        setSelectedJob(job);
        setDrawerMode(false);
        setIsDrawerOpen(true);
    };
    const handleDrawerSave = (id, updatedJob) => {
        editJob(id, updatedJob);
    };

    return (
        <div className="container-fluid bg-light min-vh-100 p-4">

            {/* MAIN DASHBOARD GRID */}
            <div className="row">

                {/* LEFT SIDEBAR: Chart, Stats, Goals */}
                <div className="col-md-3 mb-4">
                    <StatusChart jobs={jobs} />
                    <Goals onUpdate={updateGoals} initialData={goals} />
                    <AddActionItemForm tasks={tasks} onAdd={addTask} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
                    <SavedLinks links={links} onAdd={addLink} onEdit={editLink} onDelete={deleteLink} />
                </div>

                {/* RIGHT CONTENT: The Job Board */}
                <div className="col-md-9">

                    {/* Add Job Form */}
                    <CollapsibleSection title="Add New Application" defaultExpanded={false}>
                        <AddJobForm onAdd={addJob} />
                    </CollapsibleSection>

                    {/* In Progress Apps */}
                    <CollapsibleSection title="In Progress Applications" defaultExpanded={true}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <InProgressApps
                                jobs={jobs}
                                onEdit={editJob}
                                onDelete={deleteJob}
                                onViewDetails={handleViewClick}
                            />
                        </DragDropContext>
                    </CollapsibleSection>

                    {/* Table */}
                    <CollapsibleSection title="All Applications" defaultExpanded={true}>
                        <JobTable
                            jobs={jobs}
                            onEdit={handleEditClick}
                            onDelete={deleteJob}
                        />
                    </CollapsibleSection>
                </div>

                <JobDetailDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    job={selectedJob}
                    onSave={handleDrawerSave}
                    initialEditMode={drawerMode}
                />
            </div>


        </div>
    )
}

export default App
