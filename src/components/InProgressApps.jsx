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

                    const columnColors = {
                        'Applied': 'bg-pastel-blue',
                        'Interviewing': 'bg-pastel-purple',
                        'Offered': 'bg-pastel-green',
                        'Rejected': 'bg-pastel-pink',
                        'Ghosted': 'bg-pastel-yellow'
                    };

                    return (
                        <div key={status} className={`p-3 mb-4 neo-column ${columnColors[status] || 'bg-white'} m-1`}>

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
                                        className="d-flex flex-row flex-nowrap gap-3 overflow-auto pb-2 shadow-gutter neo-scrollbar"
                                        style={{
                                            minHeight: '150px',
                                            paddingBottom: jobsInColumn.length > 0 ?  '20px' : '0',
                                            backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.05)' : 'transparent',
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
                                                            className={snapshot.isDragging ? "is-dragging" : ""}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                cursor: 'grab',
                                                                minWidth: 'fit-content',
                                                                flexShrink: '0',
                                                                height: 'fit-content',
                                                                opacity: snapshot.isDragging ? 0.9 : 1,
                                                                zIndex: snapshot.isDragging ? 1000 : 1,
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
