import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherHour from './Comps/WeatherHour';
import CurrentWeather from './Comps/CurrentWeather';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const currentDate = new Date();
  const [city, setCity] = useState('lebanon');
  const [currentWeather, setCurrentWeather] = useState({
    humidity: '',
    wind: '',
    pressure: '',
    currentTemperature: '',
    tempDesc: '',
    weatherConditionCode: '',
    CurrentCity:'',
  });

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const getWeatherImageForTime = (conditionCode, hour) => {
    const isDaytime = hour >= 6 && hour < 18;

    switch (conditionCode) {
      case '01d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/sun.png' : process.env.PUBLIC_URL + '/Images/full-moon.png';
      case '02d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/sunny.png' : process.env.PUBLIC_URL + '/Images/rainmoon.png';
      case '03d':
      case '04d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/smiling.png' : process.env.PUBLIC_URL + '/Images/Cloudymoon.png';
      case '09d':
      case '10d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/rain.png' : process.env.PUBLIC_URL + '/Images/rainmoon.png';
      case '11d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/severe-weather.png' : process.env.PUBLIC_URL + '/Images/HeavyWeathermoon.png';
      case '13d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/snow.png' : process.env.PUBLIC_URL + '/Images/snowmoon.png';
      case '50d':
        return isDaytime ? process.env.PUBLIC_URL + '/Images/fog.png' : process.env.PUBLIC_URL + '/Images/full-moon.png';
      default:
        return isDaytime ? process.env.PUBLIC_URL + '/Images/sun.png' : process.env.PUBLIC_URL + '/Images/full-moon.png';
    }
  };

  useEffect(() => {
    const apiKey = '49dbc11a976fd95d5d464739a2a668e8';

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.list.filter((item, index) => index % 3 === 0);
        setWeatherData(filteredData);
        const currentWeatherData = data.list[0];
        setCurrentWeather({
          humidity: currentWeatherData.main.humidity,
          wind: currentWeatherData.wind.speed,
          pressure: currentWeatherData.main.pressure,
          currentTemperature: currentWeatherData.main.temp,
          tempDesc: currentWeatherData.weather[0].description,
          weatherConditionCode: currentWeatherData.weather[0].icon,
          CurrentCity: city,
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  return (
    <div>
      <CurrentWeather
        onCityChange={handleCityChange}
        currentWeather={currentWeather}
        weatherData={weatherData}
        getWeatherImageForTime={getWeatherImageForTime}
      />
      <div className="main-division">
        {weatherData.slice(0, 7).map((data, index) => {
          const time = new Date(currentDate);
          time.setHours(currentDate.getHours() + 3 * index);
          const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
          const hour = time.getHours();
          const conditionCode = data.weather[0].icon;

          return (
            <WeatherHour
              key={index}
              time={formattedTime}
              iconSrc={getWeatherImageForTime(conditionCode, hour)}
              temperature={`${data.main.temp} °C`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
