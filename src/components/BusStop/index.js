import { Marker } from "react-native-maps";
import busStop from "../../../assets/busStop32px.png";

export default function BusStop({ latitude, longitude, title, description }) {
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={`Parada: ${title}`}
      description={description}
      pinColor={"#133337"}
      image={busStop}
    />
  );
}
