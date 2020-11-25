import React from 'react';
import DailyWeather from '../daily-weather/daily-weather.component';

import './daily-weather-list.styles.scss';

const DailyWeatherList = ({ dailyTemps, days, months, icons, handleDailyClick }) => (
    <div className='daily-weather-container'>
        {
            dailyTemps.map((dailyTemp, index) => {
                let d = new Date();
                d.setDate(d.getDate() + index);
                let day = days[d.getDay()];
                let date = d.getDate();
                let month = months[d.getMonth()];
        
                return (<div key={index} onClick={() => handleDailyClick(d)}>
                            <DailyWeather 
                                day={day} 
                                date={date} 
                                month={month}
                                dailyTemp={dailyTemp} 
                                icon={icons[dailyTemp.weather[0].icon]} 
                            />
                        </div>);
            })
        }
    </div>
);


export default DailyWeatherList;