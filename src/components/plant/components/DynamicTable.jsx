import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/TextConverter';
import { compareMetadata, getUniqueMetadataNames } from '../../utils/MetadataSearch';

const basicProperties = ['name', 'dataType', 'description'];

function DynamicTable({ tags, setTags }) {
    const [tagProperties, setTagProperties] = useState(basicProperties);
    const [editingCell, setEditingCell] = useState(null);

    useEffect(() => {
        const uniqueMetadataNames = getUniqueMetadataNames(tags)
        const filteredMetadataNames = Array.from(uniqueMetadataNames).filter(name => !tagProperties.includes(name));
        setTagProperties([...tagProperties, ...filteredMetadataNames]);
    }, [tags]);

    useEffect(() => {
        console.log(tags)
    }, [tags])

    const handleAddColumn = () => {
        const newColumn = window.prompt('Enter new column name');
        setTagProperties([...tagProperties, newColumn]);
    }

    const handleCellClick = (rowIndex, columnIndex) => {
        setEditingCell({ rowIndex, columnIndex });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            setEditingCell(null);
        }
    }

    const handleCellChange = (rowIndex, columnIndex, newValue) => {
        const newTags = [...tags];
        const columnName = tagProperties[columnIndex];
        if (basicProperties.includes(columnName)) {
          newTags[rowIndex] = {
            ...newTags[rowIndex],
            [columnName]: newValue
          };
        } else if (newValue) {
            newTags[rowIndex].metadata = newTags[rowIndex].metadata || {};
        
            // Check if columnName exists in metadata
            if (newTags[rowIndex].metadata.hasOwnProperty(columnName)) {
                newTags[rowIndex].metadata[columnName] = newValue;
            } else {
                // If columnName doesn't exist, add it to metadata
                newTags[rowIndex].metadata[columnName] = newValue;
            }
        }
        setTags(newTags);
      };

    return (
        <>
            <Button
                variant='outlined'
                onClick={handleAddColumn}
                sx={{ mb: 1 }}
            >
                Añadir Metadata
            </Button>
            <TableContainer 
                component={Paper}
                sx={{
                    maxHeight: '50vh',
                    pr: 1,
                    overflowY: 'scroll',
                    overflowX: 'scroll'
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            position: 'sticky',
                            backgroundColor: '#11111111'
                        }}
                    >
                        <TableRow>
                            {tagProperties.map((column, columnIndex) => (
                                <TableCell
                                    key={columnIndex}
                                    sx={{
                                        minWidth: '100px',
                                        maxWidth: '150px'
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
                                        autoFocus = {true}
                                        onClick={() => handleCellClick(rowIndex, columnIndex)}
                                        onBlur={() => setEditingCell(null)}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                    >
                                        {editingCell?.rowIndex === rowIndex && editingCell?.columnIndex === columnIndex ? (
                                            <TextField
                                                size='small'
                                                value={tags[rowIndex][tagProperties[columnIndex]]}
                                                onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                                            />
                                        ) : (
                                            basicProperties.includes(column)? tag[column] : tag.metadata? (
                                                compareMetadata(tag.metadata, column)
                                            ) : 'asd'
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