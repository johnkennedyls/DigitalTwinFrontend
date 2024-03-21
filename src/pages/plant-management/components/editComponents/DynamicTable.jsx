import { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Tooltip, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';

import { toTitleCase } from '../../../../utils/TextConverter';
import { compareMetadata, getUniqueMetadataNames } from '../../../../utils/MetadataSearch';

import MetadataDialog from './MetadataDialog';

const basicProperties = ['svgId', 'name', 'description'];

function DynamicTable ({ tags, setTags, mapSvgTag, handleRemoveTag, handleChangeSvgId }) {
  const [tagProperties, setTagProperties] = useState(basicProperties);
  const [editingCell, setEditingCell] = useState(null);
  const textFieldRef = useRef(null);

  useEffect(() => {
    if (editingCell === null) {
      const uniqueMetadataNames = getUniqueMetadataNames(tags, tagProperties);
      setTagProperties([...basicProperties, ...uniqueMetadataNames]);
    }
  }, [tags]);

  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [editingCell]);

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
  };

  const handleCellChange = (rowIndex, columnIndex, newValue) => {
    const newTags = [...tags];
    const columnName = tagProperties[columnIndex];
    if (basicProperties.includes(columnName) && columnName !== 'svgId') {
      newTags[rowIndex] = {
        ...newTags[rowIndex],
        [columnName]: newValue
      };
    } else {
      newTags[rowIndex].metadata = newTags[rowIndex].metadata || {};
      newTags[rowIndex].metadata[columnName] = newValue;
    }
    setTags(newTags);
    if (columnName === 'svgId') {
      handleChangeSvgId(newValue);
    }
  };

  const renderHeader = () => {
    return (
      <TableRow>
        <TableCell
          sx={{
            borderRight: '1px solid #e0e0e0'
          }}
        >
          Acciones
        </TableCell>
        {tagProperties.map((column, columnIndex) => (
          <TableCell
            key={columnIndex}
            sx={{
              minWidth: '100px',
              maxWidth: '150px',
              fontWeight: 'bold',
              backgroundColor: '#f0f0f0',
              border: '1px solid #e0e0e0'
            }}
          >
            {toTitleCase(column)}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const renderBody = () => {
    return tags.map((tag, rowIndex) => (
      <TableRow key={tag.assetId}>
        <TableCell
          key="actions"
          sx={{
            borderRight: '1px solid #e0e0e0'
          }}
        >
          <Tooltip title="Eliminar tag">
            <IconButton
              onClick={() => handleRemoveTag(rowIndex)}
              size='small'
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
        {tagProperties.map((column, columnIndex) => (
          editingCell?.rowIndex === rowIndex && editingCell?.columnIndex === columnIndex
            ? (
              column === 'svgId'
                ? (
                  <Autocomplete
                    options={mapSvgTag}
                    getOptionLabel={(option) => option.svgId}
                    value={mapSvgTag.find((option) => option.tagName === tags[rowIndex].name) || null}
                    onChange={(event, newValue) => handleCellChange(rowIndex, columnIndex, (newValue?.svgId ?? ''))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={textFieldRef}
                        size='medium'
                        fullWidth
                        onBlur={() => setEditingCell(null)}
                      />
                    )}
                  />
                )
                : (
                  <TextField
                    inputRef={textFieldRef}
                    size='medium'
                    fullWidth
                    value={(basicProperties.includes(column) && column !== 'svgId')
                      ? tags[rowIndex][tagProperties[columnIndex]]
                      : tags[rowIndex].metadata ? compareMetadata(tags[rowIndex].metadata, column) : ''}
                    onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                    onBlur={() => setEditingCell(null)}
                    sx={{ alignContent: 'center' }}
                  />
                )
            )
            : (
              <TableCell
                key={`${rowIndex}-${columnIndex}`}
                autoFocus = {true}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                onBlur={() => setEditingCell(null)}
                onKeyDown={(e) => handleKeyDown(e)}
                sx={{ cursor: 'pointer', border: '0.1px solid #e0e0e0', minWidth: '100px', maxWidth: '150px' }}
              >
                {(basicProperties.includes(column) && column !== 'svgId')
                  ? tag[column]
                  : tag.metadata
                    ? compareMetadata(tag.metadata, column)
                    : ''}
              </TableCell>
            )
        ))}
      </TableRow>
    ));
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
            {renderHeader()}
          </TableHead>
          <TableBody>
            {renderBody()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

DynamicTable.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  mapSvgTag: PropTypes.array.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
  handleChangeSvgId: PropTypes.func.isRequired
};

export default DynamicTable;
