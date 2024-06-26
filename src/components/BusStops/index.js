import BusStop from "../BusStop";
import { useContext, useEffect, useState } from "react";
import { getSurroundingBusStops } from "../../services/requests/busLines";
import LocationForBusStopsContext from "../../contexts/LocationForBusStopsContext";

export default function BusStops() {
  const [busStops, setBusStops] = useState([]);
  const [locationForBusStopsState] = useContext(LocationForBusStopsContext);

  useEffect(() => {
    async function busStops() {
      const response = await getSurroundingBusStops(locationForBusStopsState);
      setBusStops(response);
    }
    console.log("Requesting busStops....");
    busStops();
  }, [locationForBusStopsState]);

  if (!busStops.length) return;

  return busStops.map(({ coordinates, properties }) => {
    return (
      <BusStop
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
        title={properties.title}
        description={properties.description}
        key={properties.title}
      />
    );
  });
}
