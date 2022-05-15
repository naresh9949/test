import * as React from 'react';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

export default function ControlledSwitches(props) {
  const [checked, setChecked] = React.useState('');
  const [loading, setLoading] = React.useState(false);



  const handleChange = async (event) => {
    setChecked(event.target.checked);
    if (props.data){
      setLoading(true)
      props.data[props.id] = event.target.checked;
      await props.changeHandler(props.data);
    }
    else
    props.changeHandler(event.target.value);
    setLoading(false)
  };

  if(loading) return <CircularProgress color="success" size={20}/>
  return (
    <Switch
      size="small"
      checked={checked===''?props.checked?props.checked:false:checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}