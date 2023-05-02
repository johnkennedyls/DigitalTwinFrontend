import React, { useState, useEffect } from 'react';
import { TextField, Button, Select,MenuItem, Checkbox , FormControl , OutlinedInput,List, ListItem,Typography   } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import AlarmService from '../../services/AlarmService';
import { Save,Cancel } from '@mui/icons-material';
import validate from "validate.js";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& > *': {
      height: '500px',
      display: 'flex',
      flexDirection: 'column',

      padding: '30px',
      textAlign: 'left',
      width: '50%',
      '& > *': {
        width: '80%'
      }
    },
  },
  
  container: {
    marginTop: '40px',
    marginBottom: '40px',
    display: "flex"
  },
  margin: {
    marginBottom: '40px',
  },
  selectTag: {
    width: '230px',
    marginRight: '20px'
  },
  valueTextField: {
    width: '150px',
  },
  selectConditional: {
    width: '150px',
    marginRight: '20px'
  },
  subtitle: {
    marginTop: "30px",
    fontSize: 20
  },

  grid: {
    marginTop: "30px",

  },
  
buttonContainer: {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px' // Agregar un margen superior opcional para separar los botones del contenido anterior
},
title: {
  color:"#2764E3",
  paddingTop: 30,
  fontSize: 45,
  justifyContent: 'center',
},
});

const alarm = {
  alarmName: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 60,
      message: "La longitud máxima de la descripción es de 60 caracteres",
    },
  },
  
  alarmDescription: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 1,
      message: "La longitud máxima de la descripción es de 1 caracter",
    },
  },
  tag: {

    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 60,
      message: "La longitud máxima de la descripción es de 60 caracteres",
    },
  },
  event: {
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 60,
      message: "La longitud máxima de la descripción es de 60 caracteres",
    },
  },
 
 
};

function AddAlarm() {
  const classes = useStyles();
  const history = useHistory();

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);

  const [events, setEvents] = useState([]);
  const [emails, setEmails] = useState([]);
  const [conditional, setConditional] = useState('');





  const handleChangeConditional = (event) => {
    setConditional(event.target.value);
  };

  //Metodo para obtener la lista de tags
  useEffect(() => {
    async function getTags() {
      const tags = await AlarmService.getAlarms();
      setTags(tags);
    }
    getTags();
  }, []);

    //Metodo para obtener la lista de eventos
    useEffect(() => {
      async function getEvents() {
        const events = await AlarmService.getEvents();
        setEvents(events);
      }
      getEvents();
    }, []);

      //Metodo para obtener la lista de emails
  useEffect(() => {
    async function getEmails() {
      const emails = await AlarmService.getEmails();
      setEmails
      
      (emails);
    }
    getEmails();
  }, []);

  return (
<>
  <div className={classes.root}>
    <div>
    <TextField
      label="Nombre"
      type="text"
      className={classes.margin}
    />
    <div className={classes.container}>

    <FormControl >
        <InputLabel id="tag">Tag</InputLabel>       
    <Select
      labelId='tag'
      id="listTags"
      label="Tag"
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
          value={conditional}
          onChange={handleChangeConditional}
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
          type="text"
        />
    </div>
    <FormControl >
    <InputLabel id="event">Evento a realizar cuando se genere la alarma</InputLabel>     
    <Select
      labelId="event"
      id="listEvents"
      label="Institucion"
      className={classes.margin}
    >
      {events.map((event) => (
        <MenuItem
          key={event.instId}
          label={selectedValue ? selectedValue : "tag"}
          value={event.instId}
          style={{ marginRight: '10px', marginTop: '40px' }}
        >
          {event.instName}
        </MenuItem>
      ))}
    </Select>
    </FormControl>
    <Autocomplete
        multiple
        id="listEmails"
        options={emails}
        disableCloseOnSelect
        getOptionLabel={(option) =>
          option.emails.email
        }
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Seleccione los correos donde se enviara una notificación" />
        )}
      />
    </div>

    <div >
    <TextField
      label="Descripción"
      multiline
      rows={4}
    />
     <TextField
      label="Máximo de número de alarmas generados para enviar correo"
      type="number"
      className={classes.grid}
    />
    </div>
  </div>
  <div className={classes.buttonContainer}>
  <Button
    type="submit"
    variant="contained"
    color="primary"
    style={{ marginRight: '20px' }}
  >
    Guardar <Save/>
  </Button>
  <Button
    className={classes.createButton}
    xs
    variant="contained"
    color="primary"
  >
    Cancelar <Cancel/>
  </Button>
</div>
    </>
  );
}

export default AddAlarm
