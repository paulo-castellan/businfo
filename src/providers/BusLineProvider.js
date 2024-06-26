import { useState } from "react";
import BusLineContext from "../contexts/BusLineContext";

export default function BusLineProvider({ children }) {
  const [busLineState, setBusLineState] = useState("");

  return (
    <BusLineContext.Provider value={[busLineState, setBusLineState]}>
      {children}
    </BusLineContext.Provider>
  );
}
