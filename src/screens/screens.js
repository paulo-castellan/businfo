import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapPage from "../pages/MapPage";
import SearchPage from "../pages/SearchPage";
import { IconButton } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default function Screens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "beside-icon",
        tabBarShowLabel: false,
        tabBarStyle: [{ backgroundColor: "#eee000" }],
      }}
    >
      <Tab.Screen
        name="MapPage"
        component={MapPage}
        options={{
          headerShown: false,
          title: "Paradas",
          tabBarShowLabel: false,
          tabBarBadgeStyle: {
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          },
          tabBarIcon: () => {
            return <IconButton icon="bus-stop" size={38} iconColor="#000" />;
          },
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          headerShown: false,
          title: "Buscar Linhas",
          tabBarIcon: () => {
            return <IconButton icon="magnify" size={38} iconColor="#000" />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
