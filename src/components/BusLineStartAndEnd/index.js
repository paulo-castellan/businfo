import { Marker } from "react-native-maps";
import routeStart from "../../../assets/busStart64px.png";
import routeEnd from "../../../assets/busEnd64px.png";

export default function BusLineStartAndEnd({ start, end, direction }) {
  return (
    <>
      {direction === "CIRCULAR" ? (
        <Marker
          coordinate={{
            latitude: start.latitude,
            longitude: start.longitude,
          }}
          zIndex={2}
        />
      ) : (
        <>
          <Marker
            coordinate={{
              latitude: start.latitude,
              longitude: start.longitude,
            }}
            image={routeStart}
            zIndex={2}
          />
          <Marker
            coordinate={{
              latitude: end.latitude,
              longitude: end.longitude,
            }}
            image={routeEnd}
            zIndex={2}
          />
        </>
      )}
    </>
  );
}
