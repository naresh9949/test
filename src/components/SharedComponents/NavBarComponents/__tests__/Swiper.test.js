import Swiper from "../Swiper";
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
    PrinterDisplayName: "printer1",
  },
  {
    PrinterDisplayName: "printer2",
  },
];
const user = {
  FacilityCode: 777,
  Id:'knaresh'
};




test("Renders Swiper component without crashing", async () => {
  render(<Swiper user={user} />);
});

test("Swiper component contains userId", async () => {
    render(<Swiper user={user} />);
   expect(screen.getByText('Logged in as knaresh')).toBeInTheDocument;
  });

  test("Swiper component contains Home,Warehouse Settings,Logout", async () => {
    render(<Swiper user={user} />);
    expect(screen.getByText('Home')).toBeInTheDocument;
    expect(screen.getByText('Warehouse Settings')).toBeInTheDocument;
    expect(screen.getByText('Logout')).toBeInTheDocument;
  });
