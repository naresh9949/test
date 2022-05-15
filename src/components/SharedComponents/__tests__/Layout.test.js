import Layout from "./../Layout";
import NavBar from "./../NavBarComponents/NavBar";
import BreadcrumbsComponent from "../Breadcrumbs";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
} from "@testing-library/react";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

test("Renders Layout component without crashing", async () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
  render(
    <Router>
      <Layout />
    </Router>
  );
});

test("Home Screen Layout contains only NavBar without BreadcrumbsComponent", async () => {
  window.location.hash = "";
  const wrapper = shallow(<Layout />);
  const nav = <NavBar />;
  expect(wrapper.contains(nav)).toEqual(true);
});

test("Other than Home Screen Layout contains NavBar and BreadcrumbsComponent", async () => {
  window.location.hash = "/#/palletManager/221";
  const wrapper = shallow(<Layout />);
  const nav = <NavBar />;
  const Breadcrumbs = <BreadcrumbsComponent show={true}/>;
  expect(wrapper.contains(nav)).toEqual(true);
  expect(wrapper.contains(Breadcrumbs)).toEqual(true);
});



test("On initial render in mobile the Layout hides the NavBar and BreadcrumbsComponent", async () => {
    window.matchMedia = function () {
      return {
        matches: true,
        addListener: function () {},
        removeListener: function () {},
      };
    };
    render(
      <Router>
        <Layout />
      </Router>
    );
    expect(screen.getByRole('circle')).toBeInTheDocument;
  });
  

test("NavBar and BreadcrumbsComponent will displayed when we click on Half-Circle Icon", async () => {
  window.matchMedia = function () {
    return {
      matches: true,
      addListener: function () {},
      removeListener: function () {},
    };
  };
  render(
    <Router>
      <Layout />
    </Router>
  );
  userEvent.click(screen.getByRole('circle'));
  expect(screen.getByRole('banner')).toBeInTheDocument;
  expect(screen.getByRole('navigation')).toBeInTheDocument;
  
});
