import React from 'react';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from "@mui/material/styles";


interface Props {
  children: JSX.Element
}


const theme = createTheme();

function Base({children}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon open={false} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gimme-Insights
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container component="main">
      {children}
      </Container>
    </ThemeProvider>
  );
}

export default Base;
