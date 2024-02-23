import { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/TextConverter';
import { compareMetadata, getUniqueMetadataNames } from '../../utils/MetadataSearch';
import MetadataDialog from './MetadataDialog';

const basicProperties = ['name', 'dataType', 'description'];

function DynamicTable({ tags, setTags }) {
    const [tagProperties, setTagProperties] = useState(basicProperties);
    const [editingCell, setEditingCell] = useState(null);
    const textFieldRef = useRef(null);

    useEffect(() => {
        const uniqueMetadataNames = getUniqueMetadataNames(tags)
        const filteredMetadataNames = Array.from(uniqueMetadataNames).filter(name => !tagProperties.includes(name));
        setTagProperties([...tagProperties, ...filteredMetadataNames]);
    }, [tags]);

    useEffect(() => {
        if (textFieldRef.current) {
            textFieldRef.current.focus();
        }
    }, [editingCell]);

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
            if (newTags[rowIndex].metadata.hasOwnProperty(columnName)) {
                newTags[rowIndex].metadata[columnName] = newValue;
            } else {
                newTags[rowIndex].metadata[columnName] = newValue;
            }
        }
        setTags(newTags);
      };

    return (
        <>
            <MetadataDialog tagProperties={tagProperties} setTagProperties={setTagProperties} />
            <TableContainer 
                component={Paper}
                sx={{
                    maxHeight: '50vh',
                    pr: 1,
                    overflowY: 'scroll',
                    overflowX: 'scroll'
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tagProperties.map((column, columnIndex) => (
                                <TableCell
                                    key={columnIndex}
                                    sx={{
                                        minWidth: '100px',
                                        maxWidth: '150px',
                                        fontWeight:'bold',
                                        backgroundColor: '#f0f0f0',
                                        border: '1px solid #e0e0e0'
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
                                    editingCell?.rowIndex === rowIndex && editingCell?.columnIndex === columnIndex ? (
                                        <TextField
                                            inputRef={textFieldRef}
                                            multiline
                                            size='medium'
                                            fullWidth
                                            value={basicProperties.includes(column)? tags[rowIndex][tagProperties[columnIndex]] :
                                                tags[rowIndex].metadata? compareMetadata(tags[rowIndex].metadata, column) : ''}
                                            onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                                            onBlur={() => setEditingCell(null)}
                                            sx={{ alignContent: 'center'}} 
                                        />
                                    ) : (
                                        <TableCell
                                            key={columnIndex}
                                            autoFocus = {true}
                                            onClick={() => handleCellClick(rowIndex, columnIndex)}
                                            onBlur={() => setEditingCell(null)}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            sx={{ cursor: 'pointer', border: '0.1px solid #e0e0e0', minWidth: '100px', maxWidth: '150px'}}
                                        >
                                            {basicProperties.includes(column)? tag[column] : tag.metadata? (
                                                compareMetadata(tag.metadata, column)
                                            ) : ''}
                                        </TableCell>
                                    )
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