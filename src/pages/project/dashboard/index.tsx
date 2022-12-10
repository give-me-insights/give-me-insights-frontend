import React, {useEffect} from 'react'
import {RootState} from "../../../store";
import {retrieveProjectByKey} from "../../../api/project/api";
import {setProjectInProjectContext} from "../../../actions/project";
import {connect, ConnectedProps} from "react-redux";
import { useParams } from 'react-router-dom';


interface Props extends PropsFromRedux {}


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
  return <div>PROJECT DASHBOARD</div>
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
