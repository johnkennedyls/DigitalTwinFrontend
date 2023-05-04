/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TypeAlarmService from '../../services/TypeAlarmService';
import AvatarLetter  from '../../components/AvatarLetter.jsx'; 
import { IconButton } from '@mui/material';
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
  badge: {
    display: 'inline-block',
    textTransform: 'uppercase',
    padding: '8px 12px',
    margin: '0 2px',
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: '14px',
    letterSpacing: '0.6px',
    lineHeight: 1,
    boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    backgroundColor: '#a7e8bd',
    '&[state="Activado"]': {
      backgroundColor: '#a7e8bd',
      color: '#036c39',
    },
    '&[state="paused"]': {
      backgroundColor: '#ffb3b3',
      color: '#8c0000',
    },
    '&[state="vacation"]': {
      backgroundColor: '#ffe58f',
      color: '#ad6800',
    },
  },
});


const ListTypeAlarm = () => {
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
      const data = await TypeAlarmService.getAlarms();
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
      state: "Activa",
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
      state: "Inactiva",
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
      state: "Inactiva",
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
      state: "Activa",
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

export default ListTypeAlarm;