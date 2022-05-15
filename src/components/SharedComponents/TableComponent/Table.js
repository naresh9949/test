import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "./../MUI/Select";
import Switch from "./../MUI/Switch";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import Container from "@mui/material/Container";
import { useState } from "react";
import TollBar from "./TableTollBar";
import EditableCell from "./../MUI/EditableCell";
import DeleteBtn from "./../MUI/DeleteBtn";
import Autocomplete from "./../MUI/Autocomplete";
import CheckBox from "./../MUI/CheckBox";
import Header from "./Headers";
import CustomButton from "./../MUI/Button";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



export default function TableComponent(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [headCells, setHeadCells] = useState([]);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const searchHandler = (searchValue) => {
    setSearchValue(searchValue);
    filterSearchResult(searchValue);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    if (isAsc) data.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    else data.sort((a, b) => (a[property] < b[property] ? 1 : -1));

    setData([...data]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

  const filterSearchResult = (searchValue) => {
    searchValue = searchValue.trim();
    if (searchValue == "") {
      setData(props.data);
      return;
    }

    const isColumnFilter = searchValue.includes("=");
    if (isColumnFilter) {
      const filter = searchValue.split("=");
      const column = filter[0] ? filter[0] : "None";
      const value = filter[1] ? filter[1] : "None";
      let id = "";

      for (let i = 0; i < props.headCells.length; i++) {
        if (column.toLowerCase() == props.headCells[i].label.toLowerCase()) {
          id = props.headCells[i].id;
        }
      }

      const result = [];
      for (let i = 0; i < props.data.length; i++) {
        if (
          props.data[i][id] &&
          props.data[i][id].toString().toLowerCase() ==
            value.toString().toLowerCase()
        )
          result.push(props.data[i]);
        setSearchValue(value);
      }
      setData(result);
      return;
    }

    const result = [];
    for (let i = 0; i < props.data.length; i++) {
      for (let j = 0; j < headCells.length; j++) {
        if (
          props.data[i][headCells[j]] &&
          props.data[i][headCells[j]].toString().toLowerCase() ==
            searchValue.toLowerCase()
        ) {
          result.push(props.data[i]);
          break;
        }
      }
    }
    setData(result);
  };

  const includes = (list,value) => {
    return list.includes(value);
  }

  const selectHandler = (id,value) => {
    let newIds = [];
    if(value){
    selectedIds.push(id);
    newIds = selectedIds;
    }
    else
      newIds = selectedIds.filter(curId => curId!=id);
    
    setSelectedIds([...newIds])
    props.config.selectHandler(newIds)

    
  }

  const selectAllHandler = (value) => {
    
    let newIds = [];

    if(value){
    for(let i=0;i<data.length;i++)
      newIds.push(data[i][props.config.id]);
    }
    
    if(value) setSelectedIds([...newIds])
    else setSelectedIds([])

    props.config.selectHandler(newIds)
    
  }

  useEffect(() => {
    setData(props.data);
    let hideCells = JSON.parse(localStorage.getItem("hideCells"));
    if (!hideCells) hideCells = {};
    let currentHideCells = hideCells[props.name] ? hideCells[props.name] : [];

    if (currentHideCells.length == 0) {
      currentHideCells = [];
      for (let i = 0; i < props.headCells.length; i++)
        currentHideCells.push(props.headCells[i].id);
      hideCells[props.name] = currentHideCells;
      console.log(hideCells);
      localStorage.setItem("hideCells", JSON.stringify(hideCells));
    }
    setHeadCells(currentHideCells);

    // Keep the filter after data change 
    filterSearchResult(searchValue);    
  }, [props.data]);
  return (
    <Paper elevation={0} sx={{ width: "100%" }}>
      {/**This */}
      <TollBar
        searchHandler={searchHandler}
        headCells={props.headCells}
        showedCells={headCells}
        name={props.name}
        setHeadCells={setHeadCells}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="Table"
          size={"small"}
        >
          <Header
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={props.headCells}
            showCells={headCells}
            selectAll = {props.config.enableSelectAll}
            selectAllHandler={selectAllHandler}
          />
          
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {/* {data.length == 0 && (
              <Container  align="center">
                <Typography sx={{ marginLeft: "50vw" }} variant="body1" gutterBottom>
                  No Records found
                </Typography>
              </Container>
            )} */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    tabIndex={-1}
                    key={row.warehouse}
                  >
                     <TableCell align="center"><CheckBox id={row[props.config.id]} checked={includes(selectedIds,row[props.config.id])} changeHandler={selectHandler}/></TableCell>
                    {props.headCells.map((cell) => {
                      let currentCellColor = "none";

                      if (row[cell.id])
                        currentCellColor =
                          row[cell.id].toString().toLowerCase() ==
                          searchValue.toString().toLowerCase()
                            ? "#E8DAEF "
                            : "none";
                      if (!headCells.includes(cell.id)) return null;

                      if (cell.type == "select") {
                        return (
                          <TableCell align={cell.align}>
                            <Select
                              height="25px"
                              id={cell.id}
                              data={row}
                              options={cell.options}
                              defaultValue={row[cell.id]}
                              changeHandler={cell.handler}
                            />
                          </TableCell>
                        );
                      }

                      if (cell.type == "switch") {
                        return (
                          <TableCell align={cell.align}>
                            <Switch
                              checked={row[cell.id]}
                              id={cell.id}
                              data={row}
                              changeHandler={cell.handler}
                            />
                          </TableCell>
                        );
                      }


                      if (cell.type == "autocomplete") {
                        return (
                          <TableCell align={cell.align}>
                           <Autocomplete id={cell.id}
                              data={row}
                              options={cell.options}
                              defaultValue={row[cell.id]}
                              changeHandler={cell.handler}/>
                          </TableCell>
                        );
                      }


                      if (cell.type == "button") {
                        return (
                          <TableCell align={cell.align}>
                           <CustomButton label={cell.btnLabel} data={row} onClickHandler={cell.handler}/>
                          </TableCell>
                        );
                      }

                      // if (cell.type == "component") {
                      //   return (
                      //     <TableCell align="center">
                      //      {cell.component}
                      //     </TableCell>
                      //   );
                      // }

                      if (currentCellColor != "none")
                        return (
                          <TableCell
                            align={cell.align}
                            style={{ backgroundColor: "#E8DAEF" }}
                          >
                            {!cell.editable && row[cell.id]}
                            {cell.editable && (
                              <EditableCell
                                value={row[cell.id]}
                                id={cell.id}
                                data={row}
                                changeHandler={cell.handler}
                              />
                            )}
                          </TableCell>
                        );

                      return (
                        <TableCell align={cell.align}>
                          {!cell.editable && row[cell.id]}
                          {cell.editable && (
                            <EditableCell value={row[cell.id]} id={cell.id}
                            data={row}
                            changeHandler={cell.handler} />
                          )}
                        </TableCell>
                      );
                    })}
                    
                    {props.config.enableDelete && <TableCell> <DeleteBtn data={row} changeHandler={props.config.deleteHandler} /> </TableCell>}
                   
                  </StyledTableRow>
                );
              })}
            {emptyRows > 0 && (
              <StyledTableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length != 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}




