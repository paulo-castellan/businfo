import SearchPage from "../../src/pages/SearchPage";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  searchBuslines,
  getBusLineExtraInfos,
} from "../../src/services/requests/busLines";
import BusLineProvider from "../../src/providers/BusLineProvider";

jest.mock("../../src/services/requests/busLines");

const mockedExtraInfoResponse = ["18:37", "18:43", "18:49"];
const mockedBusLinesResponse = [
  {
    properties: {
      linha: "0.116",
      nome: "Rodoviária do Plano Piloto / W3 - L2 Norte",
      preco: 3.8,
      operadora: "VIAÇÃO PIRACICABANA - BACIA 01",
    },
  },
];

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        id: "123",
      },
    }),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<SearchPage/>", () => {
  it("User searchs for busline with 3 characters", async () => {
    searchBuslines.mockResolvedValue(mockedBusLinesResponse);
    getBusLineExtraInfos.mockResolvedValue(mockedExtraInfoResponse);

    const { getByPlaceholderText, getByText } = render(
      <BusLineProvider>
        <SearchPage />
      </BusLineProvider>,
    );

    const searchBarInput = getByPlaceholderText("Número ou nome da linha");
    fireEvent.changeText(searchBarInput, "116");

    const buslineName = await waitFor(
      () => getByText("Rodoviária do Plano Piloto / W3 - L2 Norte"),
      { timeout: 2000 },
    );
    expect(buslineName).toBeTruthy();
  });

  it("User searchs for busline with two characters", async () => {
    const { getByPlaceholderText } = render(
      <BusLineProvider>
        <SearchPage />
      </BusLineProvider>,
    );

    const searchBarInput = getByPlaceholderText("Número ou nome da linha");
    fireEvent.changeText(searchBarInput, "11");

    expect(searchBuslines).not.toHaveBeenCalled();
    expect(getBusLineExtraInfos).not.toHaveBeenCalled();
  });
});
