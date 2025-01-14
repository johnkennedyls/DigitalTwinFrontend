import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  TextField, Button, Badge,
  Select, MenuItem, Checkbox,
  FormControl, Chip, InputLabel,
  Autocomplete, Paper
} from '@mui/material';
import { useSelector } from 'react-redux';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Save, Cancel } from '@mui/icons-material';
import validate from 'validate.js';
import { makeStyles } from '@mui/styles';

import { getTypeAlarmById, updateTypeAlarm, getEmails, getEvents } from '../../services/Api/TypeAlarmService';
import AlertMessage from '../../components/messages/AlertMessage';
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
        width: '100%'
      }
    }
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px'
  },
  left: {
    width: '50%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '0px 0px 10px 0px'
    }
  },
  right: {
    width: '50%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '10px 10px 0px 0px'
    }
  },
  container: {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '15px'
  },
  margin: {
    marginBottom: '5px'
  },
  selectTag: {
    width: '100px',
    marginRight: '20px'
  },
  valueTextField: {
    width: '100px'
  },
  selectConditional: {
    width: '150px',
    marginRight: '20px'
  },
  subtitle: {
    marginTop: '30px',
    fontSize: 20
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    color: '#2764E3',
    paddingTop: 30,
    fontSize: 45,
    justifyContent: 'center'
  }
});

const alarm = {
  typeAlarmName: {
    presence: { allowEmpty: false, message: 'Es requerido' }
  },
  typeAlarmDescription: {
    presence: { allowEmpty: false, message: 'Es requerido' },
    length: {
      maximum: 5000,
      message: 'La longitud máxima de la descripción es de 5000 caracter'
    }
  },
  condition: {
    presence: { allowEmpty: false, message: 'Todos los campos son obligatorios' }
  },
  numberAlarmsMax: {
    presence: { allowEmpty: false, message: 'Es requerido' }
  },
  event_id: {
    presence: { allowEmpty: false, message: 'Seleccione un evento' }
  },
  plant_id: {
    presence: { allowEmpty: false, message: 'Seleccione una planta' }
  },
  usersAssigned: {
    presence: { allowEmpty: false, message: 'Seleccione al menos una opción' }
  }
};

function EditTypeAlarm () {
  const history = useHistory();

  const classes = useStyles();
  const typeAlarmListPath = '/manage-type-alarm';
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const plantState = useSelector(state => state.plants);
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [emails, setEmails] = useState([]);
  const [typeAlarmData, setTypeAlarmData] = useState([]);
  const [tags, setTags] = useState([]);
  const [plants, setPlants] = useState([]);

  const [conditionalValues, setConditionalValues] = useState({
    tag: '',
    condition: '',
    value: ''
  });

  const [dataForm, setDataForm] = useState({
    isValid: false,
    errors: {},
    touched: {},
    values: {
      usersAssigned: typeAlarmData.usersAssigned || []
    }
  });

  useEffect(() => {
    setDataForm({
      ...dataForm,
      values: {
        ...dataForm.values,
        plant_id: typeAlarmData.plantName
          ? plants.find(plant => plant.plantName === typeAlarmData.plantName)?.plantId
          : '',
        typeAlarmName: typeAlarmData.typeAlarmName || '',
        typeAlarmDescription: typeAlarmData.typeAlarmDescription || '',
        numberAlarmsMax: typeAlarmData.numberAlarmsMax || '',
        event_id: typeAlarmData.eventName
          ? events.find(event => event.eventName === typeAlarmData.eventName)?.eventId
          : '',
        usersAssigned: typeAlarmData.usersAssigned || []
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeAlarmData]);

  useEffect(() => {
    if (dataForm.values.plant_id) {
      const selectedPlant = plants.find(plant => plant.plantName === typeAlarmData.plantName);
      const selectedPlantTags = selectedPlant ? selectedPlant.tags : [];
      setTags(selectedPlantTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForm.values.plant_id, typeAlarmData.plantName]);

  const hasError = (field) => {
    if (field === 'typeAlarmName' || field === 'typeAlarmDescription' ||
    field === 'numberAlarmsMax' || field === 'event_id' ||
    field === 'usersAssigned' || field === 'condition' || field === 'plant_id') {
      if (dataForm.values[field] === '') {
        return false;
      }
    }
    return !!(dataForm.touched[field] && dataForm.errors[field]);
  };

  useEffect(() => {
    handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForm.values]);

  const handleErrors = () => {
    const errors = validate(dataForm.values, alarm);
    setDataForm((dataForm) => ({
      ...dataForm,
      isValid: !errors,
      errors: errors || {}
    }));
  };

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
        [event.target.name]: event.target.id === 'numberAlarmsMax' ? parseInt(event.target.value) : event.target.value
      },
      touched: {
        ...dataForm.touched,
        [event.target.name]: true
      }
    }));
  };

  useEffect(() => {
    const currentPlants = Object.values(plantState);
    setPlants(currentPlants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const concatenateValues = () => {
    if (conditionalValues.tag && conditionalValues.condition && conditionalValues.value) {
      const condition = `${conditionalValues.tag} ${conditionalValues.condition} ${conditionalValues.value}`;
      setDataForm((dataForm) => ({
        ...dataForm,
        values: {
          ...dataForm.values,
          condition
        }
      }));
    } else {
      setDataForm((dataForm) => ({
        ...dataForm,
        values: {
          ...dataForm.values,
          condition: ''
        }
      }));
    }
    handleErrors();
  };
  useEffect(() => {
    getEmailsSystem();
  }, []);

  const getEmailsSystem = () => {
    getEmails()
      .then((data) => {
        const userEmails = data.map((item) => item.userEmail);
        setEmails(userEmails);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEventsDashboard();
  }, []);

  const getEventsDashboard = () => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    concatenateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionalValues]);

  const handleAutocompleteChange = (value) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      values: {
        ...dataForm.values,
        usersAssigned: value
      },
      touched: {
        ...dataForm.touched,
        usersAssigned: true
      }
    }));
  };

  useEffect(() => {
    getTypeAlarmById(id)
      .then(data => {
        setTypeAlarmData(data);
        if (data?.condition) {
          const parts = data.condition.split(/(>=|<=|>|<|=)/);
          setConditionalValues({
            tag: parts[0].trim(),
            condition: parts[1].trim(),
            value: parts[2].trim()
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleCloseAlert = () => {
    setAlert(prevState => ({ ...prevState, show: false }));
  };

  const typeAlarmNavigate = (e) => {
    e.preventDefault();
    history.push(typeAlarmListPath);
  };

  const editTypeAlarm = async (event) => {
    updateTypeAlarm(id, dataForm.values).then((data) => {
      const message = 'Se ha editado exitosamente el tipo de alarma';
      const severity = 'success';
      setAlert({ show: true, message, severity });
      history.push(typeAlarmListPath);
    })
      .catch((error) => {
        let message = '';
        const severity = 'error';
        if (error.response) {
          if (error.response.data === 'El nombre del tipo de alarma ya existe') {
            message = error.response.data;
            setAlert({ show: true, message, severity });
          } else {
            message = error.response.data;
            setAlert({ show: true, message, severity });
          }
        }
      });
  };

  return (
    <>
      <div className={classes.paperContainer}>
        <Paper elevation={3} style={{ width: '800px', height: '400px', margin: '10px' }}>
          <div className={classes.root}>
            <div className={classes.left}>
              <FormControl>
                <InputLabel id="plant">Planta</InputLabel>
                <Select
                  labelId="plant"
                  id="listPlants"
                  style={{ marginBottom: '10px' }}
                  value={dataForm.values.plant_id || ''}
                  error={hasError('plant_id')}
                  helperText={hasError('plant_id') ? dataForm.errors.plant_id : null}
                  onChange={(event) => {
                    setDataForm({
                      ...dataForm,
                      values: {
                        ...dataForm.values,
                        plant_id: event.target.value
                      }
                    });
                    const selectedPlant = plants.find(plant => plant.plantId === event.target.value);
                    setTags(selectedPlant ? selectedPlant.tags : []);
                  }}
                >
                  {plants.map((plant) => (
                    <MenuItem key={plant.plantId} value={plant.plantId}>
                      {plant.plantName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Nombre"
                type="text"
                className={classes.margin}
                error={hasError('typeAlarmName')}
                helperText={
                  hasError('typeAlarmName')
                    ? 'El nombre del tipo de alarma es requerido'
                    : null
                }
                onChange={handleChange}
                value={dataForm.values.typeAlarmName || ''}
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
                    value={conditionalValues.tag}
                    onChange={(event) => {
                      setConditionalValues({ ...conditionalValues, tag: event.target.value });
                    }}
                    className={classes.selectTag}
                  >
                    {Object.entries(tags).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl >
                  <InputLabel id="conditionalInput">Condicional</InputLabel>
                  <Select
                    labelId='conditionalInput'
                    value={conditionalValues.condition}
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
                  value={conditionalValues.value}
                  onChange={(event) => {
                    setConditionalValues({ ...conditionalValues, value: event.target.value });
                  }}
                  className={classes.valueTextField}
                  error={hasError('condition')}
                  helperText={hasError('condition') ? dataForm.errors.condition : null}
                />
              </div>
              <FormControl >
                <InputLabel id="event">Evento</InputLabel>
                <Select
                  labelId='event'
                  id="listEvents"
                  label="Evento cuando se genere x alarmas"
                  style={{ marginBottom: '10px' }}
                  value={dataForm.values.event_id || ''}
                  onChange={(event) => setDataForm({
                    ...dataForm,
                    values: {
                      ...dataForm.values,
                      event_id: event.target.value
                    }
                  })}
                >
                  {events.map((event) => (
                    <MenuItem key={event.eventId} value={event.eventId}>
                      {event.eventName}
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
                style={{ marginBottom: '10px' }}
                error={hasError('typeAlarmDescription')}
                helperText={
                  hasError('typeAlarmDescription')
                    ? 'La descripcion del tipo de alarma es requerido'
                    : null
                }
                onChange={handleChange}
                value={dataForm.values.typeAlarmDescription || ''}
                id="typeAlarmDescription"
                name="typeAlarmDescription"
              />
              <TextField
                label="Máximo de número de alarmas generados para enviar correo"
                type="number"
                error={hasError('numberAlarmsMax')}
                helperText={
                  hasError('numberAlarmsMax')
                    ? 'El número maximo de alarmas es requerido'
                    : null
                }
                onChange={handleChange}
                value={dataForm.values.numberAlarmsMax || ''}
                id="numberAlarmsMax"
                name="numberAlarmsMax"
                inputProps={{ min: '1' }}
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
                  selected.length > 1
                    ? [
                      <Chip
                        key={selected.length}
                        icon={<CheckBoxIcon fontSize="small" />}
                        label={selected[0]}
                        deleteIcon={<Badge badgeContent={selected.length - 1} color="primary">+{selected.length - 1}</Badge>}
                        {...getTagProps({ index: 0 })}
                      />
                    ]
                    : selected.map((option, index) => (
                      <Chip
                        key={index}
                        icon={<CheckBoxIcon fontSize="small" />}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Seleccione los correos donde se enviara una notificación"
                    error={hasError('usersAssigned')}
                    helperText={
                      hasError('usersAssigned')
                        ? 'Por favor, seleccione al menos una opción'
                        : null
                    }
                    id="usersAssigned"
                    name="usersAssigned" />
                )}
              />
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              disabled={!dataForm.isValid}
              type="submit"
              onClick={editTypeAlarm}
              variant="contained"
              color="primary"
              style={{ marginRight: '20px', marginBottom: '20px' }}
            >
              Guardar <Save />
            </Button>
            <Button
              className={classes.createButton}
              onClick={typeAlarmNavigate}
              xs
              variant="contained"
              color="primary"
              style={{ marginBottom: '20px' }}
            >
              Cancelar <Cancel />
            </Button>
          </div>
        </Paper>
      </div>
      <div>
        <AlertMessage
          open={alert.show}
          message={alert.message}
          severity={alert.severity}
          handleClose={handleCloseAlert}
        />
      </div>
    </>
  );
}

export default EditTypeAlarm;
