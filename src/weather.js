import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_API_KEY`
        );
        const data = response.data.list.map((item) => item.main.temp);
        setChartData({
          labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
          datasets: [
            {
              label: "Temperature",
              data,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, [city]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target.city.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>
      {weatherData.main && (
        <div>
          <h1>{weatherData.name}</h1>
          <h2>{weatherData.main.temp}°C</h2>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
      {chartData.datasets && (
        <div>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Weather;
