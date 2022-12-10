import React from 'react'

import {useNavigate} from "react-router-dom";

import { CreateProjectFormData } from '../../../api/project/forms'
import {createProject} from "../../../api/project/api";


import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";



const initialFormData = {
  title: "",
  description: "",
}


const CreateNewProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<CreateProjectFormData>(initialFormData)  // GENERIC NAMING - No Generic Type
  const [formIsValid, setFormIsValid] = React.useState<boolean>(false)  // GENERIC


  React.useEffect(() => {
    setFormIsValid(formDataIsValid(formData))  // GENERIC
  }, [formData])

  // Complete Generic Method
  const handleFormChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newFormData = {...formData, [target.name]: target.value}
    setFormData(newFormData);
    setFormIsValid(formDataIsValid(newFormData))
  }

  const formDataIsValid = (data: CreateProjectFormData) => data.title !== "" && data.title.length >= 3

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const project = await createProject(formData)
    navigate(`/project/dashboard/${project.key}`)
  }

  return <Container maxWidth="xs">
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
        id="title"
        label="Project Title"
        name="title"
        value={formData.title}
        autoFocus
        helperText={formIsValid ? "" : "Title must contain more than 2 characters"}
      />
      <TextField
        margin="normal"
        fullWidth
        id="description"
        label="Project Description (Optional)"
        name="description"
        value={formData.description}
        multiline
        rows={4}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!formIsValid}
        sx={{mt: 2}}  // just add after first view
      >
        {formIsValid ? "🚀" : ""} Create new Project {formIsValid ? "🚀" : ""}
      </Button>
    </Box>
  </Container>
}


export default CreateNewProject;
