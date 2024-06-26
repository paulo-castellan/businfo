import { Circle, Marker } from "react-native-maps";
import personMarker from "../../../assets/personIcon64px.png";
import BusPositions from "../BusPositions";
import BusLineRoute from "../BusLineRoute";
import BusStops from "../BusStops";
import { useContext } from "react";
import BusLineContext from "../../contexts/BusLineContext";
import LocationForBusStopsContext from "../../contexts/LocationForBusStopsContext";

export default function MapFeatures() {
  const [busLineContext] = useContext(BusLineContext);
  const [locationForBusStops] = useContext(LocationForBusStopsContext);
  return (
    <>
      <Circle center={locationForBusStops} radius={1000} strokeWidth={1} />
      <Marker coordinate={locationForBusStops} icon={personMarker} />
      <BusStops />
      {busLineContext !== "" && (
        <>
          <BusPositions />
          <BusLineRoute />
        </>
      )}
    </>
  );
}
