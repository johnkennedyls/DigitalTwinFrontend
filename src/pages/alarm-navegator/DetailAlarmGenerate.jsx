import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import CommentBox  from '../../components/CommentBox';
import ListAvatar  from '../../components/ListAvatar';
import {getAlarmById} from '../../services/AlarmService';
import {changeStateAlarm} from '../../services/StateAlarm';
import { Select,FormControl,MenuItem,Typography,InputLabel} from '@mui/material';
import {formatDate} from '../../components/FormatterDate';
import Paper from '@mui/material/Paper';
import {useParams} from 'react-router-dom';
import AlertDialog  from '../../components/AlertDialog.jsx'; 

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
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
    width: '40%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '15px 10px 10px 0px',
    }
  },
  right: {
    width: '60%',
    height: '70%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
    },
  },
    commentsSection: {
      height: '70%'
    },
    firstElement: {
      width: '100%',
    },
    button: {   
        width: '100px', 
        height:'40px', 
      },
      buttonWrapper: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      titleCell: {
        fontStyle: 'italic',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
  });


const DetailAlarmGenerate = () => {
    const classes = useStyles();
    const [alarm, setAlarm] = useState([]);
    const { id } = useParams();
    const [selectedState, setSelectedState] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);

    useEffect(() => {
      getAlarm()
    }, []);
  
    const getAlarm = () => {
      getAlarmById(id)
      .then((data) => {
        setAlarm(data);
        setSelectedState(data.stateAlarmName); 
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const handleStateChange = (e) => {
      setSelectedState(e.target.value);
      const newState = e.target.value;
      let message = "Seguro que quieres cambiar el estado? Una vez lo hagas no podrá ser cambiado";
      if (newState === "Cerrado") {
          message = "Si cambia el estado de la alarma a Cerrado se cambiaran todas las demas alarmas asociadas al tipo de alarma";
      }
      setDialogMessage(message);
      setDialogOpen(true);
  };

  const handleDialogClose = () => {
      setDialogOpen(false);
  };

  const handleConfirmChange = () => {
    const requestBody = {
      stateAlarmName: selectedState
    };
    changeStateAlarm(requestBody,id)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsSelectDisabled(true);
    setDialogOpen(false);
  };
  
    return (
      <div className={classes.paperContainer}>
        <Paper elevation={3} style={{ width: '800px', height: '470px',margin: '10px' }}>
        <div className={classes.root}>
          <div className={classes.left}>
          <Typography variant="body1" gutterBottom>
          <strong>Planta:</strong> {alarm.plantName}
            </Typography>
            <Typography variant="body1" gutterBottom>
            <strong>Tipo de Alarma:</strong> {alarm.typeAlarmName}
            </Typography>
            <Typography variant="body1" gutterBottom>
            <strong>Fecha de Activación:</strong> 
            <br />
            {formatDate(alarm.activationDate)}
            </Typography>
            <Typography variant="body1" gutterBottom>
            <strong>Valor del Tag:</strong> {alarm.tagValue}
            </Typography>
            <FormControl>
                <InputLabel>{alarm.stateAlarmName}</InputLabel>
                <Select value={selectedState} 
                    onChange={handleStateChange}
                    disabled={alarm.stateAlarmName === "Cerrado" || isSelectDisabled}>
                    {alarm.stateAlarmName === "Activa" && (
                        <MenuItem value="En Revision">En Revision</MenuItem>
                    )}
                    {alarm.stateAlarmName === "En Revision" && (
                        <MenuItem value="Cerrado">Cerrado</MenuItem>
                    )}
                </Select>
            </FormControl>
            <AlertDialog open={dialogOpen} onClose={handleDialogClose} onConfirm={handleConfirmChange} title="Confirmación" message={dialogMessage} confirm={true} />
            <div>
            <Typography variant="body1" gutterBottom>
            <strong> Usuarios Asignados </strong>
            </Typography>
              <ListAvatar items={alarm.usersAssigned} />
            </div>
          </div>
          <div className={`${classes.right} ${classes.commentsSection}`}>
          <Typography variant="body1" gutterBottom>
          <strong> Historial de Acciones </strong>
            </Typography>
            <CommentBox comments={alarm.actionsHistory} />
          </div>
        </div>
        </Paper>
      </div>
      );
    };
export default DetailAlarmGenerate;