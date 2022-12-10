import React, {useEffect} from 'react'
import {RootState} from "../../../store";
import {retrieveProjectByKey} from "../../../api/project/api";
import {setProjectInProjectContext} from "../../../actions/project";
import {connect, ConnectedProps} from "react-redux";
import { useParams } from 'react-router-dom';

import Sources from "../plugins/sources/view";
import {ProjectPlugin} from "../plugins/ProjectPlugin";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


interface Props extends PropsFromRedux {}


interface DashboardElementProps {
  title: string,
  height: number,
  children?: React.ReactNode
}

const DashboardElement: React.FC<DashboardElementProps> = (props: DashboardElementProps ) => {
  return <Box
    style={{height: `${props.height}vh`}}
    sx={{boxShadow: 3}}
  >
    {props.children}
  </Box>
}


const Dashboard = (props: Props) => {
  const params = useParams()

  useEffect(() => {
    const getProjectContext = async (projectKey: string) => {
      const project = await retrieveProjectByKey(projectKey)
      props.setProjectInProjectContext(project)
    }
    const projectId = props.projectContext.project.id
    const projectKey = props.projectContext.project.key
    if ((projectId === null || projectKey !== params.key) && params.key !== undefined) getProjectContext(params.key)
  }, [props, params])

  return <Grid sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <DashboardElement title="Conent" height={80}/>
      </Grid>
      <Grid item xs={4}>
        <DashboardElement title="Plugins" height={80}>
          <ProjectPlugin><Sources /></ProjectPlugin>
        </DashboardElement>
      </Grid>
    </Grid>
  </Grid>
}


const mapState = (state: RootState) => {
  return {
    user: state.user,
    projectContext: state.projectContext
  }
}

const mapDispatch = {
  setProjectInProjectContext: setProjectInProjectContext
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
export default connect(mapState, mapDispatch)(Dashboard)
