import React, { useState } from 'react';
import {FLEX_BETWEEN_CENTER, SAVE_BTN, SECTION_CONTAINER} from "../utils/Constants.js";

const CollapsibleSection = ({ title, children, defaultExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className={SECTION_CONTAINER}>

            {/* Header */}
            <div
                className={FLEX_BETWEEN_CENTER}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="m-0">{title}</h3>
                <button className={SAVE_BTN}>
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
