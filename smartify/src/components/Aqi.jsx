import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../store/latlongSlice";
import { FaRegFaceGrinBeam, FaRegFaceSmileBeam, FaRegFaceSmile, FaRegFaceSadTear, FaRegFaceSadCry } from "react-icons/fa6";
import aqi1 from '../assets/aqi1.jpg';
import aqi2 from "../assets/aqi2.webp";
import aqi3 from "../assets/aqi3.webp";
import aqi4 from "../assets/aqi4.webp";
import aqi5 from "../assets/aqi5.webp";
import aqiChart from '../assets/aqiChart.png';

function Aqi({ styles }) {
  const [aqiscore, setaqiscore] = useState(0);
  const [color, setcolor] = useState("text-white");
  const [quality, setquality] = useState("Loading...");
  const [emoji, setemoji] = useState(null);
  const [image, setimage] = useState(null);
  const [recommendations, setrecommendations] = useState([]);
  const [CO, setCO] = useState(0);
  const [NO, setNO] = useState(0);
  const [NO_2, setNO_2] = useState(0);
  const [O_3, setO_3] = useState(0);
  const [SO_2, setSO_2] = useState(0);
  const [NH_3, setNH_3] = useState(0);
  const [pm10, setpm10] = useState(0);
  const [pm2_5, setpm2_5] = useState(0);
  const dispatch = useDispatch();
  const { lat, lon } = useSelector((state) => state.latlong);
  const API_key = "540c20df6282dc94ea35ff28a407f44b";

  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const aqiValue = data.list[0].main.aqi;
        setaqiscore(aqiValue);
        setCO(data.list[0].components.co);
        setNO(data.list[0].components.no);
        setNO_2(data.list[0].components.no2);
        setO_3(data.list[0].components.o3);
        setSO_2(data.list[0].components.so2);
        setpm2_5(data.list[0].components.pm2_5);
        setpm10(data.list[0].components.pm10);
        setNH_3(data.list[0].components.nh3);
      } catch (error) {
        console.error("Got this error: ", error);
      }
    };
    fetchdata();
  }, [lat, lon, API_key]);

  useEffect(() => {
    const aqiLevels = {
      1: { color: "text-green-600", quality: "Good", emoji: <FaRegFaceGrinBeam />, image: aqi1, recommendations: ["Enjoy outdoor activities!", "Keep windows open for fresh air."] },
      2: { color: "text-yellow-600", quality: "Fair", emoji: <FaRegFaceSmileBeam />, image: aqi2, recommendations: ["Sensitive groups should limit outdoor activity.", "Use an air purifier indoors."] },
      3: { color: "text-orange-600", quality: "Moderate", emoji: <FaRegFaceSmile />, image: aqi3, recommendations: ["Limit outdoor activities.", "Wear a mask if necessary."] },
      4: { color: "text-red-600", quality: "Poor", emoji: <FaRegFaceSadTear />, image: aqi4, recommendations: ["Avoid prolonged outdoor exposure.", "Use an N95 mask outside."] },
      5: { color: "text-red-800", quality: "Very Poor", emoji: <FaRegFaceSadCry />, image: aqi5, recommendations: ["Stay indoors as much as possible.", "Use air purifiers and close windows."] },
    };
    
    const { color, quality, emoji, image, recommendations } = aqiLevels[aqiscore] || aqiLevels[1];
    setcolor(color);
    setquality(quality);
    setemoji(emoji);
    setimage(image);
    setrecommendations(recommendations);
  }, [aqiscore]);

    return (
      <div className="flex flex-wrap md:flex-row gap-4 items-start">
        {/* Images Section */}
       <div className="flex flex-col gap-3">

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`${styles} flex-grow flex justify-center items-center p-4`}>
            <img src={image} alt="AQI level" className="h-40 w-40 md:h-48 md:w-48" />
          </div>
          <div className={`${styles} flex-grow flex justify-center items-center p-4`}>
            <img src={aqiChart} alt="AQI chart" className="h-40 w-40 md:h-48 md:w-48" />
          </div>
        </div>
        <div className={`${styles} flex-grow p-4`}>
          <strong>Recommendations:</strong>
          <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
       </div>

    
        {/* AQI Details Section */}
        <div className={`${styles} flex-grow p-4`}>
          <div className="flex gap-2 justify-center items-center mb-2">
            <p>Air Quality is <strong className={color}>{quality}</strong></p>
            <p className={`${color} text-4xl`}>{emoji}</p>
          </div>
          <table className="border-collapse border border-gray-400 w-full text-center text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 px-2 py-1">Pollutant</th>
                <th className="border border-gray-400 px-2 py-1">Conc. (µg/m³)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['CO', CO], ['NO₂', NO_2], ['O₃', O_3], ['SO₂', SO_2],
                ['PM2.5', pm2_5], ['PM10', pm10], ['NO', NO], ['NH₃', NH_3]
              ].map(([label, value], index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-2 py-1">{label}</td>
                  <td className="border border-gray-400 px-2 py-1">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        {/* Recommendations Section */}
       
      </div>
    );
  }
export default Aqi;