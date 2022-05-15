import React, { useState,useEffect } from "react";
import Breadcrumbs from "./Breadcrumbs";
import NavBar from "./NavBarComponents/NavBar";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid";
const Puller = styled(Box)(({ theme }) => ({
  position: "absolute",
  color:theme.palette.secondary.main,
  top: -28,
  left: "calc(50% - 25px)",
}));
function Layout(props) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(window.location.hash);
  const display = props.open ? "block" : "none";

  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  useEffect(()=>{
    setLocation(window.location.hash);
  },[location])
  
  if (!isMobile || location === "")
    return (
      <React.Fragment>
        <NavBar user={props.user}/>
        <Breadcrumbs show={location !== ""}/>
      </React.Fragment>
    );

  return (
    <Grid container spacing={0}>
      {!open && (
        <Grid item xs={12}>
          <Container align="center" sx={{ padding: 0, margin: 0 }}>
          <Puller>
            <IconButton
              onClick={(event) => {
                setOpen(true);
              }}
              role="circle"
            >
              <CircleIcon color="secondary" sx={{ padding: 0, margin: 0, fontSize: 40}}/>
            </IconButton>
            </Puller>
            <br/>
          </Container>
        </Grid>
      )}

      {open && (
        <Grid item xs={12}>
          <Slide direction="down" onClick={()=>{setOpen(false)}} in={open}>
            <div>
              <NavBar />
            </div>
          </Slide>
        </Grid>
      )}
      <Breadcrumbs show={open}/>
    </Grid>
  );
}
export default Layout;
