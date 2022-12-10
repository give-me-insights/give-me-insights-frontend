import React from "react";


import {AuthFormData} from "../../api/auth/forms";
import {getAuthenticatedUser, performAuthentication} from "../../api/auth/api";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import {RootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import {setUser} from "../../actions/auth";



const initialAuthFormData = {
  email: "",
  password: ""
}


interface Props extends PropsFromRedux {}


const SignIn = (props: Props) => {
  const [formData, setFormData] = React.useState<AuthFormData>(initialAuthFormData)
  const [formIsValid, setFormIsValid] = React.useState<boolean>(false)

  React.useEffect(() => {
    setFormIsValid(formDataIsValid(formData))
  }, [formData])

  const formDataIsValid = (data: AuthFormData) => data.email !== "" && data.password !== ""

  const handleFormChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newFormData = {...formData, [target.name]: target.value}
    setFormData(newFormData);
    setFormIsValid(formDataIsValid(newFormData))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const token = await performAuthentication(formData)
    if (token !== null) localStorage.setItem("auth-token", token.token)
    const user = await getAuthenticatedUser()
    if (user !== null) props.setUser(user)
  }

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        onChange={handleFormChange}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formData.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!formIsValid}
          sx={{mt: 2}}  // just add after first view
        >
          Sign In
        </Button>
      </Box>
    </Container>
  )
}


const mapState = (state: RootState) => {
  return {
    user: state.user
  }
}

const mapDispatch = {
  setUser: setUser
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapState, mapDispatch)(SignIn)
