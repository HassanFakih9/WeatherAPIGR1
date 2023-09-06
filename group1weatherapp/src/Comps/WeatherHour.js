import React from 'react';
import './Weather.css'; 

const WeatherHour = ({ time, iconSrc, temperature }) => {
  return (
    <div className="hour-div">
      <p>{time}</p>
      <img className="weather-images" src={iconSrc} alt="Weather Icon" />
      <b className="temperature">{temperature}</b>
    </div>
  );
};

export default WeatherHour;