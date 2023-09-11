import React from 'react';
import './Weather.css'; 

const WeatherHour = ({ time, iconSrc, temperature }) => {

  const dateTime = new Date(time);

  // Format the time in 24-hour format (hh:mm)
  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="hour-div">
      <p> {formattedTime}</p>
      <img className="weather-images" src={iconSrc} alt="Weather Icon" />
      <b className="temperature">{temperature}</b>
    </div>
  );
};

export default WeatherHour;