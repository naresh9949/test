import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function SelectComponent(props) {
  return (
    <FormControl sx={{ mt: 0.5}} fullWidth>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        
        labelId="demo-simple-select-label"
        id="select"
        name={props.name}
        value={props.value}
        size="small"
        label={props.label}
        onChange={props.handler}
      >
        {props.options.map((printer) => (
          <MenuItem key={printer.PrinterDisplayName} value={printer.PrinterDisplayName}>{printer.PrinterDisplayName}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
