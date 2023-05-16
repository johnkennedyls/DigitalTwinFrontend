/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {getTypeAlarms,deleteTypeAlarm,getTypeAlarmsByPlant} from '../../services/TypeAlarmService';
import AvatarLetter  from '../../components/AvatarLetter.jsx'; 
import { IconButton } from '@mui/material';
import { Delete, Edit, Add,Visibility } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow,TextField,InputLabel,Select,MenuItem, FormControl } from '@mui/material';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import AlertDialog  from '../../components/AlertDialog.jsx'; 


const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column', // Agrega una dirección de columna para colocar los elementos en una columna
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '20px', 
  },
  table: {
    maxWidth: '800px',
    marginBottom: '50px',
  },
  button: {
    marginTop: '70px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  actionColumn: {
    width: '150px', 
    textAlign: 'center !important',
  },
  centeredCell: {
    textAlign: 'center !important',
  },
  maxCell: {
    width: '150px', 
    textAlign: 'center !important',
  },
  titleCell: {
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const plants = [
  { id: 1, name: "IBQF1" },
  { id: 2, name: "vof" },
  { id: 3, name: "Pal24" },
  // ...
];

const ListTypeAlarm = () => {
  const classes = useStyles();
  const history = useHistory();

  const addTypeAlarmPath = "/add-type-alarm"
  const editTypeAlarmPath = "/edit-type-alarm/"
  const [alarms, setAlarms] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alarms.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

  const columns = [
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

  useEffect(() => {
  if (selectedPlant !== null) {
    getTypeAlarmsByPlant(selectedPlant)
      .then((response) => {
        setAlarms(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [selectedPlant]);

  return (
    <>
    <div className={classes.tableContainer}>
    <FormControl style={{ width: '250px' }}>
  <InputLabel id="plant">Planta</InputLabel>       
  <Select
    labelId="plant"
    id="listPlants"
    style={{ marginBottom: '10px' }}
    value={selectedPlant || ''}
    onChange={(e) => setSelectedPlant(e.target.value)}
  >
    {plants.map((plant) => (
      <MenuItem key={plant.id} value={plant.id}>
        {plant.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<TableContainer component={Paper} style={{ width: '1100px', height: '340px' }}>
  <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell className={`${classes.centeredCell} ${classes.titleCell}`} key={column.field} width={column.width}>
            {column.title}
          </TableCell>
        ))}
        <TableCell className={`${classes.centeredCell} ${classes.titleCell}`} width={100}>Usuarios Asignados</TableCell>
        <TableCell className={`${classes.centeredCell} ${classes.titleCell}`} width={100}>Acciones</TableCell>
      </TableRow>
    </TableHead>
    {alarms.length === 0 ? (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12} align="center" style={{ height: '198px' }}>
            No hay elementos disponibles.
          </TableCell>
        </TableRow>
      </TableBody>
    ) : (
      <TableBody style={{ height: 'calc(100% - 56px)' }}>
        {(rowsPerPage > 0
          ? alarms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : alarms
        ).map((row) => (
          <TableRow key={row.typeAlarmId}>
            {columns.map((column) => (
              <TableCell className={classes.centeredCell} key={`${row.typeAlarmId}-${column.field}`} width={column.width}>
                {row[column.field]}
              </TableCell>
            ))}
            <TableCell className={classes.usersCell}>
              <AvatarLetter names={row.usersAssigned} />
            </TableCell>
            <TableCell className={classes.actionColumn}>
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
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={8} />
          </TableRow>
        )}
      </TableBody>
    )}
    <TableFooter>
      <TableRow style={{ textAlign: 'center' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={8}
          count={alarms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  </Table>
</TableContainer>

<AlertDialog
        open={open}
        onClose={handleCloseDialog}
        onDelete={handleDelete}
        title="Eliminar elemento"
        message="¿Está seguro de que desea eliminar este elemento?"
      />
      </div>
      <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <Button
        className={classes.button}
        href={addTypeAlarmPath}
        startIcon={<Add />}
        size="large"
        variant="contained"
        color="primary"
      >
        Crear Alarma
      </Button>
      </div>
      </>
  )
}

export default ListTypeAlarm;