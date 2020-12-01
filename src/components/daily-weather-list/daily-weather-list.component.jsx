import React from 'react';
import DailyWeather from '../daily-weather/daily-weather.component';

import './daily-weather-list.styles.scss';

const DailyWeatherList = ({ dailyTemps, days, months, icons, handleDailyClick }) => (
    <div className='daily-weather-container'>
        {
            dailyTemps.map((dailyTemp, index) => {        
                return (<div key={index}>
                            <DailyWeather 
                                days={days}
                                months={months}
                                dailyTemp={dailyTemp} 
                                icon={icons[dailyTemp.weather[0].icon]}
                                handleDailyClick={handleDailyClick}
                            />
                        </div>);
            })
        }
    </div>
);


export default DailyWeatherList;