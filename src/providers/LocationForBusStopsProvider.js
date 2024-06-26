import { useState, useContext, useEffect } from "react";
import LocationForBusStopsContext from "../contexts/LocationForBusStopsContext";
import UserLocationContext from "../contexts/UserLocationContext";

export default function BusLineProvider({ children }) {
  const [userLocation] = useContext(UserLocationContext);
  const [locationForBusStopsState, setLocationForBusStopsState] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
  });

  useEffect(() => {
    setLocationForBusStopsState({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  }, [userLocation]);

  return (
    <LocationForBusStopsContext.Provider
      value={[locationForBusStopsState, setLocationForBusStopsState]}
    >
      {children}
    </LocationForBusStopsContext.Provider>
  );
}
