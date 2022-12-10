import React, {useEffect} from 'react';
import {RootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import {dateTimeBeautifier} from "../../utils/djangoDateTimeBeautifier";

import {getAllProjects} from "../../api/project/api";
import {Project} from "../../api/project/forms";
import Placeholder from "./placeholder.svg"

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import {useNavigate} from "react-router-dom";


interface Props extends PropsFromRedux {}


interface ProjectCardProps {
  project: Project
}

const ProjectCard = (props: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleOpenProject = (key: string) => {
    navigate(`/project/dashboard/${key}`)
  }


  return <Card sx={{display: 'flex'}}>
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      style={{cursor: "pointer"}}
      onClick={() => handleOpenProject(props.project.key)}
    >
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          {props.project.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          Created at {dateTimeBeautifier(props.project.timestamp)}
        </Typography>
        <Divider/>
        <Typography variant="body1">{props.project.description}</Typography>
      </CardContent>
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 151 }}
      src={Placeholder}
      alt="Live from space album cover"
    />
  </Card>
}


const Projects = (props: Props) => {
  const [projects, setProjects] = React.useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects()
      setProjects(projects)
    }
    fetchProjects()
  }, [props])

  return <Box sx={{flexGrow: 1}}>
    <Grid container spacing={2}>
    {projects.map((project, index) =>
      <Grid key={index} item xs={6}>
        <ProjectCard project={project}/>
      </Grid>
    )}
    </Grid>
  </Box>
}

const mapState = (state: RootState) => {
  return {
    user: state.user
  }
}

const mapDispatch = {}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapState, mapDispatch)(Projects);
