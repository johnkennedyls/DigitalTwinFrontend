import { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Papa from 'papaparse';

import PropTypes from 'prop-types';

const CsvLoader = ({ onConfirmDataImport }) => {
  const [open, setOpen] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [selectedTagColumn, setSelectedTagColumn] = useState('');
  const [selectedDescriptionColumn, setSelectedDescriptionColumn] = useState('');
  const [selectedDataTypeColumn, setSelectedDataTypeColumn] = useState('');

  const fileInput = useRef(null);

  const handleFileUpload = (e) => {
    Papa.parse(e.target.files[0], {
      complete: function (results) {
        const dataStart = hasHeaders ? 1 : 0;
        setHeaders(hasHeaders ? results.data[0] : results.data[0].map((_, i) => `Columna #${i + 1}`));
        setData(results.data.slice(dataStart));
      }
    });
    setFileLoaded(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFileLoaded(false);
    setSelectedTagColumn('');
    setSelectedDescriptionColumn('');
    setSelectedDataTypeColumn('');
    setOpen(false);
  };

  const handleConfirm = () => {
    const descriptionsData = data.map((row) => selectedDescriptionColumn !== '' ? row[headers.indexOf(selectedDescriptionColumn)] : '');
    const tagsData = data.map((row) => row[headers.indexOf(selectedTagColumn)]);
    const dataTypeData = data.map((row) => selectedDataTypeColumn !== '' ? row[headers.indexOf(selectedDataTypeColumn)] : '');
    onConfirmDataImport(tagsData, descriptionsData, dataTypeData);
    handleClose();
  };

  const handleTagColumnChange = (e) => {
    setSelectedTagColumn(e.target.value);
  };

  const handleDescriptionColumnChange = (e) => {
    setSelectedDescriptionColumn(e.target.value);
  };

  const handleDataTypeColumnChange = (e) => {
    setSelectedDataTypeColumn(e.target.value);
  };

  const renderOnFileLoaded = () => {
    return (
      <>
        <p>Preview de los datos</p>
        <TableContainer style={{ maxHeight: '40vh', overflow: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <p>Selecciona la columna que contiene los tags*</p>
        <FormControl fullWidth>
          <InputLabel>TAG</InputLabel>
          <Select value={selectedTagColumn} onChange={handleTagColumnChange} label="TAG">
            {headers.map((header, index) => (
              <MenuItem key={index} value={header}>{header}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>Selecciona la columna que contiene las descripciones</p>
        <FormControl fullWidth>
          <InputLabel>DESCRIPCIÓN</InputLabel>
          <Select value={selectedDescriptionColumn} onChange={handleDescriptionColumnChange} label="DESCRIPCIÓN">
            {headers.map((header, index) => (
              <MenuItem key={index} value={header}>{header}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>Selecciona la columna que contiene los tipos de datos</p>
        <FormControl fullWidth>
          <InputLabel>TIPO DE DATO</InputLabel>
          <Select value={selectedDataTypeColumn} onChange={handleDataTypeColumnChange} label="TIPO DE DATO">
            {headers.map((header, index) => (
              <MenuItem key={index} value={header}>{header}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    )
  }

  const renderOnFileNotLoaded = () => {
    return (
      <>
        <FormControlLabel
          control={<Checkbox checked={hasHeaders} onChange={(e) => setHasHeaders(e.target.checked)} />}
          label="El CSV tiene encabezados?"
        />
        <input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInput} style={{ display: 'None' }} />
        <Button variant="outlined" color="success" onClick={() => fileInput.current.click()}>
          Seleccionar archivo
        </Button>
      </>
    )
  }

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleOpen}>
        Importar datos
      </Button>
      <Dialog open={open} onClose={handleClose} style={{ minWidth: '80vw' }}>
        <DialogTitle>Importar tags</DialogTitle>
        <DialogContent>
          {!fileLoaded && renderOnFileNotLoaded()}

          {fileLoaded && renderOnFileLoaded()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={selectedTagColumn === ''} onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CsvLoader;

CsvLoader.propTypes = {
  onConfirmDataImport: PropTypes.func.isRequired
};
