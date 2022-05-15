import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {useContext} from 'react';
import { UserContext } from "./../../App.js";
import {Get,Post} from '../Utilities/AxiosHandler.js';
import { useEffect } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Spinner from './../../components/SharedComponents/Loaders/Spinner';
import CycleCountMaintenance from './CycleCountMaintenance';
import CycleCountAssignment from './CycleCountAssignment';
export default function CycleCount() {
  const [value, setValue] = React.useState(0);
  const [locationCode,setLocationCode] = React.useState('');
  const [locationId,setLocationId] = React.useState('');
  const [assignedUsersList,setAssignedUsersList] = React.useState([]);
  const [freezeStoargeIds, setFreezeStoargeIdsIds] = React.useState([]);
  const [countStatus,setCountStatus] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [rows,setRows] = React.useState([]);
  const [row,setRow] = React.useState([]);
  let optionsforfreeze = [];
  let user = useContext(UserContext);
  let facilityCode = user.FacilityCode;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    let result = await Get("/cycleCountAssignment/getfreezestoragetype");
    if(result){
    setFreezeStoargeIdsIds(result.data);
  }
    let url = '/common/getLocationCodeandLocationId?facilityCode=' + facilityCode;
    let res = await Get(url, 'prssvl');
   if(res.data && res.data[0]){
      setLocationCode(res.data[0].LocationCode);
      setLocationId(res.data[0].LocationId);
    let url1 = "/common/getAssignedUsersList?locationCode=" + res.data[0].LocationCode;
    //let allowedRoles='PRCC - Administrator,PRCC - Supervisor,PRCC - Standard User'
    let allowedRoles = localStorage.getItem('AllowedUserRoles');
    let allowedRolesArr = allowedRoles.split(",");
    for (let i = 0; i < allowedRolesArr.length; i++) {
      url1 += "&userRoles=" + allowedRolesArr[i];
    }
  let res1 = await Get(url1, 'prssvl');
    //let res1 = {"Header":{"IsSuccess":true,"Code":0},"Body":{"UserList":{"cvacca":"Chris Vacca","hlindgren":"Hans Lindgren","kcimo":"Kristen Cimo Straub","pk":"Krishna Padmanabhan","apacheco":"Alberta Pacheco","001514":"Chayanne Colon","001581":"Maximo Villasagua","001747":"Yaritza Crespo ","kbramer":"Kenneth Bramer","001954":"Julio Arroyo","bmcfarland":"Brad McFarland","001961":"Steve Weston","001970":"Patrick Collins","jruotolo":"Joanna Ruotolo","dkhurshid":"Danish Khursid","002040":"JR Albarran","002070":"Sabrina Gidley","prsindtest":"Test Account","manjulas":"Manjula  Subramanya","smandal":"Subroto Mandal"}}}
   //console.log(res1);
   if(res1.data) {
    if(res1.data.Header.IsSuccess){
      if(res1.data.Body){
      res1 = res1.data.Body.UserList;
    //res1=res1.Body.UserList;
    const keys = Object.keys(res1);
    console.log(keys);
    keys.forEach((key, index) => {
      var obj = {};
      obj['key'] = key;
      obj['value'] = res1[key];
      assignedUsersList.push(obj);
    });
    setAssignedUsersList(assignedUsersList);
  }
}
   }
  }
    let res3 = await Get("/cycleCountMaintenance/getCycleCountStatus");
    if(res3.data){
      setCountStatus(res3.data);
    }
    if(res3.status===200 && result.status===200 && res.status===200)
    setLoading(false);
  },[])
  if(loading) return(<Spinner/>);

  return (
    <>
    <Box sx={{ width: '100%' }} >
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Cycle Count Assignment" style={{fontWeight: 'bolder'}} value={0} />
        <Divider orientation='vertical' variant='middle' flexItem style={{fontWeight: 'bold'}}/>
        <Tab label="Cycle Count Maintenance" value={1}/>
      </Tabs>
    </Box>
    {value==0?<CycleCountAssignment assignedUsersList={assignedUsersList} locationId={locationId} locationCode={locationCode} freezeStoargeIds={freezeStoargeIds} rows={rows} setRows={setRows}/>
      : <CycleCountMaintenance countStatus={countStatus} assignedUsersList={assignedUsersList} locationId={locationId} row={row} setRow={setRow} facilityCode={facilityCode}/>}
      </>
  );
}