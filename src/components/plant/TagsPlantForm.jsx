import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from "prop-types";

import './styles/TagsPlantForm.css'
import CsvLoader from '../utils/CsvLoader';

const InputLabel = withStyles({
  root: {
    whiteSpace: 'normal'
  },
})(TextField);

export default function TagsPlantForm({ onNext, onBack, currentTags = [{ name: '', description: '' }], processLabel = 'add' }) {
    const [tags, setTags] = useState(currentTags);
    const [removedTags, setRemovedTags] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newTags = tags.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag));
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, { name: '', description: '' }]);
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
            if (tag.name === '' || tag.description === '') {
                setIsValid(false);
                return;
            }
            setIsValid(true);
        });
    }

    const onFileTagsImport = (importedTags, importedDescriptions) => {
        const newTags = importedTags.map((tag, index) => ({ name: tag, description: importedDescriptions[index] ? importedDescriptions[index] : '' }));
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
                                                <InputLabel
                                                    label="Nombre del tag (debe coincidir con el nombre del tag en el PLC)"
                                                    name="name"
                                                    value={tag.name}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    style={{ height: '78px', whiteSpace: 'normal' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
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
                                            <Grid item xs={12} md={2}>
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
