import React, { useEffect,useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Notification from "./../Notification";
import { PostExcel } from "./../../Utilities/AxiosHandler";

const Input = styled("input")({
  fontSize: "18px",
  display: "inline-block",
  cursor: "pointer",
});

const ImportButton = (props) => {
  if (!props.reportId)
    throw new Error("Import Button requires reportType prop");

  const [loading, setLoading] = useState(false);
  const [snakbar, setSnakbar] = useState({ open: false });
  const [selectedFile, setSelectedFile] = useState(null);
  const [importurl, setImportURL] = useState("");
  const theme = useTheme();

  const handleSubmit = async (event) => {
    if (!selectedFile) {
      const snak = {
        open: true,
        message: "Please Select a file",
        severity: "warning",
      };
      setSnakbar(snak);
      return;
    }
    
    setLoading(true);

    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      let data = reader.result;
      const response = await PostExcel(importurl, data);
      if (response.data) {
          let date = new Date();
          var a = document.createElement("a");
          a.href =
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
            response.data;
          a.download = `${props.reportId}_${date.toLocaleString()}.xlsx`;
          a.click();
          setLoading(false);
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      setLoading(false);
    };
    
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const data = props.data;
    const keys = Object.keys(data);
    const values = Object.values(data);
    const prssvl = process.env.REACT_APP_PRSSVL;
    let importurl = `${prssvl}/ExportImport/import?reportId=${props.reportId}`;

    for (let i = 0; i < keys.length; i++) {
      importurl = importurl + "&";
      importurl = importurl + keys[i] + "=" + values[i];
    }
    console.log(importurl);
    setImportURL(importurl);
  }, [props]);

  return (
    <React.Fragment>
      {snakbar.open && (
        <Notification
          open={snakbar.open}
          close={setSnakbar}
          time={2000}
          message={snakbar.message}
          severity={snakbar.severity}
        />
      )}
      <Stack direction="row" spacing={0}>
        <label htmlFor="contained-button-file">
          <Input
            sx={{ width: { xs: "12rem", sm: "20rem" } }}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="contained-button-file"
            onChange={handleFileSelect}
            type="file"
          />
        </label>
        <Button variant="contained" onClick={handleSubmit}>
        {!loading && "Import"}
        {loading && "Importing..."}
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
      </Stack>
    </React.Fragment>
  );
};

export default ImportButton;



// axios.post("http://localhost:3001/dev/ExportImport/import?reportId=language",
      // data,
      //   {
      //       responseType: 'blob',
      //       headers: {
      //           'Content-Disposition': "attachment; filename=template.xlsx",
      //           'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //       }
      //   })
      //   .then((response) => {
      //       const url = window.URL.createObjectURL(new Blob([response.data]));
      //       const link = document.createElement('a');
      //       link.href = url;
      //       link.setAttribute('download', 'template.xlsx');
      //       document.body.appendChild(link);
      //       link.click();
      //   })
      //   .catch((error) => console.log(error));
