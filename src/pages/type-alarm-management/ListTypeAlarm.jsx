/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IconButton, Table, TableBody,
  TableCell, TableHead, TableRow,
  InputLabel, Select, MenuItem,
  FormControl, Button
} from '@mui/material';
import { Delete, Edit, Add, Visibility } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from 'react-redux';

import AlertDialog from '../../components/alarms/AlertDialog.jsx';
import AlertMessage from '../../components/messages/AlertMessage';
import AvatarLetter from '../../components/alarms/AvatarLetter.jsx';
import { getTypeAlarms, deleteTypeAlarm, getTypeAlarmsByPlant } from '../../services/Api/TypeAlarmService.js';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    margin: '0 auto',
    marginTop: '30px',
    marginBottom: '30px'
  },
  table: {
    maxWidth: '800px',
    marginBottom: '50px'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionCell: {
    width: '120px', // ajuste el ancho de la celda aquí
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#2764E3',
    paddingTop: 30,
    fontSize: 15
  },
  tableCell: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  },
  actionColumn: {
    width: '150px',
    textAlign: 'center !important'
  },
  centeredCell: {
    textAlign: 'center !important'
  },
  maxCell: {
    width: '150px',
    textAlign: 'center !important'
  },
  titleCell: {
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  stickyFooter: {
    position: 'sticky',
    bottom: 0
  }
});

const ListTypeAlarm = () => {
  const history = useHistory();
  const basePath = import.meta.env.VITE_DASHBOARD_BASE_PATH;
  const plantState = useSelector(state => state.plants);
  const [plants, setPlants] = useState([]);
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const classes = useStyles();

  const showTypeAlarmPath = '/detail-type-alarm/';
  const addTypeAlarmPath = '/add-type-alarm';
  const editTypeAlarmPath = '/edit-type-alarm/';

  const [alarms, setAlarms] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const currentPlants = Object.values(plantState);
    setPlants(currentPlants);
  }, [plantState]);

  useEffect(() => {
    const currentPlants = Object.values(plantState);
    setPlants(currentPlants);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    {
      title: 'Nombre',
      field: 'typeAlarmName'
    },
    {
      title: 'Planta',
      field: 'plantName'
    },
    {
      title: 'Descripción',
      field: 'typeAlarmDescription'
    },
    {
      title: 'Maximo de Alarmas',
      field: 'numberAlarmsMax'
    },
    {
      title: 'Condición',
      field: 'condition'
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
    history.push(`/edit-type-alarm/${row.typeAlarmId}`);
  };

  const handleShow = (row) => {
    history.push(`/detail-type-alarm/${row.typeAlarmId}`);
  };

  const handleDelete = () => {
    if (currentRow) {
      deleteTypeAlarm(currentRow.typeAlarmId)
        .then(() => {
          const message = 'Se ha eliminado exitosamente el tipo de alarma';
          const severity = 'success';
          setAlert({ show: true, message, severity });
          const newAlarms = alarms.filter(alarm => alarm.typeAlarmId !== currentRow.typeAlarmId);
          setAlarms(newAlarms);
        })
        .catch((error) => {
          console.error(error);
          const message = 'No se ha podido eliminar la alarma';
          const severity = 'error';
          setAlert({ show: true, message, severity });
        });
    }
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setAlert(prevState => ({ ...prevState, show: false }));
  };

  useEffect(() => {
    getAlarms();
  }, []);

  const getAlarms = () => {
    getTypeAlarms()
      .then((data) => {
        setAlarms(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTypeAlarmNavidate = (e) => {
    e.preventDefault();
    history.push(addTypeAlarmPath);
  };

  const handleChange = (e) => {
    const plantId = e.target.value;
    setSelectedPlant(plantId);
    if (plantId === 'all') {
      getTypeAlarms()
        .then((data) => {
          setAlarms(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getTypeAlarmsByPlant(plantId)
        .then((response) => {
          setAlarms(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className={classes.tableContainer}>
        <FormControl style={{ width: '250px', marginBottom: '30px' }}>
          <InputLabel id="plant">Planta</InputLabel>
          <Select
            labelId="plant"
            id="listPlants"
            style={{ marginBottom: '10px' }}
            value={selectedPlant || 'all'}
            onChange={handleChange}
          >
            <MenuItem key="all" value="all">
              Todas
            </MenuItem>
            {plants.map((plant) => (
              <MenuItem key={plant.plantId} value={plant.plantId}>
                {plant.plantName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper} style={{ width: '1100px', height: 'auto' }}>
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
            <TableBody>
              {alarms.length === 0
                ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center" style={{ height: '198px' }}>
                    No hay elementos disponibles.
                    </TableCell>
                  </TableRow>
                )
                : (
                  <>
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
                          <IconButton aria-label="show" onClick={() => handleShow(row)}>
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
                  </>
                )}
            </TableBody>
            <TableFooter className={classes.stickyFooter}>
              <TableRow style={{ textAlign: 'center' }}>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 10, { label: 'All', value: -1 }]}
                  colSpan={8}
                  count={alarms.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          className={classes.button}
          onClick={addTypeAlarmNavidate}
          startIcon={<Add />}
          size="large"
          variant="contained"
          color="primary"
        >
          Crear Alarma
        </Button>
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

export default ListTypeAlarm;
