import {
  render,
  screen,
  cleanup, 
  waitForElement,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import Breadcrumbs from "./../Breadcrumbs";
import { MemoryRouter as Router } from "react-router-dom";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

const data = {
    HomeURL: "#",
    BackButtonURL: "#",
    BreadCrumbs: [
      {
        BreadCrumbName: "NAME1",
        BreadCrumbURL: "#1",
      },
      {
        BreadCrumbName: "NAME2",
        BreadCrumbURL: "#2",
      },
    ],
    AllowedUserRoles:[]
};

test("Renders Breadcrumbs component without crashing", async() => {
  AxiosMock.get.mockResolvedValue({data:{Body:data}});
  await act( async () => render(<Router><Breadcrumbs show={true}/></Router>));
});

test("Breadcrumbs component contains the correct functions", async() => {
  AxiosMock.get.mockResolvedValue({data:{Body:data}}); // res.data.Body
  //render( <Router><Breadcrumbs/></Router>);

  act( async () => render(<Router><Breadcrumbs show={true}/></Router>));
  await waitFor(() => {
   
    expect(AxiosMock.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText('NAME1')).toBeInTheDocument // getByrole
    expect(screen.getByText('NAME2')).toBeInTheDocument
  
    }); 

    
  
});

test("Breadcrumbs component contains Back button and Home Link", async() => {
  AxiosMock.get.mockResolvedValue({data:{Body:data}});
  await act( async () => render(<Router><Breadcrumbs show={true}/></Router>));
  expect(screen.getByRole('button',{name:/back/i})).toBeInTheDocument; 
  expect(screen.getByRole('link',{name:/Home/i})).toBeInTheDocument;
});




