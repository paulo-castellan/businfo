import { useState, useContext, useCallback } from "react";
import BusPosition from "../BusPosition";
import { getBusesLinePosition } from "../../services/requests/busLines";
import BusLineContext from "../../contexts/BusLineContext";
import { useFocusEffect } from "@react-navigation/native";

export default function BusPositions() {
  const [busLineContext] = useContext(BusLineContext);
  const [busesInfos, setBusesInfos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function busesPositionHandler() {
        const response = await getBusesLinePosition(busLineContext);
        setBusesInfos(response);
      }
      let firstRequest = true;
      if (firstRequest) {
        console.log("First BusLine positions request...");
        busesPositionHandler();
        firstRequest = false;
      }

      const intervalId = setInterval(() => {
        console.log("Requesting BusLine positions...");
        busesPositionHandler();
      }, 1000 * 5);

      return () => clearInterval(intervalId);
    }, [busLineContext]),
  );

  if (!busesInfos.length) return;

  return busesInfos.map(({ properties, id }) => {
    return (
      <BusPosition
        localDate={properties.datalocal}
        latitude={properties.latitude}
        longitude={properties.longitude}
        title={properties.numerolinha}
        key={id}
      />
    );
  });
}
