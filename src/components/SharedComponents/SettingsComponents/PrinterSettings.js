import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SelectComponent from "./Components/SelectComponent";
import Spinner from "./../../SharedComponents/Loaders/Spinner";
import { Get, Post } from "./../../Utilities/AxiosHandler";


export default function PrinterSettings(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [warehouseId, setWarehouseId] = React.useState('');
  const [printers, setPrinters] = React.useState([]);
  const [printer1, setPrinter1] = useState("");
  const [printer2, setPrinter2] = useState("");
  const [printer3, setPrinter3] = useState("");

  const handlePrinterChange = (event) => {
    if (event.target.name === "DefaultPrinterType1")
      setPrinter1(event.target.value);

    if (event.target.name === "DefaultPrinterType2")
      setPrinter2(event.target.value);

    if (event.target.name === "DefaultPrinterType3")
      setPrinter3(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const savePrinters = async () => {
    setLoading(true);
    const printers = {
      DefaultPrinterType1: printer1,
      DefaultPrinterType2: printer2,
      DefaultPrinterType3: printer3,
    };
    

    const obj = {
      warehouseId: warehouseId,
      printers: printers,
    };

    const res = await Post("/common/updateUserPrintersForWarehouse", obj,"prssvl");

    if (res && res.status === 200) {
      setOpen(false);
    }
    setLoading(false);
  };

  useEffect(async () => {
    setLoading(true);

    if (open === true) {
      const res = await Get(
        "/common/getPrinters?facilityCode=" + props.user.FacilityCode,"prssvl");
      if (res && res.status === 200) setPrinters(res.data);
      
  

      // const printers = await Get('/common/getUserPrintersForWarehouse?warehouseId='+warehouseId,"prssvl");
      // console.log(printers)
      // if(printers && printers.status === 200 && printers.data.length===1)
      // {
      //   setPrinter1(printers.data[0].DefaultPrinterType1);
      //   setPrinter2(printers.data[0].DefaultPrinterType2);
      //   setPrinter3(printers.data[0].DefaultPrinterType3);
      // }

      setLoading(false);
    }
  }, [open]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <PrintIcon />
      </IconButton>
      <Dialog open={open} fullWidth maxWidth={"xs"} onClose={handleClose}>
        <DialogTitle>Printer Settings ({props.user.FacilityCode})</DialogTitle>

        {loading && <Spinner />}
        {!loading && (
          <React.Fragment>
            <DialogContent>
              <Stack spacing={1}>
                {printers.map((printer, idx) => (
                  <SelectComponent
                    label={printer.PrinterTypeName}
                    name={"DefaultPrinterType" + (idx + 1)}
                    handler={handlePrinterChange}
                    value={
                      idx === 0 ? printer1 : idx == 1 ? printer2 : printer3
                    }
                    options={printer.printers}
                  />
                ))}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
              <Button onClick={()=>{}} color="secondary">
                Save
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
}
