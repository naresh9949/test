import {
  render,
  screen,
  cleanup,
  waitForElement,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableTollBar from "../TableTollBar";
import Enzyme from "enzyme";
import AxiosMock from "axios";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const FixedHeadCells = [
    {
      id: "userId",
      numeric: false,
      label: "User Id",
    },
    {
      id: "userName",
      numeric: true,
      label: "User Name",
    },
    {
      id: "Sort_Locn",
      numeric: true,
      label: "Sort Locn?",
    },
    {
      id: "Pull_Down",
      numeric: true,
      label: "Pull-Down",
    },
    {
      id: "Put_Up",
      numeric: true,
      label: "Pull-Up",
    },
    {
      id: "Transfer",
      numeric: true,
      label: "Transfer",
    },
    {
      id: "Replenish",
      numeric: true,
      label: "Replenish",
    },
    {
      id: "InSite_Replenishment",
      numeric: true,
      label: "inSite Replenishment",
    },
    {
      id: "Processing",
      numeric: true,
      label: "Processing",
    },
    {
      id: "Add_Inventory",
      numeric: true,
      label: "Add Inventory",
    },
    {
      id: "Inventory_Check",
      numeric: true,
      label: "Inventory Check",
    },
  ];
  
const searchHandler = jest.fn((search) => {
  return search;
});

const setSearchHandler = jest.fn((search) => {
  return search;
});

const cellSearchHandler = jest.fn((cell,value) => {
    return [cell,value];
});

const filterHandler = jest.fn((options)=>{
    return options;
})

test("TableTollBar rendering without any errors",()=>{
        render(<TableTollBar/>)
})


test("Search box and the handler functions working with out any errors",()=>{
    render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells} setSearchHandler={setSearchHandler}/>)
    userEvent.type(screen.getByPlaceholderText("Search..."),"warehouse");
    expect(screen.getByPlaceholderText("Search...").value).toEqual('warehouse');
    userEvent.click(screen.getByRole('button',{name:"search-button"}))
    expect(searchHandler).toBeCalled();
    expect(searchHandler).toBeCalledWith("warehouse");
})


test("Filter option is available on screen",()=>{
  render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells} setSearchHandler={setSearchHandler}/>)
    expect(screen.getByRole('button',{name:"filter"})).toBeInTheDocument;
}) 

test("Filter is opened when clicked",()=>{
  render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells} setSearchHandler={setSearchHandler}/>)
  userEvent.click(screen.getByRole('button',{name:"filter"}));  
  expect(screen.getByRole('heading',{name:"Filter"})).toBeInTheDocument;
})


test("Filter Handler method is calling without any errors",()=>{
  render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells} setSearchHandler={setSearchHandler}/>)
  userEvent.click(screen.getByRole('button',{name:"filter"}));  
  // user clicks on Filter button to filter the data
  userEvent.click(screen.getByRole('button',{name:"Filter"}));
  expect(filterHandler).toBeCalled();
})




// test("Search by column option is available on screen",()=>{
//   render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells}/>)
//   expect(screen.getByRole('button',{name:"search-by-cell"})).toBeInTheDocument;
// }) 

// test("Search by column option is opened when clicked",()=>{
//   render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells}/>)
//   userEvent.click(screen.getByRole('button',{name:"search-by-cell"}));  
//     expect(screen.getByRole('heading',{name:"Search"})).toBeInTheDocument;
// })


// test("Search by column option Handler method is calling without any errors",()=>{
//   render(<TableTollBar searchHandler={searchHandler} cellSearchHandler={cellSearchHandler} filterHandler={filterHandler} options={FixedHeadCells}/>)
//   userEvent.click(screen.getByRole('button',{name:"search-by-cell"}));  
//   //user clicks on Filter button to filter the data
//   userEvent.click(screen.getByRole('button',{name:"Search"}));
//   expect(cellSearchHandler).toBeCalled();
// })
 
