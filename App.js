import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import BusLineProvider from "./src/providers/BusLineProvider";
import UserLocationProvider from "./src/providers/UserLocationProvider";
import Screens from "./src/screens/screens";
import LocationForBusStopsProvider from "./src/providers/LocationForBusStopsProvider";

export default function App() {
  return (
    <NavigationContainer>
      <UserLocationProvider>
        <LocationForBusStopsProvider>
          <BusLineProvider>
            <PaperProvider>
              <Screens />
            </PaperProvider>
          </BusLineProvider>
        </LocationForBusStopsProvider>
      </UserLocationProvider>
    </NavigationContainer>
  );
}
