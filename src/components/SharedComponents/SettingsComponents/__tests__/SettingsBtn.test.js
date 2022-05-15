import SettingsBtn from "../SettingsBtn";
import { render, screen } from "@testing-library/react";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import { act } from "react-dom/test-utils";
import AxiosMock from "axios";

Enzyme.configure({ adapter: new Adapter() });
const options = [
  {
    PrinterDisplayName: "printer1",
  },
  {
    PrinterDisplayName: "printer2",
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

test("Renders SettingsBtn component without crashing", async () => {
  render(<SettingsBtn user={user} />);
});

test("SettingsBtn component contains PrinterSettings and Warehouse Settings", async () => {
  AxiosMock.get.mockResolvedValue({ data: options });

  await act(async () => render(<SettingsBtn user={user} />));

  expect(screen.getByRole("menuitem", { name: /Printer Settings/i }))
    .toBeInTheDocument;
  expect(screen.getByRole("menuitem", { name: /Warehouse Settings/i }))
    .toBeInTheDocument;
});
