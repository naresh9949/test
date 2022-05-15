import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Container } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {getLogs } from "./../Utilities/storageHandler";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





const NotificationRow = (props) => {
  const [open, setOpen] = React.useState(false);
  const version = process.env.REACT_APP_RLS_VERSION;
  const data = props.data;
  const status = data.header.isSuccess
    ? "success"
    : data.header.Error
    ? "error"
    : "warning";

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    handleCopy();
    setOpen(true);
  };

  const handleCopy = () => {
    const text = JSON.stringify(data);
    navigator.clipboard.writeText(text);
  };
  return (
    <Alert
      severity={status}
      data-testid={data.header.EventID}
      sx={{overflow:'auto'}}
      hidden={false}
      action={
        
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="The Log data has been copied to your clipboard."
            >
              <Button color="inherit" onClick={handleTooltipOpen} size="small">
                <ContentCopyIcon />
              </Button>
              
            </Tooltip>
          </div>
         
        </ClickAwayListener>
       
      }
    >
      <AlertTitle data-testid={data.date}>{data.CalledUrl}</AlertTitle>
      {data.header.EventID}
      <br/>
      {data.date}
    </Alert>
  );
};

const Notifications = (props) => {
  return (
    <Stack sx={{ width: "100%" }} sx={{paddingLeft:{sm:3,xs:1},paddingRight:{sm:3,xs:1},paddingTop: 1 }} role="logs" spacing={2}>
      {props.data.map((log) => {
        return <NotificationRow key={log.date} status="error" data={log} />;
      })}
    </Stack>
  );
};

export default function Logscreen() {
  const [open, setOpen] = React.useState(false);
  const version = process.env.REACT_APP_RLS_VERSION;
  let error = false;
  let Logs = [];
  try {
    Logs = getLogs();
    Logs.reverse();
  } catch (err) {
    error = true;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        aria-label="Log button"
        component="span"
      >
        <ReportGmailerrorredIcon sx={{ color: "black" }} />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Log Reports {version}
            </Typography>
          </Toolbar>
        </AppBar>
        
          {error && (
            <Container align="center">
              {" "}
              <h4>some thing went wrong</h4>
            </Container>
          )}
          <Notifications  data={Logs} />
    
      </Dialog>
    </div>
  );
}


