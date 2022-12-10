import React from "react";
import Cookies from 'js-cookie'


import IconButton from '@mui/material/IconButton';


import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


interface Props {
  children: JSX.Element
}

const theme = createTheme();


const AuthBase = ({children}: Props) => {
  const performLogout = () => {
    localStorage.removeItem("auth-token")
    Cookies.remove("sessionid")
    window.location.reload()
  }

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
          <Button color="inherit" onClick={performLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container component="main">
        {children}
      </Container>
    </ThemeProvider>
  );
}


export default AuthBase;
