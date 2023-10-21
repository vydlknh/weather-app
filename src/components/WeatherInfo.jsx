import { useEffect, useState } from 'react'
import '../App.css'
const API_KEY = "0dbb0799c8e04ca9a7ca3ebe9cff7ae8";

const WeatherInfo = ({day, icon, desc, low, high}) => {
  const [date, setDate] = useState(null);

  useEffect (() => {
    const getWeatherInfo = async () => {
      const response = await fetch (
        `https://api.weatherbit.io/v2.0/forecast/daily?city=Chicago,IL&key=${API_KEY}`
      )
      const data = await response.json();
      setDate(data)
    }
    getWeatherInfo().catch(console.error)
  }, [date])

  return (
    <>
      {date ? (
        <li className="main-list" key={day}>
          {day}
          <img 
            src={`https://cdn.weatherbit.io/static/img/icons/${icon}.png`}
            alt={`Small icon for ${desc}`}
            className="icon" />
            {low}°C - {high}°C
            <p>{desc}</p>
        </li>
      ) : null
      }
    </>
  )
}

export default WeatherInfo