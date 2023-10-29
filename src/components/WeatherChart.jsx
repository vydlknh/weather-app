import React, { Component, useEffect, useState } from "react";
import { 
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label } from 'recharts';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherChart = () => {
    const [histData, setHistData] = useState(null);

    useEffect(() => {
      const getWeatherHist = async () => {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/history/daily?city=Chicago,IL&start_date=2023-10-01&end_date=2023-10-28&key=${API_KEY}`
        )
        const json = await response.json();
        setHistData(json);
      };
      getWeatherHist().catch(console.error)
    })
      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              <LineChart
                width={1300}
                height={400}
                data={histData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                />
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="datetime" interval={2} angle={20} dx={20}>
                  <Label value="Date" offset={0} position="insideBottom" />
                </XAxis>

                <YAxis
                  label={{
                    value: "°C",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                  }}
                />
                <Tooltip />
              </LineChart>
            </div>
          ) : null}
        </div>
      );
    
  };

export default WeatherChart;