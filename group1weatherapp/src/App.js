
import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherHour from './Comps/WeatherHour';
import CurrentWeather from './Comps/CurrentWeather';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const currentDate = new Date();
  const [city, setCity] = useState('lebanon'); // By default Lebanon 

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const getWeatherImage = (conditionCode) => {
    switch (conditionCode) {
      case '01d':
        return process.env.PUBLIC_URL + '/Images/sun.png';
      case '02d':
        return process.env.PUBLIC_URL + '/Images/sunny.png';
      case '03d':
      case '04d':
        return process.env.PUBLIC_URL + '/Images/smiling.png';
      case '09d':
      case '10d':
        return process.env.PUBLIC_URL + '/Images/rain.png';
      case '11d':
        return process.env.PUBLIC_URL + '/Images/severe-weather.png';
      case '13d':
        return process.env.PUBLIC_URL + '/Images/snow.png';
      case '50d':
        return process.env.PUBLIC_URL + '/Images/fog.png';
      default:
        return process.env.PUBLIC_URL + '/Images/MainSun.png';
    }
  };

  useEffect(() => {
    const apiKey = '49dbc11a976fd95d5d464739a2a668e8';

    // Fetch weather data for the current day with 3-hour intervals based on user-entered city
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the data for every 3 hours
        const filteredData = data.list.filter((item, index) => index % 8 === 0); // 8 * 3 hours = 24 hours

        // Update the weatherData state with the filtered data
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  return (
    <div>
      <CurrentWeather onCityChange={handleCityChange} />
      <div className="main-division">
        {weatherData.map((data, index) => {
          // Calculate the time for each WeatherHour based on the current time and index
          const time = new Date(currentDate);
          time.setHours(currentDate.getHours() + (3 * index));
          const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
          const conditionCode = data.weather[0].icon;

          return (
            <WeatherHour
              key={index}
              time={formattedTime} // Updated time format
              iconSrc={getWeatherImage(conditionCode)}
              temperature={`${data.main.temp} °C`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;