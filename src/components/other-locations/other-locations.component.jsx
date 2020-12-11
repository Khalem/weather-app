import React from 'react';
import { motion } from "framer-motion";

import './other-locations.styles.scss';

const OtherLocations = ({ searchLoading, locations, changeLocation, icons }) => {
    const parentVariants = {
        hidden: { 
            opacity: 0,
            translateY: 100
        },
        visible: {
          opacity: 1,
          translateY: 0,
          transition: {
            delay: .5,
            staggerChildren: .2
          }
        }
      }
      
      const childVariants = {
        hidden: { 
            opacity: 0,
            translateY: 100
        },
        visible: { 
            opacity: 1,
            translateY: 0
        }
      }

    return (
        <motion.div 
            className='other-locations-container'
            initial="hidden"
            animate="visible"
            variants={parentVariants}
        >
            {   
                searchLoading ? <div className='lds-ripple'><div></div><div></div></div>
                :
                locations.length ?
                locations.map(location => (
                    <motion.div 
                        className='other-location' 
                        onClick={() => changeLocation(location)} 
                        key={location.name}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                            scale: 1.025,
                            transition: { duration: .05 }
                        }}
                        variants={childVariants}
                    >
                        <h1>{location.temp}°</h1>
                        <div className='other-location-content'>
                            <h2>{location.name}</h2>
                            <div className='other-location-footer'>
                                <h3>{icons[location.icon]}</h3>
                                <h3>{location.description}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))
                :
                <h3 className='no-results'>We're sorry, there were no results found for that search.</h3>
            }
        </motion.div>
    );
} 
    


export default OtherLocations;