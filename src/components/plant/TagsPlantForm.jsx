import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FormControl, Button, TextField, Typography, Paper, Box, MenuItem, Select, InputLabel, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from "prop-types";

import './styles/TagsPlantForm.css'
import CsvLoader from '../utils/CsvLoader';
import DynamicTable from './components/DynamicTable';

const Tag = React.memo(({ tag, index, handleChange, handleRemoveTag }) => {
    const DATA_TYPES = useMemo(() => ['COUNTER', 'DINT', 'REAL', 'BOOL', 'INT'], []);

    return (
        <Grid item xs={12} md={12} key={index} marginTop={'1rem'}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Nombre del tag (debe coincidir con el nombre del tag en el PLC)"
                        name="name"
                        value={tag.name}
                        onChange={(e) => handleChange(e, index)}
                        fullWidth
                        required
                        multiline
                        rows={2}
                        variant="outlined"
                        style={{ height: '78px' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            label="Tipo"
                            name="dataType"
                            value={tag.dataType}
                            onChange={(e) => handleChange(e, index)}
                            required
                            style={{ height: '78px' }}
                        >
                            {
                                DATA_TYPES.map((dataType) => (
                                    <MenuItem key={dataType} value={dataType}>{dataType}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        label="Descripción"
                        name="description"
                        value={tag.description}
                        onChange={(e) => handleChange(e, index)}
                        fullWidth
                        required
                        multiline
                        rows={2}
                        variant="outlined"
                        style={{ height: '78px' }}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button
                        style={{ height: '78px' }}
                        variant="outlined"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveTag(index)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}, (prevProps, nextProps) => prevProps.tag === nextProps.tag);

export default function TagsPlantForm({ onNext, onBack, currentTags = [{ name: '', description: '', dataType: '' }], processLabel = 'add' }) {
    const [tags, setTags] = useState(currentTags);
    const [removedTags, setRemovedTags] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const handleChange = useCallback((e, index) => {
        const { name, value } = e.target;
        setTags((prevTags) => prevTags.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag)));
    }, []);

    const handleAddTag = useCallback(() => {
        setTags((prevTags) => [...prevTags, { name: '', description: '', dataType: '' }]);
    }, []);

    const handleRemoveTag = useCallback((index) => {
        const tag = tags[index];
        if (tag.assetId !== undefined) {
            const newTag = { ...tag, state: 'R' };
            setRemovedTags((prevRemovedTags) => [...prevRemovedTags, newTag]);
        }
        setTags((prevTags) => [...prevTags.slice(0, index), ...prevTags.slice(index + 1)]);
    }, [tags, removedTags]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const nonEmptyTags = tags.filter(tag => 
            !(tag.name === '' || tag.name === undefined || tag.name === null) ||
            !(tag.description === '' || tag.description === undefined || tag.description === null) ||
            !(tag.dataType === '' || tag.dataType === undefined || tag.dataType === null)
        );
        onNext({ tags: nonEmptyTags, removedTags: removedTags });
    }, [tags, removedTags, onNext]);

    const validateForm = useCallback(() => {
        setIsValid(tags.every(tag => 
            (tag.name === '' || tag.name === undefined || tag.name === null) &&
            (tag.description === '' || tag.description === undefined || tag.description === null) &&
            (tag.dataType === '' || tag.dataType === undefined || tag.dataType === null)
            ||
            (tag.name !== '' && tag.name !== undefined && tag.name !== null) &&
            (tag.description !== '' && tag.description !== undefined && tag.description !== null) &&
            (tag.dataType !== '' && tag.dataType !== undefined && tag.dataType !== null)
        ));
    }, [tags]);

    const onFileTagsImport = useCallback((importedTags, importedDescriptions, importedDataTypes) => {

        const newTags = importedTags.map((tag, index) => {
            return {
                name: tag,
                description: importedDescriptions[index] ? importedDescriptions[index] : '',
                dataType: importedDataTypes[index] ? importedDataTypes[index] : ''
            }
        });
        setTags([...tags, ...newTags]);
    }, [tags]);

    useEffect(() => {
        validateForm();
    }, [tags, validateForm]);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={12}>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {processLabel === 'add' ? 'Agregar tags a la planta' : 'Editar tags de la planta'}
                        </Typography>
                        <Typography sx={{ pl: 4 }} gutterBottom>
                            En esta sección se puede {processLabel === 'add' ? 'agregar' : 'editar'} los tags que se han exportado desde el PLC de la planta.
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '60vh',
                                pr: 1
                            }}
                        >
                            <DynamicTable tags={tags} />
                        </Box>
                        <Grid container spacing={2} style={{ marginTop: '2em', marginBottom: '2em' }} >
                            <Grid item xs={12} md={6}>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddTag}
                                >
                                    Agregar tag
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <CsvLoader
                                    onConfirmDataImport={onFileTagsImport}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" color="secondary" fullWidth onClick={() => { onBack({ tags: tags }) }}>
                                    Atras
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button disabled={!isValid} type="submit" variant="contained" fullWidth>
                                    Siguiente
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
}

TagsPlantForm.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    currentTags: PropTypes.arrayOf(PropTypes.object),
    processLabel: PropTypes.string,
};

Tag.displayName = "Tag";
Tag.propTypes = {
    tag: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemoveTag: PropTypes.func.isRequired,
};