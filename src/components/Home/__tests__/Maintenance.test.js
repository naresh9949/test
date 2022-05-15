import Maintenance from "./../Maintenance";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  cleanup,
  waitForElement,
  waitFor,
} from "@testing-library/react";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });


test("Renders Maintenance component without crashing", async () => {
  render(<Maintenance />);
});

test("Maintenance making the Get call to fetch the data!", async () => {
    AxiosMock.get.mockResolvedValue({ data: {Body : {MenuFunctions : []}} })
  render(<Maintenance />);
  expect(AxiosMock.get).toBeCalledTimes(1)
});
