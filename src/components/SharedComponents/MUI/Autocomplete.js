import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
const StyledInput = styled(TextField)`
  & .MuiInputBase-input {
    height: 0.5rem;
    margin:0.1rem;
    width:'100%';
    padding:0rem;
  }
`;
export default function ComboBox(props) {
    const [loading, setLoading] = React.useState(false);
const handleChange = async (event,newValue) => {
    setLoading(true);
    props.data[props.id] = newValue;
    await props.changeHandler(props.data);
    setLoading(false);
}

if(loading) return <CircularProgress color="success" size={20}/>
  return (
    <Autocomplete
    fullWidth
    defaultValue={props.defaultValue}
    disableClearable
    size="small"
      disablePortal
      id="combo-box-demo"
      options={props.options}
      onChange={handleChange}
      renderInput={(params) => <StyledInput {...params}/>}
    />
  );
}

