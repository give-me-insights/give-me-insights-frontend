import React from 'react';

import {ViewMode} from "../../../../components/formViews/ListCreateView";
import {ProjectLink} from "../../../../reducers/project/interfaces";

import {
  ListView as ListViewComponent,
  ListCreateForm as ListCreateFormComponent
} from "../../../../components/formViews/ListCreateView";

import TextField from '@mui/material/TextField';

import {
  createProjectLink,
  deleteProjectLink,
  getAllProjectLinksForProject
} from "../../../../api/project/api";
import {CreateProjectLinkFormData} from "../../../../api/project/forms";

import {useNavigate, useParams} from "react-router-dom";


interface ViewProps {
  handleViewChange: (v: ViewMode) => void
}


export const ProjectLinkCreateForm: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const initialData = {
    title: "",
    description: "",
    url: ""
  }
  const formDataIsValid = (formData: CreateProjectLinkFormData) => formData.url !== ""
  const handleFormSubmit = async (formData: CreateProjectLinkFormData) => {
    if (params.key !== undefined) {
      await createProjectLink(params.key, formData)
    }
    navigate(`/project/dashboard/${params.key}`)
  }

  return (
    <ListCreateFormComponent
      initialData={initialData}
      formIsValidValidator={formDataIsValid}
      handleFormSubmit={handleFormSubmit}
      handleViewChange={props.handleViewChange}
    >
      <TextField
        required
        margin="normal"
        id="title"
        name="title"
        label="Title"
        fullWidth
      />
      <TextField
        margin="normal"
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        required
        margin="normal"
        id="url"
        name="url"
        label="Url"
        fullWidth
      />
    </ListCreateFormComponent>
  )
}


const ProjectLinksView: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const getPrimaryCallable = (entity: ProjectLink) => entity.title
  const getSecondaryCallable = (entity: ProjectLink) => entity.url

  const deleteCallable = async (entity: ProjectLink) => {
    if (params.key !== undefined) {
      await deleteProjectLink(params.key, entity.key)
      navigate(`/project/dashboard/${params.key}`)
    }
    else return
  }

  const fetchAll = async () => {
    if (params.key !== undefined) return await getAllProjectLinksForProject(params.key)
    else return []
  }

  return (
    <ListViewComponent
      getEntities={fetchAll}
      subheader={{
        title: "Project Related Links",
        handleViewChange: props.handleViewChange,
        createButtonText: "create"
      }}
      getPrimaryStringCallable={getPrimaryCallable}
      getSecondaryStringCallable={getSecondaryCallable}
      deleteCallable={deleteCallable}
    />
  )
}


const ProjectLinks = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.ListView)
  const handleViewChange = (v: ViewMode) => setViewMode(v)


  return (
    viewMode === ViewMode.ListView ?
      <ProjectLinksView handleViewChange={handleViewChange}/>
      : <ProjectLinkCreateForm handleViewChange={handleViewChange}/>
  )
}

export default ProjectLinks;
