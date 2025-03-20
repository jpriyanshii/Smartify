import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../store/latlongSlice";

const PlacesFetch = ({ styles }) => {
  const [weather, setWeather] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { lat, lon } = useSelector((state) => state.latlong);
  const dispatch = useDispatch();

  const WEATHER_API_KEY = "1358d9914bec4f23a30b1765e57f1f67";
  const PLACES_API_KEY = "fsq3ly+xq2rS1yBlm4R+5gilkYaObljBCy9XqTeNEMyeFhA=";

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
      fetchWeather();
      fetchPlaces();
  }, [lat, lon]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.error(error);
      setError("Unable to fetch weather data.");
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v3/places/nearby?ll=${lat},${lon}`,
        {
          headers: {
            Authorization: PLACES_API_KEY,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch places data");
      const data = await response.json();
      setPlaces(data.results || []);
    } catch (error) {
      console.error(error);
      setError("Unable to fetch nearby places.");
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!weather || places.length === 0) return <div>Loading...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:  "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {places.map((place) => (
          <div
            className={styles}
            key={place.fsq_id}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {place.name}
            </h2>
            <p>Category: {place.categories?.[0]?.name || "N/A"}</p>
            <p>Distance: {(place.distance / 1000).toFixed(2)} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesFetch;
