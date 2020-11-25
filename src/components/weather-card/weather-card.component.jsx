import React from 'react';

import './weather-card.styles.scss';

const WeatherCard = ({ location, icon }) => {
    let temp = Math.round(location.temp - 273.15);

    return (
        <div className='weather-card'>
            <h1 className='card-title'>{location.name} {icon} <span className='temp'>{temp}°C</span></h1>
            <p>{location.description}</p>
            <h2 className='card-country'>{location.country}</h2>
        </div>
    )
}


export default WeatherCard;