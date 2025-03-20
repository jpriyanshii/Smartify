import React, { useState, useEffect } from 'react';

const NearbyPlacesApp = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = '1358d9914bec4f23a30b1765e57f1f67';

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);
          setLocation({ latitude: lat, longitude: lon });
          fetchWeather(lat, lon);
          fetchPlaces(lat, lon);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          setError(`Location error: ${error.message}`);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation not supported by your browser.');
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) {
      setError('Unable to fetch weather data.');
    }
  };

  const fetchPlaces = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.foursquare.com/v3/places/nearby?ll=${lat},${lon}`, {
        headers: {
          Authorization: 'fsq3ly+xq2rS1yBlm4R+5gilkYaObljBCy9XqTeNEMyeFhA='
        }
      });
      const data = await response.json();
      setPlaces(data.results);
    } catch (error) {
      setError('Unable to fetch nearby places.');
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!location || !weather || places.length === 0) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Places To Visit Nearby</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {places.map((place) => (
          <div key={place.fsq_id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{place.name}</h2>
            <p>Category: {place.categories?.[0]?.name || 'N/A'}</p>
            <p>Distance: {(place.distance / 1000).toFixed(2)} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlacesApp;