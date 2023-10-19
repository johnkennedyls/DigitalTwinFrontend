import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/CamelCaseConvert';

function DynamicTable({ tags }) {
    const [tagProperties, setTagProperties] = useState([...new Set(tags.flatMap(tag => Object.keys(tag)))]);
    const [editingCell, setEditingCell] = useState(null);

    useEffect(() => {
        console.log(tags);
    }, [tags]);

    const handleCellClick = (rowIndex, columnIndex) => {
        setEditingCell({ rowIndex, columnIndex });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setEditingCell(null);
        }
    }

    const handleCellChange = (rowIndex, columnIndex, newValue) => {

    };

    const handleAddColumn = () => {
        const newColumn = window.prompt('Enter new column name');
        setTagProperties([...tagProperties, newColumn]);
    }

    return (
        <>
            <Button
                variant='outlined'
                onClick={handleAddColumn}
                sx={{
                    mb: 1
                }}
            >
                Add Metadata
            </Button>

            <TableContainer 
                component={Paper}
                sx={{
                    maxHeight: '60vh',
                    pr: 1,
                    overflowY: 'scroll',
                    overflowX: 'scroll'
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'white'
                        }}
                    >
                        <TableRow>
                            {tagProperties.map((column, columnIndex) => (
                                <TableCell
                                    key={columnIndex}
                                    size='medium'
                                    sx={{
                                        minWidth: '100px',
                                    }}
                                >
                                    {toTitleCase(column)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tags.map((tag, rowIndex) => (
                            <TableRow key={tag.assetId}>
                                {tagProperties.map((column, columnIndex) => (
                                    <TableCell
                                        key={columnIndex}
                                        onClick={() => handleCellClick(rowIndex, columnIndex)}
                                        onBlur={() => setEditingCell(null)}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                    >
                                        {editingCell?.rowIndex === rowIndex && editingCell?.columnIndex === columnIndex ? (
                                            <TextField
                                                size='small'
                                                value={tag[column]}
                                                onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                                            />
                                        ) : (
                                            tag[column]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

DynamicTable.propTypes = {
    tags: PropTypes.array.isRequired
};

export default DynamicTable;
