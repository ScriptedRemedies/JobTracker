import React from 'react';
import JobCard from "./JobCard.jsx";
import {COLUMN_HEADER, STATUS_COLUMNS} from "../utils/Constants"
import {Draggable, Droppable} from "@hello-pangea/dnd";

function InProgressApps({ jobs, onEdit, onDelete, onViewDetails }) {

    const handleJobClick = (job) => {
        onViewDetails(job);
    }

    return (
        <div className="w-100">
            <div className="d-flex flex-column gap-4">
                {STATUS_COLUMNS.map(status => {
                    const jobsInColumn = jobs.filter(j => j.status === status)

                    return (
                        <div key={status} className="w-100">

                            {/* Category Header */}
                            <h6 className={COLUMN_HEADER}>
                                {status} <span className="badge bg-secondary rounded-pill ms-1">{jobsInColumn.length}</span>
                            </h6>

                            {/* Horizontal Scroll Container */}
                            <Droppable droppableId={status} direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="d-flex flex-row flex-nowrap overflow-auto pb-2"
                                        style={{
                                            gap: '15px',
                                            minHeight: '130px',
                                            backgroundColor: snapshot.isDraggingOver ? '#f8f9fa' : 'transparent',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        {jobsInColumn.length === 0 && !snapshot.isDraggingOver ? (
                                            <p className="text-muted small fst-italic ps-1 align-self-center">No applications in this stage.</p>
                                        ) : (
                                            jobsInColumn.map((job, index) => (

                                                <Draggable
                                                    key={job.id}
                                                    draggableId={job.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => handleJobClick(job)}
                                                            style={{
                                                                cursor: 'grab',
                                                                minWidth: '320px',
                                                                maxWidth: 'fit-content',
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? 0.8 : 1
                                                            }}
                                                        >
                                                            <JobCard
                                                                job={job}
                                                                onEdit={onEdit}
                                                                onDelete={onDelete}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InProgressApps;
