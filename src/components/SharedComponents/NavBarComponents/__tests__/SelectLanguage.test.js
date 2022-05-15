import SelectLanguage from "../SelectLanguage";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  cleanup,
  waitForElement,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

const user = {
  facilityCode: 777,
  LanguagePreference: "en-US",
};

test("Renders SelectLanguage component without crashing", async () => {
  render(<SelectLanguage user={user} />);
});

test("SelectLanguage component shows Language based on the user LanguagePreference", async () => {
  render(<SelectLanguage user={user} />);
  expect(screen.getByRole("button", { name: /English/i })).toBeInTheDocument;
});

test("SelectLanguage component Language updates successfully", async () => {
  const wrapper = shallow(<SelectLanguage user={user} />);
  
  wrapper.find("#language").simulate("change", { target: { value: "es-MX" } });
  const select = wrapper.find("#language").prop("value");
  expect(select).toEqual("es-MX");
});
