import React from 'react';

import WeatherCard from './components/weather-card/weather-card.component';
import DailyWeatherList from './components/daily-weather-list/daily-weather-list.component';

import { API_KEY } from './env';
import { COUNTRY_NAMES } from './country-names';
import { ICONS } from './svgsImport';

import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'Febuarary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      date: {},
      lat: 0,
      lon: 0,
      location: [],
      dailyTemps: [],
      hourlyTemps: []
    }
  }

  componentDidMount() {
    let d = new Date();
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.setState({ date: d.getDate(), lat, lon });
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      this.getLocationData(url);
      this.getHourlyData();
    });
  }

  getLocationData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    await console.log(data);

    const { name, id, timezone  } = data;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min  } = data.main;
    const country = COUNTRY_NAMES[data.sys.country];
    const { icon, description } = data.weather[0];

    const location = {
      name,
      id,
      timezone,
      feels_like,
      humidity,
      pressure,
      temp: Math.round(temp - 273.15),
      temp_max,
      temp_min,
      country,
      icon,
      description
    };

    this.setState({ location });
  }


  /*
    The api provides hourly data for 48hs
    I need to just collect the temps for the hours within the date in the state
    */ 
  getHourlyData = async () => {
    const hourResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,minutely,alerts&appid=${API_KEY}`);
    const hourData = await hourResponse.json();
    await console.log(hourData);

    let hourlyTemps = [];

    hourData.hourly.forEach(item => {
      let time = item.dt - hourData.timezone_offset;
      let d = new Date(time*1000);

      if (d.getDate() == this.state.date ) {
        let hour = d.getHours();
        let minutes = d.getMinutes();
        let name = `${hour}:${minutes}0`;
        let newTemp = Math.round(item.temp - 273.15);

        let newObj = {
            name,
            temp: newTemp
        };

        hourlyTemps.push(newObj);
      } else {
        return;
      }
    });

    this.setState({ dailyTemps: hourData.daily, hourlyTemps });
  }


  handleDailyClick = date => {
    this.setState({ date: date.getDate() });
    this.getHourlyData();

  }

  render() {
    return (
      <div className='App'>
        { 
          this.state.location ?
          <WeatherCard 
            location={this.state.location} 
            icon={ICONS[this.state.location.icon]} 
            hourlyTemps={this.state.hourlyTemps}
          />
          : <h1>Loading..</h1>
        }
        <DailyWeatherList 
          dailyTemps={this.state.dailyTemps} 
          icons={ICONS} 
          days={this.days} 
          months={this.months} 
          handleDailyClick={this.handleDailyClick}
        />
      </div>
    );
  }
}

export default App;
