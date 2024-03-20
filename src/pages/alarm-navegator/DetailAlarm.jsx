import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Select, FormControl, MenuItem, Typography, InputLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

import CommentBox from '../../components/alarms/CommentBox';
import ListAvatar from '../../components/alarms/ListAvatar';
import { getAlarmById } from '../../services/Api/AlarmService';
import { changeStateAlarm } from '../../services/Api/StateAlarmService';
import { formatDate } from '../../utils/FormatterDate';
import AlertMessage from '../../components/messages/AlertMessage';
import AlertDialog from '../../components/alarms/AlertDialog';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
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
    marginTop: '20px'
  },
  left: {
    width: '40%',
    height: 'auto',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '15px 10px 10px 0px'
    }
  },
  right: {
    width: '60%',
    height: 'auto',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '10px 5px 5px 0px'
    }
  },
  commentsSection: {
    overflow: 'visible'
  },
  firstElement: {
    width: '100%'
  },
  button: {
    width: '100px',
    height: '40px'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleCell: {
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

});

const DetailAlarm = () => {
  const classes = useStyles();
  const [alarm, setAlarm] = useState([]);
  const { id } = useParams();
  const [selectedState, setSelectedState] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  useEffect(() => {
    getAlarm();
  }, []);

  const getAlarm = () => {
    getAlarmById(id)
      .then((data) => {
        setAlarm(data);
        setSelectedState(data.stateAlarmName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    const newState = e.target.value;
    let message = 'Seguro que quieres cambiar el estado? Una vez lo hagas no podrá ser cambiado';
    if (newState === 'Cerrado') {
      message = 'Si cambia el estado de la alarma a Cerrado se cambiaran todas las demás alarmas asociadas al tipo de alarma';
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
    changeStateAlarm(requestBody, id)
      .then((data) => {
        handleShowAlert('El estado fue cambiado exitosamente', 'success');
      })
      .catch((error) => {
        console.error(error);
        handleShowAlert('El estado no pudo ser cambiado', 'error');
      });
    setIsSelectDisabled(true);
    setDialogOpen(false);
  };

  const handleShowAlert = (message, severity) => {
    setAlert({
      show: true,
      message,
      severity
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <div className={classes.paperContainer}>
        <Paper elevation={3} style={{ width: '900px', height: '520px', margin: '10px' }}>
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
              <Typography variant="body1" gutterBottom>
                <strong>Estado:</strong>
              </Typography>
              <FormControl>
                <InputLabel>{alarm.stateAlarmName}</InputLabel>
                <Select value={selectedState}
                  onChange={handleStateChange}
                  disabled={alarm.stateAlarmName === 'Cerrado' || isSelectDisabled}>
                  {alarm.stateAlarmName === 'Activa' && (
                    <MenuItem value="En Revision">En Revision</MenuItem>
                  )}
                  {alarm.stateAlarmName === 'En Revision' && (
                    <MenuItem value="Cerrado">Cerrado</MenuItem>
                  )}
                </Select>
              </FormControl>
              <AlertDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleConfirmChange}
                title="Confirmación"
                message={dialogMessage}
                confirm={true}
              />
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
              <CommentBox alarmId={id} handleShowAlert={handleShowAlert}/>
            </div>
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
};
export default DetailAlarm;
