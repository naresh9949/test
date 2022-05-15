import React,{useState} from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Icons from '@mui/icons-material';
export default function BasicButtons(props) {
  const [loading, setLoading] = useState(false);
  const handleOnClick = async ()=> {
    setLoading(true);
    await props.onClickHandler(props.data);
    setLoading(false);
  }

  return <Button variant="contained"
  size="small"
  style={{ height: "25px" }}
  onClick={handleOnClick} 
  >
    {!loading && props.label}
    {loading &&  <CircularProgress color="success" size={20}/>}
  </Button>;
}
