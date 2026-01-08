import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ jobs }) {
    const activeJobs = jobs.filter(j => j.status !== 'Not Applied');

    const counts = {
        Applied: activeJobs.filter(j => j.status === 'Applied').length,
        Interviewing: activeJobs.filter(j => j.status === 'Interviewing').length,
        Offered: activeJobs.filter(j => j.status === 'Offered').length,
        Rejected: activeJobs.filter(j => j.status === 'Rejected').length,
        Ghosted: activeJobs.filter(j => j.status === 'Ghosted').length,
    };

    const data = {
        labels: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Ghosted'],
        datasets: [
            {
                data: [counts.Applied, counts.Interviewing, counts.Offered, counts.Rejected, counts.Ghosted],
                backgroundColor: [
                    '#0D6EFD',
                    '#6F42C1',
                    '#198754',
                    '#DC3545',
                    '#6C757D'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="text-center mb-3">Application Overview</h5>
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <Doughnut
                    data={data}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
            <div className="text-center mt-3">
                <strong>Total Active: {activeJobs.length}</strong>
            </div>
        </div>
    );
}

export default StatusChart;
