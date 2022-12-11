import React from 'react';

import {ViewMode} from "../../../../components/formViews/ListCreateView";
import {Event as ProjectEvent} from "../../../../reducers/project/interfaces";

import {
  ListView as ListViewComponent,
  ListCreateForm as ListCreateFormComponent
} from "../../../../components/formViews/ListCreateView";

import TextField from '@mui/material/TextField';

import {
  createEvent,
  deleteEvent,
  getAllEventsForProject,
} from "../../../../api/project/api";
import {CreateEventFormData} from "../../../../api/project/forms";

import {useNavigate, useParams} from "react-router-dom";


interface ViewProps {
  handleViewChange: (v: ViewMode) => void
}


export const EventCreateForm: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const initialData = {
    title: "",
    description: "",
    startDate: "",
    duration: 1,
    durationUnit: "h",
    isExpected: true
  }
  const formDataIsValid = (formData: CreateEventFormData) => (
    formData.title !== ""
    && formData.startDate !== ""
    && formData.duration > 0
    && (formData.durationUnit === "m" || formData.durationUnit === "h" || formData.durationUnit === "d")
  )
  const handleFormSubmit = async (formData: CreateEventFormData) => {
    if (params.key !== undefined) {
      await createEvent(params.key, formData)
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
        id="startDate"
        name="startDate"
        label="Start Date"
        type="date"
        helperText="Must have Format YYYY-mm-dd (be careful - no date validation is implemented yet)"
        fullWidth
      />
      <TextField
        margin="normal"
        id="duration"
        name="duration"
        label="Duration"
        type="number"
        fullWidth
      />
      <TextField
        margin="normal"
        id="durationUnit"
        name="durationUnit"
        label="Duration Unit"
        helperText="Duration Unit - Please Choose one of `d` | `h`| `m`"
        fullWidth
      />
    </ListCreateFormComponent>
  )
}


const EventView: React.FC<ViewProps> = (props: ViewProps) => {
  const params = useParams()
  const navigate = useNavigate();

  const getPrimaryCallable = (entity: ProjectEvent) => entity.title
  const getSecondaryCallable = (entity: ProjectEvent) => `${entity.startDate} -- ${entity.isExpected ? "expected" : "not expected"}`

  const deleteCallable = async (entity: ProjectEvent) => {
    if (params.key !== undefined) {
      await  deleteEvent(params.key, entity.key)
      navigate(`/project/dashboard/${params.key}`)
    }
    else return
  }

  const fetchAll = async () => {
    if (params.key !== undefined) return await getAllEventsForProject(params.key)
    else return []
  }

  return (
    <ListViewComponent
      getEntities={fetchAll}
      subheader={{
        title: "Event List",
        handleViewChange: props.handleViewChange,
        createButtonText: "create"
      }}
      getPrimaryStringCallable={getPrimaryCallable}
      getSecondaryStringCallable={getSecondaryCallable}
      deleteCallable={deleteCallable}
    />
  )
}


const Events = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.ListView)
  const handleViewChange = (v: ViewMode) => setViewMode(v)


  return (
    viewMode === ViewMode.ListView ?
      <EventView handleViewChange={handleViewChange}/>
      : <EventCreateForm handleViewChange={handleViewChange}/>
  )
}

export default Events;
