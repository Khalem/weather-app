import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import './weather-card.styles.scss';

const WeatherCard = ({ location, icon, hourlyTemps }) => {
    const tooltipStyles = {
        width: '100%',
        height: '100%',
        backgroundColor: '#120f2e',
        padding: '1rem',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0px 2px 10px 3px rgba(0,0,0,0.25)'
    };

    return (
        <div className='weather-card'>
            <div className='weather-card-header'>
                <h1 className='card-title'>{location.name} {icon} <span className='temp'>{location.temp}°C</span></h1>
                <p>{location.description}</p>
                <h2 className='card-country'>{location.country}</h2>
            </div>
            <div className='weather-card-body'>
                <h2>Hourly Data</h2>
                {
                    hourlyTemps.length ? 
                    <ResponsiveContainer width='100%' height={300}>
                        <AreaChart data={hourlyTemps}>
                            <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#110425" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#130a24" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" angle={45} textAnchor="start"  />
                            <YAxis />
                            <Tooltip formatter={value => `${value}°C`} contentStyle={tooltipStyles}/>
                            <Area type="natural" dataKey="temp" stroke="#4c00ff" fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    :
                    <h1>We're sorry, there is no hourly data available</h1>
                }
            </div>
        </div>
    )
}


export default WeatherCard;