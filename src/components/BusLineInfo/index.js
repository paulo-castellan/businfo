import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import BusLineContext from "../../contexts/BusLineContext";

const BUS_COMPANY_COLORS = {
  PIRACICABANA: { backgroundColor: "rgba(0, 127, 2, 0.5)" },
  PIONEIRA: { backgroundColor: "rgba(232, 232, 0, 0.5)" },
  URBI: { backgroundColor: "rgba(123, 227, 255, 0.5)" },
  MARECHAL: { backgroundColor: "rgba(255, 131, 0, 0.5)" },
};
export default function BusLineInfo({
  number,
  name,
  price,
  operationCompany,
  extraInfos,
}) {
  const navigation = useNavigation();
  const [, setChoseBusLine] = useContext(BusLineContext);
  const [busLineExtraInfos, setBusLineExtraInfos] = useState("");
  const [bgColor, setBgColor] = useState({
    backgroundColor: "rgba(142,148,152, 0.5)",
  });

  useEffect(() => {
    function startRouteAt() {
      let parsedString = "Saida do Terminal:";
      if (extraInfos) {
        extraInfos.map((hours, index) => {
          if (index == extraInfos.length - 1) {
            parsedString += ` ${hours}`;
          } else {
            parsedString += ` ${hours},`;
          }
        });
        if (extraInfos.length === 0)
          parsedString = "Sem saída programada nas próximas 2h";
      }
      return parsedString;
    }
    setBusLineExtraInfos(startRouteAt());
  }, [extraInfos]);

  useEffect(() => {
    switch (operationCompany) {
      case "VIAÇÃO PIRACICABANA - BACIA 01":
        setBgColor(BUS_COMPANY_COLORS.PIRACICABANA);
        break;
      case "VIAÇÃO PIONEIRA BACIA - 02":
        setBgColor(BUS_COMPANY_COLORS.PIONEIRA);
        break;
      case "URBI - MOBILID. URBANA - BACIA 03":
        setBgColor(BUS_COMPANY_COLORS.URBI);
        break;
      case "AUTO VIAÇÃO MARECHAL - BACIA 04":
        setBgColor(BUS_COMPANY_COLORS.MARECHAL);
        break;
    }
  }, []);

  const currencyFormater = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const busPrice = currencyFormater.format(price);

  const handleChosenBusLine = () => {
    setChoseBusLine(number);
    return navigation.navigate("MapPage");
  };

  return (
    <>
      <View style={styles.busLineInfoContainer}>
        <TouchableOpacity
          style={styles.container}
          onPress={handleChosenBusLine}
          accessibilityHint="Escolha a linha"
        >
          <View style={[styles.busLine, bgColor]} testID="company">
            <Text style={styles.busNumber}>{number}</Text>
          </View>
          <View style={styles.busResumeContainer}>
            <Text style={styles.busLineName}>{name}</Text>
            <Text>{busPrice}</Text>
            <Text>{busLineExtraInfos}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Divider bold />
    </>
  );
}

const styles = StyleSheet.create({
  busLineInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    width: "80%",
  },
  busResumeContainer: {
    width: "85%",
  },
  busLine: {
    alignSelf: "center",
    marginHorizontal: 8,
    borderWidth: 2,
    borderRadius: 10,
    padding: 4,
  },
  moreInfo: {
    alignSelf: "center",
  },
  busNumber: {
    fontWeight: "700",
  },
  busLineName: {
    fontWeight: "bold",
  },
});
