import React from 'react';
import JobCard from "./JobCard.jsx";
import { STATUS_COLUMNS } from "../utils/Constants"

function InProgressApps({ jobs, onEdit, onDelete }) {

    const handleJobClick = (job) => {
        console.log("Open Details for:", job.company)
        // FUTURE: navigate('/job/' + job.id) or setIsModalOpen(true)
    }

    return (
        <div className="container mb-4 p-4 border rounded shawdow-sm bg-light w-80">
            <h4 className="mb-3">Applications in Progress</h4>

            {/* COLUMNS */}
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
                                                onEdit={onEdit}
                                                onDelete={onDelete}
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
    )
}

export default InProgressApps;
