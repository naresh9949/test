import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { GetExcel } from "./../../Utilities/AxiosHandler";
import Notification from "./../Notification";

const ExportButton = (props) => {
  const [snakbar, setSnakbar] = useState({ open: false });

  if (!props.reportId)
    throw new Error("Import Button requires reportType prop");

  const [exporturl, setExportURL] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (event) => {
    setLoading(true);
    try {
      const response = await GetExcel(exporturl)
      if(response.data){
      let date = new Date();
          var a = document.createElement("a");
          a.href =
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
            response.data;
          
          a.download = `${props.reportId}_${date.toLocaleString()}.xlsx`;
          a.click();

          const snak = {
            open: true,
            message: "File Downloaded Successfully",
            severity: "success",
            time : 1500
          };
          setSnakbar(snak);

      }
    } catch (error) {
      console.log({...error});
      const snak = {
        open: true,
        message: error.response.data.message,
        severity: "error",
        time : null
      };
      setSnakbar(snak);
    }
    setLoading(false);
  };

  useEffect(() => {
    const data = props.data;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const prssvl = process.env.REACT_APP_PRSSVL;
    let exporturl = `${prssvl}/ExportImport/export?reportId=${props.reportId}`;

    for (let i = 0; i < keys.length; i++) {
      exporturl = exporturl + "&";
      exporturl = exporturl + keys[i] + "=" + values[i];
    }
    console.log(exporturl);
    setExportURL(exporturl);
  }, [props]);

  return (
    <React.Fragment>
      {snakbar.open && (
        <Notification
          open={snakbar.open}
          close={setSnakbar}
          time={snakbar.time}
          message={snakbar.message}
          severity={snakbar.severity}
        />
      )}
      
    <Button
      fullWidth
      variant="contained"
      onClick={handleSubmit}
      component="span"
    >
      {!loading && "Export"}
      {loading && "Downloading..."}
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: `${theme.palette.secondary.main}`,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Button>
    </React.Fragment>
  );
};

export default ExportButton;
