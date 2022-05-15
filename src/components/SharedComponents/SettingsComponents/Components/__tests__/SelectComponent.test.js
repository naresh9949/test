import SelectComponent from "../SelectComponent";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });
const options = [
  {
    PrinterDisplayName: "printer1",
  },
  {
    PrinterDisplayName: "printer2",
  },
];
test("Renders SelectComponent component without crashing", async () => {
  render(
    <SelectComponent
      options={options}
      name="Laser Printers"
      label="Laser Printers"
    />
  );
});

test("SelectComponent contains correct name and label", async () => {
  render(
    <SelectComponent
      options={options}
      name="Laser Printers"
      label="Laser Printers"
    />
  );
  expect(screen.getByRole("button", { name: /Laser Printers ​/i }))
    .toBeInTheDocument;
});

test("SelectComponent shows correct value based on the given prop value", async () => {
  render(
    <SelectComponent
      options={options}
      name="Laser Printers"
      label="Laser Printers"
      value={"printer2"}
    />
  );
  expect(screen.getByText("printer2")).toBeInTheDocument;
});

test("SelectComponent component onChange changes the data", async () => {
  const func = jest.fn();
  const wrapper = shallow(
    <SelectComponent
      options={options}
      name="Laser Printers"
      label="Laser Printers"
      value={"printer2"}
      handler={func}
    />
  );

  wrapper.find("#select").simulate("change", { target: { value: "printer1" } });
  expect(func).toBeCalledTimes(1);
});
