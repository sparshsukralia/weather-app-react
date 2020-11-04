import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  // API to get the weather data
  const api = {
    key: "b132682bc64db89c5abca0d7edd8193f",
    url: "https://api.openweathermap.org/data/2.5/",
    forecast: "https://api.openweathermap.org/data/2.5/forecast/",
  };

  useEffect(() => {
    fetch(`${api.url}weather?q=London&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((response) => {
        setWeather(response);
        console.log(response);
      });
  }, []);

  // function runs when we hit enter in the search field
  const searchPlace = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.url}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setSearch("");
          // console.log(response);
        });
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <h2>Weather Today</h2>

        <input
          type="text"
          placeholder="Search a place..."
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          onKeyPress={searchPlace}
        />
        {typeof weather.main != "undefined" ? (
          <div className="app__weatherInfo">
            <div className="weatherInfo__city">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="weatherInfo__date">{new Date().toDateString()}</div>

            <div className="weatherInfo__description">
              <div className="weatherInfo__icon">
                <div className="icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
                <div className="weatherInfo__weather">
                  {weather.weather[0].main}
                </div>
              </div>
              <div className="weatherInfo__temp">
                {Math.round(weather.main.temp)}
                <span className="weatherInfo__tempSpan">°c</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
