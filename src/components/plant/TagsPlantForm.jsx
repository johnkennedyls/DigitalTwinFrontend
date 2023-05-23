import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PropTypes from "prop-types";

import './styles/TagsPlantForm.css'

export default function TagsPlantForm({ onNext, onBack }) {
    const [tags, setTags] = useState([{ name: '', description: '', state: '' }]);
    const [isValid, setIsValid] = useState(false);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newTags = tags.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag));
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, { name: '', description: '', state: '' }]);
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ tags: tags });
    };

    const validateForm = () => {
        tags.forEach((tag) => {
            if (tag.name === '' || tag.state === '') {
                setIsValid(false);
                return;
            }
            setIsValid(true);
        });
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
                            Agregar tags a la planta
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
                                                    label="Nombre"
                                                    name="name"
                                                    value={tag.name}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                    required
                                                    variant="outlined"
                                                    style={{ height: '78px' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <TextField
                                                    label="Descripción"
                                                    name="description"
                                                    value={tag.description}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
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
                                                    disabled={tags.length === 1}
                                                >
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddTag}
                            sx={{
                                mt: 2,
                                mb: 4,
                            }}
                        >
                            Agregar tag
                        </Button>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" color="secondary" fullWidth onClick={onBack}>
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
};
