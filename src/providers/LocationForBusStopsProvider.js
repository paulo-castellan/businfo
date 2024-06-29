import { useState, useContext, useEffect } from "react";
import LocationForBusStopsContext from "../contexts/LocationForBusStopsContext";
import UserLocationContext from "../contexts/UserLocationContext";

export default function LocationForBusStopsProvider({ children }) {
  const { userLocation } = useContext(UserLocationContext);
  const [locationForBusStops, setLocationForBusStops] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  });

  useEffect(() => {
    setLocationForBusStops({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  }, [userLocation]);

  return (
    <LocationForBusStopsContext.Provider
      value={{ locationForBusStops, setLocationForBusStops }}
    >
      {children}
    </LocationForBusStopsContext.Provider>
  );
}
