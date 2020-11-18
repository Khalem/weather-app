import React from 'react';

import './weather-card.styles.scss';

const WeatherCard = ({ location }) => {
    let temp = Math.floor(location.temp - 273.15);

    return (
        <div className='weather-card'>
            <h1 className='card-title'>{location.name} {temp}°C</h1>
            <h2 className='card-country'>{location.country}</h2>
        </div>
    )
}


export default WeatherCard;