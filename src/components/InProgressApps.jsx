import React from 'react';
import JobCard from "./JobCard.jsx";
import { STATUS_COLUMNS } from "../utils/Constants"

function InProgressApps({ jobs, onEdit, onDelete }) {

    const handleJobClick = (job) => {
        console.log("Open Details for:", job.company)
        // FUTURE: navigate('/job/' + job.id) or setIsModalOpen(true)
    }

    return (
        <div className="w-100">
            <div className="d-flex flex-column gap-4">
                {STATUS_COLUMNS.map(status => {
                    const jobsInColumn = jobs.filter(j => j.status === status)

                    return (
                        <div key={status} className="w-100">

                            {/* Category Header */}
                            <h6 className="fw-bold text-uppercase text-secondary small mb-2 border-bottom pb-1">
                                {status} <span className="badge bg-secondary rounded-pill ms-1">{jobsInColumn.length}</span>
                            </h6>

                            {/* Horizontal Scroll Container */}
                            <div
                                className="d-flex flex-row flex-nowrap overflow-auto pb-2"
                                style={{ gap: '15px' }} // Spacing between cards
                            >
                                {jobsInColumn.length === 0 ? (
                                    <p className="text-muted small fst-italic ps-1">No applications in this stage.</p>
                                ) : (
                                    jobsInColumn.map(job => (
                                        <div
                                            key={job.id}
                                            onClick={() => handleJobClick(job)}
                                            style={{
                                                cursor: 'pointer',
                                                minWidth: '320px',
                                                maxWidth: '320px'
                                            }}
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
