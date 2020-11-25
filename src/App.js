import React from 'react';

import WeatherCard from './components/weather-card/weather-card.component';
import DailyWeather from './components/daily-weather/daily-weather.component';

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
      location: [],
      dailyTemps: []
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const hourlyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&appid=${API_KEY}`;

      this.callAPI(url, hourlyUrl);
    });
  }

  callAPI = async (url, hourlyUrl) => {
    const response = await fetch(url);
    const data = await response.json();
    await console.log(data);

    const hourResponse = await fetch(hourlyUrl);
    const hourData = await hourResponse.json();
    await console.log(hourData);

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
      temp,
      temp_max,
      temp_min,
      country,
      icon,
      description
    };

    await this.setState({ location, dailyTemps: hourData.daily });
  }

  render() {
    return (
      <div className='App'>
        { 
          this.state.location ?
          <WeatherCard location={this.state.location} icon={ICONS[this.state.location.icon]}/>
          : <h1>Loading..</h1>
        }
        <div className='daily-weather-container'>
          {
            this.state.dailyTemps.map((dailyTemp, index) => {
              let d = new Date();
              d.setDate(d.getDate() + index);
              let day = this.days[d.getDay()];
              let date = d.getDate();
              let month = this.months[d.getMonth()];

              return (
                <DailyWeather day={day} date={date} month={month} key={index} dailyTemp={dailyTemp} icon={ICONS[dailyTemp.weather[0].icon]}/>
              );
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
