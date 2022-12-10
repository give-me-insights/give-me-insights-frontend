import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// import {getActiveActivity, ActivityItem} from "../../api/apiCalls";

import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import LoopIcon from '@mui/icons-material/Loop';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


type GridItemProps = {
  label: string,
  icon: JSX.Element,
  space: number,
  navigateCallback: CallableFunction,
  isPriority?: boolean
}

const GridItem = ({label, icon, space, navigateCallback, isPriority}: GridItemProps) => {
  const getBtn = () => {
    if (isPriority) {
      return <IconButton aria-label={label} color="secondary">
        {icon}
      </IconButton>
    }
    else {
      return <IconButton aria-label={label}>
        {icon}
      </IconButton>
    }
  }

  return(
    <Grid item xs={space} onClick={() => navigateCallback()}>
      {getBtn()}
    </Grid>
  )
}


const GridBar = () => {
  const navigate = useNavigate();
  // const [activeTask, setActiveTask] = React.useState<ActivityItem | null>(null);

  // useEffect(() => {
  //   const fetchData = async() => {
  //     const activity = await getActiveActivity();
  //     setActiveTask(activity)
  //   }
  //
  //   fetchData();
  // }, [])

  return (
      <Box sx={{flexGrow: 2}}>
        <Grid container spacing={2}>
          <GridItem
            space={2}
            label="identity"
            icon={<FingerprintIcon />}
            navigateCallback={() => navigate("/identities")}
          />
          <GridItem
            space={2}
            label="goals"
            icon={<SportsScoreIcon/>}
            navigateCallback={() => navigate("/goals")}
          />
          <GridItem
            space={2}
            label="routines"
            icon={<LoopIcon/>}
            navigateCallback={() => navigate("/routines")}
          />
          <GridItem
            space={2}
            label="planner"
            icon={<InsertInvitationIcon/>}
            navigateCallback={() => navigate("/planner")}
          />
          <GridItem
            space={2}
            label="action"
            icon={<AccessTimeIcon/>}
            navigateCallback={() => navigate("/actions")}
          />
        </Grid>
      </Box>
    )
}


export default GridBar;
