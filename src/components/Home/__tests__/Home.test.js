import Home from "./../Home";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  cleanup,
  waitForElement,
  waitFor,
} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import Enzyme from "enzyme";
import AxiosMock from "axios";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });



test("Renders Home component without crashing", async () => {
  await act( async () => render(<Home/>));
});

test("Home component is making 2 axios calls(For Language,Functions)", async () => {
  AxiosMock.get
    .mockResolvedValueOnce({ data: {Body : {MenuFunctions : []}} })
    .mockResolvedValueOnce({ data: [
      {
          "ResourceKey": "SVL_HOME_Admin_Fubctions",
          "English": "Admin Functions"
      }
  ] })
  await act( async () => render(<Home/>));
  await waitFor(() => expect(AxiosMock.get).toBeCalledTimes(2))
});
