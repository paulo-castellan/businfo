import { Marker } from "react-native-maps";
import moment from "moment";
import busPosition from "../../../assets/busLocation64px.png";

export default function BusPosition({ localDate, latitude, longitude, title }) {
  const now = moment();
  const dateOfLastPosition = moment(localDate);
  const durationFromLastKnowPosition = moment
    .utc(now.diff(dateOfLastPosition))
    .format("mm:ss");
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={`Linha: ${title}`}
      description={`${durationFromLastKnowPosition} atrás`}
      image={busPosition}
      zIndex={2}
    />
  );
}
