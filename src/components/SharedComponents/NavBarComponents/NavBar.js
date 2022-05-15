import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Logscreen from "../Logscreen";
import logo from "./../../../images/pr.png";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from "../../../App.js";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Container } from "@mui/material";
import { Collapse } from "react-collapse";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import SelectLanguage from './SelectLanguage';
import LogoutBtn from './LogoutBtn';

const MobileMenu = (props) => {
  const theme = useTheme();
  
  const display = props.open ? "block" : "none";
  return (
    <Slide direction="down" in={props.open}>
      <Container
        sx={{
          backgroundColor: `${theme.palette.primary.main}`,
          display: { display },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
           <SelectLanguage/>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="subtitle2" component="div">
              Logged in as {props.user.Id} &nbsp;&nbsp;
              <LogoutBtn />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Slide>
  );
};

export default function NavBar(props) {
  const search = useLocation().search;
  let user = useContext(UserContext);
  const [language, setLanguage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setOpen] = React.useState(false);
  // if user is not available set Id to error
  if (!user) user = { Id: "error" };

  const open = Boolean(anchorEl);

  const fname = new URLSearchParams(search).get("fname")
    ? new URLSearchParams(search).get("fname")
    : "Home";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const gotoHintsPage = () => {
    var route = window.location.hash;
    route = route.substring(1);
    if (route == "") route = "/";
    const url =
      process.env.REACT_APP_PRUTILS +
      "/FieldHint/Index?app=svl&pagePath=" +
      route;
    window.open(url, "_blank");
  };

  

  useEffect(() => {
    document.title = window.location.href;
  });
  return (
    <React.Fragment>
      <AppBar position="sticky" className="navbar" sx={{ marginBottom: 1 }}>
        <Toolbar align="center">
          <Link underline="none" href="/" sx={{ mr: 0, display: "flex" }}>
            <Avatar
              alt="Piping Rock"
              sx={{ width: 36, height: 36 }}
              src={logo}
            />
          </Link>
          <IconButton id="fieldHintToggle">
            <InfoOutlinedIcon size="small" />
          </IconButton>

          <IconButton onClick={gotoHintsPage}>
            <InfoIcon size="small" />
          </IconButton>

         <SelectLanguage position="nav"/>

          <Typography
            variant="h6"
            role="title"
            component="div"
            sx={{ flexGrow: 1, marginLeft: { sm: 1 } }}
          >
            {fname}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Logged in as {user.Id}
          </Typography>
          <Box sx={{ m: 1 }} />
          <LogoutBtn position="nav" />
          <Logscreen />
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            aria-label="MoreHorizIcon"
            size="small"
            onClick={() => setOpen(!mobileOpen)}
          >
            <MoreHorizIcon
              sx={{ color: "black" }}
            />
          </IconButton>

          {/* <LooksIcon color="primary" size="small" sx={{ position: "fixed", bottom: 0, right: '46%',display:{xs: "block", sm: "none" } }} /> */}
          
        </Toolbar>
      </AppBar>
      <MobileMenu open={mobileOpen} user={user} languageHandler={props.languageHandler} handler={setOpen} />
    </React.Fragment>
  );
}
