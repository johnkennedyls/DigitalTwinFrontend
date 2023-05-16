import React, { useState, useEffect } from 'react';
import { TextField, Button, Badge,Chip,Select,MenuItem, Checkbox , FormControl , OutlinedInput,List, ListItem,Typography   } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import {createTypeAlarm} from '../../services/TypeAlarmService';
import { Save,Cancel } from '@mui/icons-material';
import validate from "validate.js";
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      height: '300px',
      flexDirection: 'column',
      padding: '10px 10px',
      textAlign: 'left',
      '& > *': {
        width: '100%', 
      },
    },
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  left: {
    width: '50%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '0px 0px 10px 0px',
    }
  },
  right: {
    width: '50%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '10px 10px 0px 0px',
    },
  },
  container: {
    display: "flex",
    marginBottom: '10px',
    marginTop: '15px',
  },
  margin: {
    marginBottom: '5px',
  },
  selectTag: {
    width: '100px',
    marginRight: '20px',
  },
  valueTextField: {
    width: '100px',
  },
  selectConditional: {
    width: '150px',
    marginRight: '20px'
  },
  subtitle: {
    marginTop: "30px",
    fontSize: 20
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color:"#2764E3",
    paddingTop: 30,
    fontSize: 45,
    justifyContent: 'center',
  },
});

const alarm = {
  typeAlarmName: {
    presence: { allowEmpty: false, message: "Es requerido" },
  }, 
  typeAlarmDescription: {
    presence: { allowEmpty: false, message: "Es requerido" },
    length: {
      maximum: 5000,
      message: "La longitud máxima de la descripción es de 5000 caracter",
    },
  },
  condition: {
    presence: { allowEmpty: false, message: "Todos los campos son obligatorios" },
  },
  numberAlarmsMax: {
    presence: { allowEmpty: false, message: "Es requerido" },
  },
  event_id: {
    presence: { allowEmpty: false, message: "Seleccione un evento" },
  },
  plant_id: {
    presence: { allowEmpty: false, message: "Seleccione una planta" },
  },
  usersAssigned : {
    presence: { allowEmpty: false, message: "Seleccione al menos una opción" },
  },
};

function AddTypeAlarm() {
  const classes = useStyles();
  const history = useHistory();
  const typeAlarmListPath = "/manage-type-alarm"

  //const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);

  //const [events, setEvents] = useState([]);
  //const [emails, setEmails] = useState([]);
  const [conditionalValues, setConditionalValues] = useState({
    tag: "",
    conditional: "",
    value: "",
  });

  const [dataForm, setDataForm] = useState({
    isValid: false,
    errors: {},
    touched: {},
    values: {
      usersAssigned: [],
    },
  });

  const hasError = ((field) => {
    if (field === "typeAlarmName" || field === "typeAlarmDescription" || field === "numberAlarmsMax" || field === "event_id" || field === "usersAssigned" || field === "condition" || field === "plant_id") {
      if (dataForm.values[field] === ""){
        return false
      }
    }
    return dataForm.touched[field] && dataForm.errors[field] ? true : false;
  });

  useEffect(() => {
    handleErrors();
  }, [dataForm.values]);

  const handleErrors = () => {
    const errors = validate(dataForm.values, alarm);
    setDataForm((dataForm) => ({
      ...dataForm,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }

  const handleChange = (event) => {
    if (Object.prototype.hasOwnProperty.call(dataForm, event.target.id)) {
      dataForm[event.target.id] = event.target.value;
      setDataForm(dataForm);
    } else {
      const newAttribute = { [event.target.id]: event.target.value };
      const newDataForm = Object.assign(dataForm, newAttribute);
      setDataForm(newDataForm);
    }
    event.persist();
    setDataForm((dataForm) => ({
      ...dataForm,
      values: {
        ...dataForm.values,
        [event.target.name]: event.target.id === "numberAlarmsMax" ? parseInt(event.target.value) : event.target.value,
      },
      touched: {
        ...dataForm.touched,
        [event.target.name]: true,
      },
    }));
  };
  

  const concatenateValues = () => {
    if (conditionalValues.tag && conditionalValues.conditional && conditionalValues.value) {
      const condition = `${conditionalValues.tag} ${conditionalValues.conditional} ${conditionalValues.value}`;
      setDataForm((dataForm) => ({
        ...dataForm,
        values: {
          ...dataForm.values,
          condition: condition,
        },
      }));
    } else {
      setDataForm((dataForm) => ({
        ...dataForm,
        values: {
          ...dataForm.values,
          condition: "",
        },
      }));
    }
    handleErrors(); // Llama a handleErrors para actualizar los errores
  };
  

  useEffect(() => {
    concatenateValues();
  }, [conditionalValues]);

  const emails = [
    'john.doe@example.com',
    'pane.doe@example.com',
    'sim.smith@example.com'
  ];
  const events = [
    { id: 1, name: "Evento 1" },
    { id: 2, name: "Evento 2" },
    { id: 3, name: "Evento 3" },
    // ...
  ];


  const plants = [
    { id: 1, name: "OBQ1" },
    { id: 2, name: "vof" },
    { id: 3, name: "Pal24" },
    // ...
  ];

  const tags = [
    { instId: 1, tagid: 'tag1', tagName: 'Tag1' },
    { instId: 2, tagid: 'tag2', tagName: 'Tag2' }
  ]

  const handleAutocompleteChange = (value) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      values: {
        ...dataForm.values,
        usersAssigned: value,
      },
      touched: {
        ...dataForm.touched,
        usersAssigned: true,
      },
    }));
  };

  const createNewTypeAlarm = () => {
    createTypeAlarm(dataForm.values)
    .then((data) => {
      setTimeout(() => {
        history.push(`${typeAlarmListPath}`);
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
  };



  return (
    <>
    <div className={classes.paperContainer}>
    <Paper elevation={3} style={{ width: '800px', height: '400px',margin: '10px' }}>
    <div className={classes.root}>
    <div className={classes.left}>
    <FormControl >
        <InputLabel id="plant">Planta</InputLabel>       
    <Select
      labelId='plant'
      id="listPlants"
      label="Plant"
      style={{marginBottom: '10px'}}
      value={dataForm.values.plant_id || ''}
      error={hasError("condition")}
      helperText={hasError("condition") ? dataForm.errors.condition : null}
      onChange={(event) => setDataForm({
        ...dataForm,
        values: {
          ...dataForm.values,
          plant_id: event.target.value,
        },
      })}
    >
        {plants.map((plant) => (
    <MenuItem key={plant.id} value={plant.id}>
            {plant.name}
      </MenuItem>
        ))}
    </Select>
      </FormControl>
    <TextField
      label="Nombre"
      type="text"
      className={classes.margin}
      error={hasError("typeAlarmName")}
          helperText={
            hasError("typeAlarmName")
            ? "El nombre del tipo de alarma es requerido" : null
          }
      onChange={handleChange}
      value={dataForm.values.typeAlarmName || ""}
      id="typeAlarmName"
      name="typeAlarmName"
    />
    <div className={classes.container}>

    <FormControl >
        <InputLabel id="tag">Tag</InputLabel>       
    <Select
      labelId='tag'
      id="listTags"
      label="Tag"
      onChange={(event) => {
        setConditionalValues({ ...conditionalValues, tag: event.target.value });
      }}
      className={classes.selectTag}
    >
        {tags.map((tag) => (
    <MenuItem key={tag.instId} value={tag.tagid}>
            {tag.tagName}
      </MenuItem>
        ))}
    </Select>
      </FormControl>
      <FormControl >
      <InputLabel id="conditionalInput">Condicional</InputLabel>       
        <Select
        labelId='conditionalInput'
          value={conditionalValues.conditional}
          onChange={(event) => {
            setConditionalValues({ ...conditionalValues, conditional: event.target.value });
          }}
          className={classes.selectConditional}
        >
          <MenuItem value="<">&lt;</MenuItem>
          <MenuItem value=">=">&gt;=</MenuItem>
          <MenuItem value=">">&gt;</MenuItem>
          <MenuItem value="<=">&lt;=</MenuItem>
          <MenuItem value="=">=</MenuItem>
        </Select>
        </FormControl>
        <TextField
          label="Valor"
          type="number"
          onChange={(event) => {
            setConditionalValues({ ...conditionalValues, value: event.target.value });
          }}
          className={classes.valueTextField}
          error={hasError("condition")}
          helperText={hasError("condition") ? dataForm.errors.condition : null}
        />
    </div>
    <FormControl >
        <InputLabel id="event">Evento</InputLabel>       
    <Select
      labelId='event'
      id="listEvents"
      label="Evento cuando se genere x alarmas"
      style={{marginBottom: '10px'}}
      value={dataForm.values.event_id || ''}
      onChange={(event) => setDataForm({
        ...dataForm,
        values: {
          ...dataForm.values,
          event_id: event.target.value,
        },
      })}
    >
        {events.map((event) => (
    <MenuItem key={event.id} value={event.id}>
            {event.name}
      </MenuItem>
        ))}
    </Select>
      </FormControl>
    </div>
      <div className={classes.right}>
      <TextField
        label="Descripción"
        type="text"
        multiline
        rows={4}
        style={{marginBottom: '10px'}}
        error={hasError("typeAlarmDescription")}
        helperText={
          hasError("typeAlarmDescription")
          ? "La descripcion del tipo de alarma es requerido" : null
        }
        onChange={handleChange}
        value={dataForm.values.typeAlarmDescription || ""}
        id="typeAlarmDescription"
        name="typeAlarmDescription"
      />
      <TextField
        label="Máximo de número de alarmas generados para enviar correo"
        type="number"
        error={hasError("numberAlarmsMax")}
        helperText={
          hasError("numberAlarmsMax")
          ? "El número maximo de alarmas es requerido" : null
        }
        onChange={handleChange}
        value={dataForm.values.numberAlarmsMax || ""}
        id="numberAlarmsMax"
        name="numberAlarmsMax"
      />
       <Autocomplete
        multiple
        id="listEmails"
        options={emails}
        disableCloseOnSelect
        onChange={(event, value) => handleAutocompleteChange(value)}
        value={dataForm.values.usersAssigned || []}
        getOptionLabel={(option) => option}
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        checked={selected}
      />
      {option}
    </li>
  )}
  renderTags={(selected, getTagProps) =>
    selected.length > 1 ? [
      <Chip
        icon={<CheckBoxIcon fontSize="small" />}
        label={selected[0]}
        deleteIcon={<Badge badgeContent={selected.length - 1} color="primary">+{selected.length - 1}</Badge>}
        {...getTagProps({ index: 0 })}
      />
    ] : 
    selected.map((option, index) => (
      <Chip
        icon={<CheckBoxIcon fontSize="small" />}
        label={option}
        {...getTagProps({ index })}
      />
    ))
  }
        renderInput={(params) => (
          <TextField {...params} label="Seleccione los correos donde se enviara una notificación" 
          error={hasError("usersAssigned")}
          helperText={
          hasError("usersAssigned")
          ? "Por favor, seleccione al menos una opción"
          : null
          }
          id="usersAssigned"
          name="usersAssigned"/>
        )}
      />
    </div>
  </div>
  <div className={classes.buttonContainer}>
  <Button
    disabled={!dataForm.isValid}
    type="submit"
    onClick={createNewTypeAlarm}
    variant="contained"
    color="primary"
    style={{ marginRight: '20px',marginBottom: '20px' }}
  >
    Guardar <Save/>
  </Button>
  <Button
    className={classes.createButton}
    href={typeAlarmListPath}
    xs
    variant="contained"
    color="primary"
    style={{ marginBottom: '20px' }}
  >
    Cancelar <Cancel/>
  </Button>
</div>
</Paper>
</div>
</>
  );
}

export default AddTypeAlarm