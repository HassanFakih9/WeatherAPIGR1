import React from 'react';
import './Weather.css';

const CurrentWeather = ({ onCityChange, currentWeather, getWeatherImageForTime }) => {
  const { humidity, wind, pressure, currentTemperature, tempDesc, weatherConditionCode, CurrentCity, } = currentWeather;

  return (
    <div className="ContainerOfTheUpPart">
      <div className="ContainerLeft">
        <div className="SearchBar">
          <img src="Images/cloud-computing.png" className="SearchBtn" onClick={onCityChange} />
          <input
              type="text"
              className="SearchInput"
              placeholder="Enter City Name ..."
              value={currentWeather.city}
              onChange={(event) => onCityChange(event)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  onCityChange(event);
                }
              }}
            />
          <i className="SearchIcon"></i>
        </div>
        <div className="Rain">
          <img src="Images/rainrate.png" className="waterImage" />
          <b className="humiditylbl">humidity:</b>
          <p className="RainDesc">{humidity}%</p>
        </div>
        <div className="Wind">
          <img src="Images/wind.png" className="windImage" />
          <b className="Windlbl">wind:</b>
          <p className="WindDesc">{wind} km/h</p>
        </div>
        <div className="Pressure">
          <img src="Images/pressure.png" className="pressureImage" />
          <b className="Pressurelbl">Pressure:</b>
          <p className="PressureDesc">{pressure} hPa</p>
        </div>
      </div>
      <div className="ContainerRight">
        <img src={getWeatherImageForTime(weatherConditionCode, new Date().getHours())} className="MainImage" />
        <p className='CityName'>{CurrentCity}</p> 
        <b className="CurrentTemp">{currentTemperature}°C</b>
        <p className="CurrentTempDesc">{tempDesc}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
