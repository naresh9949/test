import React from 'react';
import image from './../../images/error.jpeg';
import { Container } from "@mui/material";

function ErrorComponent() {
    //const image = "https://thumbs.dreamstime.com/b/system-error-concept-people-stand-near-open-browser-tab-modern-flat-vector-illustration-184024877.jpg";
    return (
        <Container sx={{}} align="center">
            <img src={image} height="60%" width="60%" alt="some thing went wrong"/>
            <h3>OOPS! something went wrong</h3>
        </Container>
    )
}

export default ErrorComponent
