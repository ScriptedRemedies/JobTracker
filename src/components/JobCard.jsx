import React from 'react';
import {BADGE_STYLE, CARD_STYLE} from "../utils/Constants.js";

function JobCard({ job }) {

    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'bg-pastel-blue';
            case 'Interviewing': return 'bg-pastel-purple';
            case 'Offered': return 'bg-pastel-green';
            case 'Rejected': return 'bg-pastel-pink';
            default: return 'bg-pastel-yellow';
        }
    };

    return (
        <div
            className={`${CARD_STYLE} ${getStatusColor(job.status)} m-1`}
            style={{
                minWidth: '320px',
                width: 'auto',
                whiteSpace: 'nowrap',
            }}
        >
            <div className="card-body p-2">
                {/* Position Header & Company */}
                <h6 className="card-title mb-0 fw-bold">{job.position}</h6>
                <p className="card-text text-muted small mb-2">{job.company}</p>

                {/* Badges */}
                <div className="d-flex gap-2">
                    <span className={BADGE_STYLE}>{job.workModel}</span>
                    <span className={BADGE_STYLE}>{job.fitStatus}</span>
                    {job.status === "Interviewing" && (
                        <span className={BADGE_STYLE}>{job.stage}</span>
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
