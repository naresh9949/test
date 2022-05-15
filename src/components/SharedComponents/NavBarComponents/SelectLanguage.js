import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectLanguage(props) {
  var lang = localStorage.getItem("language");
  if (!lang) {
    localStorage.setItem("language", "en-US");
    lang = "en-US";
  }

  const [language, setLanguage] = React.useState(lang);

  const handleLanguageChange = (event) => {
    localStorage.setItem("language",event.target.value);
    window.location.reload();
    setLanguage(event.target.value);
  };

  let display = {xs: "block", sm: "flex"};
  if(props.position==="nav")
    display = { xs: "none", sm: "flex" }

  return (
    <Select
      id="language"
      sx={{
        backgroundColor: "white",
        minWidth: 100,
        display: display,
      }}
      value={language}
      size="small"
      onChange={handleLanguageChange}
    >
      <MenuItem value={"en-US"}>English</MenuItem>
      <MenuItem value={"es-MX"}>Spanish</MenuItem>
    </Select>
  );
}

export default SelectLanguage;
