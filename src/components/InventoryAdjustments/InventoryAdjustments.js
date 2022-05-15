import React, { useState, useEffect } from "react";
import Breadcrumbs from "../SharedComponents/Breadcrumbs";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { InputLabel, Autocomplete, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Get, Post } from './../Utilities/AxiosHandler';
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Loader from "./../SharedComponents/Loaders/Loader.js";

import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { visuallyHidden } from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";
import { descendingComparator, getComparator, stableSort } from '../Utilities/SortHandlers';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import Notification from "../SharedComponents/Notification"
import DeleteIcon from '@mui/icons-material/Delete';
import ViewWeekSharpIcon from '@mui/icons-material/ViewWeekSharp';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from "@mui/material/Menu";
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from "@material-ui/icons/Search";


const headcells = [
    {
      id: "CheckBoxes",
      label: "",
    },
    {
      id: "itemKey",
      label: "Item Key",
      
    },
    {
      id: "description",
      label: "Description",
      
    },
 
    {
      id: "lotNumber",
      label: "Lot Number",
      
    },
    {
      id: "expiration",
      label: "Lot Expiration",
      
    },
    {
      id: "qtyOnHand",
      label: "Qty on Hand",
      
    },
    {
      id: "prodQtyIssued",
      label: "Prod Qty Issued",
      
    },
    {
      id: "inTransitQty",
      label: "In Transit",
      
    },
    {
      id: "backupQty",
      label: "Backup",
     
    },
    {
      id: "pickedNotShippedQty",
      label: "Picked Not Shipped",
     
    },
    {
      id: "pickInventory",
      label: "Pick Inventory",
      
    },
    {
      id: "binsQty",
      label: "Bins",
      
    },
    

    {
      id: "adjustmentQty",
      label: "Adjustments",
      
    },

    {
      id: "comment",
      label: "Comments",
      
    }
];


function InventoryAdjustments(props) {
    const [data, setData] = React.useState([]);
    const [locationIdValue, setLocationIdValue] = React.useState("2");
    const [locationCodeValue, setLocationCodeValue] = React.useState('2120');
    const [allLocationData, setAllLocationData] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [selected,setselected] = React.useState([])
    const [anchorEl,setAnchorEl]= React.useState(null)
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const openMenu = Boolean(anchorEl);
    const [value, setValue] = React.useState('');
    const [filteredData, setFilteredData] = React.useState(data);
    const [itemChecked, setItemChecked] = React.useState([]);
    const [newSet, setNewSet] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [allLocationCodes, setAllLocationCodes] = React.useState([]);
    const [isDataFetched,setIsDataFetched]= React.useState(false)

    
    let FilteredColumns = (localStorage.getItem('AdjustmentsColumns_For_Hiding')!==null)?localStorage.getItem('AdjustmentsColumns_For_Hiding').split(","):["a","b"]

    useEffect(()=>{
      setselected(FilteredColumns)
    },[])

    useEffect(()=>{
    },[itemChecked])

    useEffect(()=>{
   },[newSet])

    useEffect( async () => {
      
      let result = await Get(`/common/getLocationCodeList`, 'prssvl')
      if (result.data){
        const codes = result.data;
        // console.log("All Locations", codes);
        let locationData = codes.map(JSON.stringify);
  
        let uniqueLocationData = new Set(locationData);
        uniqueLocationData = Array.from(uniqueLocationData).map(JSON.parse);

        setAllLocationData(uniqueLocationData);
        const arr = [];
        for(let i=0; i<uniqueLocationData.length; i++){
          arr.push(uniqueLocationData[i].LocationCode);
        }
        setAllLocationCodes(arr);
      
      } 
    
    }, []);

   
    useEffect( async () => {

      setLoading(true);

      let result2 = await Get(`/InventoryAdjustments/getItemKeysAndAdjustmentDetailsForCycleCount?locationCodeId=` + locationIdValue);
      
    try{  
      if (result2.data){
        const codes = result2.data;
        setData(codes);
        setFilteredData(codes);
        const obj = {open:true,message:"Records fetched successfully!",severity:"success",time:2000}
        setIsDataFetched(obj);
        // console.log("Item Adjustment Details", codes);
      }
      else{
        const obj = {open:true,message:"Something went wrong!!",severity:"error",time:5000}
        setIsDataFetched(obj);
        setData([]);
        setFilteredData([]);
      }
    }
    catch(e){
      console.log(e);
      setData([]);
      setFilteredData([]);
    }
      setLoading(false);

    },[locationIdValue]);  
    
    
  const handleLocationCodeChange = (newValue) =>{
    
      setLocationCodeValue(newValue);

      for(let i =0; i<allLocationData.length; i++){
        if(allLocationData[i].LocationCode === newValue){
          const id = allLocationData[i].LocationId;
          setLocationIdValue(id);

          break;
        }
      }      

  }

  const filterData = (e) => {
    if(e.target.value != ""){
      setValue(e.target.value);
      const filterTable = data.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(e.target.value.toLowerCase()) ));
      setFilteredData([...filterTable]);
    }
    else{
      setValue(e.target.value);
    }
  }

  const handleRequestSort = async(event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const onRequestSort={handleRequestSort};

  const StyledTableRow = withStyles((theme)=>({
    root:{
      '&:nth-of-type(odd)':{
        backgroundColor:"white",
      },
      '&:nth-of-type(even)':{
        backgroundColor:'#eee',
      },
    }
  }))(TableRow);

  const StyledTableCell=withStyles((theme)=>({
    root:{
      padding: "0px 16px"
    }
  }))(TableCell);

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);

  };


  const handleCloseMenu = () => {
    setAnchorEl(null);
    setselected(FilteredColumns)
  
  };


  const handleCheckBox = (item) => {
    const emptySet = [];
    setNewSet(emptySet);

    if(itemChecked.includes(item)){
      const tempSet = itemChecked;
      const index = tempSet.indexOf(item);
      if (index > -1) {
        tempSet.splice(index, 1); 
      }
      setItemChecked(tempSet);

    }
    else{
      const tempSet = [...itemChecked, item];
      setItemChecked(tempSet);

    }
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const  handleonChangeMenu =(columnName)=>{
    if(FilteredColumns.includes(columnName)){
      FilteredColumns.splice(FilteredColumns.indexOf(columnName), 1);
      localStorage.setItem("AdjustmentsColumns_For_Hiding",FilteredColumns)
  }else{
  FilteredColumns.push(columnName);
  localStorage.setItem("AdjustmentsColumns_For_Hiding",FilteredColumns)
  }
  setselected(FilteredColumns)
  }

  const handleAdjustments = async() => {

    let adjustmentData = [];
    for(let i = 0; i<itemChecked.length; i++){
      for(let j=0; j<data.length; j++){
        if(itemChecked[i] === data[j].itemKey && data[j].adjustmentQty != 0 ){
            const utcDate = new Date();
            const res = await Post(`/InventoryAdjustments/insertAdjustmentHistoryRecord`, { itemKey: data[j].itemKey,
              description: data[j].description,
              lotNumber: data[j].lotNumber,
              expiration: data[j].expiration.slice(0,10),
              qtyOnHand: data[j].qtyOnHand,
              prodQtyIssued: data[j].prodQtyIssued,
              inTransitQty: data[j].inTransitQty,
              backupQty: data[j].backupQty,
              pickedNotShippedQty: data[j].pickedNotShippedQty,
              pickInventory: data[j].pickInventory,
              binsQty: data[j].binsQty,
              adjustmentQty: data[j].adjustmentQty,
              comment: data[j].comment,
              adjustmentDateTime: utcDate.toUTCString(),
              status: null}
            );

        }
      }
    }
  }
 
  if (loading) return (
    <Box  id = "box" sx={{ width: "100%"}}>
        <Paper id = "paper" elevation={0} sx={{ width: "100%", mb: 2 }}>
         <br></br> 

             
             <Stack direction={{ xs: 'column', sm: 'row' }} sx={{mt:0}}
                  >
                  
                  <Autocomplete
                      disablePortal
                      value={locationCodeValue}
                      onChange={(event, newValue) => {
                        handleLocationCodeChange(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      options={allLocationCodes}
                      sx={{ width: 200, marginLeft:4, marginRight:4 }}
                      renderInput={(params) => <TextField {...params} label="Location" variant='standard' />}
                    />
                 
                  <Button variant="contained" 
                  sx={{ minWidth:120, marginLeft: 1, marginRight: 2, height: 40, marginTop : 1 }}><strong>ADJUST</strong></Button>            
                <Stack sx={{marginLeft:"auto"}} direction={{ xs: 'column', sm: 'row' }}>
                  <FormControl className="SearchBar" sx={{ marginLeft:"auto", marginRight: 1, marginTop: 1, width: 230}}  >
                  <TextField
                    variant="standard"        
                    size = 'small'
                    placeholder = 'Search'

                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    
                  >                           
                      </TextField>
                    </FormControl>

                    <Button sx={{marginLeft:"auto", marginTop:0, marginRight:2}}   onClick={handleClickMenu}><ViewWeekSharpIcon/></Button>   
                    </Stack>
                </Stack>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
        >
        {headcells.slice(1).map((item)=>{
          return (
        <MenuItem
        key={item.label}
        >
        <FormControlLabel control={<Checkbox size="small" checked={!FilteredColumns.includes(item.label)}  onChange={()=>handleonChangeMenu(item.label)}  />} label={item.label} />
        </MenuItem>
          )
        })}
        </Menu>
       

    <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem',width:"auto"}}>
        <Box
        component="div"
        sx={{
        textOverflow: 'clip',
        overflow: 'hidden',
        m:3
        }}>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <StyledTableRow>
          {headcells.filter(column=>(FilteredColumns.includes(column.label)==false)).map((column) => (
            <StyledTableCell style={{fontWeight:'bold'}}
              key={column.id}
              sortDirection={orderBy === column.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
                sx={{ color: "black", fontWeight: "bold" }}>
              <Typography variant='body'>{column.label}</Typography>
              {orderBy === column.id ? (
            <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
        </TableSortLabel>
            </StyledTableCell>
          ))}
        </StyledTableRow>
        
      </TableHead>
      
      </Table>
      <Loader/>
      </TableContainer>
      
      </Box>
      
     </div> 
     
    </Paper>
  </Box>  
 )


    return (
        <Box  id = "box" sx={{ width: "100%"}}>
            {isDataFetched.open && <Notification open={isDataFetched.open} close={setIsDataFetched} message={isDataFetched.message} severity={isDataFetched.severity} time={isDataFetched.time} />}
            <Paper id = "paper" elevation={0} sx={{ width: "100%", mb: 2 }}>
             <br></br>          
                 <Stack direction={{ xs: 'column', sm: 'row' }} sx={{mt:0}}
                      >
                      
                      <Autocomplete
                          disablePortal
                          value={locationCodeValue}
                          onChange={(event, newValue) => {
                            handleLocationCodeChange(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          options={allLocationCodes}
                          sx={{ width: 200, marginLeft:4, marginRight:4 }}
                          renderInput={(params) => <TextField {...params} label="Location" variant='standard' />}
                        />
                     
                      <Button variant="contained" 
                      onClick={() => {handleAdjustments()}}
                      sx={{ minWidth:120, marginLeft: 1, marginRight: 2, height: 40, marginTop : 1 }}><strong>ADJUST</strong></Button>            
                    <Stack sx={{marginLeft:"auto"}} direction={{ xs: 'column', sm: 'row' }}>
                      <FormControl className="SearchBar" sx={{ marginLeft:"auto", marginRight: 1, marginTop: 1, width: 230}}  >
                      <TextField
                        variant="standard"        
                        size = 'small'
                        placeholder = 'Search'
                        onChange={filterData}

                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        
                      >                           
                          </TextField>
                        </FormControl>

                        <Button sx={{marginLeft:"auto", marginTop:0, marginRight:2}}   onClick={handleClickMenu}><ViewWeekSharpIcon/></Button>   
                        </Stack>
                    </Stack>

            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
            >
            {headcells.slice(1).map((item)=>{
              return (
            <MenuItem
            key={item.label}
            >
            <FormControlLabel control={<Checkbox size="small" checked={!FilteredColumns.includes(item.label)}  onChange={()=>handleonChangeMenu(item.label)}  />} label={item.label} />
            </MenuItem>
              )
            })}
            </Menu>
           

        <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem',width:"auto"}}>
            <Box
            component="div"
            sx={{
            textOverflow: 'clip',
            overflow: 'hidden',
            m:3
            }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <StyledTableRow>
              {headcells.filter(column=>(FilteredColumns.includes(column.label)==false)).map((column) => (
                <StyledTableCell style={{fontWeight:'bold'}}
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                >
                    <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                    sx={{ color: "black", fontWeight: "bold" }}>
                  <Typography variant='body'>{column.label}</Typography>
                  {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
            </TableSortLabel>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>

                  
              {stableSort(filteredData, getComparator(order, orderBy))
              .map((data) => {
                     
                  return (
                   
                    <StyledTableRow
                      hover
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          // indeterminate={numSelected > 0 && numSelected < rowCount}
                          checked={itemChecked.includes(data.itemKey) ? true : false }
                          onChange={() => {handleCheckBox(data.itemKey)}}
                        />
                      </TableCell>
                      {FilteredColumns.includes('Item Key')==false && <StyledTableCell  key="itemKey" ><Typography  component={'span'} variant="body1">{data.itemKey}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                    
                      {FilteredColumns.includes('Description')==false && <StyledTableCell key="description"><Typography  component={'span'} variant="body1">{data.description}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                      {FilteredColumns.includes('Lot Number')==false &&  <StyledTableCell  key="lotNumber"><Typography  component={'span'} variant="body1">{data.lotNumber}
                                                    </Typography>
                                                    
                                                    
                                                </StyledTableCell>}

                      {FilteredColumns.includes('Lot Expiration')==false &&  <StyledTableCell  key="expiration"><Typography  component={'span'} variant="body1">{data.expiration.slice(0,10)}
                                                    </Typography>
                                                    
                                                    
                                                </StyledTableCell>}                          
                      {FilteredColumns.includes('Qty on Hand')==false && <StyledTableCell align='right' key="qtyOnHand"><Typography  component={'span'} variant="body1">{data.qtyOnHand}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                       {FilteredColumns.includes('Prod Qty Issued')==false &&  <StyledTableCell align='right' key="prodQtyIssued"><Typography  component={'span'} variant="body1">{data.prodQtyIssued}
                                                    </Typography> 
                                                    
                                                </StyledTableCell>}
                       {FilteredColumns.includes('In Transit')==false &&  <StyledTableCell align='right' key="inTransitQty"><Typography  component={'span'} variant="body1">{data.inTransitQty}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                       {FilteredColumns.includes('Backup')==false &&  <StyledTableCell align='right' key="backupQty"><Typography  component={'span'} variant="body1">{data.backupQty}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                      {FilteredColumns.includes('Picked Not Shipped')==false &&  <StyledTableCell align='right' key="pickedNotShippedQty"><Typography  component={'span'} variant="body1">{data.pickedNotShippedQty}
                                                    </Typography>
                                                    
                                                </StyledTableCell>}
                      {FilteredColumns.includes('Pick Inventory')==false &&  <StyledTableCell align='right' key="pickInventory"><Typography  component={'span'} variant="body1" >{data.pickInventory}
                                                    </Typography>
                                                    
                                                    </StyledTableCell>}
                      {FilteredColumns.includes('Bins')==false &&  <StyledTableCell align='right' key="binsQty"><Typography  component={'span'} variant="body1">{data.binsQty}
                                                    </Typography>
                                                    
          
                                                </StyledTableCell>}
                      {FilteredColumns.includes('Adjustments')==false &&  <StyledTableCell align='right' key="adjustmentQty"><Typography  component={'span'} variant="body1">{data.adjustmentQty}
                                                    </Typography>
                                                    
          
                                                </StyledTableCell>}
                                                
                      {FilteredColumns.includes('Comments')==false &&  <StyledTableCell key="comment"><Typography  component={'span'} variant="body1">{data.comment}
                                                  </Typography>
                                                  

                                              </StyledTableCell>                          
                                                }
                     
  
                    </StyledTableRow>

                 );
  
                })}
              </TableBody>
              </Table>
              </TableContainer>
              </Box>
              </div>

             
    
            </Paper>
        </Box>          
)

}
export default InventoryAdjustments ;