import WarehouseSettings from "../WarehouseSettings";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Enzyme from "enzyme";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import AxiosMock from "axios";

Enzyme.configure({ adapter: new Adapter() });
const options = [
  {
    FacilityCode: "777",
  },
  {
    FacilityCode: "1210",
  },
];
const user = {
  FacilityCode: 777,
};

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("Renders WarehouseSettings component without crashing", async () => {
  render(<WarehouseSettings user={user} />);
});

test("WarehouseSettings shows the correct user FacilityCode on clicking printers icon", async () => {
  AxiosMock.get.mockResolvedValue({ data: options });

  await act(async () => render(<WarehouseSettings user={user} />));

  await act(async () => {
    userEvent.click(screen.getByRole("button", { name: "" }));
  });

  expect(screen.getByRole("dialog", { name: "Warehouse Settings (777)" }))
    .toBeInTheDocument;
});

test("WarehouseSettings calls Get Warehouses api at once to fetch the FacilityCode Method exactly 1 times", async () => {
  AxiosMock.get.mockResolvedValue({ data: options });

  await act(async () => render(<WarehouseSettings user={user} />));

  await act(async () => {
    userEvent.click(screen.getByRole("button", { name: "" }));
  });

  expect(AxiosMock.get).toBeCalledTimes(1);
});
