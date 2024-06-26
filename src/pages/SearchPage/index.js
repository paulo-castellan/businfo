import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import {
  getBusLineExtraInfos,
  searchBuslines,
} from "../../services/requests/busLines";
import BusLineInfo from "../../components/BusLineInfo";
import EmptyBusSearch from "../../components/EmptyBusSearch";

export default function SearchPage() {
  const [inputText, setInputText] = useState("");
  const [busLines, setBusLines] = useState([]);
  const [extraInfos, setExtraInfos] = useState("");

  useEffect(() => {
    let timeoutId;
    async function busList() {
      timeoutId = setTimeout(async () => {
        const busLines = await searchBuslines(inputText);
        const infos = await getBusLineExtraInfos(inputText);
        setBusLines(busLines);
        setExtraInfos(infos);
      }, 100);
    }
    inputText.length > 2 ? busList() : setBusLines([]);
    return () => clearTimeout(timeoutId);
  }, [inputText]);

  return (
    <View style={styles.fullScreen}>
      <Searchbar
        placeholder="Número ou nome da linha"
        onChangeText={setInputText}
        icon={"magnify"}
        mode="view"
      />
      <FlatList
        data={busLines}
        keyExtractor={(item) => `${item.linha}#${item.id}`}
        ListEmptyComponent={<EmptyBusSearch />}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          return (
            <BusLineInfo
              number={item.properties.linha}
              name={item.properties.nome}
              price={item.properties.tarifa}
              operationCompany={item.properties.operadora}
              extraInfos={
                extraInfos[item.properties.linha]
                  ? extraInfos[item.properties.linha]
                  : []
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    backgroundColor: "#eee",
    zIndex: 3,
  },
});
