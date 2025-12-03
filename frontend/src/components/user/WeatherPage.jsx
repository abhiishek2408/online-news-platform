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
    <div className="min-h-screen py-12 px-4 flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white"> 
      <div className="relative max-w-4xl w-full mx-auto rounded-3xl overflow-hidden border-2 shadow-2xl border-purple-800/50 bg-gradient-to-br from-gray-900/70 via-purple-900/60 to-gray-900/40 ring-2 ring-purple-200/40 ring-offset-gray-900 backdrop-blur-[16px] p-0 transition-colors duration-300 text-white" style={{boxShadow: '0 16px 64px 0 rgba(31, 38, 135, 0.45)', border: '2.5px solid rgba(124,58,237,0.22)'}}>
        {/* Premium animated shine overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-white/40 via-purple-200/20 to-gray-900/0 blur-[40px] opacity-70 animate-pulse rounded-b-3xl"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-gradient-to-r from-purple-200/30 via-purple-200/20 to-white/0 blur-[32px] opacity-50 animate-pulse rounded-t-3xl"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-2/3 bg-gradient-to-b from-purple-400/30 via-purple-400/10 to-white/0 blur-[32px] opacity-30 animate-pulse rounded-r-3xl"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-2/3 bg-gradient-to-b from-purple-400/30 via-purple-400/10 to-white/0 blur-[32px] opacity-30 animate-pulse rounded-l-3xl"></div>
        </div>
        {/* Animated highlight overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-white/30 via-purple-200/10 to-gray-900/0 blur-[32px] opacity-60 animate-pulse rounded-b-3xl"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-gradient-to-r from-purple-200/20 via-purple-200/10 to-white/0 blur-[24px] opacity-40 animate-pulse rounded-t-3xl"></div>
        </div>
        {/* Decorative Gradient Circles */}
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] z-0 animate-pulse bg-gradient-to-br from-purple-900/80 via-gray-900/60 to-gray-900/0`}></div>
        <div className={`absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-[120px] z-0 animate-pulse bg-gradient-to-tr from-purple-900/60 via-gray-900/60 to-gray-900/0`}></div>
        {/* Multi-layer glowing border */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-4 border-white/10 shadow-[0_0_60px_20px_rgba(236,72,153,0.18)]"></div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-purple-400/10 shadow-[0_0_40px_10px_rgba(124,58,237,0.10)]"></div>

        <div className="relative z-10 p-10 sm:p-14">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-yellow-400 p-4 rounded-full mb-3 animate-spin-slow">
              <svg className="w-12 h-12 text-white opacity-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 15V7a5 5 0 0110 0v8" />
              </svg>
            </div>
            <h2 className="text-5xl font-extrabold text-center tracking-tight text-white">
              Weather Forecast
            </h2>
            <p className="text-base mt-2 font-medium text-white">Stay updated with the latest weather</p>
          </div>

          {error && <p className="text-white text-sm mb-4 text-center font-semibold">{error}</p>}

          {currentWeather && (
            <div className="relative bg-gradient-to-br rounded-2xl p-10 text-center mb-8 border shadow-2xl backdrop-blur-[16px] transition-colors duration-300 from-purple-900/80 to-gray-900/60 border-purple-800/60 bg-gray-900/30 text-white" style={{boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.28)', border: '2.5px solid rgba(124,58,237,0.22)'}}>
              {/* Animated shine and reflection highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-white/30 blur-[24px] opacity-40 rounded-b-2xl pointer-events-none animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-gradient-to-r from-purple-200/30 via-purple-200/20 to-white/0 blur-[16px] opacity-30 rounded-t-2xl pointer-events-none animate-pulse"></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-2xl font-bold mb-3 text-white"> 
                <span className="inline-flex items-center gap-2">
                  <svg className="w-7 h-7 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9A7 7 0 015.05 4.05z" /></svg>
                  {currentWeather.name}
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 011.42-1.42l.7.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 01-1.42-1.42l.7-.7a1 1 0 011.42 1.42l-.7.7z" /></svg>
                  {currentWeather.weather[0].description}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-4">
                <span className="text-7xl font-extrabold text-white"> 
                  {currentWeather.main.temp}&deg;C
                </span>
                <span className="flex flex-col items-center text-white"> 
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                  <span className="text-base font-semibold">Humidity: {currentWeather.main.humidity}%</span>
                </span>
              </div>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-6 text-center tracking-wide text-white"> 
                3-Day Forecast
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 z-10 relative">
                {forecast.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center bg-gradient-to-br rounded-2xl p-6 border shadow-xl z-20 transition-colors duration-300 from-purple-900/80 via-gray-900/60 to-gray-900/40 border-purple-800/80 bg-gray-900/20 backdrop-blur-[12px] text-white"
                    style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', border: '2px solid rgba(124,58,237,0.18)'}}
                  >
                    {/* Animated highlight */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-white/30 blur-[16px] opacity-40 rounded pointer-events-none animate-pulse"></div>
                    <div className="font-semibold text-lg mb-2 text-white"> 
                      {new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-base mb-2 capitalize text-white">{item.weather[0].description}</div>
                    <div className="text-4xl font-bold mb-2 text-white">{item.main.temp}&deg;C</div>
                    <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42-1.42l.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 01-1.42 1.42l-.7-.7a1 1 0 011.42-1.42l.7.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 01-1.42-1.42l.7-.7a1 1 0 011.42 1.42l-.7.7z"/></svg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showSearch && (
            <div className="mt-8 flex gap-2 items-center justify-center">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name"
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm placeholder-purple-400 transition-colors duration-300 border-purple-800 bg-gray-900/40 focus:ring-purple-700 text-white placeholder-white backdrop-blur-[8px] shadow-inner"
                style={{boxShadow: '0 2px 12px 0 rgba(124,58,237,0.18)', border: '2px solid rgba(236,72,153,0.18)'}}
              />
              <button
                onClick={getCityWeather}
                className="bg-gradient-to-r text-white px-5 py-2 rounded-lg text-sm font-bold shadow-xl transition-all duration-200 from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-700 backdrop-blur-[6px] border border-purple-700/30"
                style={{boxShadow: '0 2px 12px 0 rgba(236,72,153,0.22)', border: '2px solid rgba(236,72,153,0.18)'}}
              >
                Search
              </button>
            </div>
          )}

          {!showSearch && (
            <div className="mt-6 text-sm text-center">
              <button
                onClick={() => setShowSearch(true)}
                className="font-semibold hover:underline transition-colors duration-200 text-white hover:text-yellow-300"
              >
                <span className="inline-flex items-center gap-1">🔍 <span>Search by city</span></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
