import React from 'react';

function JobCard({ job }) {

    return (
        <div className="card mb-2 shadow-sm border-0">
            <div className="card-body p-2">
                {/* Position Header & Company */}
                <h6 className="card-title mb-0 fw-bold">{job.position}</h6>
                <p className="card-text text-muted small mb-2">{job.company}</p>

                {/* Badges */}
                <div className="d-flex gap-2">
                    <span className="badge bg-light text-dark border mb-1">{job.workModel}</span>
                    <span className="badge bg-light text-dark border mb-1">{job.fitStatus}</span>
                    <span className="badge bg-light text-dark border mb-1">{job.fitStatus}</span>
                    {job.status === "Interviewing" && (
                        <span className="badge bg-light text-dark border mb-1">{job.stage}</span>
                    )}
                </div>

                {/* Salary */}
                {!job.salary ? (
                    <p className="card-text mb-2">Salary: Not Posted</p>
                ) : (
                    <p className="card-text mb-2">Salary: ${Number(job.salary).toLocaleString()}</p>
                )}

                {/* Applied Date */}
                <p className="card-text small mb-2">Applied On: {job.dateApplied}</p>
            </div>
        </div>
    )
}

export default JobCard;
