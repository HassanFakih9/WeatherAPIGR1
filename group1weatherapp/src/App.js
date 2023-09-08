
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

  const getWeatherImageForTime = (conditionCode, hour) => {
  // Determine if it's daytime (AM) or nighttime (PM) based on the given hour
  const isDaytime = hour >= 6 && hour < 18; // Assuming 6 AM to 6 PM is daytime

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

    // Fetch weather data for the current day with 3-hour intervals based on user-entered city
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {

        // Filter the data for every 3 hours
        const filteredData = data.list.filter((item, index) => index % 3 === 0); // 3-hour intervals

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
      {weatherData.slice(0, 7).map((data, index) => {
        
  // Calculate the time for each WeatherHour based on the current time and index
  const time = new Date(currentDate);
  time.setHours(currentDate.getHours() + (3 * index));
  const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
  const hour = time.getHours();

  // Get the condition code for the current data
  const conditionCode = data.weather[0].icon;

  return (
    <WeatherHour
      key={index}
      time={formattedTime} // Updated time format
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