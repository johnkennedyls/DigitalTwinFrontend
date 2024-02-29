import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as XLSX from 'xlsx';
import { ErrorAlert } from "../../utils/Alert";
import { toCamelCase, toTitleCase } from "../../utils/TextConverter";

function ImportDialog({ tags, setTags }) {
    const [open, setOpen] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const fileInput = useRef(null);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFileLoaded(false);
        setDisabled(true);
        setHeaders([]);
    }

    const generateTemplate = () => {
        const data = [['Svg Id', 'Name', 'Description']];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');
        XLSX.writeFile(wb, 'Plantilla para tags.xlsx');
    };

    const handleImport = () => {
        setOpen(false);
        setFileLoaded(false);
        setDisabled(true);
        const newTags = [];
        for (let i = 0; i < rows.length; i++) {
            const tag = {};
            let tagExists = false;
            for (let existingTag of tags) {
                if (existingTag.name === rows[i][headers.indexOf('name')]) {
                    tagExists = true;
                    Object.assign(existingTag.metadata, {
                        ...existingTag.metadata,
                        ...rows[i].reduce((acc, value, index) => {
                            if (headers[index] !== 'name' && headers[index] !== 'description') {
                                acc[headers[index]] = value;
                            }
                            return acc;
                        }, {}),
                    });
                    break;
                }
            }
            if (!tagExists) {
                for (let j = 0; j < headers.length; j++) {
                    if (headers[j] === 'name' || headers[j] === 'description') {
                        tag[headers[j]] = rows[i][j];
                    } else {
                        tag.metadata = tag.metadata || {};
                        tag.metadata[headers[j]] = rows[i][j];
                    }
                }
                newTags.push(tag);
            }
        }
        setTags([...tags, ...newTags]);
    }

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const [currentHeaders] = jsonData.slice(0, 1);

            setHeaders(currentHeaders.map((header) => toCamelCase(header)));
            setRows(jsonData.slice(1));
            setFileLoaded(true);
        };
        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        if (headers.length > 0) {
            checkIfHaveSubheaders();
        } else setDisabled(true);
    }, [headers]);

    function checkIfHaveSubheaders() {
        for (let i = 0; i < headers.length; i++) {
            if (headers[i] === undefined) {
                ErrorAlert('No se puede importar un archivo con subencabezados.');
                setDisabled(true);
                setFileLoaded(false);
                return;
            }
        }
        if (!headers.includes('name', 'description') && !headers.includes('Name', 'Description')) {
            ErrorAlert(headers.includes('Name'));
            setDisabled(true);
        }
        setDisabled(false);
    }

    const renderOnFileNotLoaded = () => {
        return (
            <>
                <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} ref={fileInput} style={{ display: 'None' }} />
                <Button variant="outlined" color="success" onClick={() => fileInput.current.click()}>
                    Seleccionar Archivo
                </Button>
            </>
        )
    }

    const renderOnFileLoaded = () => {
        return (
            <>
                <Typography>Archivo cargado correctamente, vista previa:</Typography>
                <TableContainer component={Paper}
                    sx={{
                        maxHeight: '60vh',
                        maxWidth: '90vw',
                        pr: 1,
                        overflowY: 'scroll',
                        overflowX: 'scroll'
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headers.map((data, index) => (
                                    <TableCell align="center" key={index}>
                                        {toTitleCase(data)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {checkEmptyCells(row)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    function checkEmptyCells(row) {
        const result = [];
        for (let i = 0; i < headers.length; i++) {
            if (row[i] === undefined || row[i] === '') {
                result.push(<TableCell/>);
            } else {
                result.push(<TableCell align="center">{row[i]}</TableCell>);
            }
        }
        return result;
    }

    return (
        <>
            <Button variant="outlined" color="success" onClick={handleOpen}>
                Importar Datos
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Importar Tags Por CSV o Excel</DialogTitle>
                <DialogContent>
                    {fileLoaded ? renderOnFileLoaded() : renderOnFileNotLoaded()}
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button onClick={generateTemplate}>
                            Descargar Plantilla
                        </Button>
                        <Box>
                            <Button onClick={handleClose} color="error">
                                Cancelar
                            </Button>
                            <Button onClick={handleImport} disabled={disabled} color="success">
                                Confirmar
                            </Button>
                        </Box>
                        </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ImportDialog;