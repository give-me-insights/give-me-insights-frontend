import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import {RootState} from "./store";

import ProjectRoutes from "./routes";
import Layout from "./components/pageWrapper/Layout";
import Base from  "./components/pageWrapper/Base";

import Auth from "./pages/auth";


interface Props extends PropsFromRedux {}


function App(props: Props) {
  if (props.user.id === null) return (
    <Base>
      <Auth />
    </Base>
  )
  return (
    <Layout>
      <ProjectRoutes />
    </Layout>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.user
  }
}

const mapDispatch = { }

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapState, mapDispatch)(App)
