import React from 'react';

import './daily-weather.styles.scss';

const DailyWeather = ({ dailyTemp, days, months, icon, handleDailyClick }) => {
    let temp = Math.round(dailyTemp.temp.day - 273.15);
    let d = new Date(dailyTemp.dt * 1000);
    let day = days[d.getDay()];
    let dateMonth = `${d.getDate()} ${months[d.getMonth()]}`;

    return (
        <div className='daily-weather-card' onClick={() => handleDailyClick(d)}>
            <div className='daily-weather-content'>
                {icon}
                <h1>{temp}°C</h1>
                <h2>{day}</h2>
                <h3>{dateMonth}</h3>
            </div>
        </div>
    );
}


export default DailyWeather;