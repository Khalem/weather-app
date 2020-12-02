import React from 'react';

import './other-locations.styles.scss';

const OtherLocations = props => (
    <div className='other-locations-container'>
        {
            props.locations.length ?
            props.locations.map(location => (
                <div className='other-location' onClick={() => props.changeLocation(location)} key={location.name}>
                    <h1>{location.temp}°</h1>
                    <div className='other-location-content'>
                        <h2>{location.name}</h2>
                        <div className='other-location-footer'>
                            <h3>{props.icons[location.icon]}</h3>
                            <h3>{location.description}</h3>
                        </div>
                    </div>
                </div>
            ))
            :
            <h3 className='no-results'>We're sorry, there were no results found for that search.</h3>
        }
    </div>
);


export default OtherLocations;