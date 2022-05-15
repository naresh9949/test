import React from "react";
import Button from "@mui/material/Button";

function LogoutBtn(props) {
  var display;
  if (props.position === "nav") display = { xs: "none", sm: "block" };
  var deleteCookie = () => {
    var allCookies = document.cookie.split(";");
    const authCookieName = process.env.REACT_APP_AUTH_COOKIE_NAME+"=hjfirjdj";
      document.cookie = authCookieName + "=;expires=" + new Date(0).toUTCString();
  };
  const Logout = () => {
    let prauth = process.env.REACT_APP_LOGIN;
    const logoutURL = prauth+"/Common/Authentication/Logout";
    window.location = logoutURL;
  };
  return (
    <Button
      variant="outlined"
      sx={{
        color: "black",
        backgroundColor: "white",
        fontWeight: "bold",
        display: display,
      }}
      onClick={Logout}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
