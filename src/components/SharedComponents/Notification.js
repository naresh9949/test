import * as React from "react";
import { useMemo,useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Say from "react-say";
import { SayButton } from "react-say";
import { SayUtterance } from "react-say";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification(props) {

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.close({open:false});
  };


  

  const utterance = useMemo(
    () => new SpeechSynthesisUtterance(props.audio ? props.audio : ""),
    []
  );
  // success error
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {props.open && props.audio && <SayUtterance utterance={utterance} />}

      <Snackbar
        open={props.open}
        autoHideDuration={props.time?props.time:null}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={props.severity?props.severity:"success"} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
