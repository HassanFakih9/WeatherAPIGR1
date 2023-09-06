import React from 'react';
import './Weather.css'; 

const CurrentWeather =({humidity,wind,pressure,currentTemperature,tempDesc}) =>{

    return(
    <div className="ContainerOfTheUpPart">

       
        <div className="ContainerLeft">

            <div className="SearchBar">
                <img src="Images/cloud-computing.png" className="SearchBtn"/>
                <input type="text" className="SearchInput" placeholder="Enter City Name ..." />
                <i className="SearchIcon"></i>
            </div>
    

            <div className="Rain">
                <img src="Images/water.png" className="waterImage"/>
                <p className="RainDesc">{humidity}%</p>
             </div>

      
            <div className="Wind">
                <img src="Images/wind.png" className="windImage"/>
                <p className="WindDesc">{wind} km\h</p>
            </div>

            <div className="Pressure">
                <img src="Images/pressure.png" className="pressureImage"/>
                <p className="WindDesc">{pressure}p pha</p>
            </div>

        </div>

        <div className="ContainerRight">
            <img src="Images/MainSun.png" className="MainImage"/>
            <b className="CurrentTemp">{currentTemperature}°C</b>
            <p className="CurrentTempDesc"> {tempDesc} </p>
        </div>

    </div>
    );
}

export default CurrentWeather;