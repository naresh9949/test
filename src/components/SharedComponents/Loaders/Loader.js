import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
function Loader() {
  return (
    <Container align="center" sx={{marginTop:'3%'}}>
      <CircularProgress color="secondary" />
      <Typography variant="h6" gutterBottom component="div">
        Loading....
      </Typography>
    </Container>
  );
}

export default Loader;