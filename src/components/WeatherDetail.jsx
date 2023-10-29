import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getWeatherDetail = async () => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/history/daily?city=Chicago,IL&start_date=${params.startDate}&end_date=${params.endDate}&key=${API_KEY}`
      )
      const details = await response.json();
      setFullDetails(details); 
    };
    getWeatherDetail().catch(console.error)
  }, [])
    
  return (
    <div>
    {fullDetails ? (
      <div>
        <h2>Location: {fullDetails.city_name}, {fullDetails.state_code}</h2>
        <h2>{fullDetails.data[0].datetime}</h2> 
        <h1>{fullDetails.data[0].min_temp}°C - {fullDetails.data[0].max_temp}°C</h1>
        <br></br>
        <table>
          <tbody> 
            <tr>
              <th>Average pressure</th>
              <td>{fullDetails.data[0].pres}</td>
            </tr>
            <tr>
              <th>Average sea level pressure</th>
              <td>{fullDetails.data[0].slp}</td>
            </tr>
            <tr>
              <th>Average wind speed</th>
              <td>{fullDetails.data[0].wind_spd} m/s</td>
            </tr>
            <tr>
              <th>Average wind direction</th>
              <td>{fullDetails.data[0].wind_dir} °</td>
            </tr>
            <tr>
              <th>Average relative humidity</th>
              <td>{fullDetails.data[0].rh} %</td>
            </tr>
            <tr>
              <th>Average cloud coverage</th>
              <td>{fullDetails.data[0].clouds}°C</td>
            </tr>
            <tr>
              <th>Maximum UV Index </th>
              <td>{fullDetails.data[0].min_temp}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ) : null
    }
    </div>
  );
};

export default WeatherDetail;