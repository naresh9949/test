import CycleCountHistory from "./../CycleCountHistory";
import userEvent from "@testing-library/user-event";
import {
    render,
    screen,
    name,
  } from "@testing-library/react";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

test("screen renders without crashing", async()=>{
    render(<CycleCountHistory />);
});
test("screen all the components", async()=>{
    render(<CycleCountHistory />)
    screen.getByRole("button",{name: "Export"}).toBeInTheDocument
    screen.getByRole("textbox",{name:"Choose date"}).toBeInTheDocument
    screen.getByRole("ChooseToDate").toBeInTheDocument
    screen.getByRole('ChooseLocationCode').toBeInTheDocument
})