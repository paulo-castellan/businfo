import { useState, useEffect } from "react";
import UserLocationContext from "../contexts/UserLocationContext";
import * as Location from "expo-location";

export default function UserLocationProvider({ children }) {
  const [userLocationState, setUserLocationState] = useState({
    latitude: -15.793897840698195,
    longitude: -47.882576742173946,
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let localization = await Location.getCurrentPositionAsync({});
      setUserLocationState({
        latitude: localization.coords.latitude,
        longitude: localization.coords.longitude,
        speed: localization.speed,
      });
    })();
  }, []);

  return (
    <UserLocationContext.Provider
      value={[userLocationState, setUserLocationState]}
    >
      {children}
    </UserLocationContext.Provider>
  );
}
