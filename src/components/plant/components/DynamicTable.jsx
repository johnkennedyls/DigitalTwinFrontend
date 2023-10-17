import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/CamelCaseConvert';

function DynamicTable({ tags }) {
    const tagProperties = [...new Set(tags.flatMap(tag => Object.keys(tag)))];
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

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {tagProperties.map((column, columnIndex) => (
                            <TableCell key={columnIndex}>
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
    );
}

DynamicTable.propTypes = {
    tags: PropTypes.array.isRequired
};

export default DynamicTable;
