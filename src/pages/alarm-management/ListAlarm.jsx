/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AlarmService from '../../services/AlarmService';
import AvatarLetter  from '../../components/AvatarLetter.jsx'; 
import { Avatar, IconButton } from '@mui/material';
import { Delete, Edit, Add,Visibility } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column', // Agrega una dirección de columna para colocar los elementos en una columna
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '50px', 
  },
  table: {
    maxWidth: '800px',
    marginBottom: '50px',
  },
  button: {
    marginTop: '70px', // Agrega un margen superior para separar el botón de la tabla
  },
  actionCell: {
    width: '120px', // ajuste el ancho de la celda aquí
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color:"#2764E3",
    paddingTop: 30,
    fontSize: 15,
  },
  tableCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greenBall: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#76D7C4',
    marginRight: '5px',
  },
  redBall: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: '5px',
  },
});


const ListAlarm = () => {
  const classes = useStyles();
  const addAlarmPath = "/add-alarm"
  const editAlarmPath = "/edit-alarm"
  const [alarms, setAlarms] = useState([]);

  const columns = [
    {
      title: "Nombre",
      field: "nameAlarm"
    },
    {
        title: "Descripción",
        field: "descriptionAlarm"
    },
    {
        title: "Tag",
        field: "tagAlarm"
    },
    {
        title: "Condición",
        field: "conditionAlarm"
    }
  ];

  useEffect(() => {
    getAlarms()
  }, []);

  const getAlarms = async () => {
    try {
      const data = await AlarmService.getAlarms();
      setAlarms(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  const data = [
    {
      alarmid: 1,
      nameAlarm: "Sistema A",
      descriptionAlarm: "Descripción del sistema A",
      tagAlarm: "tag-1",
      conditionAlarm: "Condiciones del sistema A",
      state: "Activado",
      avatars: [
        { name: "John Doe" },
        { name: "Pane Doe"},
        { name: "Kohn Doe" },
        { name: "Lohn Doe" },
        { name: "Cohn Doe" }
      ]
    },
    {
      alarmid: 2,
      nameAlarm: "Sistema B",
      descriptionAlarm: "Descripción del sistema B",
      tagAlarm: "tag-1",
      conditionAlarm: "Condiciones del sistema B",
      state: "No Activado",
      avatars: [
        { name: "Alex Smith"},
        { name: "Sarah Johnson"},
        { name: "Kohn Doe" },
        { name: "Lohn Doe" }
      ]
    },
    {
      alarmid: 3,
      nameAlarm: "Sistema C",
      descriptionAlarm: "Descripción del sistema C",
      tagAlarm: "tag-1",
      conditionAlarm: "Condiciones del sistema C",
      state: "Activado",
      avatars: [
        { name: "David Lee"},
        { name: "Emily Chen" },
        { name: "Kohn Doe" },
        { name: "Lohn Doe" }
      ]
    },
    {
      alarmid: 4,
      nameAlarm: "Sistema D",
      descriptionAlarm: "Descripción del sistema D",
      tagAlarm: "tag-1",
      conditionAlarm: "Condiciones del sistema D",
      state: "Activado",
      avatars: [
        { name: "Michael Davis"},
        { name: "Jennifer Kim"},
        { name: "Kohn Doe" },
        { name: "Lohn Doe" }
      ]
    }
  ];

  return (
    <div className={classes.tableContainer}>
      <Typography className={classes.title} variant="h3" color="primary">
              Gestión de Alarmas
            </Typography>
      <Table className={classes.table}>
  <TableHead>
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.field} width={column.width} className={classes.tableCell}>
          {column.title}
        </TableCell>
      ))}
       <TableCell width={100} className={classes.tableCell}>Estado</TableCell>
       <TableCell width={100} className={classes.tableCell}>Usuarios Asignados</TableCell> 
      <TableCell width={100} className={classes.tableCell}>Acciones</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.alarmid}>
        {columns.map((column) => (
          <TableCell key={`${row.alarmid}-${column.field}`} width={column.width}>
            {row[column.field]}
          </TableCell>
        ))}
         <TableCell>
            {row.state === "Activado" ? (
              <div>
                <div className={classes.greenBall}></div>
                <span>Activado</span>
              </div>
            ) : (
              <div>
                <div className={classes.redBall}></div>
                <span>No Activado</span>
              </div>
            )}
          </TableCell>
          <TableCell>
        <AvatarLetter names={row.avatars} />
      </TableCell> 
       <TableCell align="right" className={classes.actionCell}>
              <IconButton aria-label="show" onClick={() => handleEdit(row)}>
                <Visibility />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                <Delete />
              </IconButton>
            </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
       <Button
       className={classes.button}
        startIcon={<Add />}
        size="large"
        variant="contained"
        color="primary"
        style={{ marginBottom: 10 }}
      >
        Crear Alarma
      </Button>
    </div>
  )
}

export default ListAlarm;