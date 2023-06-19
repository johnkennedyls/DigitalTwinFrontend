import { useEffect, useState } from 'react';
import { FormControl, Button, TextField, Typography, Grid, Paper, Box, MenuItem, Select, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from "prop-types";

import './styles/TagsPlantForm.css'
import CsvLoader from '../utils/CsvLoader';


export default function TagsPlantForm({ onNext, onBack, currentTags = [{ name: '', description: '', dataType: '' }], processLabel = 'add' }) {
    const [tags, setTags] = useState(currentTags);
    const [removedTags, setRemovedTags] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const DATA_TYPES = ['COUNTER', 'DINT', 'REAL', 'BOOL'];

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newTags = tags.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag));
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, { name: '', description: '', dataType: '' }]);
    };

    const handleRemoveTag = (index) => {
        if (tags[index].assetId !== undefined) {
            tags[index].state = 'R';
            setRemovedTags([...removedTags, tags[index]]);
        }
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ tags: tags, removedTags: removedTags });
    };

    const validateForm = () => {
        if (tags.length === 0) setIsValid(false);
        tags.forEach((tag) => {
            if (tag.name === '' || tag.description === '' || tag.dataType === '') {
                setIsValid(false);
                return;
            }
            setIsValid(true);
        });
    }

    const onFileTagsImport = (importedTags, importedDescriptions, importedDataTypes) => {
        const newTags = importedTags.map((tag, index) => ({
            name: tag,
            description: importedDescriptions[index] ? importedDescriptions[index] : '',
            dataType: importedDataTypes[index] ? importedDataTypes[index] : ''
        }));
        setTags([...tags, ...newTags]);
    }

    useEffect(() => {
        validateForm();
    }, [tags]);

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
                                overflowY: 'scroll',
                                pr: 1,
                                '&::-webkit-scrollbar': {
                                    width: '0.6em',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                        >
                            <Grid container spacing={1} style={{ minHeight: '40vh' }}>
                                {tags.map((tag, index) => (
                                    <Grid item xs={12} md={12} key={index} marginTop={'1rem'}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} md={3} >
                                                <TextField
                                                    label="Nombre del tag (debe coincidir con el nombre del tag en el PLC)"
                                                    name="name"
                                                    value={tag.name}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    style={{ height: '78px' }}
                                                >
                                                </TextField>
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
                                                >
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
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
