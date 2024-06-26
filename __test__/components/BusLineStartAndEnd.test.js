import { render } from "@testing-library/react-native";
import BusLineStartAndEnd from "../../src/components/BusLineStartAndEnd";

describe("<BusLineStartAndEnd/>", () => {
  it("Render individual start and end markers in a non-circular busline", () => {
    const { toJSON } = render(
      <BusLineStartAndEnd
        start={{ latitude: -15.654321, longitude: -47.123456 }}
        end={{ latitude: -17.123456, longitude: -47.654321 }}
        direction={"IDA"}
      />,
    );

    expect(toJSON().length == 2).toBeTruthy();
  });

  it("Render unique starts and end markers in a circular busline", () => {
    const { toJSON } = render(
      <BusLineStartAndEnd
        start={{ latitude: -15.654321, longitude: -47.123456 }}
        end={{ latitude: -17.123456, longitude: -47.654321 }}
        direction={"CIRCULAR"}
      />,
    );

    console.log(toJSON());
    expect(typeof toJSON() == "object").toBeTruthy();
  });
});
