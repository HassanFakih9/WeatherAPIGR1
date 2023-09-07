import React, { useState, useEffect } from 'react';
import './Weather.css';

const CurrentWeather = ({ onCityChange }) => {
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    wind: '',
    pressure: '',
    currentTemperature: '',
    tempDesc: '',
    weatherConditionCode: '',
  });
  const [city, setCity] = useState('lebanon'); //Default as lebanon

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  

  const fetchWeatherData = () => {
    const apiKey = '49dbc11a976fd95d5d464739a2a668e8';

    // Fetch current weather data in Celsius based on user-entered city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        // Update the weatherData state with the fetched data
        setWeatherData({
          humidity: data.main.humidity,
          wind: data.wind.speed,
          pressure: data.main.pressure,
          currentTemperature: data.main.temp, // Temperature in Celsius
          tempDesc: data.weather[0].description,
          weatherConditionCode: data.weather[0].icon,
        });

        // Pass the user-entered city to the parent component
        onCityChange(city);
      })
      .catch((error) => {
        console.error('Error fetching current weather data:', error);
      });
  };

  // useEffect to fetch weather data when the component initially loads
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const getWeatherImage = (conditionCode) => {
    const currentHour = new Date().getHours();

  // Determine if it's daytime (AM) or nighttime (PM)
  const isDaytime = currentHour >= 6 && currentHour < 18; // Assuming 6 AM to 6 PM is daytime

  switch (conditionCode) {
    case '01d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/sun.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '02d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/sunny.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '03d':
    case '04d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/smiling.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '09d':
    case '10d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/rain.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '11d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/severe-weather.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '13d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/snow.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    case '50d':
      return isDaytime ? process.env.PUBLIC_URL + '/Images/fog.png' : process.env.PUBLIC_URL + '/Images/moon.png';
    default:
      return isDaytime ? process.env.PUBLIC_URL + '/Images/MainSun.png' : process.env.PUBLIC_URL + '/Images/moon.png';
  }
};
  return (
    <div className="ContainerOfTheUpPart">
      <div className="ContainerLeft">
        <div className="SearchBar">
          <img src="Images/cloud-computing.png" className="SearchBtn" onClick={fetchWeatherData} />
          <input
            type="text"
            className="SearchInput"
            placeholder="Enter City Name ..."
            value={city}
            onChange={handleCityChange}
          />
          <i className="SearchIcon"></i>
        </div>
        <div className="Rain">
          <img src="Images/water.png" className="waterImage" />
          <p className="RainDesc">{weatherData.humidity}%</p>
        </div>
        <div className="Wind">
          <img src="Images/wind.png" className="windImage" />
          <p className="WindDesc">{weatherData.wind} km/h</p>
        </div>
        <div className="Pressure">
          <img src="Images/pressure.png" className="pressureImage" />
          <p className="PressureDesc">{weatherData.pressure} hPa</p>
        </div>
      </div>
      <div className="ContainerRight">
      <img src={getWeatherImage(weatherData.weatherConditionCode)} className="MainImage" />
        <b className="CurrentTemp">{weatherData.currentTemperature}°C</b>
        <p className="CurrentTempDesc">{weatherData.tempDesc}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
        