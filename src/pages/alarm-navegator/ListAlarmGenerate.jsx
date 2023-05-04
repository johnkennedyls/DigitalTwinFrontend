/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AlarmService from '../../services/AlarmService';
import AvatarLetter  from '../../components/AvatarLetter.jsx'; 
import {  IconButton } from '@mui/material';
import ChipState  from '../../components/ChipState.jsx'; 
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


const ListAlarmGenerate = () => {
  const classes = useStyles();
  const addAlarmPath = "/add-alarm"
  const editAlarmPath = "/edit-alarm"
  const [alarms, setAlarms] = useState([]);

  const columns = [
    {
      title: "Condición",
      field: "condition"
    },
    {
        title: "Fecha de Activación",
        field: "dateActive"
    },
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
      condition: "H20>0.3",
      dateActive: "20-04-10 8:10:21 AM",
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
        condition: "POD=3.3",
        dateActive: "20-04-10 8:10:21 AM",
        state: "En Revisión",
        avatars: [
          { name: "John Doe" },
          { name: "Pane Doe"},
          { name: "Kohn Doe" },
          { name: "Lohn Doe" },
          { name: "Cohn Doe" }
        ]
      },
      {
        alarmid: 3,
        condition: "R>0.3",
        dateActive: "20-04-10 8:10:21 AM",
        state: "Cerrada",
        avatars: [
          { name: "John Doe" },
          { name: "Pane Doe"},
          { name: "Kohn Doe" },
          { name: "Lohn Doe" },
          { name: "Cohn Doe" }
        ]
      }
  ];

  return (
    <div className={classes.tableContainer}>
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
          <ChipState state={row.state}>
          </ChipState>
          </TableCell>
          <TableCell>
        <AvatarLetter names={row.avatars} />
      </TableCell> 
       <TableCell align="right" className={classes.actionCell}>
              <IconButton aria-label="show" onClick={() => handleEdit(row)}>
                <Visibility />
              </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  )
}

export default ListAlarmGenerate;