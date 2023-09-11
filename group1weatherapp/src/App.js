import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherHour from './Comps/WeatherHour';
import CurrentWeather from './Comps/CurrentWeather';
import './Comps/Weather.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const currentDate = new Date();
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState({
    humidity: '',
    wind: '',
    pressure: '',
    currentTemperature: '',
    tempDesc: '',
    weatherConditionCode: '',
    CurrentCity: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCityChange = (event) => {
    if (event.key === 'Enter') {
      setSubmitted(true);
    } else {
      const newCity = event.target.value;
      setCity(newCity);
      setSubmitted(false);

      if (!newCity.trim()) {
        setCurrentWeather({
          humidity: '',
          wind: '',
          pressure: '',
          currentTemperature: '',
          tempDesc: '',
          weatherConditionCode: '',
          CurrentCity: '',
        });
        setWeatherData([]);
      }
    }
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
    // Fetch data when submitted is true and city is not empty
    if (submitted && city.trim()) {
      const apiKey = '49dbc11a976fd95d5d464739a2a668e8';

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${city} isn't a city`);
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data.list);
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
          // Clear any previous error message
          setErrorMessage('');
        })
        .catch((error) => {
          
          setErrorMessage(error.message);
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city, submitted]);

  return (
    <div>
      <CurrentWeather
        onCityChange={handleCityChange}
        currentWeather={currentWeather}
        weatherData={weatherData}
        getWeatherImageForTime={getWeatherImageForTime}
      />

      <div className="main-division">
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : weatherData && weatherData.length > 0 ? (
          weatherData.slice(0, 7).map((data, index) => {
            const time = new Date(currentDate);
            time.setHours(currentDate.getHours() + 3 * index);
            const hour = time.getHours();
            const conditionCode = data.weather[0].icon;

            return (
              <WeatherHour
                key={index}
                time={data.dt_txt}
                iconSrc={getWeatherImageForTime(conditionCode, hour)}
                temperature={`${data.main.temp} °C`}
              />
            );
          })
        ) : (
          <p>{!(city.trim()) ? 'Enter a city name.' : 'Loading weather data...'}</p>
        )}
      </div>
    </div>
  );
}

export default App;
