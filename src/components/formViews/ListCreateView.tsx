import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export enum ViewMode {
  ListView,
  CreateView
}


enum ActionType {
  DELETE,
  UPDATE
}


interface FormAction<T> {
  type: ActionType.DELETE | ActionType.UPDATE,
  callable: (e: T) => void,
  entity: T
}


const Action = <T extends object>(props: FormAction<T> & { children?: React.ReactNode }) => {
  return (
    <IconButton
      edge="end"
      aria-label={ActionType[props.type].toLowerCase()}
      onClick={() => props.callable(props.entity)}
    >
      {props.type === ActionType.DELETE ? <DeleteIcon /> : <EditIcon />}
    </IconButton>
  )
}

interface ListViewCallableProps<T> {
  getPrimaryStringCallable: (e: T) => String,
  getSecondaryStringCallable?: (e: T) => String,
  updateCallable?: (e: T) => void,
  deleteCallable?: (e: T) => void
}


interface ListViewListItemProps<T> extends ListViewCallableProps<T>{
  entity: T
}

export const ListViewListItem = <T extends object> (props: ListViewListItemProps<T> & { children?: React.ReactNode }) => {

  const getActions = () => {
    return <>
      {props.updateCallable ? <Action callable={props.updateCallable} entity={props.entity} type={ActionType.UPDATE}/> : <></>}
      {props.deleteCallable ? <Action callable={props.deleteCallable} entity={props.entity} type={ActionType.DELETE}/> : <></>}
    </>
  }

  return (
    <ListItem secondaryAction={getActions()}>
      <ListItemText
        primary={props.getPrimaryStringCallable(props.entity)}
        secondary={props.getSecondaryStringCallable ? props.getSecondaryStringCallable(props.entity) : null}
      />
    </ListItem>
  )
}


interface ListViewCreateHeaderProps {
  title: String,
  createButtonText: "create" | string,
  handleViewChange: (v: ViewMode) => void
}

export const ListViewCreateHeader = (props: ListViewCreateHeaderProps & { children?: React.ReactNode }) => {
  return <Box sx={{ flexGrow: 1 }}>
    <Toolbar>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {props.title}
      </Typography>
      <Button
        color="inherit"
        onClick={() => props.handleViewChange(ViewMode.CreateView)}
      >
        {props.createButtonText}
      </Button>
    </Toolbar>
  </Box>
}


interface ListViewProps<T> extends ListViewCallableProps<T>{
  getEntities: () => Promise<T[]>,
  subheader?: ListViewCreateHeaderProps
}


export const ListView = <T extends object>(props: ListViewProps<T> & { children?: React.ReactNode }) => {
  const [entities, setEntities] = React.useState<T[]>([])
  const isFirstCallbackCall = React.useRef<boolean>(true);


  React.useEffect(() => {
    if (isFirstCallbackCall){
      props.getEntities()
        .then(entities => setEntities(entities))
        .catch(err => console.log(err))
    }
  }, [isFirstCallbackCall, props])

  return(
    <List
      subheader={props.subheader ? <ListViewCreateHeader {...props.subheader}/> : null}
    >
      {
        entities.map((entity, index) =>
          <ListViewListItem
            key={index}
            entity={entity}
            getPrimaryStringCallable={props.getPrimaryStringCallable}
            getSecondaryStringCallable={props.getSecondaryStringCallable}
            deleteCallable={props.deleteCallable}
            updateCallable={props.updateCallable}
          />
        )
      }
    </List>
  )
}


interface ListCreateViewCreateHeaderProps {
  title: String,
  handleViewChange: (v: ViewMode) => void
}

const ListCreateViewCreateHeader: React.FC<ListCreateViewCreateHeaderProps> = (props: ListCreateViewCreateHeaderProps) => {
  return <Box sx={{ flexGrow: 1 }}>
    <Toolbar>
      <Typography
        variant="body1"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {props.title}
      </Typography>
      <Button color="inherit" onClick={() => props.handleViewChange(ViewMode.ListView)}>
        Back
      </Button>
    </Toolbar>
  </Box>
}


interface ListCreateFormProps<T> {
  initialData: T,
  formIsValidValidator: (formData: T) => boolean,
  handleViewChange: (v: ViewMode) => void,
  handleFormSubmit: (formData: T) => void
}

export const ListCreateForm = <T extends object>(props: ListCreateFormProps<T> & { children?: React.ReactNode }) => {
  const [formData, setFormData] = React.useState<T>(props.initialData)
  const [formIsValid, setFormIsValid] = React.useState<boolean>(false)
  const isFirstCallbackCall = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (isFirstCallbackCall){
      setFormIsValid(props.formIsValidValidator(formData))
    }
  }, [isFirstCallbackCall, props, formData])

  const handleFormChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const newFormData = {...formData, [target.name]: target.value}
    setFormData(newFormData);
    setFormIsValid(props.formIsValidValidator(newFormData))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.handleFormSubmit(formData)
    props.handleViewChange(ViewMode.ListView)
  }

  return (
    <Box
      component="form"
      onChange={handleFormChange}
      onSubmit={handleSubmit}
      sx={{ p: 1 }}
    >
      <ListCreateViewCreateHeader
        title="Create sample"
        handleViewChange={props.handleViewChange}
      />
      {props.children}
      <Button
        variant="outlined"
        type="submit"
        disabled={!formIsValid}
        fullWidth
        sx={{mt: 2}}
      >
        Create
      </Button>
    </Box>
  )
}
