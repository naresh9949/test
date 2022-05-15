import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PrinterSettings from './PrinterSettings';
import WarehouseSettings from './WarehouseSettings';
import Draggable from 'react-draggable';



export default function Settings(props) {
  const actions = [
    { icon: <PrinterSettings user={props.user} color="black"/>, name: 'Printer Settings' },
    { icon: <WarehouseSettings  sx={{ display: { xs: "none", sm: "block" } }} user={props.user} color="black"/>, name: 'Warehouse Settings' }
  ];

  
  return (
      <Draggable>
      <SpeedDial
      
        ariaLabel="Settings"
        sx={{  display: { xs: "none", sm: "flex"} ,position: 'fixed', bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
      >
       

{actions.map((action, index) =>
          // render with links if breadcrub is not the last one else render without link field
          index === 1 ? (
            <SpeedDialAction
            sx={{ display: { xs: "none", sm: "block" } }}
            user={props.user}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
          ) : (
            <SpeedDialAction
            user={props.user}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
          )
        )}
      </SpeedDial>
      </Draggable>
  );
}