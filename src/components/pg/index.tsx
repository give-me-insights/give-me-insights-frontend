import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import {RootState} from "../../store";


interface Props extends PropsFromRedux {}


const PlayGround = (props: Props) => {
  console.log(props.user.id)
  return (
    <div>Playground</div>
  )
}


const mapState = (state: RootState) => {
  return {
    user: state.user
  }
}

const mapDispatch = { }

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapState, mapDispatch)(PlayGround)
