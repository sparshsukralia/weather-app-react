import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  // API to get the weather data
  const api = {
    key: "b132682bc64db89c5abca0d7edd8193f",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  // function runs when we hit enter in the search field
  const searchPlace = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.url}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((response) => {
          setWeather(response);
          setSearch("");
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
      </div>
    </div>
  );
}

export default App;
