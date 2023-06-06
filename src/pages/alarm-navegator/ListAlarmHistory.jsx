/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {getAlarmsHistory} from '../../services/AlarmService';
import AvatarLetter  from '../../components/alarms/AvatarLetter.jsx'; 
import {  IconButton } from '@mui/material';
import ChipState  from '../../components/alarms/ChipState.jsx'; 
import {Visibility } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow,TableContainer,TableFooter,TablePagination,Paper,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {formatDate} from '../../services/utils/FormatterDate';
import { useSelector } from 'react-redux';
import {getAllAlarmsClosedByPlantId} from '../../services/AlarmService';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '50px', 
  },
  button: {
    marginTop: '70px', 
  },
  actionCell: {
    width: '120px',
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
  actionColumn: {
    width: '150px', 
    textAlign: 'center !important',
  },
  centeredCell: {
    textAlign: 'center !important',
  },
  titleCell: {
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  conditionColumn: {
    width: '150px', 
    textAlign: 'center !important',
  },
});


const ListAlarmHistory = () => {
  const classes = useStyles();
  const [alarms, setAlarms] = useState([]);
  const publicUrl = import.meta.env.VITE_PUBLIC_URL;
  const detailAlarmPath = `/detail-alarm/`
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const plantState = useSelector(state => state.plants)
  const [plants, setPlants] = useState([])
  const [selectedPlant, setSelectedPlant] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const currentPlants = Object.values(plantState)
    setPlants(currentPlants)
  }, []);

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
      title: "Tipo de Alarma",
      field: "typeAlarmName"
    },
    {
      title: "Condición",
      field: "condition"
    },
    {
        title: "Fecha de Activación",
        field: "activationDate"
    },
  ];

  const handleShowDetail = (row) => {
    // window.location.href = `${publicUrl}${detailAlarmPath}${row.alarmid}`;
    history.push(`${detailAlarmPath}${row.alarmid}`);
  };
  useEffect(() => {
    if (selectedPlant !== null) {
      getAllAlarmsClosedByPlantId(selectedPlant)
        .then((response) => {
          setAlarms(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedPlant]);

  useEffect(() => {
    getAlarms()
  }, []);

  const getAlarms = () => {
    getAlarmsHistory()
    .then((data) => {
      setAlarms(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className={classes.tableContainer}>
      <FormControl style={{ width: '250px',marginBottom:'30px' }}>
        <InputLabel id="plant">Planta</InputLabel>       
        <Select
          labelId="plant"
          id="listPlants"
          style={{ marginBottom: '10px' }}
          value={selectedPlant || ''}
          onChange={(e) => setSelectedPlant(e.target.value)}
        >
          {plants.map((plant) => (
            <MenuItem key={plant.plantId} value={plant.plantId}>
              {plant.plantName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} style={{ width: '800px', height: 'auto', overflow: 'visible' }}>
  <Table className={classes.table} aria-label="custom pagination table">
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.field} width={column.width} className={`${classes.centeredCell} ${classes.titleCell}`}>
            {column.title}
          </TableCell>
        ))}
        <TableCell width={100} className={`${classes.centeredCell} ${classes.titleCell}`}>Estado</TableCell>
        <TableCell width={100} className={`${classes.centeredCell} ${classes.titleCell}`}>Usuarios Asignados</TableCell> 
        <TableCell width={100} className={`${classes.centeredCell} ${classes.titleCell}`}>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {alarms.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center" style={{ height: '200px' }}>
            No hay elementos disponibles.
          </TableCell>
        </TableRow>
      ) : (
        <>
          {(rowsPerPage > 0
            ? alarms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : alarms
          ).map((row) => (
            <TableRow key={row.alarmid}>
              {columns.map((column) => {
                if (column.field === 'activationDate') {
                  return (
                    <TableCell className={classes.centeredCell} key={`${row.alarmid}-${column.field}`} width={column.width}>
                      {formatDate(row[column.field])}
                    </TableCell>
                  );
                }
                return (
                  <TableCell className={classes.centeredCell} key={`${row.alarmid}-${column.field}`} width={column.width}>
                    {row[column.field]}
                  </TableCell>
                );
              })}
              <TableCell className={classes.centeredCell}>
                <ChipState state={row.stateAlarmName} />
              </TableCell>
              <TableCell className={classes.centeredCell}>
                <AvatarLetter names={row.usersAssigned} />
              </TableCell>
              <TableCell className={classes.centeredCell}>
                <IconButton aria-label="show" onClick={() => handleShowDetail(row)}>
                  <Visibility />
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

    </div>
  )
}

export default ListAlarmHistory;