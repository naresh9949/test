import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
function Spinner() {
  return (
    <Container align="center" sx={{marginTop:'5%'}}>
      <CircularProgress color="primary" />
    </Container>
  );
}

export default Spinner;