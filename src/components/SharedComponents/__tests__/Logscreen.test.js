import Logscreen from "./../Logscreen";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  cleanup,
  waitForElement,
  waitFor,
  within
} from "@testing-library/react";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });
const version = process.env.REACT_APP_RLS_VERSION;

test("Renders Logscreen component without crashing", async () => {
  render(<Logscreen />);
});


test("Logscreen component displays a icon on initial render", async () => {
    render(<Logscreen />);
    expect(screen.getByRole('button',{name:/Log button/i})).toBeInTheDocument;
  });


  test("On clicking the icon the log screen will get opened up with title 'Log Reports'", async () => {
    render(<Logscreen />);
    userEvent.click(screen.getByRole('button',{name:/Log button/i}));
    expect(screen.getByText("Log Reports "+version)).toBeInTheDocument;
  });

  test("Logs are read from the Local Storage", async () => {
    window.localStorage.log = '[{"header":{"isSuccess":false,"EventID":"Non Existent Lambda"},"date":"Tue Feb 15 2022 23:17:57 GMT+0530 (India Standard Time)","CalledUrl":"http://localhost:3000/dev/common/getLanguageResources?app=SVL&&key=SVL_HOME_&&language=Spanish"},{"header":{"isSuccess":false,"EventID":"Non Existent Lambda"},"date":"Tue Feb 15 2022 23:17:58 GMT+0530 (India Standard Time)","CalledUrl":"http://localhost:3000/dev/common/getLanguageResources?app=SVL&&key=SVL_HOME_&&language=Spanish"}]';
    render(<Logscreen />);
    userEvent.click(screen.getByRole('button',{name:/Log button/i}));
    expect(window.localStorage.getItem("log")).toBeCalled;
  });

  test("Logs are displayed on to the screen", async () => {
    window.localStorage.log = '[{"header":{"isSuccess":false,"EventID":"Non Existent Lambda"},"date":"Tue Feb 15 2022 23:17:57 GMT+0530 (India Standard Time)","CalledUrl":"http://localhost:3000/dev/common/getLanguageResources?app=SVL&&key=SVL_HOME_&&language=Spanish"},{"header":{"isSuccess":false,"EventID":"Non Existent Lambda"},"date":"Tue Feb 15 2022 23:17:58 GMT+0530 (India Standard Time)","CalledUrl":"http://localhost:3000/dev/common/getLanguageResources?app=SVL&&key=SVL_HOME_&&language=Spanish"}]';
    render(<Logscreen />);
    userEvent.click(screen.getByRole('button',{name:/Log button/i}));
    expect(screen.getByTestId("Tue Feb 15 2022 23:17:58 GMT+0530 (India Standard Time)")).toBeInTheDocument;
    expect(screen.getByTestId("Tue Feb 15 2022 23:17:57 GMT+0530 (India Standard Time)")).toBeInTheDocument;
  });