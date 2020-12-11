import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

import './weather-card.styles.scss';

const WeatherCard = ({ location, icon, hourlyTemps, date, time, days, months }) => {
    const tooltipStyles = {
        width: '100%',
        height: '100%',
        backgroundColor: '#120f2e',
        padding: '1rem',
        borderRadius: '10px',
        border: 'none',
        boxShadow: '0px 2px 10px 3px rgba(0,0,0,0.25)'
    };

    const variants = {
        hidden: { 
            opacity: 0, 
            translateY: 100 
        },
        visible: { 
            opacity: 1, 
            scale: 1, 
            translateY: 0, 
            transition: {
                delay: .1
            }
        }
    }

    const dateStr = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;

    return (
        <motion.div 
            className='weather-card'
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <div className='weather-card-header'>
                <h1 className='card-title'>{location.temp}°</h1>
                <div className='header-location-date'>
                    <h2>{location.name}</h2>
                    <p>{time} {dateStr}</p>
                </div>
                <div className='header-weather-desc'>
                    {icon}
                    <p>{location.description}</p>
                </div>
            </div>
            <div className='weather-card-body'>
                <h2>Hourly Data</h2>
                {   
                    hourlyTemps.length ? 
                    <ResponsiveContainer width='100%' height={300}>
                        <AreaChart data={hourlyTemps} stackOffset='sign'>
                            <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#110425" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#130a24" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            <XAxis dataKey="name" angle={45} textAnchor="start"  />
                            <YAxis />
                            <Tooltip formatter={value => `${value}°C`} contentStyle={tooltipStyles}/>
                            <Area type="natural" dataKey="temp" stroke="#ff9369" fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    :
                    <h1>We're sorry, there is no hourly data available for {dateStr}</h1>
                }
            </div>
        </motion.div>
    )
}


export default WeatherCard;