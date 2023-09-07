
import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherHour from './Comps/WeatherHour';
import CurrentWeather from './Comps/CurrentWeather';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const apiKey = '49dbc11a976fd95d5d464739a2a668e8';
    const city = 'lebanon'; // to be changed
    
    // Fetch weather data for the next 5 days in 3-hour intervals
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract data for every 3 hours and store it in weatherData state
        const filteredData = data.list.filter((item, index) => index % 8 === 0); // 8 * 3 hours = 24 hours
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div>
      <CurrentWeather />
      <div className="main-division">
        {weatherData.map((data, index) => (
          <WeatherHour
            key={index}
            time={data.dt_txt}
            iconSrc={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            temperature={`${data.main.temp} °C`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;