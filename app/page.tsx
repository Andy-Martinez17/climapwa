"use client";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { getWeatherByCity, getWeatherByCoords } from "@/lib/weather";
import InstallPrompt from "./component/InstallPromt";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Recuperar el último clima guardado
  useEffect(() => {
    try {
      const cachedWeather = localStorage.getItem("last_weather");
      if (cachedWeather) {
        const parsed = JSON.parse(cachedWeather);
        if (parsed && parsed.main) {
          setWeather(parsed);
        }
      }
    } catch (err) {
      console.error("Error al recuperar el clima:", err);
      localStorage.removeItem("last_weather");
    }
  }, []);

  // Ejecutar petición a la API
  const executeFetch = async (apiCall: () => Promise<any>) => {
    setLoading(true);
    setError("");

    try {
      const data = await apiCall();

      if (data && data.cod && Number(data.cod) !== 200) {
        throw new Error(data.message || "No se pudo obtener el clima.");
      }

      setWeather(data);
      localStorage.setItem("last_weather", JSON.stringify(data));
    } catch (err: any) {
      setError(err?.message || "Error al obtener datos del clima.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Buscar clima por ciudad
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;

    executeFetch(() => getWeatherByCity(city.trim()));
  };

  // Obtener ubicación actual
  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await executeFetch(() => getWeatherByCoords(latitude, longitude));
      },
      () => {
        setLoading(false);
        setError("No se pudo obtener tu ubicación. Verifica los permisos.");
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      {/* Encabezado */}
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-sky-400">WeatherPWA</h1>
        <InstallPrompt />
      </header>

      {/* Controles de búsqueda y ubicación */}
      <section className="w-full max-w-md space-y-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Ejemplo: Oaxaca, Madrid..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Buscar
          </button>
        </form>

        <button
          onClick={handleGeoLocation}
          disabled={loading}
          className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 py-2 rounded-lg text-sm text-sky-400 font-medium transition-colors"
        >
          📍 Usar mi ubicación actual
        </button>
      </section>

      {/* Indicadores de estado */}
      {loading && (
        <p className="text-slate-400 animate-pulse">
          Cargando datos del clima...
        </p>
      )}

      {error && (
        <p className="text-red-400 font-medium bg-red-950/50 p-3 rounded-lg border border-red-800">
          {error}
        </p>
      )}

      {/* Tarjeta con los datos del clima */}
      {weather && weather.main && !loading && (
        <article className="w-full max-w-md bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl text-center space-y-4">
          <h2 className="text-3xl font-bold">
            {weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ""}
          </h2>

          <div className="flex justify-center items-center gap-2">
            {weather.weather?.[0]?.icon && (
              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0]?.description || "Clima"}
                width={80}
                height={80}
                priority
              />
            )}

            {typeof weather.main?.temp === "number" && (
              <span className="text-5xl font-extrabold">
                {Math.round(weather.main.temp)}°C
              </span>
            )}
          </div>

          {weather.weather?.[0]?.description && (
            <p className="capitalize text-slate-300">
              {weather.weather[0].description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700 text-sm">
            <div>
              Humedad:{" "}
              <strong className="text-white">
                {weather.main?.humidity ?? 0}%
              </strong>
            </div>

            <div>
              Viento:{" "}
              <strong className="text-white">
                {weather.wind?.speed ?? 0} m/s
              </strong>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}