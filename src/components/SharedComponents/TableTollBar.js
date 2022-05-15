import React, { useState, useEffect } from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export function FilterModel(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, value) => setSelectedOptions(value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = () => {
    props.filterHandler(selectedOptions);
    setOpen(false);
  };
 
  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        aria-label="filter"
      >
        <FilterListIcon fontSize="medium"/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the fields you want to use to sort the table data
          </DialogContentText>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={props.options ?props.options:[]}
              onChange={handleChange}
              value={selectedOptions}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleFilter}>Filter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const SelectModel = (props) => {
  const [open, setOpen] = React.useState(false);
  const [column, setColumn] = React.useState("");
  const [search,setSearch] = useState("");

  const handleColumnChange = (event) => setColumn(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  

  const handleSearch = () => {
    props.cellSearchHandler(column,search);
    setOpen(false);
  };

 
  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        aria-label="search-by-cell"
      >
        <ManageSearchIcon fontSize="medium" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent sx={{ width: {sm:300}}}>
          <FormControl sx={{ m: 1, width:'100%' }}>
            <Select value={column} onChange={handleColumnChange}>
              {props.options && props.options.map((item)=>{
                return <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
              })}
              
            </Select>
          </FormControl>
          <TextField id="outlined-basic" variant="outlined" sx={{ m: 1,width:'100%'}} onChange={handleSearchChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function TableTollBar(props) {
  const [search, setSearch] = React.useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
    props.setSearchHandler(event.target.value);
  };
  const FetchSearchResults = async () => {
    props.searchHandler(search);
  };

  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      ></Typography>

      <Tooltip title="">
        <TextField
          placeholder="Search..."
          size="small"
          sx={{ m: 1, width: "60ch" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search-button"  onClick={FetchSearchResults} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
        />
      </Tooltip>

      <FilterModel
        options={props.options}
        filterHandler={props.filterHandler}
      />
{/* 
      <SelectModel
        options={props.options}
        cellSearchHandler={props.cellSearchHandler}
      /> */}
    </Toolbar>
  );
}

export default TableTollBar;
