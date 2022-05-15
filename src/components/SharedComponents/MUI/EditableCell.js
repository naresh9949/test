import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';

function EditableCell(props) {
    const[editable,setEditable] = useState(false);
    const[text,setText] = useState(props.value);
    const [loading, setLoading] = React.useState(false);
    
    const handleDone = async ()=>{
       
        setEditable(false);
        setLoading(true);
        props.data[props.id] = text;
        await props.changeHandler(props.data);
        setLoading(false);
    }

    if(loading) return <CircularProgress color="success" size={20}/>

    if(editable)
    return (<TextField
        sx={{margin:0,padding:0,border:0}}
       
        defaultValue={text}
        size="small"
        variant="standard"
        onChange={(event)=>{setText(event.target.value)}}
        InputProps={{
          endAdornment: (
            <InputAdornment  position="end">
              <IconButton
                style={{height: "10px"}}
                aria-label="search-button"
                onClick={handleDone}
                edge="end"
              >
                <DoneIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        
      />)
    return (<Typography onClick={()=>setEditable(true)} variant="subtitle1">{props.value}</Typography>)
}

export default EditableCell;

// endAdornment: (
//     <InputAdornment position="end">
//       <IconButton
//         aria-label="search-button"
//         onClick={() => {}}
//         edge="end"
//       >
//         <SearchIcon />
//       </IconButton>
//     </InputAdornment>
//   ),