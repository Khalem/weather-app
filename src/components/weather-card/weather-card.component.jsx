import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import './weather-card.styles.scss';

const WeatherCard = ({ location, icon, hourlyTemps }) => {
    let temp = Math.round(location.temp - 273.15);
    let data = [];

    // Creating new obj for recharts to use as data
    hourlyTemps.map(item => {
        let d = new Date(item.dt * 1000);
        let hour = d.getHours();
        let minutes = d.getMinutes();
        let name = `${hour}:${minutes}0`;
        let newTemp = Math.round(item.temp - 273.15);

        let newObj = {
            name,
            temp: newTemp
        };
        data.push(newObj);
    });

    return (
        <div className='weather-card'>
            <div className='weather-card-header'>
                <h1 className='card-title'>{location.name} {icon} <span className='temp'>{temp}°C</span></h1>
                <p>{location.description}</p>
                <h2 className='card-country'>{location.country}</h2>
            </div>
            <div className='weather-card-body'>
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data}>
                    <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#110425" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7a32ff" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" angle={-45} textAnchor="end"  />
                    <YAxis />
                    <Tooltip formatter={value => `${value}°C`}/>
                    <Area type="monotone" dataKey="temp" stroke="#4c00ff" fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}


export default WeatherCard;