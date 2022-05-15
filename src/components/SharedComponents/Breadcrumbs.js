import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Get } from "./../Utilities/AxiosHandler";

export default function BreadcrumbsComponent(props) {
  const navigate = useNavigate();
  const search = useLocation().search;
  
  const [breadcrumbs, setBreadcrumbs] = useState({
    BreadCrumbs: [],
    HomeURL: "/",
  });
  let { functionId } = useParams();
  if (!functionId) functionId = 10;
  const pid = new URLSearchParams(search).get("pid")
    ? new URLSearchParams(search).get("pid")
    : 0;
  const fname = new URLSearchParams(search).get("fname")
    ? new URLSearchParams(search).get("fname")
    : "none";
    
  const isReffered = new URLSearchParams(search).get("isReffered")
    ? new URLSearchParams(search).get("isReffered")
    : false;
  const referrer = new URLSearchParams(search).get("referrer")
    ? new URLSearchParams(search).get("referrer")
    : "none";

    
  // object for initial rendering of component

  useEffect(async () => {
    const origin = window.location.origin;
    let domain = ".systempr.com";

    const url =
      "/api/BreadCrumbsAPI/GetBreadCrumbs?originalCaller=" +
      encodeURIComponent(origin) +
      "&domain=" +
      domain +
      "&id=" +
      functionId.toString() +
      "&pid=" +
      pid.toString() +
      "&referrer=" +
      encodeURIComponent(referrer.toString()) +
      "&IsReffered=" +
      isReffered.toString();
    const res = await Get(url,"prutils");
    if (res.data) {
      if(res.data.Body){
      setBreadcrumbs(res.data.Body);
      localStorage.setItem('AllowedUserRoles',res.data.Body.AllowedUserRoles);
      }
    }
  }, [functionId]);

  
  if(!props.show)
  return <React.Fragment></React.Fragment>
  
  return (
    <div style={{ padding: 8, paddingTop: 0 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="››"
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <Button
          variant="contained"
          key="back"
          sx={{height:30}}
          color="warning"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          size="small"
        >
          Back
        </Button>

        <Link
          key="home"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="#588EE7"
          href={breadcrumbs.HomeURL}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>

        {breadcrumbs.BreadCrumbs.map((breadcrumb, index) =>
          // render with links if breadcrub is not the last one else render without link field
            <Link
              key={breadcrumb.BreadCrumbName}
              underline="hover"
              color="#588EE7"
              href={breadcrumb.BreadCrumbURL}
            >
              {breadcrumb.BreadCrumbName}
            </Link>
          
        )}

          <Link
              underline="none"
              color="black"
             
            >
              {fname}
            </Link>

      </Breadcrumbs>
    </div>
  );
}
