import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import HouseIcon from "@mui/icons-material/House";
import IconButton from "@mui/material/IconButton";
import { Get } from "./../../Utilities/AxiosHandler";
import Spinner from "./../../SharedComponents/Loaders/Spinner";
import Autocomplete from "./../MUI/AutocompleteComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WarehouseSettings(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [warehouses, setWarehouses] = React.useState([]);
  const search = useLocation().search;
  let { functionId } = useParams();

  const handleWarehouseChange = async (facilityCode) => {
    console.log(facilityCode);
    setLoading(true);
    const url = `/api/UserRoles/ChangecurrentFacility?facilityCode=${facilityCode}`;
    const res = await Get(url, "prutils");
    if (res && res.status === 200) window.location.reload();
    setLoading(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    if (open) {
      let referrer = window.location.origin;
      referrer = encodeURIComponent("https://qa-ind-prcc.systempr.com");
      const domain = ".systempr.com";

      if (!functionId) functionId = 235;
      const pid = new URLSearchParams(search).get("pid")
        ? new URLSearchParams(search).get("pid")
        : 0;

      const isReffered = new URLSearchParams(search).get("isReffered")
        ? new URLSearchParams(search).get("isReffered")
        : false;

      const url = `/common/getWarehouseList?referrer=${referrer}&domain=${domain}&id=${functionId}&pid=${pid}&IsReffered=${isReffered}`;
      const res = await Get(url, "prssvl");

      if (res && res.status === 200) {
        let allWarehouses = [];
        for (let i = 0; i < res.data.length; i++) {
          allWarehouses.push(res.data[i].FacilityCode);
        }

        setWarehouses(allWarehouses);
      }

      setLoading(false);
    }
  }, [open]);
  return (
    <div>
      {props.swiper && (
        <Button variant="contained" id="open-btn" onClick={handleClickOpen}>
          Warehouse Settings
        </Button>
      )}
      {!props.swiper && (
        <IconButton id="open-btn" onClick={handleClickOpen}>
          <HouseIcon />
        </IconButton>
      )}

      <Dialog open={open} fullWidth maxWidth={"xs"} onClose={handleClose}>
        <DialogTitle>
          Warehouse Settings ({props.user.FacilityCode})
        </DialogTitle>

        <DialogContent sx={{ height: loading ? null : "100px" }}>
          {!loading && (
            <Autocomplete
              mt={1}
              options={warehouses}
              defaultValue={props.user.FacilityCode}
              changeHandler={handleWarehouseChange}
            />
          )}

          {loading && <Spinner />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
