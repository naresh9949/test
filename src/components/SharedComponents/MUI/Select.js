import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from '@mui/material/CircularProgress';

export default function SelectComponent(props) {
  const [opt, setOpt] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = async (event) => {
    if (props.data){
      setLoading(true);
      props.data[props.id] = event.target.value;
      await props.changeHandler(props.data);
    }
    else props.changeHandler(event.target.value);
    setLoading(false);
  };

  if(loading) return <CircularProgress color="success" size={20}/>

  return (
    <FormControl
      style={{ height: props.height ? props.height : null, width: "100px" }}
      sx={{ m: props.margin ? props.margin : 0, minWidth: 120 }}
    >
      {props.label && <InputLabel id="labelid">{props.label}</InputLabel>}
      <Select
        style={{
          height: props.height ? props.height : null,
          width: props.width ? props.width : null,
        }}
        labelId={props.label ? "labelid" : null}
        id="demo-simple-select"
        value={
          opt === "" ? (props.defaultValue ? props.defaultValue : "") : opt
        }
        label={props.label ? props.label : null}
        onChange={handleChange}
        size="small"
      >
        {props.options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
