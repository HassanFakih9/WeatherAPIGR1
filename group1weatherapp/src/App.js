
import './App.css';
import WeatherHour from './Comps/WeatherHour';
import CurrentWeather from './Comps/CurrentWeather';
function App() {
  const weatherData = [
    { time: '10:00', iconSrc: 'Images/sunny.png', temperature: '+15 °C' },
    { time: '11:00', iconSrc: 'Images/snow.png', temperature: '+17 °C' },
    { time: '12:00', iconSrc: 'Images/wind.png', temperature: '+11 °C' },
    { time: '13:00', iconSrc: 'Images/sun.png', temperature: '+16 °C' },
    { time: '14:00', iconSrc: 'Images/water.png', temperature: '+13 °C' },
    { time: '15:00', iconSrc: 'Images/smiling.png', temperature: '+0 °C' },
    { time: '116:00', iconSrc: 'Images/severe-weather.png', temperature: '+11 °C' },
   
  ];
  return (
    <div>
    <CurrentWeather  />
    
    <div className="main-division">

       {weatherData.map((data, index) => (
        <WeatherHour
          key={index} 
          time={data.time}
          iconSrc={data.iconSrc}
          temperature={data.temperature}
        />
      ))}
     
    </div>
    </div>
  );
};

export default App;