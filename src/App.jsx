import { useEffect, useState } from 'react'
import './App.css'
import WeatherChart from './components/WeatherChart';
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import WeatherInfo from './components/WeatherInfo'; 

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchTemp = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.data).filter((item) => 
        Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(Object.keys(list.data))
    }
  }

  useEffect (() => {
    const fetchAllWeatherData = async () => {
      const response = await fetch (
        `https://api.weatherbit.io/v2.0/forecast/daily?city=Chicago,IL&key=${API_KEY}`
      );
      const weatherData = await response.json();
      setList(weatherData);
    }
    fetchAllWeatherData().catch(console.error);
  }, [])
  
  return (
    <>
      <div className="whole-page">
        <h1>Weather forecast</h1>
        <input 
          type="text"
          placeholder='Search'
          onChange={(inputString) => searchTemp(inputString.target.value)}/>
        <ul>
          {searchInput.length > 0 
            ? filteredResults.map(([date, nextdate]) => 
              <WeatherInfo
                day={list.data[date].valid_date}
                nextday={list.data[nextdate].valid_date}
                icon={list.data[date].weather.icon}
                desc={list.data[date].weather.description}
                low={list.data[date].low_temp}
                high={list.data[date].high_temp}
              />
            )
          : 
            list && Object.entries(list.data).map(([date]) =>
              <WeatherInfo
              day={list.data[date].valid_date}
              nextday={list.data[date].valid_date}
              icon={list.data[date].weather.icon}
              desc={list.data[date].weather.description}
              low={list.data[date].low_temp}
              high={list.data[date].high_temp}
              />
            )
          }
        </ul>
        <div>
          <h2>October 2023</h2>
          <WeatherChart/>
        </div>
      </div>
    </>
  )
}

export default App
