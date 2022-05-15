import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';

export default function DeleteBtn(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickYes = async () => {
    setOpen(false);
    setLoading(true);
    await props.changeHandler(props.data);
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        style={{ height: "25px" }}
        onClick={handleClickOpen}
      >
        {!loading && "Delete"}
        {loading &&  <CircularProgress color="success" size={20}/>}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the table record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" autoFocus onClick={handleClose}>
            No
          </Button>
          <Button autoFocus onClick={handleClickYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
