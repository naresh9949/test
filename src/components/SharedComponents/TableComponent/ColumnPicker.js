import React,{ useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import ViewWeekSharpIcon from '@mui/icons-material/ViewWeekSharp';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ColumnPicker(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showedCells, setShowedCells] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (id,value) =>{
    //console.log(id,value)
    if(!localStorage.getItem("hideCells"))
     localStorage.setItem("hideCells",JSON.stringify({}))
   
      
      let hideCells = JSON.parse(localStorage.getItem("hideCells"))

      console.log(hideCells)
      
      if(!hideCells[props.name]){
        hideCells[props.name] =[];
        localStorage.setItem("hideCells",JSON.stringify(hideCells))
      }

    
      hideCells = JSON.parse(localStorage.getItem("hideCells"))
      let currentHideCells = hideCells[props.name];

      //console.log(currentHideCells)
      if(value)
      {
          if(!currentHideCells.includes(id))
          currentHideCells.push(id)
      }else{
        currentHideCells = currentHideCells.filter(curId => curId!=id);
      }
    
      hideCells[props.name] = currentHideCells;
      
      localStorage.setItem("hideCells",JSON.stringify(hideCells));
      setShowedCells(currentHideCells);
      props.setHeadCells(currentHideCells)
  }
  useEffect(() => {
    setShowedCells(props.showedCells);
  },[props.showedCells]);

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ViewWeekSharpIcon sx={{ margin:0,padding:0 }}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
            props.headCells.map(cell=>(
                <MenuItem>
                <FormControlLabel
                  value="end"
                  control={<Checkbox checked={showedCells.includes(cell.id)} onChange={(event)=>{handleChange(cell.id,event.target.checked)}}/>}
                  label={cell.label}
                  labelPlacement="end"
                />
                </MenuItem>
            ))
        }
      
      </Menu>
    </div>
  );
}
