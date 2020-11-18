import React from 'react';

import WeatherCard from './components/weather-card/weather-card.component';

import { API_KEY } from './env';
import { COUNTRY_NAMES } from './country-names';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      location: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      this.callAPI(url);
    });
  }

  callAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    await console.log(data);

    const { name, id, timezone,  } = data;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min  } = data.main;
    const country = COUNTRY_NAMES[data.sys.country];
    
    const location = {
      name,
      id,
      timezone,
      feels_like,
      humidity,
      pressure,
      temp,
      temp_max,
      temp_min,
      country
    }

    await this.setState({ location });
  }

  render() {
    return (
      <div className='App'>
        { 
          this.state.location ?
          <WeatherCard location={this.state.location}/>
          : null
        }
      </div>
    );
  }
}

export default App;
