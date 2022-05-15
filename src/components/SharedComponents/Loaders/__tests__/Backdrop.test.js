import Backdrop from "./../Backdrop";
import { render, screen } from "@testing-library/react";

test("Renders Backdrop component without crashing", async () => {
  render(<Backdrop open={true}/>);
});



