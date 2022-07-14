import React, { useState } from 'react';
import './styles/app.css';
import axios from 'axios';

function App() {

  const API_KEY =  process.env.REACT_APP_API_KEY;
  const URL = "http://api.openweathermap.org/data/2.5/";

  const [weather, setWeather] = useState({});
  const [search, setSearch] = useState("");

  const searchbox = (event) => {

    if (event.key === "Enter") {

      axios.get(`${URL}weather?q=${search}&units=metric&APPID=${API_KEY}`)
      .then(response => response.data)
      .then(result => {

        setSearch("");
        setWeather(result);
        console.log(result);

      })
      .catch(error => console.log(error))

    }

  }

  const dateFinder = (date) => {

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${ days[date.getDay()] } ${ date.getDate() } ${ months[date.getMonth()] }`;

  }

  const date = dateFinder(new Date());

  const getWeather = (w) => {

    return ("sys" in weather) ? (Math.floor(weather.main.temp) > 17) ? "App warm-weather" : "App" : "App";

  }

  return (
    <div className={ getWeather(weather) }>
      <div className="weather__container">
        <div className="searchbox">
          <input type="text" className="searchbar" placeholder="Search city" onChange = { e => setSearch(e.target.value) } value = { search } onKeyPress = { searchbox } />
        </div>
        { ("sys" in weather) ? (
          <>
            <div className="city__container">
              <div className="city">
                { weather.name }, { weather.sys.country }
              </div>
              <div className="date">
                { date }
              </div>
            </div>
            <div className="weather">
              <div className="temperature">
                { Math.floor(weather.main.temp) } °C
              </div>
              <div className="meteorology">
                { weather.weather[0].main }
              </div>
            </div>
          </>
        ) : ""}
      </div>
    </div>
  );
}

export default App;
