import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocation, setLatLon } from "../store/latlongSlice";
import { useForm } from "react-hook-form";

const Location = () => {
  const dispatch = useDispatch();
  const { lat, lon } = useSelector((state) => state.latlong);
  const [city, setcity] = useState(null);
  const [state, setstate] = useState(null);
  const [country, setcountry] = useState(null);
  const [Error, setError] = useState(null);

  const API_KEY = "1358d9914bec4f23a30b1765e57f1f67";
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    if (lat && lon) {
      fetchLocationName(lat, lon);
    }
  }, [lat, lon]);

  const fetchLocationName = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        setcity(
          components.city ||
            components.town ||
            components.village ||
            components.hamlet ||
            components.suburb ||
            components.locality ||
            components.neighbourhood ||
            ""
        );
        setstate(components.state || components.province || "");
        setcountry(components.country || "");

        if (city === "Unknown City" || state === "Unknown State") {
          setError("Incomplete location data received.");
        }
      } else {
        console.error("No results found in the API response:", data);
        setError("Unable to fetch location name.");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setError("Error fetching location name.");
    }
  };

  const shownotfound = (message) => {
    const items = document.getElementById("items");
    items.innerHTML = message;
    setInterval(() => {
      items.innerHTML = "";
    }, 3000);
  };

  const fetchlatlon = async (data) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=540c20df6282dc94ea35ff28a407f44b`
      );
      const response = await res.json();
      if (response) {
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        dispatch(setLatLon({ lat: parseFloat(lat), lon: parseFloat(lon) }));
      }
    } catch (error) {
      shownotfound("Oops! City Not Found!");
      console.log("ERROR IN LAT LON FETHC CITY", error);
    }
  };

  const onsubmit = (data) => {
    fetchlatlon(data.city.trim());
    reset();
  };

  return (
    <div className="text-center dark:text-white mt-6">
      <p className="mb-1">You are in </p>
      {city || state || country ? (
        <p className="text-3xl font-bold mb-3">
          {city && `${city}, `}
          {state && `${state}, `}
          {country}👋
        </p>
      ) : (
        <p className="text-gray-400 text-lg italic animate-pulse mb-2">
          Fetching your exact location...
        </p>
      )}

<form
  onSubmit={handleSubmit(onsubmit)}
  className="flex gap-2 justify-center items-center mt-4"
>
  <div className="relative flex items-center">
    <input
      type="text"
      placeholder="Search Any City..."
      {...register("city")}
      className="w-60 px-4 py-2 rounded-full bg-white border-b-2 border-t-2 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 shadow-sm transition"
    />
  </div>

  <button
    type="submit"
    className=" text-black hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
  >
    Search
  </button>
</form>

</div>
  );
};

export default Location;