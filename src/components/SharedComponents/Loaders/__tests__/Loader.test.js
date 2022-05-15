import Loader from "./../Loader";
import { render, screen } from "@testing-library/react";

test("Renders Loader component without crashing", async () => {
  render(<Loader />);
});


test("Loader component show a spinner with Loading... Text", async () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument;
    expect(screen.getByText('Loading....')).toBeInTheDocument;
  });