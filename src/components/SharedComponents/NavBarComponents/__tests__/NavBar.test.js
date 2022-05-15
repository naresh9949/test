import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./../NavBar";
import Logscreen from "./../../Logscreen";
import { MemoryRouter as Router } from "react-router-dom";


test("Renders NavBar component without crashing", async () => {
  render(<Router><NavBar /></Router>);
});

test("NavBar component contains title", async () => {
  render(<Router><NavBar /></Router>);
  expect(screen.getByRole("title")).toBeInTheDocument;
});

test("NavBar component contains Logs Button", () => {
  render(<Router><NavBar /></Router>);
  expect(screen.getByRole("button", { name: "Log button" })).toBeInTheDocument;
});

test("Log icon open the Log Screen", () => {
  render(<Router><NavBar /></Router>);
    userEvent.click(screen.getByRole("button", { name: "Log button" }));
    expect(screen.getByRole('dialog')).toBeInTheDocument;
  });

  test("Log Screen contains all the log details", async () => {
    render(<Logscreen/>);
    userEvent.click(screen.getByRole("button", { name: "Log button" }));
  });