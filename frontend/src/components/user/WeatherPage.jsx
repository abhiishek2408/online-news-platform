import React, { useState, useEffect, useCallback } from "react";

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [error, setError] = useState(null);

  const getForecast = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/weather/forecast?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      const filtered = data.list.filter((_, i) => i % 8 === 0).slice(0, 3);
      setForecast(filtered);
    } catch (err) {
      console.error("Forecast error:", err);
      setError(" Unable to load forecast.");
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/weather/current?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setCurrentWeather(data);
      getForecast(lat, lon);
    } catch (err) {
      console.error("Current weather error:", err);
      setError(" Unable to fetch weather.");
    }
  }, [getForecast]);

  const getCurrentLocationWeather = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchWeatherByCoords(lat, lon);
        },
        (err) => {
          console.warn(err);
          setError(" Unable to access your location. Please allow permission.");
        }
      );
    } else {
      setError(" Your browser doesn't support geolocation.");
    }
  }, [fetchWeatherByCoords]);

  const getCityWeather = async () => {
    if (!cityInput.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(`https://online-news-platform-backend.onrender.com/api/weather/city?q=${cityInput.trim()}`);
      const data = await res.json();
      if (data.cod === 200) {
        setCurrentWeather(data);
        setForecast([]);
      } else {
        setError("City not found.");
      }
    } catch (err) {
      console.error("City weather error:", err);
      setError("Error fetching data.");
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, [getCurrentLocationWeather]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border-t-4 border-purple-600 p-6 relative">
        <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          🌤️ Weather Forecast
        </h2>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        {currentWeather && (
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 text-center shadow-md w-full">
            <div className="flex justify-between text-sm text-purple-700 mb-3">
              <span>📍 {currentWeather.name}</span>
              <span>⛅ {currentWeather.weather[0].description}</span>
            </div>
            <div className="text-4xl font-bold text-purple-800 my-3">
              {currentWeather.main.temp}&deg;C
            </div>
            <div className="text-sm text-purple-700">
              💧 Humidity: {currentWeather.main.humidity}%
            </div>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-purple-800">3-Day Forecast</h4>
            {forecast.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-purple-100 text-purple-800 p-2 my-2 rounded-xl text-sm shadow-sm"
              >
                <div>
                  <div className="font-semibold">
                    {new Date(item.dt_txt).toDateString()}
                  </div>
                  <div className="text-xs">{item.weather[0].description}</div>
                </div>
                <div className="text-base font-bold">{item.main.temp}&deg;C</div>
              </div>
            ))}
          </div>
        )}

        {showSearch && (
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-200 text-sm"
            />
            <button
              onClick={getCityWeather}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
            >
              Search
            </button>
          </div>
        )}

        {!showSearch && (
          <div className="mt-4 text-sm text-center">
            <button
              onClick={() => setShowSearch(true)}
              className="text-purple-600 font-semibold hover:underline"
            >
              🔍 Search by city
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
