import BusLineInfo from "../../src/components/BusLineInfo";
import { render, fireEvent } from "@testing-library/react-native";
import BusLineProvider from "../../src/providers/BusLineProvider";

// Mock do react-navigation, necessário para componentes que renderizam rotas, DEVE ser abstraido posteriormente.
const mockedNavigation = jest.fn();
jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
      dispatch: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        id: "123",
      },
    }),
  };
});
describe("<BusLineInfo/>", () => {
  const mockedBuslineInfo = (operationCompany, extraInfos = []) =>
    render(
      <BusLineProvider>
        <BusLineInfo
          number="0.116"
          name="Rodoviária do Plano Piloto / W3 - L2 Norte"
          price={3.8}
          operationCompany={operationCompany}
          extraInfos={extraInfos}
        />
      </BusLineProvider>,
    );

  it("Display Busline infos and the next three departures", () => {
    const extraInfos = ["18:37", "18:43", "18:49"];
    const operationCompany = "VIAÇÃO PIRACICABANA - BACIA 01";

    const { getByText } = mockedBuslineInfo(operationCompany, extraInfos);

    expect(getByText("0.116")).toBeTruthy();
    expect(
      getByText("Rodoviária do Plano Piloto / W3 - L2 Norte"),
    ).toBeTruthy();

    expect(getByText("R$ 3,80")).toBeTruthy();
    expect(getByText("Saida do Terminal: 18:37, 18:43, 18:49")).toBeTruthy();
  });

  it("Display no departures for busline", () => {
    const operationCompany = "VIAÇÃO PIRACICABANA - BACIA 01";
    const { getByText } = mockedBuslineInfo(operationCompany);
    expect(getByText("Sem saída programada nas próximas 2h")).toBeTruthy();
  });

  it("Display a matching color for each operationCompany => PIRACICABANA", () => {
    const operationCompany = "VIAÇÃO PIRACICABANA - BACIA 01";
    const { getByTestId } = mockedBuslineInfo(operationCompany);

    const busInfoStyles = getByTestId("company").props.style;
    expect(busInfoStyles[1]).toEqual({
      backgroundColor: "rgba(0, 127, 2, 0.5)",
    });
  });

  it("Display a matching color for each operationCompany => PIONEIRA", () => {
    const operationCompany = "VIAÇÃO PIONEIRA BACIA - 02";
    const { getByTestId } = mockedBuslineInfo(operationCompany);

    const busInfoStyles = getByTestId("company").props.style;
    expect(busInfoStyles[1]).toEqual({
      backgroundColor: "rgba(232, 232, 0, 0.5)",
    });
  });

  it("Display a matching color for each operationCompany => URBI", () => {
    const operationCompany = "URBI - MOBILID. URBANA - BACIA 03";
    const { getByTestId } = mockedBuslineInfo(operationCompany);

    const busInfoStyles = getByTestId("company").props.style;
    expect(busInfoStyles[1]).toEqual({
      backgroundColor: "rgba(123, 227, 255, 0.5)",
    });
  });

  it("Display a matching color for each operationCompany => MARECHAL", () => {
    const operationCompany = "AUTO VIAÇÃO MARECHAL - BACIA 04";
    const { getByTestId } = mockedBuslineInfo(operationCompany);

    const busInfoStyles = getByTestId("company").props.style;
    expect(busInfoStyles[1]).toEqual({
      backgroundColor: "rgba(255, 131, 0, 0.5)",
    });
  });

  it("User chose a busLine and is redirect to MapPage", () => {
    const operationCompany = "AUTO VIAÇÃO MARECHAL - BACIA 04";
    const { getByA11yHint } = mockedBuslineInfo(operationCompany);

    const choseBusline = getByA11yHint("Escolha a linha");

    fireEvent.press(choseBusline);
    expect(mockedNavigation).toHaveBeenCalledWith("MapPage");
  });
});
