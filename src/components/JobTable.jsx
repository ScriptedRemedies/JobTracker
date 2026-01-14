import React, { useState, useMemo } from 'react';
import {
    BTN_CONTAINER,
    DELETE_BTN,
    FIT_STATUS,
    FORM_LABEL_SMALL,
    SAVE_BTN, SELECT_FIELD,
    STATUS,
    WORK_MODEL
} from '../utils/Constants';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as XLSX from 'xlsx';

function JobTable({ jobs, onEdit, onDelete }) {
    const [sortConfig, setSortConfig] = useState({ key: 'dateApplied', direction: 'desc' });
    const [filters, setFilters] = useState({
        workModel: '',
        fitStatus: '',
        status: ''
    });
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    const sortedJobs = useMemo(() => {
        let processedJobs = jobs.filter(job => {
            return (filters.workModel === '' || job.workModel === filters.workModel) &&
                (filters.fitStatus === '' || job.fitStatus === filters.fitStatus) &&
                (filters.status === '' || job.status === filters.status);
        });
        if (sortConfig.key !== null) {
            processedJobs.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'salary') {
                    aValue = aValue ? Number(aValue) : 0;
                    bValue = bValue ? Number(bValue) : 0;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return processedJobs;
    }, [jobs, sortConfig, filters]);
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <FontAwesomeIcon icon="sort" className="ms-1" />;
        }
        return sortConfig.direction === 'asc'
            ? <FontAwesomeIcon icon="chevron-up" className="ms-1" />
            : <FontAwesomeIcon icon="chevron-down" className="ms-1" />;
    };
    const handleExport = () => {
        const dataToExport = sortedJobs.map(job => ({
            Position: job.position,
            Company: job.company,
            Location: job.location,
            "Work Model": job.workModel,
            Salary: job.salary ? Number(job.salary) : 0,
            "Fit Status": job.fitStatus,
            "Fit Reason": job.fitReason,
            Status: job.status,
            "Date Applied": job.dateApplied,
            "Applied Through": job.appliedThrough,
            Stage: job.stage,
            "Interview Date": job.interviewDate,
            Contact: job.contact,
            Notes: job.notes
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

        XLSX.writeFile(workbook, "MyJobApplications.xlsx");
    };

    return (
        <div className="table-responsive">
            {/* Filter Bar */}
            <div className="d-flex gap-3 mb-3 align-items-end">
                <div>
                    <label className={FORM_LABEL_SMALL}>Work Model</label>
                    <select name="workModel" className={SELECT_FIELD} value={filters.workModel} onChange={handleFilterChange}>
                        <option value="">All Models</option>
                        {WORK_MODEL.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className={FORM_LABEL_SMALL}>Fit Status</label>
                    <select name="fitStatus" className={SELECT_FIELD} value={filters.fitStatus} onChange={handleFilterChange}>
                        <option value="">All Fits</option>
                        {FIT_STATUS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                <div>
                    <label className={FORM_LABEL_SMALL}>App Status</label>
                    <select name="status" className={SELECT_FIELD} value={filters.status} onChange={handleFilterChange}>
                        <option value="">All Statuses</option>
                        {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <button
                    className={SAVE_BTN}
                    onClick={handleExport}
                >
                    <FontAwesomeIcon icon="file-export" className="me-1" />
                    Export to Excel
                </button>
                <button
                    className={SAVE_BTN}
                    onClick={() => setFilters({ workModel: '', fitStatus: '', status: '' })}
                >
                    Clear Filters
                </button>
            </div>
            <table className="table table-hover table-striped mt-3 align-middle">
                <thead>
                <tr className="text-nowrap">
                    <th scope="col" onClick={() => requestSort('position')} style={{ cursor: 'pointer' }}>
                        Position {getSortIcon('position')}
                    </th>
                    <th scope="col" onClick={() => requestSort('company')} style={{ cursor: 'pointer' }}>
                        Company {getSortIcon('company')}
                    </th>
                    <th scope="col" onClick={() => requestSort('location')} style={{ cursor: 'pointer' }}>
                        Location {getSortIcon('location')}
                    </th>
                    <th scope="col" onClick={() => requestSort('workModel')} style={{ cursor: 'pointer' }}>
                        Work Model {getSortIcon('workModel')}
                    </th>
                    <th scope="col" onClick={() => requestSort('salary')} style={{ cursor: 'pointer' }}>
                        Salary {getSortIcon('salary')}
                    </th>
                    <th scope="col" onClick={() => requestSort('fitStatus')} style={{ cursor: 'pointer' }}>
                        Fit Status {getSortIcon('fitStatus')}
                    </th>
                    <th scope="col">Fit Reason</th>
                    <th scope="col">Job Posting</th>
                    <th scope="col">Job Portal</th>
                    <th scope="col" onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>
                        Status {getSortIcon('status')}
                    </th>
                    <th scope="col" onClick={() => requestSort('dateApplied')} style={{ cursor: 'pointer' }}>
                        Date Applied {getSortIcon('dateApplied')}
                    </th>
                    <th scope="col" onClick={() => requestSort('appliedThrough')} style={{ cursor: 'pointer' }}>
                        Applied Through {getSortIcon('appliedThrough')}
                    </th>
                    <th scope="col" onClick={() => requestSort('stage')} style={{ cursor: 'pointer' }}>
                        Interview Stage {getSortIcon('stage')}
                    </th>
                    <th scope="col" onClick={() => requestSort('interviewDate')} style={{ cursor: 'pointer' }}>
                        Interview Date {getSortIcon('interviewDate')}
                    </th>
                    <th scope="col">Contact</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedJobs.map(job => (
                    <tr key={job.id}>
                        <td>{job.position}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{job.workModel}</td>
                        <td>
                            {job.salary ? `$${Number(job.salary).toLocaleString()}` : "Not Listed"}
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
                            <div className={BTN_CONTAINER}>
                                <button
                                    onClick={() => onEdit(job.id)}
                                    className={SAVE_BTN}
                                    title="Edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(job.id)}
                                    className={DELETE_BTN}
                                    title="Delete"
                                >
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobTable;
