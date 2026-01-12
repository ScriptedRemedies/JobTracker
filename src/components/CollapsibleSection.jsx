import React, { useState } from 'react';

const CollapsibleSection = ({ title, children, defaultExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="container mb-4 p-4 border rounded shadow-sm bg-light w-100">

            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="m-0">{title}</h3>
                <button className="btn btn-sm btn-outline-secondary border-0">
                    {isExpanded ? (
                        /* Up Arrow (Chevron) */
                        <i className="bi bi-chevron-up">▲</i>
                    ) : (
                        /* Down Arrow (Chevron) */
                        <i className="bi bi-chevron-down">▼</i>
                    )}
                </button>
            </div>

            {/* Smooth Transition Wrapper */}
            <div
                style={{
                    maxHeight: isExpanded ? '2000px' : '0',
                    opacity: isExpanded ? '1' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.5s ease-in-out',
                    marginTop: isExpanded ? '20px' : '0'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapsibleSection;
