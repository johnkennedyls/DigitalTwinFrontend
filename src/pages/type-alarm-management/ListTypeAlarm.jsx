/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {getTypeAlarms,deleteTypeAlarm} from '../../services/TypeAlarmService';
import AvatarLetter  from '../../components/AvatarLetter.jsx'; 
import { IconButton } from '@mui/material';
import { Delete, Edit, Add,Visibility } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import Paper from '@mui/material/Paper';
import AlertDialog  from '../../components/AlertDialog.jsx'; 


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
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
});


const ListTypeAlarm = () => {
  const classes = useStyles();
  const history = useHistory();

  const addTypeAlarmPath = "/add-type-alarm"
  const editTypeAlarmPath = "/edit-type-alarm/"
  const [alarms, setAlarms] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const columns = [
    {
      title: "Planta",
      field: "plantName"
    },
    {
      title: "Nombre",
      field: "typeAlarmName"
    },
    {
        title: "Descripción",
        field: "typeAlarmDescription"
    },
    {
        title: "Maximo de Alarmas",
        field: "numberAlarmsMax"
    },
    {
        title: "Condición",
        field: "condition"
    }
  ];

  const handleOpenDialog = (row) => {
    setCurrentRow(row);
    setOpen(true);
  };
  

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEdit = (row) => {
    history.push(`${editTypeAlarmPath}${row.typeAlarmId}`);
  };


  const handleDelete = () => {
    if (currentRow) {
      console.log(`Eliminando la fila con id ${currentRow.typeAlarmId}`);
      deleteTypeAlarm(currentRow.typeAlarmId)
    .then(() => {
      // eliminar la fila de la tabla
      const newAlarms = alarms.filter(alarm => alarm.typeAlarmId !== currentRow.typeAlarmId);
      setAlarms(newAlarms);
    })
    .catch((error) => {
      console.error(error);
    })
    }
    setOpen(false);
  };

  useEffect(() => {
    getAlarms()
  }, []);

  const getAlarms = () => {
    getTypeAlarms()
    .then((data) => {
      setAlarms(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

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
    {alarms.map((row) => (
      <TableRow key={row.typeAlarmId}>
        {columns.map((column) => (
          <TableCell key={`${row.typeAlarmId}-${column.field}`} width={column.width}>
            {row[column.field]}
          </TableCell>
        ))}
          <TableCell>
        <AvatarLetter names={row.usersAssigned} />
      </TableCell> 
       <TableCell align="right" className={classes.actionCell}>
              <IconButton aria-label="show" onClick={() => handleEdit(row)}>
                <Visibility />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleOpenDialog(row)}>
                <Delete />
              </IconButton>
            </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<AlertDialog
        open={open}
        onClose={handleCloseDialog}
        onDelete={handleDelete}
        title="Eliminar elemento"
        message="¿Está seguro de que desea eliminar este elemento?"
      />
       <Button
        className={classes.button}
        href={addTypeAlarmPath}
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