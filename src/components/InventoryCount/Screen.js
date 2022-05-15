import React from "react";
// import Numpad from "./Numpad";
import Alert from './AlertWrongInput'
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
// import { ThemeProvider } from "styled-components";
import {ThemeProvider } from "@mui/material/styles";
import './cycleCOunt.css'

import { Get, Post } from "../Utilities/AxiosHandler";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { id } from "date-fns/locale";
import Select from "@mui/material/Select";
import { Autocomplete, InputLabel, OutlinedInput , Stack} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import TextField from "@mui/material/TextField";
import { set } from "date-fns";
import { UserContext } from "./../../App.js";
import { useContext } from "react";
import Notification from "../SharedComponents/Notification";
import { Box } from "@mui/system";
import { Details, Today } from "@mui/icons-material";
// import { warning } from "react-router/lib/router";
// import { Details } from "@mui/icons-material";
// import img1 from '../../images/' 
// import Breadcrumbs from "./Breadcrumbs";
// import FontAwesomeIcon from font-awesome

export default function Screen(props) {
  
  let user = useContext(UserContext);
  let facilityCode=user.FacilityCode
  let username= user.Id
  // console.log(facilityCode,username)
  const theme = createTheme({ status: { danger: '#e53e3e', }, palette: { primary: { main: '#000000', darker: '#000000', }, secondary: { main: '#64748B', contrastText: '#fff', }, }, });
  
  const [details,setDetails]= React.useState([])
  const [inventoryStoragTypeId,setInventoryStorageTypeId] = React.useState()
  const [defaultLocation,setDefaultLocation]=React.useState('')
 
  const [locationDropdown,setLocationDropdown]= React.useState(false)
  const [captureItemKeyForSearchingRecord,setCaptureItemKeyForSearchingRecord]=React.useState()

  
  const [val1, setval1] = React.useState('');
  const [val2, setval2] = React.useState();
  const [val3, setval3] = React.useState();
  const [val4, setval4] = React.useState();
  const [val5, setval5] = React.useState();
  const [val6, setval6] = React.useState('');
  const [val7, setval7] = React.useState(0);
  const [val8, setval8] = React.useState(0);
  const [val9, setval9] = React.useState(0);
  const [val10, setval10] = React.useState(0);
  const [val11, setval11] = React.useState(0);
  const [newval4, setNewval4] = React.useState();
  

  const [state1, setState1] = React.useState(true);
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(true);
  const [state4, setState4] = React.useState(false);
  const [state5, setState5] = React.useState(false);
  const [state6, setState6] = React.useState(false);
  const [newstate4, setNewState4] = React.useState(false);
  const [newstate5, setNewState5] = React.useState(false);

  const [btn1, setBtn1] = React.useState(false);
  const [btn2, setBtn2] = React.useState(false);
  const [btn3, setBtn3] = React.useState(false);
  const [btn4, setBtn4] = React.useState(true);

  const [dis, setDis] = React.useState(false);
  const [value, setValue] = React.useState();
  const [snakbar, setSnakbar] = React.useState({ open: false });
   
  const [itemNumber,setItemNumber] = React.useState()
  const [alertDisPallet,setALertDisPallet]= React.useState(false)
  const [alertDisItem,setALertDisItem]= React.useState(false)
  const [finalData,setFinalData]=React.useState({})
  const [itemDropdown,setItemDropDown]=React.useState([])
  const [itemSuggestionCallOk,setItemSuggestionCallOk]=React.useState(false)
  const [itemDetails, setItemDetails]=React.useState()
  const [captureItemKey,setCaptureItemKey]= React.useState()
  const [finalItemKey,setFinalItemKey] =React.useState()
  const [open,setOpen]=React.useState(false)
  const [itemPickSuggestionCallOk,setItemPickSuggestionCallOk]=React.useState(false)
  const [itemPickDropdown,setItemPickDropdown]= React.useState([])

  React.useEffect(async () => {
    let result = await Get(`/cycleCount/getNextLocationForUserCount?FacilityCode=${facilityCode}&UserName=${username}`)
    
    if (result.data.length>=1)
    {
        const curr_details= result.data;
        // setval1(details.CurrentLocation)
        // setInventoryStorageTypeId(details.InventoryStorageTypeId)
        setDetails(curr_details);
        console.log(curr_details.length)
        if(curr_details.length == 1){
          console.log(curr_details)
          setval1(curr_details[0].CurrentLocation)
          // console.log('1')
          setState1(false)
          setState2(true)
          setInventoryStorageTypeId(curr_details[0].InventoryStorageTypeId)
          setFinalData(curr_details[0])
          setDefaultLocation(`${curr_details[0].CurrentLocation} ${curr_details[0].ItemKey}`)
      }
      console.log(locationDropdown)
      console.log(state1)
      console.log(state2)
      // console.log(finalData)
      // console.log(finalData.InventoryStorageTypeId)

      if(curr_details.length>1)
        setDefaultLocation(`${curr_details[0].CurrentLocation} ${curr_details[0].ItemKey}`)
        
        // setval1(details.CurrentLocation)
        // setInventoryStorageTypeId(details.InventoryStorageTypeId)
       
        // console.log(details.length)
       
        
        // console.log(locationDropdown)
        
        
        // console.log(details[0].CurrentLocation)
        // result.data.forEach(location => {
        //   locationArray.push({"label": location.CurrentLocation})
        // })
        // console.log(locationArray)
        // console.log(typeof result.data)
        // setState1(true)
    }
    else{
    // alert('No Location found for the user')
    const snak={
      open:true,
      message:"No Location found for the user",
      severity:"warning"
    };
    setSnakbar(snak)
    setDetails([])
  };
   },[]);

   async function changeHandler2(event) {
    let inputVal = event.target.value;
    console.log(event.key)
    // console.log(finalData)
    // console.log(finalData.InventoryIdentifier)
    if (event.key === "Enter" || event.key === "Tab") {
        const url = `/cycleCount/getPalletsForItemInALocation?inventoryCycleCountSequenceId=${finalData.InventoryCycleCountSequenceId}&countStatusId=${finalData.CountStatusId}&itemKey=${finalData.ItemKey}&inventoryStorageTypeId=${finalData.InventoryStorageTypeId}&currentLocation=${finalData.CurrentLocation}&facilityCode=${user.FacilityCode}&inventoryIdentifier=${inputVal}`
        const res = await Get(url);
        console.log(res)
        if(res && res.data && res.data.success){
          setFinalData(res.data.data);
      setval2(inputVal);
      setState2(false);
      setState3(true);
        }
        else{
          setOpen(true)
          setALertDisPallet(true)
            
        }
    }
  }
  
  let multipleItems=[]
  const changeHandler3=async(event)=> {
    let inputVal = event.target.value;
    if (event.key === "Enter" || event.key=== "Tab") {
      console.log("Iwas pressed");
      const obj={'LotId' : inputVal}
      console.log(obj)
      try{
        const res=await Get(`/cycleCount/getLotDetails?LotId=${inputVal}`)
        console.log(res.data)
        if(res.data.length === 1)
          {
            setval4(`${res.data[0].item.itemKey} ${res.data[0].item.descriptionShort}`)
            // setItemDetails(res.data)
            setItemNumber(res.data[0].itemNumber)
            setCaptureItemKey(res.data[0].itemNumber)
            setval3(inputVal);
            setState3(false);
            setState4(true);
            setItemSuggestionCallOk(false)
          }
        else if(res.data.length>1)
        {
          console.log(res.data)
          for(let i=0;i<res.data.length;i++)
            multipleItems.push({label: `${res.data[i].item.itemKey} ${res.data[i].item.descriptionShort}`,value: `${res.data[i].item.itemKey}`})
            console.log(multipleItems)
            setItemDropDown(multipleItems)
            setItemSuggestionCallOk(true)
            setval3(inputVal);
            setState3(false);
            setState4(true);
        }
        else{
          console.log(res)
          setState6(true)
          setState3(false)
        }
        // const result= await Get(`/cycleCount/getItemSuggestions?ItemKey=${details.ItemKey}`)
        // console.log(result)
        // if(result.data)
        //   {
        //     if(result.data.length==1)
        //       {
        //         setval4(result.data[0].label)
        //         setCaptureItemKey(result.data[0].value)
        //       }
        //     else
        //         setItemDropDown(result.data)
        //   }
        // else
        //   console.log(result)
      }
      catch(er){
        console.log(er)
      }
      // setval3(inputVal);
      // setState3(false);
      // setState4(true);
      // setItemSuggestionCallOk(false)
      // setState5(true)
    }
  }
  function setValue4(val)
  {
    console.log("Weel I'm here")
    setval4(val)
  }
 
  const changeHandler4=async(event) =>{
    let inputVal = event.target.value;
    console.log(inputVal);
    if (event.key === "Enter") {
      // console.log("Iwas pressed");
      // if(inputVal === finalData.ItemKey)
      // {
        // setItemSuggestionCallOk(true)
        try{
          const result= await Get(`/cycleCount/getItemSuggestions?ItemKey=${inputVal}`)
          console.log(result.data)
          if(result.data)
            {
              if(result.data.length==1)
                {
                  console.log('Hi',result.data[0].label)
                  // setValue4(result.data[0].label)
                  setval4(`${result.data[0].label}`)
                  console.log(val4)
                  // setval4(result.data[0].label)
                  setCaptureItemKey(result.data[0].value)
                  setFinalItemKey(result.data[0].value)
                }
                else{
                  setItemDropDown(result.data)
                  setItemSuggestionCallOk(true)
                  setval4(inputVal);
                }
              }
              else
              console.log(result)
            }
            catch(er){
              console.log(er)
            }
            // setState4(false);
            console.log(val4)
        
        // setState5(true);
      // }
        // const obj={'ItemKey' : inputVal}
      // else{
      //     setOpen(true)
      //     setALertDisItem(true)
      // }
    }
  }
  
 
  const changeHandler5=async(event)=>{
      let inputVal = event.target.value;
      console.log(event)
      if(event.key === "Enter"){
          setState6(false)
          setval6(inputVal)
          setval4(inputVal);
      }
  }
  
  const changeHandler4_2=async(event) =>{
    // let inputVal = event.target.value;
    // console.log(inputVal);
    // if (inputVal) {
    //   setval4(inputVal);
    // }
    if(itemNumber == finalData.ItemKey || (captureItemKey == finalItemKey && finalItemKey.includes(finalData.ItemKey)))
    {
      // try{
      //   const res= await Get(`/cycleCount/getItemSuggestions?ItemKey=${details.ItemKey}`)
      //   console.log(res.data)
      //   if(res.data)
      //   {
      //     if(res.data.length ==1)
      //     {
      //       setval4('')
      //       setval4(result.data[0].label)
      //       setCaptureItemKey(result.data[0].value)
      //     }
      //     else{
      //       setItemDropDown(res.data)
      //       setItemSuggestionCallOk(true)
      //     }   
      //   }
      // }
      // catch(er){
      //   console.log(er)
      // }
      // setCaptureItemKey(itemNumber)
      try{

        let res = await Get(`/cycleCount/getFieldsForDisplay?ItemKey=${captureItemKey}`)
        if(res.data)
        {
            console.log(res.data)
            // setFieldVals(res.data);
            // setval4(details.label)
            console.log(res.data.NumOfFullLayers.quantity)
            setval7(res.data.NumOfFullLayers.quantity)
            setval8(res.data.CasesOrTrayPerLayer.quantity)
            setval9(res.data.CasesOrTrayInPartialLayer.quantity)
            setval10(res.data.EachesPerCaseOrTray.quantity)
            setval11(res.data.EachesInPartialCaseOrTray.quantity)
            // setFieldDetails(details)
            setState4(false);
            setState5(true)
        }
      }
      catch(er){
        console.log(er)
      }
    }
    else
    {
      setOpen(true)
      setALertDisItem(true)
      setItemSuggestionCallOk(false)
      console.log(val4,'Hi')
      // setval4('')
      // setval4(details.ItemKey)
      console.log(val4)
      
    }
    console.log(event.target.value)
    // console.log(itemValue)
      
    // setState4(false);
    // setState5(true)
  }
  function changeHandler4_2_1(event){
      setState6(false);
      setState4(false);
      setState5(true);
  }
  let chosenLocation=[]
 
  const handleConfirmLocation=()=>{
    console.log(val1)
    setState1(false)
    setState2(true)
    setNewState4(true)
    const chosenLoc = details.find(o => o.CurrentLocation == val1 && o.ItemKey == captureItemKeyForSearchingRecord)
    console.log(chosenLoc)
    chosenLocation.push(chosenLoc)
    console.log(chosenLocation)
    // console.log(chosenLocation[0].InventoryIdentifier,chosenLocation[0].ItemKey)
    setFinalData(chosenLocation[0])
    setInventoryStorageTypeId(chosenLocation[0].InventoryStorageTypeId)
  }
  function captureInput1(event) {
    setval2(event.target.value);
  }
  function captureInput2(event) {
    setval3(event.target.value);
  }
  function captureInput3(event,value) {
    console.log(value)
    if(value !== null)
    {
      setval4(value.label);
      setCaptureItemKey(value.value)
      setFinalItemKey(value.value)
    }
    else
      setval4('');

}
function captureInputItem(event)
{
  setval4(event.target.value)
}
function captureInput4(event) {
    setval6(event.target.value);
    setval4(event.target.value);
  }
  
function captureInput5(event,value){
  console.log(event.target.value)
  console.log(value)
  if(!value)
    return;
  let selectedOption=value.split(" ")
  console.log(selectedOption)
  setCaptureItemKeyForSearchingRecord(selectedOption[1])
  setval1(selectedOption[0])
  setDefaultLocation(value)
  // chosenLocation = locationArray.find(o => o.CurrentLocation == value.label)
  // console.log(chosenLocation)
  // setInventoryStorageTypeId(chosenLocation.InventoryStorageTypeId)

}
function handleCancelPallet(){
  setState2(false);
  setState1(true)
  setval2('')
}
  function handleCancelLot() {
    setState3(false);
    setState2(true);
    setval3('')
  }
  function handleCancelItem() {
    setState4(false);
    setState3(true);
    setState6(false)
    setval4('')
    setval6('')
  }
  function handleCancelLayer() {
    setState5(false);
    setState4(true);
    setval5('')
    setStateTotal(false)
    setQuantity(0)
    // setItemSuggestionCallOk(false)
    // setState6(true);
  }

  function buttonHandler1() {
    setBtn1(true);
  }
  function buttonHandler2() {
    setBtn2(true);
  }
  function buttonHandler3() {
    setBtn3(true);
  }
  function numpadShow() {
    setDis(true);
  }
  // function display(){
  //     console.log(details.InventoryStorageTypeId)
  // }
  function handleNoLotClick(){
    // setState6(true);
    setState3(false);
    setState4(true)
    setval3('')
  }
  function changeLayerFieldValue(event){
    setval7(event.target.value)
  }
  function changeLayerOfFieldValue(event){
    setval8(event.target.value)
  }
  function changeExtraTraysFieldValue(event){
    setval9(event.target.value)
  }
  function changeTrayOfFieldValue(event){
    setval10(event.target.value)
  }
  function changeExtraBottlesFieldValue(event){
    setval11(event.target.value)
  }
  const [quantity,setQuantity] =React.useState(0)
  const [stateTotal,setStateTotal]= React.useState(false)
  const displayTotalQuantity=async()=>{
      const totalQuantity =(val7 * val8 + (Number)(val9))* val10 + (Number)(val11)
      console.log(totalQuantity)
      console.log(totalQuantity)
      setQuantity(totalQuantity)
      setStateTotal(true)
      let today= new Date();
      let currTime=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
      console.log(currTime)
      const obj={
                  "inventoryCycleCountId":finalData.InventoryCycleCountId,
                  "inventoryIdentifier":finalData.InventoryIdentifier,
                  "inventoryStorageTypeId":finalData.InventoryStorageTypeId,
                  "facilityCode":facilityCode,
                  "itemKey":finalData.ItemKey,
                  "currentLocation":finalData.CurrentLocation,
                   "countStatusId":finalData.CountStatusId,
                   "totalQuantity": totalQuantity,
                   "fullLayers": val7, 
                   "caseTrayPerLayer": val8, 
                   "extraCaseTrays" : val9, 
                   "quantityPerCaseOrTray": val10, 
                   "extraQuantity": val11,
                   "inventoryCycleCountId": finalData.InventoryCycleCountId,
                   "countedBy":username,
                   "countedAt":currTime,
                   "facilityCode":facilityCode,
                   "userName": username 
                }
      console.log(obj)
      try{
        const result= await Post ('/cycleCount/updateTotalQuantityFunctionality',obj)
        console.log(result)
        if(result.data.Success == true){
          const snak={
            open:true,
            message:result.data.Message,
            severity:"success"
          };
          setSnakbar(snak)
        }
        else if(result.data.Success == false){
          const snak={
            open:true,
            message:result.data.Message,
            severity:"warning"
          };
          setSnakbar(snak)
        }
        else{
        const snak={
          open:true,
          message:result.data,
          severity:"warning"
        };
        setSnakbar(snak)}
      }
      catch(er){
        console.log(er)
      }
      
  }
  

  
  const changeHandlerPickItem = async(event)=>{
    let inputVal = event.target.value;
    console.log(inputVal);
    if (event.key === "Enter") {
      console.log("I was pressed");
      // if(inputVal === finalData.ItemKey)
      // {
        // setItemSuggestionCallOk(true)
        try{
          const result= await Get(`/cycleCount/getItemSuggestions?ItemKey=${inputVal}`)
          console.log(result.data)
          if(result.data)
            {
              if(result.data.length==1)
                {
                  console.log('Hi',result.data[0].label)
                  // setValue4(result.data[0].label)
                  setNewval4(`${result.data[0].label}`)
                  console.log(newval4)
                  // setval4(result.data[0].label)
                  setCaptureItemKey(result.data[0].value)
                  setFinalItemKey(result.data[0].value)
                }
                else{
                  setItemPickDropdown(result.data)
                  setItemPickSuggestionCallOk(true)
                  setNewval4(inputVal);
                }
              }
              else
              console.log(result)
            }
            catch(er){
              console.log(er)
            }
            // setState4(false);
            console.log(newval4)
    }
  }
  const captureInputItemPick=(event)=>{
    setNewval4(event.target.value)
  }
  const capturePickInput3=(event,value)=>{
    console.log(value)
    if(value !== null)
    {
      setNewval4(value.label);
      setCaptureItemKey(value.value)
      setFinalItemKey(value.value)
    }
    else
      setNewval4('');
  }
  const handleCancelPickItem=()=>{
    setNewState4(false)
    setState1(true)
    setNewval4('')
  }
  const changeHandlerPickConfirm= async(event)=>{
    if(captureItemKey == finalItemKey && finalItemKey.includes(finalData.ItemKey))
    {
      try{

        let res = await Get(`/cycleCount/getFieldsForDisplay?ItemKey=${finalItemKey}`)
        if(res.data)
        {
            console.log(res.data)
            // setFieldVals(res.data);
            // setval4(details.label)
            console.log(res.data.NumOfFullLayers.quantity)
            setval7(res.data.NumOfFullLayers.quantity)
            setval8(res.data.CasesOrTrayPerLayer.quantity)
            setval9(res.data.CasesOrTrayInPartialLayer.quantity)
            setval10(res.data.EachesPerCaseOrTray.quantity)
            setval11(res.data.EachesInPartialCaseOrTray.quantity)
            // setFieldDetails(details)
            setNewState4(false);
            setNewState5(true)
        }
      }
      catch(er){
        console.log(er)
      }
    }
    else{
      setOpen(true)
      setALertDisItem(true)
      setItemPickSuggestionCallOk(false)
    }
  }
const handleCancelPickLayer=(event)=>{
    setNewState5(false);
    setNewState4(true);
    // setval5('')
    setStateTotal(false)
    setQuantity(0)
}



const getLabels = (data)=>{
  let labels = [];
  for(let i=0;i<data.length; i++)
  {
    const currentLabel = data[i].CurrentLocation+" "+data[i].ItemKey;
    labels.push(currentLabel)
  }
  let validLabesls = [...new Set(labels)];
  return validLabesls;
}

const getAllLabels = (location,itemKey) =>
{
  let labels ="";
  for(let i=0;i<details.length; i++)
  {
    if(details[i].CurrentLocation == location && details[i].ItemKey == itemKey)
    labels = labels+(labels==""?"":", ")+details[i].InventoryIdentifier; 
  }
  return labels;
}
  
  return (
     <div className="card"> 
     {/* <button onClick={display}>Click</button> */}
    <div className="main-body">
    {/* <button onClick={display}>Click This</button> */}
    {snakbar.open && (
        <Notification
          open={snakbar.open}
          close={setSnakbar}
          time={2000}
          message={snakbar.message}
          severity={snakbar.severity}
        />
      )}
    {alertDisPallet? (
        <Alert  label='Pallet' labelId={getAllLabels(finalData.CurrentLocation,finalData.ItemKey)} currentLoc={finalData.CurrentLocation} inventoryCycleCountId={finalData.InventoryCycleCountId} open={open} setOpen={setOpen} setVal={setval2}/>
      ):null}
    {alertDisItem? (
        <Alert  label='Item Key' labelId={finalData.ItemKey} currentLoc={finalData.CurrentLocation} inventoryCycleCountId={finalData.InventoryCycleCountId} open={open} setOpen={setOpen} setVal={setval4}/>
      ):null}
      {/* LOCATION */}
      {(details.length==1)?<><label>Location:</label>&nbsp;<span>{details[0].CurrentLocation}</span> &nbsp;&nbsp;<span>(Item:{details[0].ItemKey})</span><br/> </>:null}
      {state1 && (details.length>1)? 
      <> 
        <label>Location: </label>
        {/* <p>{locationArray[0].label}</p> */}
        
        
        {(details.length >1) &&<Autocomplete 
          
         
          options={getLabels(details)}
          value={defaultLocation}
          sx={{m:0,width: 300}}
          // defaultValue={locationArray[0].label}
          onChange={(event,newVal)=>captureInput5(event,newVal)}
          renderInput={(params) => <TextField   autoFocus {...params} variant="standard"/>}
          
        />}
        {/* <br/> */}
        {/* <Select
          value={val1}
          sx={{width:300}}
          onChange={captureInput5}
          variant="standard"
        >
          {details.map(location =>{
            return(
              
              
              <MenuItem key={location.InventoryCycleCountId} value={location.CurrentLocation}>{location.CurrentLocation + location.ItemKey}</MenuItem>
            )
          })}
        </Select><br/> */}
        {(details.length>1)? <>&nbsp;<button  color="primary"
                variant="contained"
                className="btn-1">Cancel</button>&nbsp;&nbsp;
          <button  color="primary"
                variant="contained"
                className="btn-2" onClick={handleConfirmLocation}>Confirm</button></>:null}
      </>:null}
      {!state1 && details.length>1 ?
      <>
        <label>Location: </label>
        &nbsp;<span>{val1}</span>&nbsp;&nbsp;
        <span style={{fontSize:'medium'}}>(Item:{finalData.ItemKey})</span><br/>
      
      </>:null}
      
      {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
      {inventoryStoragTypeId ===1 ? 
        <>
          {!state1 && state2 ? (
        <>
          {/* <br /> */}
          <label>Pallet#:</label>
          <br />
          <TextField
            type="text"
            value={val2}
            size="small"
            sx={{width:300}}
            onKeyDown={changeHandler2}
            autoFocus
            onClick={buttonHandler1}
            onChange={captureInput1}
          />
          <br />
          &nbsp;<button  color="primary"
                variant="contained"
                className="btn-1" onClick={handleCancelPallet}>Cancel</button>&nbsp;&nbsp;
          <button  color="primary"
                variant="contained"
                className="btn-2">Is Empty</button>
        </>
      ) : null}
      {!state2 && !state1 ? (
        <span>
          <label>Pallet#:</label>
          &nbsp;<span>{val2}</span>
        </span>
      ) : null}
      
      {/* LOT */}
      {!state2 && state3 && !state1 ? (
        <>
          <br />
          <label>Lot:#</label>
          <br />
          <TextField
            type="text"
            size="small"
            sx={{width:300}}
            autoFocus
            onKeyDown={changeHandler3}
            onClick={buttonHandler2}
            onChange={captureInput2}
          />
          <br />
          &nbsp;
          <button className="btn-1" onClick={handleCancelLot}>
            Cancel
          </button>
          &nbsp;&nbsp;
          <button className="btn-2" onClick={handleNoLotClick}>No Lot</button>
        </>
      ) : null}
      {!state3 && !state2 && !state1 ? (
        <>
          {/* <br /> */}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>Lot#:</label>
          &nbsp;<span>{val3}</span>
        </>
      ) : null}
      
      {(state6 && !state4 && !state1)?
      <>
        <br/><label>Item</label><br/>
        <div className="item">
            <div className="item_input">
              <TextField
                // className="diff"
                autoFocus
                value={val6}
                type="text"
                onKeyPress={changeHandler5}
                onClick={buttonHandler3}
                onChange={captureInput4}
              />
              {/* <button className="cross">
                <span>X</span>
              </button> */}
            </div>
            {/* <img src="..\..\images\numeric-keypad(1).png"></img> */}
            
            {/* <button className="Numpad" onClick={numpadShow}>
              Numpad
            </button> */}
        </div>
        {/* <br/> */}
        <div className="expiry">
            <label>Expiry</label>&nbsp;&nbsp;&nbsp;
            <input type='month' className="month"></input>
        </div>
        {/* <br/> */}
        &nbsp;
        <button className="btn-1" onClick={handleCancelItem} color="primary"
                variant="contained"
                >
            Cancel
        </button>
    
          &nbsp;&nbsp;
        <button className="btn-2"  onClick={changeHandler4_2_1} color="primary"
                variant="contained">
            Confirm
        </button>
        {/* <input type='year'></input> */}
      </>:null
    }
     {!state6 && !state4 && !state2 && !state3 && !state1 && val6 === val4? (
        <>
          <br />
          <label>Item:</label>
          &nbsp;<span>{val6}</span>
        </>
      ) : null}
      {!state3 && state4 && !state2 && !state6 &&!state1? (
        <>
          <br />
          
            <label id="Item-Dropdown">Item</label>
            
            {!itemSuggestionCallOk?(<><br/><TextField variant="standard" autoFocus value={val4} sx={{width: 300}} onKeyPress={changeHandler4} onChange={captureInputItem}/></>):null}
            {itemSuggestionCallOk && <Autocomplete 
              
              id="Item-DropDown"
              value={val4}
              
              openOnFocus
              options={itemDropdown}
              // value={val4}
              sx={{m:0,width: 300}}
              // autoHighlight
              // onKeyPress={changeHandler4}
              onChange={(event,newVal)=>captureInput3(event,newVal)}
              renderInput={(params) => <TextField  autoFocus {...params} variant="standard"/>}
            />}
            {/* </FormControl> */}
          <br />
           
          &nbsp;
          {/* //<Button sx ={{maxWidth:45}}>SOham</Button> */}

          <button className="btn-1" onClick={handleCancelItem} color="primary"
                variant="contained"
                >
            Cancel
          </button>
    
          &nbsp;&nbsp;
          <button className="btn-2" onClick={changeHandler4_2} color="primary"
                variant="contained">
            Confirm
          </button>
          {/* <br/> */}
        </>
      ) : null}
      {!state4 && !state3 && !state2 && !state6 && !state1 && val6 === ''? (
        <>
          <br />
          <label>Item:</label>
          &nbsp;<span>{val4}</span>
        </>
      ) : null}
      
      {/* {state4 && dis ? <Numpad display={dis} changeHandler={setValue} /> : null} */}
      {/* LAYER */}
      {!state4 && state5 && !state3 && !state2 && !state1 ? (
        
        <>
          <br />
          <br />
          <table className="cc">
            <tbody>

            <tr>
              <td>Layers</td>
              <td>
                <TextField type="number" autoFocus inputProps={{tabIndex:"1"}} value={val7} onChange={changeLayerFieldValue}/>
              </td>
              <td>&nbsp;&nbsp;Layer &nbsp;of</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"4"}} value={val8} onChange={changeLayerOfFieldValue}/>
              </td>
            </tr>
            <tr>
              <td>Extra Trays</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"2"}} value={val9} onChange={changeExtraTraysFieldValue}/>
              </td>
              <td>&nbsp;&nbsp;Tray &nbsp;of</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"5"}} value={val10} onChange={changeTrayOfFieldValue}/>
              </td>
            </tr>
            <tr>
              <td>Extra Bottles</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"3"}} value={val11} onChange={changeExtraBottlesFieldValue}/>
              </td>
            </tr>
            </tbody>
          </table>
          <>
            &nbsp;<button className="btn-1" onClick={handleCancelLayer} >Cancel</button>&nbsp;&nbsp;
            <button className="btn-2" onClick={displayTotalQuantity}>Confirm</button>
          </>
        </>
      ) : null}
      {!btn4 ? (
        <>
          &nbsp;<button className="btn-1">Cancel</button>&nbsp;&nbsp;
          <button className="btn-2" >Confirm</button>
        </>
      ) : null}
      {stateTotal?(
          <>
            <br/>
            <label>Total Quantity: &nbsp;&nbsp;{quantity}</label>
          </>
      ):null}
        
        </>:null}
        {inventoryStoragTypeId == 2?
        <>
          {!state1 && newstate4?
          <>

          
          <label id="Item-Dropdown">Item</label>
            
            {!itemPickSuggestionCallOk?(<><br/><TextField variant="standard" autoFocus value={newval4} sx={{width: 300}} onKeyPress={changeHandlerPickItem} onChange={captureInputItemPick}/></>):null}
            {itemPickSuggestionCallOk && <Autocomplete 
              
              id="Item-DropDown"
              value={newval4}
              
              openOnFocus
              options={itemPickDropdown}
              // value={val4}
              sx={{m:0,width: 300}}
              // autoHighlight
              // onKeyPress={changeHandler4}
              onChange={(event,newVal)=>capturePickInput3(event,newVal)}
              renderInput={(params) => <TextField  autoFocus {...params} variant="standard"/>}
              />}
            {/* </FormControl> */}
          <br />
           
          &nbsp;
          {/* //<Button sx ={{maxWidth:45}}>SOham</Button> */}

          <button className="btn-1" onClick={handleCancelPickItem} color="primary"
                variant="contained"
                >
            Cancel
          </button>
    
          &nbsp;&nbsp;
          <button className="btn-2" onClick={changeHandlerPickConfirm} color="primary"
                variant="contained">
            Confirm
          </button>
          {/* <br/> */}
                
      </>:null}
      {!state1 && !newstate4?
        <>
          
          <label>Item:</label>
          &nbsp;<span>{newval4}</span>
        </>:null
      }
      {!state1 && !newstate4 && newstate5?
      <>
        <br />
          <br />
          <table className="cc">
            <tbody>

            <tr>
              <td>Layers</td>
              <td>
                <TextField type="number" autoFocus inputProps={{tabIndex:"1"}} value={val7} onChange={changeLayerFieldValue}/>
              </td>
              <td>&nbsp;&nbsp;Layer &nbsp;of</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"4"}} value={val8} onChange={changeLayerOfFieldValue}/>
              </td>
            </tr>
            <tr>
              <td>Extra Trays</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"2"}} value={val9} onChange={changeExtraTraysFieldValue}/>
              </td>
              <td>&nbsp;&nbsp;Tray &nbsp;of</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"5"}} value={val10} onChange={changeTrayOfFieldValue}/>
              </td>
            </tr>
            <tr>
              <td>Extra Bottles</td>
              <td>
                <TextField type="number" inputProps={{tabIndex:"3"}} value={val11} onChange={changeExtraBottlesFieldValue}/>
              </td>
            </tr>
            </tbody>
          </table>
          <>
            &nbsp;<button className="btn-1" onClick={handleCancelPickLayer} >Cancel</button>&nbsp;&nbsp;
            <button className="btn-2" onClick={displayTotalQuantity}>Confirm</button>
          </>
      </>:null}
      {stateTotal?(
          <>
            <br/>
            <label>Total Quantity: &nbsp;&nbsp;{quantity}</label>
          </>
      ):null}
                </>:null}
      {/* PALLET */}
      
      
    </div>
    </div>
  )

//   else{
//       return(
//         <div className="card">
//             <div className="main-body">
//                 <label>Location: </label>
//                 &nbsp;<span>{val1}</span>
//                 <br />
                
                
                
//             </div>
//         </div>
//       )
//   }
}
{/* <label>Item</label>
                <br />
                <div className="item">
                <div className="item_input">
                    <input
                        className="diff"
                    
                    type="text"
                    
                    />
                <button className="cross">
                    <span>X</span>
                </button>
                </div>
                
                </div>
                &nbsp;
          

                <button className="btn-1" onClick={handleCancelItem} color="primary"
                    variant="contained"
                >
                    Cancel
                </button>
    
                &nbsp;&nbsp;
                <button className="btn-2" onClick={changeHandler4_2} color="primary"
                        variant="contained">
                    Confirm
                </button>  */}