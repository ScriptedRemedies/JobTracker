import React from 'react';
import {SIDEBAR_COMPONENTS} from "../utils/Constants.js";

function AppAmountTracker({ goals, jobs }) {

    const target = goals.appAmount || 0
    const frequency = goals.appFrequency || 'Weekly'
    const getTodayString = () => {
        const today = new Date();
        const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
        return localDate.toISOString().split('T')[0];
    }
    const getCurrentCount = () => {
        if (frequency === 'Daily') {
            const jobsToday = jobs.filter(j => j.dateApplied === getTodayString());
            return jobsToday.length;
        } else {
            const currentDay = new Date().getDay()
            let monDay
            if (currentDay === 0) {
                monDay = 6
            } else {
                monDay = currentDay - 1
            }
            const mondayDate = new Date()
            mondayDate.setDate(mondayDate.getDate() - monDay)
            const localMonday = new Date(mondayDate.getTime() - (mondayDate.getTimezoneOffset() * 60000))
            const monDate =localMonday.toISOString().split('T')[0];
            const jobsWeekly = jobs.filter(j => j.dateApplied >= monDate)
            return jobsWeekly.length;
        }
    }
    const count = getCurrentCount();
    const percent = target > 0 ? Math.min(Math.ceil((count / target) * 100), 100) : 0;
    const getMessage = () => {
        if (percent === 0) return 'Level 1 Started';
        if (percent <= 25) return 'Gaining XP...';
        if (percent <= 50) return 'Powering Up';
        if (percent <= 75) return 'Combo Streak';
        if (percent < 100) return 'Boss Fight';
        return 'LEVEL COMPLETE!!';
    }
    const getBarColor = () => {
        if (percent === 0) return 'bg-pastel-pink';
        if (percent <= 25) return 'bg-pastel-pink';
        if (percent <= 50) return 'bg-pastel-pink';
        if (percent <= 75) return 'bg-pastel-yellow';
        if (percent < 100) return 'bg-pastel-yellow';
        return 'bg-pastel-green';
    }

    return (
        <>
            {goals.appAmount && (
                <div className={SIDEBAR_COMPONENTS}>
                    <h5>Application Progress</h5>
                    <p className="text-center m-0">{percent}%</p>
                    <div className="border border-3 border-dark bg-white" style={{borderRadius: '15px'}}>
                        <div
                            className={getBarColor()}
                            style={{
                                width: `${percent}%`,
                                height: '20px',
                                borderRadius: '10px',
                                transition: 'width 0.5s ease'
                            }}
                        >
                        </div>
                    </div>
                    <p className="text-end m-0">{count} / {target}</p>
                    <p className="mb-0 mt-3">{getMessage()}</p>
                </div>
            )}
        </>

    )
}

export default AppAmountTracker;
