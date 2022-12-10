import React from 'react';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const Sources = () => {
  return <Box sx={{ flexGrow: 1 }}>
    <Toolbar>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        Sources
      </Typography>
      <Button color="inherit">
        Select
      </Button>
    </Toolbar>
  </Box>
}

export default Sources;
