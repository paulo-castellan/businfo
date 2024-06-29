import { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import UserLocationContext from "../../contexts/UserLocationContext";
import LocationForBusStopsContext from "../../contexts/LocationForBusStopsContext";
import MapFeatures from "../MapFeatures";

export default function MapScreen() {
  const { userLocation } = useContext(UserLocationContext);
  const { setLocationForBusStops } = useContext(LocationForBusStopsContext);

  const handleChangeRegion = (params) => {
    setLocationForBusStops(params);
  };

  return (
    <View>
      <MapView
        zoomControlEnabled
        zoomEnabled
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapPadding={{ bottom: 25 }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onLongPress={(e) => handleChangeRegion(e.nativeEvent.coordinate)}
      >
        <MapFeatures />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 70,
  },
});
