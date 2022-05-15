import * as React from 'react';
import { Get, Post } from './../Utilities/AxiosHandler';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UserContext } from "./../../App.js";
import { useContext } from 'react';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import ReplayIcon from '@mui/icons-material/Replay'
import IconButton from '@mui/material/IconButton';
import {webSocketHandler,entryAdded,entryCancelled,entryDeleted,entryUpdated} from 'ws-handler';
import { withStyles } from '@mui/styles';
import { MenuItem } from '@mui/material';
function Replay({id,FacilityCode,userFacility}){
  const [facilityCodenotmatches,setFacilityCodenotMatches] = React.useState(false);
  const handleClick=()=>{
    console.log(id.id);
  }
  useEffect(()=>{
    if(FacilityCode != userFacility)
    setFacilityCodenotMatches(true);
  })
  return(
    <>
    <IconButton disabled={facilityCodenotmatches}>
      <ReplayIcon onClick={handleClick} /></IconButton></>

  )
}
function Freeze({freeze,ID,FacilityCode,userFacility}){
  const [checked,setchecked] = React.useState(freeze);
  const [updated,setupdated] = React.useState(false);
  const [facilityCodenotmatches,setFacilityCodenotMatches] = React.useState(false);
  const handleChange=(event)=>{
    const data={
      ID:ID,checked:event.target.checked
    }
    setchecked(event.target.checked);
    console.log(data);
    entryUpdated({"eventData" : data});
  }
  useEffect(()=>{
    if(FacilityCode != userFacility)
    setFacilityCodenotMatches(true);
  },[])
  return(
    <>
    <Switch checked={checked} onChange={handleChange} disabled={facilityCodenotmatches}/></>
  )
}
function AssignedUsers({assignedUsersList,ItemKey,locationId,inventorycyclecountsequenceId,assignedUser,FacilityCode,InventoryIdentifier,countstatus,userFacility}){
  const [value,setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState(''); 
  const [assignedusername,setAssigneduserName] = React.useState('');
  const [usersList,setUsersList] = React.useState(assignedUsersList);
  let [removedUserList,setRemovedUserList] = React.useState(assignedUsersList);
  const [facilityCodenotmatches,setFacilityCodenotMatches] = React.useState(false);
  useEffect(async()=>{
    if(assignedUser != null && assignedUsersList.length > 0){
      setValue(assignedUser);
    }
    if(FacilityCode!=userFacility)
    setFacilityCodenotMatches(true);
    if(countstatus == 3 || countstatus == 4){
      let res = await Get("/cycleCountMaintenance/getListOfAssignedUsersForAnItem?ItemKey="+ItemKey+'&InventoryIdentifier='+InventoryIdentifier+'&SequenceId='+inventorycyclecountsequenceId+'&FacilityCode='+FacilityCode)
      console.log(res);
      if(res.data){
        for(let i = 0;i < res.data.length;i++){
          if(res.data[i].CountStatusId != countstatus){
            var obj = usersList.find(o=>o.key === res.data[i].CountedBy);
              removedUserList = removedUserList.filter(item=>item.key != obj.key)
              handlesetRemovedUserList(removedUserList)
            }
          }
        }
    }
  },[assignedUser])
  const handlesetRemovedUserList=(removedUserList)=>{
setRemovedUserList(removedUserList);
  }
  const handleAssignedUsers=async(newValue)=>{
    setAssigneduserName(newValue);
    setValue(newValue);
  }
  return(
    <Autocomplete
      disablePortal
      disabled={facilityCodenotmatches}
      value={value}
      onChange={(event, newValue) => {
        handleAssignedUsers(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={removedUserList}
      getOptionLabel={option => option.value}
      sx={{ width: "auto", marginLeft:0, marginRight:2 }}
      renderInput={(params) => <TextField {...params} variant='outlined' size='small' />}
    />
  )
}
function UpdatedFreeze({freeze,ID}){
  const [checked,setchecked] = React.useState(freeze);
  const [updated,setupdated] = React.useState(false);
  const handleChange=(event)=>{
    setchecked(event.target.checked);
  }
  return(
    <>
    <Switch checked={checked} onChange={handleChange}/></>
  )
}
export default function CycleCountMaintenance({countStatus,assignedUsersList,locationId,row,setRow,facilityCode}){
  const AppName = "CycleCountMaintenance"
const [idArray,setIdArry] = React.useState([1])
const [hide,sethide] = React.useState(true);
const [handlePullDown,setHandlePullDown] = React.useState(false);
const [handleFreeze,setHandleFreeze] = React.useState(false);
const [assignedUser,setAssignedUser] = React.useState(null);
const [countStatusValue,setCountStatusValue] = React.useState(null);
const [items,setItems] = React.useState([]);
const [inputValue,setInputValue] = React.useState('');
const [itemValue,setItemValue]=React.useState();
const URL = 'wss://btxwajfvk6.execute-api.us-east-1.amazonaws.com/dev';
function socketHandler(event){
	if(event.type == "open"){
		//setIsConnected(true);
    console.log('Connected');
	}
	else if(event.type == "close"){
	//setIsConnected(false);
  console.log('Disconnected');
	}
	else if(event.type == "message"){
		console.log(event.data);
    sethide(false);
    //handleChange(event);
	}
	else if(event.type == "error"){
		console.log("Error Occured");
	}
}
useEffect(async () => {
  console.log('In useEffect');
	const connectionObject = {"URL" : URL, "AppName" : AppName, "idArray" : idArray}
	webSocketHandler(connectionObject,{socketHandler});
},[idArray])
  //const [row,setRow] = React.useState([]);
  const [showTable,setShowTable] = React.useState(false);
  function getDescription(id){
    for(let i = 0;i < countStatus.length;i++){
      if(id == countStatus[i].CycleCountStatusId)
      return countStatus[i].CycleCountStatusDescription;
    }
    return "Invalid Id";
  }
  const handleApply=async()=>{
    console.log(countStatusValue);
    let countstatus = countStatusValue?countStatusValue.CycleCountStatusId:'';
    let result;
    let pulldown=handlePullDown?1:0;
    console.log('In apply handleFreeze',handleFreeze);
    let freeze=handleFreeze?1:0;
    let item=itemValue?itemValue:'';
    if(assignedUser != null){
    result=await Get("/cycleCountMaintenance/getCycleCountMaintenanceTable?ItemKey="+item+'&AssignedTo='+assignedUser.key+'&PullDownInitiated='+pulldown+'&CountStatus='+countstatus+'&Freeze='+freeze+'&locationId='+locationId);
    }
    else{
      result=await Get("/cycleCountMaintenance/getCycleCountMaintenanceTable?ItemKey="+item+'&AssignedTo='+''+'&PullDownInitiated='+pulldown+'&CountStatus='+countstatus+'&Freeze='+freeze+'&locationId='+locationId);
    }
    setRow(result.data);
  }
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
      padding: "0px 16px",
      //whiteSpace: 'wrap',
      //textOverflow:'ellipsis',
      //maxWidth:'1px'
    }
  }))(TableCell);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checked,setchecked] = React.useState(false);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handlecheck = (event)=>{
    setchecked(event.target.checked);
  }
  const handleChangePullDown=(event)=>{
    setHandlePullDown(event.target.checked);
    console.log(event.target.checked);
  }
  const handleChangeFreeze=(event)=>{
    setHandleFreeze(event.target.checked);
    console.log(event.target.checked);
  }
  const columns = [
    { id: 'item', label: 'Item' },
    { id: 'pallet', label: 'Pallet/ PicLocation'},
    {
      id: 'currentlocation',
      label:'Current Location',
    },
    {
      id: 'assignedlocation',
      label: 'Assigned Location',
    },
    {
      id:'totalquantity',
      label:'Pallet Quantity',
    },
    {
      id: 'assignto',
      label: 'Assign To',
    },
    {
      id: 'pulldown',
      label: 'PullDown',
    },
    {
      id:'status',
      label:'Status',
    },
    {
      id:'freeze',
      label:'Freeze',
    },
    {
      id:'sel',
      label:'Sel',
    }
  ];
  return(
    <>
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'70%',border:'black'}}>
      <Grid container spacing={0} sx={{paddingLeft:{sm:3,xs:1},paddingRight:{sm:3,xs:1}}}>
        <Grid item xs={12} sm={4} sx={{display:'flex'}}>
    <Autocomplete style={{marginLeft:'30px'}}
    disablePortal
    id="itemSelect"
    options={items}
    inputValue={inputValue}
    onInputChange={async(event,newInputValue)=>{
      setInputValue(newInputValue);
      if(newInputValue.length){
      let res = await Get("/cycleCountMaintenance/getItems?term="+newInputValue);
      console.log(res.data);
      if(res.data){
        while(items.length){
          items.pop();
        }
      for(let i = 0;i < res.data.length;i++){
        items.push(res.data[i].ItemKey);
      }
      setItems(items)
      console.log(items);
    }
  }
    }}
    onChange={(event,value)=>{
      setItemValue(value)
    }}
    sx={{ width: 200,paddingTop:2 ,height:50}}
    size="small"
    renderInput={(params) => <TextField {...params}  label="Select Item"  variant="standard"/>}
    />
        </Grid>
        <Grid item xs={12} sm={4} sx={{display:'flex'}} >
    <Autocomplete
    disablePortal
    id="assignedto"
    value={assignedUser}
    options={assignedUsersList}
    renderInput={(params) => <TextField {...params}  label="Select Assigned To" variant="standard"/>}
    getOptionLabel={(option) => option.value?option.value:''}
    onChange={(_event,newValue)=>{
      setAssignedUser(newValue);
    }}
    sx={{ width: 200,paddingTop:2 }}
    size="small"
    
    />
    </Grid>
    <Grid item xs={6} sm={4} sx={{display:'flex'}} style={{marginTop:'24px'}}>
    <label style={{ fontSize: '16px', fontWeight: 'bold',marginTop:'6px'}}>Pull Down Initiated:</label>
      <Switch checked={handlePullDown} onChange={handleChangePullDown}/>
        </Grid>
        <Grid item style={{marginLeft:'30px'}} sx={{display:'flex'}}>
    <Autocomplete
    disablePortal
    value={countStatusValue}
    id="pulldown"
    options={countStatus}
    getOptionLabel={option=>option.CycleCountStatusDescription}
    onChange={(_event,newValue)=>{
      setCountStatusValue(newValue);
    }}
    sx={{ width: 200,paddingTop:2 }}
    size="small"
    renderInput={(params) => <TextField {...params}  label="Select CountStatus" variant="standard"/>}
    />
        </Grid>
        <Grid item xs={6} md={4} style={{marginLeft:'110px',marginTop:'20px'}} sx={{display:'flex'}}>
        <label style={{ fontSize: '16px', fontWeight: 'bold',marginTop:'6px'}}>Freeze:</label>
      <Switch checked={handleFreeze} onChange={handleChangeFreeze}/>
    </Grid>
        <Grid item sx={{display:'flex'}}>
          <Button size='small' variant='contained' color='primary' style={{marginLeft:'100px',height:'40px',marginTop:'20px'}} onClick={handleApply}>Apply</Button>
        </Grid>
      </Grid>
      </div>
      <div style={{borderLeft:'1px solid black',height:'150px',marginLeft:'0px',marginTop:'0px'}}/>
      <div style={{width:'30%'}}>
        <Grid container spacing={0} sx={{paddingLeft:{sm:3,xs:1},paddingRight:{sm:3,xs:1}}}>
          <Grid sx={{display:'flex'}}>
            <Autocomplete style={{marginLeft:'30px'}}
    disablePortal
    id="itemSelect"
    options={items}
    sx={{ width: 200,paddingTop:2 }}
    size="small"
    renderInput={(params) => <TextField {...params}  label="Select PullDown" variant="standard"/>}
    />
    <Button variant="contained" color='primary' style={{marginLeft:'50px',marginTop:'10px',height:'40px'}}>Go</Button>
          </Grid>
        </Grid>
        <Grid container spacing={0} sx={{paddingLeft:{sm:3,xs:1},paddingRight:{sm:3,xs:1}}}>
          <Grid item sx={{display:'flex'}}>
            <Autocomplete style={{marginLeft:'30px'}}
    disablePortal
    id="countstatus"
    options={assignedUsersList}
    getOptionLabel={option => option.value}
    sx={{ width: 200,paddingTop:2}}
    size="small"
    renderInput={(params) => <TextField {...params}  label="Select Reassign" variant="standard"
    />}

    />
    <Button variant="contained" color='success' style={{marginLeft:'50px',marginTop:'10px',height:'40px'}}>Reset</Button>
          </Grid>
            </Grid>
      </div>
      </div>
      <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <colgroup>
      <col width='5%'/>
      <col width='5%'/>
      <col width='10%'/>
      <col width='11%'/>
      <col width='10%'/>
      <col width='10%'/>
      <col width='5%'/>
      <col width='10%'/>
      <col width='5%'/>
      <col width='5%'/>
      </colgroup>
      <TableHead>
        <StyledTableRow>
          {columns.map((column) => (
            <StyledTableCell style={{fontWeight:'bold'}}
              key={column.id}
            >
              {column.label}
              {column.label=='Sel'?<input type='checkbox' style={{width:'20px',height:'20px'}} checked={checked} onChange={handlecheck}/>:null}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
      <TableBody>
      {row.map(data=>(
          <StyledTableRow hidden={false}>
            <StyledTableCell><Typography component='span' variant="body1">{data.ItemKey}</Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1">{data.InventoryIdentifier}</Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1">{data.CurrentLocation}</Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1">{data.AssignedLocation}</Typography></StyledTableCell>
            <StyledTableCell><Typography component ='span' variant='body1'>{'('+(data.FullLayers * data.CaseTrayPerLayer + data.ExtraCaseTrays)+' * '+data.QuantityPerCaseOrTray+' + '+data.ExtraQuantity+')'+' = '+data.TotalQuantity}</Typography></StyledTableCell>
            <StyledTableCell><AssignedUsers assignedUsersList={assignedUsersList} ItemKey={data.ItemKey} locationId={locationId} inventorycyclecountsequenceId={data.InventoryCycleCountSequenceId}  assignedUser={data.CountedBy} FacilityCode={data.FacilityCode} InventoryIdentifier={data.InventoryIdentifier} countstatus={data.CountStatusId} userFacility={facilityCode}/></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1">{data.IsPullDownCreated?"Yes":"No"}</Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1"><Grid container spacing={0}><Grid item xs style={{marginTop:'10px'}}>{getDescription(data.CountStatusId)}</Grid>
            <Grid item xs style={{marginLeft:'0px'}}><Replay id={data.InventoryCycleCountId} FacilityCode={data.FacilityCode} userFacility={facilityCode}/></Grid>
            </Grid></Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1" style={{marginRight:'30px'}}>
              <Freeze freeze={data.FreezeInventoryType?true:false} ID={data.Id} FacilityCode={data.FacilityCode} userFacility={facilityCode}/></Typography></StyledTableCell>
            <StyledTableCell><Typography component='span' variant="body1"><input type='checkbox' style={{width:'20px',height:'20px',marginLeft:'25px'}} checked={checked&&(data.FacilityCode==facilityCode)?checked:null} disabled={data.FacilityCode != facilityCode ? true:false}/></Typography></StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>
</div>
</>
  )
}