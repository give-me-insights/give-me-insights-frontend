import React, {useEffect} from 'react';

import { connect, ConnectedProps } from 'react-redux';
import {RootState} from "./store";

import ProjectRoutes from "./routes";
import AuthBase from "./components/pageWrapper/AuthBase";
import Base from  "./components/pageWrapper/Base";

import Auth from "./pages/auth";
import {setUser} from "./actions/auth";
import {getAuthenticatedUser} from "./api/auth/api";


interface Props extends PropsFromRedux {}


function App(props: Props) {

  useEffect(() => {
    const getUser = async () => {
      console.log("Get user")
      const user = await getAuthenticatedUser()
      if (user !== null) props.setUser(user)
    }
    if (props.user.id === null) getUser()
  }, [props])

  if (props.user.id === null) return (
    <Base>
      <Auth />
    </Base>
  )
  return (
    <AuthBase>
      <ProjectRoutes />
    </AuthBase>
  );
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

export default connect(mapState, mapDispatch)(App)
