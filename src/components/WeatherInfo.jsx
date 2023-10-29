import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherInfo = ({day, nextday, icon, desc, low, high}) => {
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
      <table>
      <tbody> 
        {date ? (
          <tr className="main-list" key={day}>
            <td>
              {day}
            </td>
            <td>
              <img 
                src={`https://cdn.weatherbit.io/static/img/icons/${icon}.png`}
                alt={`Small icon for ${desc}`}
                className="icon" />
            </td>
            <td>   
              {low}°C - {high}°C
            </td>
            <td>
              <p>{desc}</p>
            </td>
            <td>
            <Link
              to={`/${day}/${nextday}`}
              key={day}>
              More info
            </Link>
            </td>
          </tr>
        ) : null
        }
        </tbody>
      </table>
      {/* {date ? (
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
      } */}
    </>
  )
}

export default WeatherInfo