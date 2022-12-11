import React from "react";

import Box from '@mui/material/Box';


interface ProjectPluginProps {
  height?: 1 | 3,
  children: JSX.Element
}

export const ProjectPlugin = (props: ProjectPluginProps ) => {
  const getVh = () => {
    switch (props.height){
      case 3: return "33vh"
      default: return null
    }
  }
  return (
    <Box
      style={{height: `${getVh()}`, overflow: 'auto'}}
      sx={{boxShadow: 1}}
    >
      {props.children}
    </Box>
  )
}
