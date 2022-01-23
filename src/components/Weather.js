//api.openweathermap.org/data/2.5/weather?q=pune&appid=bae5824ec2f80d69af0fe4f01e5945ce

import React, { useEffect, useState } from "react";
import "./style.css";
import Weathercard from "./weathercard";
const Weather = () => {

        const [searchValue, setSearchValue] = useState("Renukoot");
        const [tempInfo, setTempInfo] = useState({});

        const getWeatherInfo = async () =>{
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bae5824ec2f80d69af0fe4f01e5945ce`;

                const res =await fetch(url);
                const data =await res.json();

                const {temp, humidity, pressure} =data.main;
                const { main: weathermood } = data.weather[0];
                const {name} = data;
                const {speed} =data.wind;
                const {country, sunset} =data.sys;

                const myNewWeatherInfo = {
                    temp, humidity, pressure,weathermood, speed, name, country, sunset
                };

                setTempInfo(myNewWeatherInfo)
            } catch (error) {
                console.log(error);
            }
         };

        useEffect(() => {
            getWeatherInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
        


  return (
    <>
      <div className="wrap">
        <div className="search">
            <input type="search" placeholder="search..." autoFocus id="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="searchTerm" />
            <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      {/* our temp card */}
      <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Weather;
