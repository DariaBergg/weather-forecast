
import './App.css';
import React, {useState} from 'react';

const API_KEY = '776ea4ba49d99f974f0e4a3631ccb94e';
function App() {
  const [userInput, setUserInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  function handleChange(e){
    setUserInput(e.target.value);
  }

  function resetInfo() {
    setWeatherData(null)
  }

 async function searchForecast(e) {
    e.preventDefault();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY}&units=metric`);
    const data =  await response.json();
    setWeatherData(data);
    console.log(data);
    setUserInput('');
  }

  return (
    <div className="App">
      <h1>Weather forecast</h1>
      <form onSubmit={searchForecast}>
        <input value={userInput} type='text' placeholder='write your city' onChange={handleChange}></input>
        <button type='submit'>search</button>
      </form>
      {weatherData && (
        <div className='forecast-box'>
        <button className='close-btn' onClick={resetInfo}>x</button>
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        {weatherData.weather[0].icon && (
      <img className='img'
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt="Weather Icon"
      />
    )}
        <div className='forecast-info'>
        <p className='temp'>{Math.round(weatherData.main.temp)} °C</p>
        <p>Feels like {Math.round(weatherData.main.feels_like)} °C </p>
        <p>Humidity {Math.round(weatherData.main.humidity)} %</p>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
