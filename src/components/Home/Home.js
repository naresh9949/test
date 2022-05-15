import React, { useState, useEffect, useContext, useMemo } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Spinner from "../SharedComponents/Loaders/Spinner";
import { Get} from "./../Utilities/AxiosHandler";
import { useParams } from "react-router-dom";
import { getWord } from "./../Utilities/languageHandler";



function Home() {
  const [buttons, setButtons] = useState([]);
  const [languageKeys, setLanguageKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  let language = localStorage.getItem("language") === "en-US" ? "English" : "Spanish";

  let { id } = useParams();
  if (!id) id = 0;

  let originalCaller = window.location.origin;
  originalCaller = encodeURIComponent(originalCaller);
  const domain = ".systempr.com"; 

  

  
  useEffect(async () => {
    const menuUrl = `/api/BreadCrumbsAPI/GetMenuFunctions?originalCaller=${originalCaller}&domain=${domain}`;

    
    let res = await Get(menuUrl,"prutils");
    if (res && res.data && res.data.Body.MenuFunctions) setButtons(res.data.Body.MenuFunctions);
   
   
     const app = "PRCC";
     const key = "PRCC_HOME_";
     const url = `/common/getLanguageResources?app=${app}&&key=${key}&&language=${language}`;
     res = await Get(url,"prssvl");
     if (res && res.status === 200) setLanguageKeys(res.data);
    
     

    setLoading(false);
  }, []);

  if (loading) return <Spinner />;
  return (
    <Box sx={{ m: 1, marginTop: 4 }}>
      <div>
        <Grid container spacing={0.5}>
          {buttons.map((button) => (
            <Grid key={button.MenuFunctionName} item xs={12} sm={2}>
              <Button
                fullWidth
                href={button.MenuFunctionURL}
                color="secondary"
                variant="contained"
              >
                {getWord(button.MenuFunctionName, languageKeys, language)}
              </Button>
            </Grid>
          ))
          }
        </Grid>
      </div>
      {/* <Screen/> */}
    </Box>
  );
}

export default Home;
//https://staging-prutils.systempr.com/api/BreadCrumbsAPI/GetMenuFunctions?originalCaller=https%3A%2F%2Fqa-ind-svl.systempr.com&domain=.systempr.com
//https://qa-ind-prutils.systempr.com/api/BreadCrumbsAPI/GetMenuFunctions?originalCaller=https%3A%2F%2Fqa-ind-svl.systempr.com&domain=.systempr.com