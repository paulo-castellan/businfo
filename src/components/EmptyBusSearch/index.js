import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import BusRouteImage from "../../../assets/busRoute256px.png";

export default function EmptyBusSearch() {
  return (
    <View style={styles.emptyBusLine}>
      <Image source={BusRouteImage} style={styles.busImage} />
      <Text style={styles.emptySearchMessage}>Procure por Linha ou Número</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptySearchMessage: {
    margin: 36,
    fontSize: 24,
    textAlign: "center",
  },
  busImage: {
    marginTop: 150,
    alignSelf: "center",
  },
});
