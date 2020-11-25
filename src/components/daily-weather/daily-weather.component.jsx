import React from 'react';

import './daily-weather.styles.scss';

const DailyWeather = ({ dailyTemp, day, month, date, icon }) => {
    let temp = Math.round(dailyTemp.temp.day - 273.15);
    let dateMonth = `${date} ${month}`;

    return (
        <div className='daily-weather-card'>
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