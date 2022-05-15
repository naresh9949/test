import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from '@mui/material/IconButton';
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import WarehouseSettings from './../SettingsComponents/WarehouseSettings';
import LooksIcon from '@mui/icons-material/Looks';
import CircleIcon from "@mui/icons-material/Circle";
import LogoutBtn from './LogoutBtn';
const drawerBleeding = 30;

const Root = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  position: "absolute",
  color:theme.palette.secondary.main,
  top: -1,
  left: "calc(50% - 15px)",
}));

export default function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
       <Button variant="text"  sx={{position:'fixed',bottom:-20,left:"calc(50% - 25px)",display: { xs: "block", sm: "none" }}} onClick={()=>{setOpen(!open)}}>
         <CircleIcon fontSize="large"/>
       </Button>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
       
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Container sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Logged in as {props.user.Id}
                </Typography>
              </Grid>
              <Grid item xs={3}>
              <LogoutBtn/>
              </Grid>
              <Grid item xs={3}>
              <Button fullWidth color="secondary" variant="contained">Home</Button>
              </Grid>
              <Grid item xs={6}>
              <WarehouseSettings fullWidth user={props.user} swiper={true}/>
              </Grid>
            </Grid>
          </Container>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
