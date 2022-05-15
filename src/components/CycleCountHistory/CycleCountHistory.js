import React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Select } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import  TextField  from "@mui/material/TextField";
import { Get, Post } from '../Utilities/AxiosHandler';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExportButton from './../SharedComponents/FileButtons/ExportBtn'
import moment from 'moment';
import Grid from '@mui/material/Grid';
export default function CycleCountHistory(){
    const [ChangeLocationCode, setChangeLocationCode] = React.useState('');
    const [LocationCodes, setLocationCodes]= React.useState([])
    const [FromDate, setFromDate] = React.useState(null);
    const [Todate,setTodate] = React.useState(moment(new Date()).format("YYYY-MM-DD"))
    const [FinalResult, setFinalResult] = React.useState([" "])
    useEffect( async () => {
      
      let result = await Get(`/common/getLocationCodeList`, 'prssvl')
      if (result.data){
        const codes = result.data;
        setLocationCodes(codes);
      } 
    }, []);

    const handleChangeLocationCode=async(event)=>{
      // console.log(event.target.value)
      setChangeLocationCode(event.target.value)
      // const res = await Get(`/cycleCountHistory/getCycleCountHistory?LocationCode=`+event.target.value)
    }
    //Maintenance?a=1&b=2
    const handlefetch=async()=>{
      const res = await Get(`/cycleCountHistory/getCycleCountHistory?LocationCode=`+ChangeLocationCode+"&"+"ToDate="+Todate+"&"+"FromDate="+FromDate)
      if(res.data){
        const res1 = res.data
        setFinalResult(res1)
      }
    }
    const data = {
      'LocationCode': ChangeLocationCode,
      'FromDate': FromDate,
      'ToDate': Todate
    }
    return(
        <Box sx={{ m: 1}}>
        <div>
        <Paper elevation={0} sx={{ width: "100%", m: 1 }}>
        <Stack direction="row" sx={{mt:5}} >
        <FormControl sx={{ m: 1, width:'200px' }} size="small">
      <InputLabel label="LocationCode">LocationCode</InputLabel>
      <Select
        name="LocationCode"
        role="ChooseLocationCode"
        labelId="LocationCodes"
        id="LocationCodes"
        value={ChangeLocationCode}
        label="LocationCode"
        onChange={handleChangeLocationCode}
      >
        <MenuItem key="LocationCode" value="">
          <em>All LocationCodes</em>
        </MenuItem>
        {LocationCodes.map(ele => {
                return (
                  <MenuItem key={ele.LocationCode} value={ele.LocationCode}>
                    {ele.LocationCode}
                  </MenuItem>
                )
              })}
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, width:'200px' }} role="ChooseFromDate" name="FromDate" size="small">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        size="small"
        label="From"
        value={FromDate}
        onChange={(newValue) => {
          const date = moment(newValue).format("YYYY-MM-DD")
          setFromDate(date);
        }}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
    </FormControl>
    <FormControl sx={{ m: 1, width:'200px' }} role="ChooseToDate" size="small">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        size="small"
        label="To"
        value={Todate}
        onChange={(newValue) => {
          const date = moment(newValue).format("YYYY-MM-DD")
          // console.log("Date new:",date)
          setTodate(date)
        }}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
    </FormControl>
    {/* {console.log("FinalResult:",FinalResult[0])} */}
    <FormControl sx={{ m: 1, width:'200px' }} size="small">
    <ExportButton reportId="CycleCountHistory" data={data} />
    </FormControl>
    </Stack>
        </Paper>
        </div>
        </Box>
    )
}