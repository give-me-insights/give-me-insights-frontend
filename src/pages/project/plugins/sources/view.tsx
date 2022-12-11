import React from 'react';

import {ViewMode} from "../../../../components/formViews/ListCreateView";
import {Source} from "../../../../reducers/project/interfaces";

import {
  ListView as ListViewComponent,
  ListCreateForm as ListCreateFormComponent
} from "../../../../components/formViews/ListCreateView";

import TextField from '@mui/material/TextField';

import {deleteSource, getAllSourcesForProject, createSource} from "../../../../api/project/api";
import {CreateSourceFormData} from "../../../../api/project/forms";

import {useNavigate, useParams} from "react-router-dom";


interface ViewProps {
  handleViewChange: (v: ViewMode) => void
}


export const SourceCreateForm: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const initialData = {
    title: "",
    description: ""
  }
  const formDataIsValid = (formData: CreateSourceFormData) => formData.title !== ""
  const handleFormSubmit = async (formData: CreateSourceFormData) => {
    if (params.key !== undefined) {
      await createSource(params.key, formData)
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
    </ListCreateFormComponent>
  )
}


const SourceListView: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const getPrimaryCallable = (entity: Source) => entity.title
  const getSecondaryCallable = (entity: Source) => entity.inboundTopic

  const deleteCallable = async (entity: Source) => {
    if (params.key !== undefined) {
      await deleteSource(params.key, entity.key)
      navigate(`/project/dashboard/${params.key}`)
    }
    else return
  }

  const fetchAll = async () => {
    if (params.key !== undefined) return await getAllSourcesForProject(params.key)
    else return []
  }

  return (
    <ListViewComponent
      getEntities={fetchAll}
      subheader={{
        title: "Source Data",
        handleViewChange: props.handleViewChange,
        createButtonText: "create"
      }}
      getPrimaryStringCallable={getPrimaryCallable}
      getSecondaryStringCallable={getSecondaryCallable}
      deleteCallable={deleteCallable}
    />
  )
}


const Sources = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.ListView)
  const handleViewChange = (v: ViewMode) => setViewMode(v)


  return (
    viewMode === ViewMode.ListView ?
      <SourceListView handleViewChange={handleViewChange}/>
      : <SourceCreateForm handleViewChange={handleViewChange}/>
  )
}

export default Sources;
