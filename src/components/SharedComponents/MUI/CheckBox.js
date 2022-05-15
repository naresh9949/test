import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox(props) {
  const [checked, setChecked] = React.useState('');

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (props.id){
      props.changeHandler(props.id,event.target.checked);
    }else{
      props.changeHandler(event.target.checked);
    }
   
  };

  return (
    <Checkbox
      sx={{m:props.margin?props.margin:null}}
      style={{margin:"0px",padding:"0px"}}
      checked={props.checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
