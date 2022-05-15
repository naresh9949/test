import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert } from '@mui/material';
import { PanToolSharp } from '@mui/icons-material';
import axios from 'axios';
import { Get, Post } from "../Utilities/AxiosHandler";


export default function Alertt(props){
    // console.log(props)
    const [open, setOpen] = React.useState(true);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseCancel = () => {
        props.setOpen(false);
        props.setVal('')
    };
    const handleCloseOk = async() => {
        props.setOpen(false);
        let obj={}
        if(props.label == 'Pallet'){
            obj = {'countStatusID': 6, 'currentLoc': props.currentLoc, 'inventoryCycleCountId': props.inventoryCycleCountId }
            
        }
        if(props.label == 'Item Key'){
            obj = {'countStatusID': 7, 'currentLoc': props.currentLoc, 'inventoryCycleCountId':props.inventoryCycleCountId}
            
        }
        console.log(obj)
        try{
            const res=await Post(`/cycleCount/updateCountStatus`,obj)
            // if(res.data)
            //     setOpen(false)
            // else
            //     console.log(res)
        }
        catch(err){
            console.log(err)
        }
    };
    const handleClose = () => {
        props.setOpen(false);
    };
    return(
        
        <div>
        <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Wrong {props.label} scanned.<br/>
            Correct {props.label} in the location is: {props.labelId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Cancel</Button>
          <Button onClick={handleCloseOk} >
            Ok
          </Button>
        </DialogActions>
      </Dialog></div>
    )
}