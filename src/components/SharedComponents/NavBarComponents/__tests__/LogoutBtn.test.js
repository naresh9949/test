import LogoutBtn from "../LogoutBtn";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen
} from "@testing-library/react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";


Enzyme.configure({ adapter: new Adapter() });

test("Renders LogoutBtn component without crashing", async () => {
  render(<LogoutBtn />);
});


