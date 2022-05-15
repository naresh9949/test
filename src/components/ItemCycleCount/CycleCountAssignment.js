import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useContext } from 'react';
import { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { withStyles } from '@mui/styles';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import { prssvlGet } from './../Utilities/AxiosHandler';
import { UserContext } from "./../../App.js";
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import { Get, Post } from './../Utilities/AxiosHandler';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import ImportButton from '../SharedComponents/FileButtons/ImportBtn';
import ExportButton from '../SharedComponents/FileButtons/ExportBtn';
import Notification from '../SharedComponents/Notification';
let list = [];
//const [totalpallets,setTotalPallets] = React.useState('');
function Sel({ checked, inventorycyclecountsequenceId }) {
  if (checked) {
    list.push(inventorycyclecountsequenceId);
  }
  let [updateIds, setupdateIds] = React.useState([]);
  const handletrue = (event) => {
    console.log(inventorycyclecountsequenceId, event.target.checked);
    if (event.target.checked)
      list.push(inventorycyclecountsequenceId);
    else {
      let removed = list.indexOf(inventorycyclecountsequenceId);
      list.splice(removed, 1);
      console.log(list)
    }
    console.log(list);
  }
  return (
    <>
      <input type='checkbox' style={{ width: '20px', height: '20px', marginLeft: '25px' }} checked={checked ? checked : null} onChange={handletrue} />
    </>
  )
}
function Freeze({ inventorycyclecountsequenceId, freezeStorageTypeid, freezeStorageTypeDescription, freezeStoargeIds,setRows,tabledata,open,setOpen }) {
  const [value, setValue] = React.useState(freezeStorageTypeid);
  const handleChange = async (event) => {
    setValue(event.target.value);
    const result = await Post("/cycleCountAssignment/updatefreezestorage?id=" + inventorycyclecountsequenceId + "&freezestorageid=" + event.target.value);
    console.log(result.status);
    if(result.status === 200){
      const obj = {open:true,message:"Record updated successfully!",severity:"success",time:2000}
      setOpen(obj);
    for(let i= 0;i < tabledata.length;i++){
      if(tabledata[i].InventoryCycleCountSequenceId == inventorycyclecountsequenceId){
        tabledata[i].FreezeStorageTypeId=event.target.value;
        }
      }
      setRows([...tabledata]);
    }
    else{
      const obj = {open:true,message:"Record not updated!",severity:"error",time:2000}
      setOpen(obj);
    }
  }
  return (
    <>
      <Select style={{ width: '100px', height: '20px' }} value={value}
        onChange={handleChange} >
        {freezeStoargeIds.map((item, index) => {
          return (
            <MenuItem key={item.FreezeStorageTypeId} value={item.FreezeStorageTypeId}>
              {item.FreezeStorageTypeDescription}
            </MenuItem>
          );
        })}
      </Select>
    </>
  )
}
function AssignedUsers({assignedUsersList,ItemKey,locationId,inventorycyclecountsequenceId,freezeStorageTypeId,assignedUser,setRows,tabledata,open,setOpen}){
  const [value,setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState(''); 
  const [assignedusername,setAssigneduserName] = React.useState('');
  const handleAssignedUsers=async(newvalue)=>{
    setAssigneduserName(newvalue);
    setValue(newvalue);
    const result = await Get("/cycleCountAssignment/updateAssignedUser?itemKey="+ItemKey+"&locationId="+locationId+"&inventorycyclecountsequenceId="+inventorycyclecountsequenceId+"&assignedUser="+newvalue+"&freezeStorageTypeId="+freezeStorageTypeId)
    if(result.status ===200){
      if(result.data == 'No Pallet and PickLocation Details exist'){
        const obj = {open:true,message:"No Pallet or PickLocation Details Exist!",severity:"success",time:2000}
        setOpen(obj);
      }
      else{
    for(let i= 0;i < tabledata.length;i++){
      if(tabledata[i].InventoryCycleCountSequenceId == inventorycyclecountsequenceId){
        tabledata[i].AssignedUser=newvalue;
        if(result.data.totalpallets){
        tabledata[i].TotalPallets=result.data.totalpallets;
        tabledata[i].PalletsCountPending=tabledata[i].TotalPallets;
        tabledata[i].IsPickLocationCounted=(result.data.picklocationcount==0)?null:0;
        }
      }
    }
    setRows([...tabledata]);
    const obj = {open:true,message:"Record updated successfully!",severity:"success",time:2000}
    setOpen(obj);
  }
  }
  else{
      const obj = {open:true,message:'A pending replenishment for this item: '+ItemKey +' exists.Please complete it',severity:"error",time:5000}
    setOpen(obj);
    setValue('');
    }
}
  useEffect(async()=>{
    if(assignedUser != null && assignedUsersList.length>0){
      // console.log(assignedUsersList.find(o=>o.key===assignedUser));
  setValue(assignedUser)
    }
  },[assignedUser])
  return(
    <Autocomplete
      disablePortal
      value={value}
      onChange={(event, newValue) => {
        handleAssignedUsers(newValue.key);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={assignedUsersList}
      getOptionLabel={option => option.value}
      sx={{ width: "auto", marginLeft:0, marginRight:2 }}
      renderInput={(params) => <TextField {...params} variant='outlined' size='small' />}
    />
  )
}
export default function CycleCountAssignment({assignedUsersList,locationId,locationCode,freezeStoargeIds,rows,setRows}) {
  let items = []
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "white",
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#eee',
      },
    }
  }))(TableRow);
  const StyledTableCell = withStyles((theme) => ({
    root: {
      padding: "0px 16px",
    },
  }))(TableCell);
  const [checked, setchecked] = React.useState(false);
  const [showTable, setShowTable] = React.useState(true);
  const [value, setValue] = React.useState(1);
  const [countPending, setCountPending] = React.useState(true);
  const options = ['-1', '0', '1', '2', '3', '4', '5', 'more than 5'];
  const [option, setOption] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [open,setOpen] = React.useState(false);
  //const [rows, setRows] = React.useState([]);
  const handleCountPendingSwitch = (event) => {
    setCountPending(event.target.checked);
  }
  const handlecheck = (event) => {
    setchecked(event.target.checked);
  }
  const columns = [
    { id: 'item', label: 'Item' },
    { id: 'countdue', label: 'Count Due(In weeks)' },
    {
      id: 'totalpallets',
      label: 'Total Pallets',
    },
    {
      id: 'countpending',
      label: 'Count Pending',
    },
    {
      id: 'picloccounted',
      label: 'Pic Loc Counted',
    },
    {
      id: 'freeze',
      label: 'Freeze',
    },
    {
      id: 'assignto',
      label: 'Assign To',
    },
    {
      id: 'sel',
      label: 'Sel',
    }
  ];
  var d= new Date();
    d=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
    d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
    var startyear=new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo=Math.ceil((((d-startyear)/86400000)+1)/7);
  const handleApply = async () => {
    var d= new Date();
    var year = d.getFullYear();
    let tabledata;
    setRows([]);
    while (rows.length > 0)
      rows.pop();
    tabledata = await Get("/cycleCountAssignment/getcountsequencedata?dueIn=" + (option == 'more than 5' ? 6 : option) + "&countPending=" + countPending+"&locationId="+locationId+"&yearNumber="+year);
    tabledata=tabledata.data;
    let itemkeys=[]
    for(let i = 0;i < tabledata.length;i++){
      tabledata[i].DueInWeekNumber=tabledata[i].DueInWeekNumber<weekNo?-1:tabledata[i].DueInWeekNumber-weekNo;
    }
    setRows(tabledata);
    //setData(tabledata);
    //setShowTable(false);
  }
  const [freezestoragetypeId, setFreezestorageTypeId] = React.useState('');
  const [freeze, setfreeze] = React.useState('');
  const handleRadioButton = async (event) => {
    setfreeze(event.target.value);
    setFreezestorageTypeId(event.target.name);
  }
  const handleGo = async () => {
    const updatefreeze = [];
    for (let i = 0; i < list.length; i++) {
      var obj = {};
      obj['id'] = list[i];
      obj['freezestorageid'] = freezestoragetypeId;
      updatefreeze.push(obj);
    }
    const res = await Post("/cycleCountAssignment/updateMultipleFreezeStorage", updatefreeze);
    console.log(res);
    const obj1 = {open:true,message:"Records updated successfully!",severity:"success",time:2000}
      setOpen(obj1);
  }
  const exportbtn = {
    'dueInWeeks': (option=='more than 5')?52:option?(parseInt(option)+weekNo):52,
    'LocationCode': locationCode
  }
  const filter = {
    'locationCode': locationCode,
    'locationId': locationId
  }
  return (
    <>
    <Notification open={open.open} close={setOpen} message={open.message} severity={open.severity} time={open.time} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ImportButton reportId='AssignItemCC' data={filter} />
        </Grid>
        <Grid item xs={0.5}>
          <ExportButton reportId="AssignItemCC" data={exportbtn} />
        </Grid>
      </Grid>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '40%', border: 'black' }}>
          <Grid container spacing={0} sx={{ paddingLeft: { sm: 3, xs: 1 }, paddingRight: { sm: 3, xs: 1 } }}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
              <Autocomplete
                disablePortal
                value={option}
                onChange={(event, newValue) => {
                  setOption(newValue);
                }}
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Due In(weeks)" variant='standard' />}
              />
            </Grid>
            <Grid item sx={{ display: 'flex' }} style={{ marginLeft: '50px' }}>
              <label style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '25px' }}>Count Pending:</label>
              <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                <Switch checked={countPending} onChange={handleCountPendingSwitch}/>
              </div>
            </Grid>
            <Grid item sx={{ display: 'flex' }}>
              <Button size='small' variant='contained' color='primary' style={{ marginLeft: '50px', width: '30px', height: '40px', marginTop: '20px' }} onClick={handleApply}>Apply</Button>
            </Grid>
          </Grid>
        </div>
        <div style={{ borderLeft: '1px solid black', height: '80px', marginLeft: '0px', marginTop: '0px' }} />
        <div style={{ width: '60%' }}>
          <Grid container spacing={0} sx={{ paddingLeft: { sm: 3, xs: 1 }, paddingRight: { sm: 3, xs: 1 } }}>
            <Grid sx={{ display: 'flex' }}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="options" name="row-radio-buttons-group" style={{ marginTop: '15px' }} value={freeze} onChange={handleRadioButton}>
                  <label style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '7px' }}>Freeze: &nbsp;&nbsp;</label>
                  <FormControlLabel name="1" value="None" control={<Radio />} label="None" />
                  <FormControlLabel name="2" value="Pick Only" control={<Radio />} label="Pick Only" />
                  <FormControlLabel name="3" value="All" control={<Radio />} label="All" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sx={{ display: 'flex' }} style={{ marginLeft: '50px', marginTop: '-15px' }}>
              <Autocomplete
                disablePortal
                sx={{ width: 200, paddingTop: 2 }}
                size="small"
                options={assignedUsersList}
                getOptionLabel={option => option.value}
                renderInput={(params) => <TextField {...params} label="Select Assign To" variant='standard' />}
              />
            </Grid>
            <Grid item sx={{ display: 'flex' }}>
              <Button size='small' variant='contained' color='success' style={{ marginLeft: '50px', width: '30px', height: '40px', marginTop: '10px' }} onClick={handleGo}>Go</Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell style={{ fontWeight: 'bold' }}
                      key={column.id}
                    >
                      {column.label}
                      {column.label == 'Sel' ? <input type='checkbox' style={{ width: '20px', height: '20px' }} checked={checked} onChange={handlecheck} /> : null}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map(data => (
                  <StyledTableRow>
                    <StyledTableCell><Typography component='span' variant="body1">{data.ItemKey}</Typography></StyledTableCell>
                    <StyledTableCell><Typography component='span' variant="body1">{data.DueInWeekNumber}</Typography></StyledTableCell>
                    <StyledTableCell><Typography component='span' variant="body1">{(data.AssignedUser)?(data.TotalPallets):null}</Typography></StyledTableCell>
                    <StyledTableCell><Typography component='span' variant="body1">{(data.AssignedUser)?(data.PalletsCountPending):null}</Typography></StyledTableCell>
                    <StyledTableCell><Typography component='span' variant='body1'>{(data.AssignedUser)?(data.IsPickLocationCounted==null?'N/A':(data.IsPickLocationCounted?'Yes':'No')):null}</Typography></StyledTableCell>
                    <StyledTableCell><Freeze inventorycyclecountsequenceId={data.InventoryCycleCountSequenceId} freezeStorageTypeid={data.FreezeStorageTypeId} freezeStorageTypeDescription={data.FreezeStorageTypeDescription} freezeStoargeIds={freezeStoargeIds} setRows={setRows} tabledata={rows} open={open} setOpen={setOpen}/></StyledTableCell>
                    <StyledTableCell><AssignedUsers assignedUsersList={assignedUsersList} ItemKey={data.ItemKey} locationId={locationId} inventorycyclecountsequenceId={data.InventoryCycleCountSequenceId} freezeStorageTypeId={data.FreezeStorageTypeId} assignedUser={data.AssignedUser} setRows={setRows} tabledata={rows} open={open} setOpen={setOpen}/></StyledTableCell>
                    <StyledTableCell><Sel checked={checked} inventorycyclecountsequenceId={data.InventoryCycleCountSequenceId} /></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </Paper>
      </div>
    </>
  )
}