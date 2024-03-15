import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

import ListAvatar from '../../components/alarms/ListAvatar';
import { getTypeAlarmById } from '../../services/Api/TypeAlarmService';

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
    width: '50%',
    height: 'auto',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '15px 10px 10px 0px'
    }
  },
  right: {
    width: '50%',
    '& > *': {
      flexGrow: 1,
      margin: '10px 5px 5px 0px'
    }
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

const DetaiTypelAlarm = () => {
  const classes = useStyles();
  const [typeAlarm, setTypeAlarm] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = () => {
    getTypeAlarmById(id)
      .then((data) => {
        setTypeAlarm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.paperContainer}>
      <Paper elevation={3} style={{ width: '700px', height: '320px', margin: '30px' }}>
        <div className={classes.root}>
          <div className={classes.left}>
            <Typography variant="body1" gutterBottom>
              <strong>Planta:</strong> {typeAlarm.plantName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tipo de Alarma:</strong> {typeAlarm.typeAlarmName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Descripción:</strong>  {typeAlarm.typeAlarmDescription}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Condición:</strong> {typeAlarm.condition}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Número de alarmas máximas:</strong> {typeAlarm.numberAlarmsMax}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Evento:</strong> {typeAlarm.eventName}
            </Typography>
          </div>
          <div className={classes.right}>
            <Typography variant="body1" gutterBottom>
              <strong> Usuarios Asignados </strong>
            </Typography>
            <ListAvatar items={typeAlarm.usersAssigned} />
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default DetaiTypelAlarm;
