import React from 'react';

import WeatherCard from './components/weather-card/weather-card.component';
import DailyWeatherList from './components/daily-weather-list/daily-weather-list.component';
import OtherLocations from './components/other-locations/other-locations.component';
import Search from './components/search/search.component';

import { API_KEY } from './env';
import { COUNTRY_NAMES } from './country-names';
import { ICONS } from './svgsImport';

import './App.scss';


class App extends React.Component {
  constructor() {
    super();

    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'Febuarary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      date: new Date(),
      lat: 0,
      lon: 0,
      location: [],
      otherLocations: [],
      dailyTemps: [],
      hourlyTemps: [],
      time: '',
      toggleTime: true,
      q: '',
      searched: false
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.setState({ lat, lon });
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      this.getLocationData(url);
      this.getNearbyLocationData();
      this.getHourlyData();

      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const d = new Date();
    const hourDate = new Date((this.state.location.dt + this.state.location.timezone) * 1000);
    const hours = hourDate.getHours() < 10 ? `0${hourDate.getHours()}` : hourDate.getHours();
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const seconds = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
    
    this.setState({
      time: this.state.toggleTime === true ? `${hours}:${minutes}:${seconds}` : ''
    });
  }

  getLocationData = async url => {
    const response = await fetch(url);
    const data = await response.json();
    await console.log(data);

    const location = this.cleanData(data);

    this.setState({ location });
  }

  cleanData = data => {
    const { name, id, timezone, dt  } = data;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min  } = data.main;
    const country = COUNTRY_NAMES[data.sys.country];
    const { icon, description } = data.weather[0];
    const { lon, lat } = data.coord;

    const location = {
      name,
      id,
      lon,
      lat,
      dt,
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

    return location;
  }


  getNearbyLocationData = async () => {
    let locations = ['London', 'New York', 'Tokyo', 'Sydney', 'Cape Town', 'Cairo', 'Paris', 'Los Angeles', 'Moscow', 'Singapore'];
    // Shuffle Array using the Durstenfeld Shuffle
    for (let i = locations.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = locations[i];
      locations[i] = locations[j];
      locations[j] = temp;
    }

    const otherLocations = [];

    // Get data for 4 locations
    for (let i = 0; i < Math.round(locations.length / 2.5); i++) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locations[i]}&appid=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      otherLocations.push(this.cleanData(data));
    }

    await this.setState({ otherLocations });
    console.log(this.state.otherLocations, 'otherLocations State');
  } 


  /*
    The api provides hourly data for 48hs
    I need to just collect the temps for the hours within the date in the state
    */ 
  getHourlyData = async () => {
    const hourResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=current,minutely,alerts&appid=${API_KEY}`);
    const hourData = await hourResponse.json();
    await console.log(hourData);

    const hourlyTemps = [];

    hourData.hourly.forEach(item => {
      const time = item.dt + hourData.timezone_offset;
      const d = new Date(time*1000);

      if (d.getDate() === this.state.date.getDate() ) {
        const hour = d.getHours();
        const minutes = d.getMinutes();
        const name = `${hour}:${minutes}0`;
        const newTemp = Math.round(item.temp - 273.15);

        const newObj = {
            name,
            temp: newTemp
        };

        hourlyTemps.push(newObj);
      } else {
        return;
      }
    });

    let location = this.state.location;

    hourData.daily.forEach(item => {
      const time = item.dt + hourData.timezone_offset;
      const d = new Date(time*1000);
      
      // change location data based on if user has selected a future day
      if (d.getDate() === this.state.date.getDate() && item != hourData.daily[0]) {
        location.temp = Math.round(item.temp.day - 273.15);
        location.description = item.weather[0].description;
        location.icon = item.weather[0].icon;
      }
    });

    const locationDate = new Date((location.dt + location.timezone) * 1000);
    const toggleTime = locationDate.getDate() === this.state.date.getDate() ? true : false

    this.setState({ 
      location, 
      dailyTemps: hourData.daily, 
      hourlyTemps, 
      toggleTime
    });
  }

  handleDailyClick = date => {
    this.setState({ date });
    this.getHourlyData();
  }

  /*
    Change location data based off location clicked, update data also
    as different timezones might give different dates
  */
  handleLocationClick = async location => {
    await this.setState({ 
      location, 
      lat: location.lat, 
      lon: location.lon,
      date: new Date((location.dt + location.timezone) * 1000)
    });
    this.getHourlyData(); 
  }

  handleSearchChange = e => {
    this.setState({ q: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.q}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    const otherLocations = data.cod === '404' ? [] : [this.cleanData(data)];

    await this.setState({ otherLocations, q: '' });
  }

  render() {
    return (
      <div className='App'>
        <div className='weather-and-locations'>
          { 
            this.state.location ?
            <WeatherCard 
              location={this.state.location} 
              icon={ICONS[this.state.location.icon]} 
              hourlyTemps={this.state.hourlyTemps}
              date={this.state.date}
              time={this.state.time}
              days={this.days} 
              months={this.months} 
            />
            : <h1>Loading..</h1>
          }
          <div className='locations'>
            <Search 
              q={this.state.q} 
              handleSearchChange={this.handleSearchChange}
              handleSubmit={this.handleSubmit}
              placeholder='Search for location..'
            />
            <OtherLocations 
              locations={this.state.otherLocations} 
              changeLocation={this.handleLocationClick} 
              icons={ICONS}
            />
          </div>
        </div>
        <DailyWeatherList 
          dailyTemps={this.state.dailyTemps} 
          icons={ICONS} 
          days={this.days} 
          months={this.months} 
          handleDailyClick={this.handleDailyClick}
        />
        <div className='locations-sm'>
            <h2 className='locations-sm-title'>Looking for weather updates elsewhere?</h2>
            <Search 
              q={this.state.q} 
              handleSearchChange={this.handleSearchChange}
              handleSubmit={this.handleSubmit}
              placeholder='Search..'
            />
            <OtherLocations 
              locations={this.state.otherLocations} 
              changeLocation={this.handleLocationClick} 
              icons={ICONS}
            />
          </div>
      </div>
    );
  }
}

export default App;
