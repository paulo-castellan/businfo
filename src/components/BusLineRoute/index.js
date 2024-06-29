import { useState, useEffect, useContext } from "react";
import { getBusLineRoute } from "../../services/requests/busLines";
import { Marker, Polyline } from "react-native-maps";
import BusLineContext from "../../contexts/BusLineContext";
import BusLineStartAndEnd from "../BusLineStartAndEnd";
import arrow from "../../../assets/arrow16px.png";
import { distance } from "@turf/distance";
import { bearing } from "@turf/bearing";

export default function BusLineRoute() {
  const { chosenBusLine } = useContext(BusLineContext);
  const [busRoute, setBusRoute] = useState([]);
  const [busLineDirection, setBusLineDirection] = useState("");

  useEffect(() => {
    async function Route() {
      const busRouteInfos = await getBusLineRoute(chosenBusLine);
      setBusRoute(busRouteInfos.coordinatesWGS);
      setBusLineDirection(busRouteInfos.direction);
    }
    Route();
  }, [chosenBusLine]);
  if (!busRoute.length) return;

  function filteredArrowMakers(polyline) {
    let filteredPoints = [];

    polyline.forEach((point, index) => {
      if (!filteredPoints.length == 0) {
        const distanceInKm = distance(
          [
            filteredPoints[filteredPoints.length - 1].longitude,
            filteredPoints[filteredPoints.length - 1].latitude,
          ],
          [point.longitude, point.latitude],
        );
        if (distanceInKm < 0.5) return;
      }
      const bearingInDegree = bearing(
        [point.longitude, point.latitude],
        [polyline[index + 1].longitude, polyline[index + 1].latitude],
      );
      filteredPoints.push({
        latitude: point.latitude,
        longitude: point.longitude,
        rotation: bearingInDegree,
      });
    });
    return filteredPoints;
  }

  return (
    <>
      <BusLineStartAndEnd
        start={busRoute[0]}
        end={busRoute[busRoute.length - 1]}
        direction={busLineDirection}
      />
      {filteredArrowMakers(busRoute).map((marker) => {
        return (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={arrow}
            rotation={marker.rotation}
            zIndex={3}
          />
        );
      })}
      <Polyline
        strokeWidth={6}
        coordinates={busRoute}
        strokeColor={"rgba(255,0,0,0.5)"}
      />
    </>
  );
}
