import React from 'react'

function JobTable({ jobs, onEdit, onDelete}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped mt-3 align-middle">
                <thead>
                    <tr className="text-nowrap">
                        <th scope="col">Position</th>
                        <th scope="col">Company</th>
                        <th scope="col">Location</th>
                        <th scope="col">Work Model</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Fit Status</th>
                        <th scope="col">Fit Reason</th>
                        <th scope="col">Job Posting</th>
                        <th scope="col">Job Portal</th>
                        <th scope="col">Application Status</th>
                        <th scope="col">Date Applied</th>
                        <th scope="col">Applied Through</th>
                        <th scope="col">Interview Stage</th>
                        <th scope="col">Interview Date</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.position}</td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                            <td>{job.workModel}</td>
                            <td>
                                {job.salary ? `$${job.salary}` : "Not Listed"}
                            </td>
                            <td>{job.fitStatus}</td>
                            <td>{job.fitReason}</td>
                            <td>
                                {job.jobPostingLink && (
                                    <a href={job.jobPostingLink} target="_blank" rel="noopener noreferrer">Link</a>
                                )}
                            </td>
                            <td>
                                {job.jobAppPortalLink && (
                                    <a href={job.jobAppPortalLink} target="_blank" rel="noopener noreferrer">Link</a>
                                )}
                            </td>
                            <td>{job.status}</td>
                            <td>{job.dateApplied}</td>
                            <td>{job.appliedThrough}</td>
                            <td>{job.stage}</td>
                            <td>{job.interviewDate}</td>
                            <td>{job.contact}</td>
                            <td>{job.notes}</td>
                            <td>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <button
                                        onClick={() => onEdit(job.id)}
                                        className="btn btn-outline-secondary btn-sm py-0 px-1"
                                        title="Edit"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(job.id)}
                                        className="btn btn-outline-danger btn-sm py-0 px-1"
                                        title="Delete"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JobTable
