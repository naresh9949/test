import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";

export default function ComboBox(props) {
    
const handleChange = async (event,newValue) => {
    await props.changeHandler(newValue);
}


  return (
    <Autocomplete
    sx={{mt:props.mt?props.mt:null,m:props.margin?props.margin:null}}
    fullWidth
    autoHighlight
    disableClearable
    defaultValue={props.defaultValue}
    size="small"
      disablePortal
      id="combo-box-demo"
      options={props.options}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Change Warehouse" />}
    />
  );
}

