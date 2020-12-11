import React from 'react';
import DailyWeather from '../daily-weather/daily-weather.component';
import { motion } from "framer-motion";

import './daily-weather-list.styles.scss';

const DailyWeatherList = ({ dailyTemps, days, months, icons, handleDailyClick }) => {
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
                delay: 1
            }
        }
    }

    return (
        <motion.div 
            className='daily-weather-container'
            initial="hidden"
            animate="visible"
            variants={variants}
        >
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
        </motion.div>
    );
}


export default DailyWeatherList;