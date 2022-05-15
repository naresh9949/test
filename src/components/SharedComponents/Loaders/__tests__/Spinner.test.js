import Spinner from "./../Spinner";
import { render, screen } from "@testing-library/react";

test("Renders Spinner component without crashing", async () => {
  render(<Spinner />);
});


test("Spinner component show a spinner", async () => {
    render(<Spinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument;
   
  });