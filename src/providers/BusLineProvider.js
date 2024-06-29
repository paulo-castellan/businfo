import { useState } from "react";
import BusLineContext from "../contexts/BusLineContext";

export default function BusLineProvider({ children }) {
  const [chosenBusLine, setChosenBusLine] = useState("");

  return (
    <BusLineContext.Provider value={{ chosenBusLine, setChosenBusLine }}>
      {children}
    </BusLineContext.Provider>
  );
}
