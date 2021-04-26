import React,{useEffect, useState} from 'react';
import './App.css';

const api= {
  key: "852ec9cd698e2519e9413d1564d15d25",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('bengaluru');
  const [weather, setWeather] = useState({});

  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then (result => {
        setQuery('');
        setWeather(result);
        console.log(result);
      });
    }
  }

  useEffect(()=>{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then (result => {
        setQuery('');
        setWeather(result);
        console.log(result);
      });
  }, []);

  const dateBuilder= (d) => {
    let months=["January", "February", "march", "April", "May", "June", "july", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

    let day= days[d.getDay()];
    let date= d.getDate();
    let month = months[d.getMonth()];
    let year= d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined')? (((weather.main.temp) > 16)? 'app-warm': 'app'): 'app'}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main !='undefined') ? (
          <div>
            <div className="location-box">
            <div className="location">{weather.name} {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
                {Math.round(weather.main.temp)}°c
            </div>
            <div className="max_min">
              {Math.round(weather.main.temp_max)}/{Math.round(weather.main.temp_min)}
            </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
           <img src="/humidity.png" /> <div className="humidity">Humidity: {weather.main.humidity}%</div>
            <div className="visibility">Visibility: {weather.visibility}m</div>
            <div className="feels-like">feels like : {Math.round(weather.main.feels_like)}°c</div>
            <div className="wind">wind speed: {weather.wind.speed}m/s </div>
          </div>
        <div>
      </div>
    </div>
        ): ('')
      }
          
      </main>
    </div>
  );
}

export default App;
