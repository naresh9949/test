import React,{ useState, useEffect,useContext} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Breadcrumbs from './../SharedComponents/Breadcrumbs';
import {Get} from './../Utilities/AxiosHandler';
import Spinner from '../SharedComponents/Loaders/Loader';
import Notification from './../SharedComponents/Notification';
import {useParams } from "react-router-dom";
import {getWord} from "./../Utilities/languageHandler";

function Maintenance() {
  const [buttons,setButtons] = useState([]);
  const [loading,setLoading] = useState(true);
  const [languageKeys, setLanguageKeys] = useState([]);
  let language = localStorage.getItem("language") === "en-US" ? "English" : "Spanish";
  
  
  let { functionId } = useParams();
  if(!functionId) functionId = 0;

  let originalCaller = window.location.origin;
  originalCaller = encodeURIComponent(originalCaller);
  const domain = '.systempr.com'

  useEffect(async()=>{
    const menuUrl = `/api/BreadCrumbsAPI/GetMenuFunctions?originalCaller=${originalCaller}&domain=${domain}&id=${functionId}`;
    let res = await Get(menuUrl,"prutils");
    
    if(res && res.data && res.data.Body.MenuFunctions)
    setLanguageKeys(res.data.Body.MenuFunctions);

    const app = "PRCC";
    const key = "PRCC_Maintenance_";
    const url = `/common/getLanguageResources?app=${app}&&key=${key}&&language=${language}`;
    res = await Get(url,"prssvl");
    if (res && res.status === 200) setLanguageKeys(res.data);

    setLoading(false)
  },[])

  if(loading)
    return <Spinner/>
  return (
    <Box sx={{ m: 1}}>
      <div>
        <Grid container spacing={2}>
        { buttons.map(button=>(
          <Grid item key={button.MenuFunctionName} xs={12} sm={2}>
          <Button fullWidth href={button.MenuFunctionURL} color="secondary" variant="contained">
          {getWord(button.MenuFunctionName, languageKeys, language)}
          </Button>
          </Grid>
        ))
       }
        </Grid>
      </div>
    </Box>
  );
}

export default Maintenance;
