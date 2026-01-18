import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {SIDEBAR_COMPONENTS} from "../utils/Constants.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart({ jobs }) {

    const counts = {
        Applied: jobs.filter(j => j.status === 'Applied').length,
        Interviewing: jobs.filter(j => j.status === 'Interviewing').length,
        Offered: jobs.filter(j => j.status === 'Offered').length,
        Rejected: jobs.filter(j => j.status === 'Rejected').length,
        Ghosted: jobs.filter(j => j.status === 'Ghosted').length,
    };

    const data = {
        labels: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Ghosted'],
        datasets: [
            {
                data: [counts.Applied, counts.Interviewing, counts.Offered, counts.Rejected, counts.Ghosted],
                backgroundColor: [
                    '#A2D2FF',
                    '#CDB4DB',
                    '#B9FBC0',
                    '#FFC8DD',
                    '#FDFFB6'
                ],
                borderColor: '#000000',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#000',
                    font: {
                        family: 'system-ui',
                        weight: 'bold'
                    }
                }
            }
        }
    };

    return (
        <div className={SIDEBAR_COMPONENTS}>
            <h5 className="text-center mb-3">Application Overview</h5>
            <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                <Doughnut
                    data={data}
                    options={options}
                />
            </div>
            <div className="text-center mt-3">
                <strong>Total Active: {jobs.length}</strong>
            </div>
        </div>
    );
}

export default StatusChart;
