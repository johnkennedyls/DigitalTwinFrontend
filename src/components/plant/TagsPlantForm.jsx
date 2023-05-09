import { useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TagsPlantForm() {
    const [tags, setTags] = useState([{ name: '', description: '', driver: '' }]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newTags = tags.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag));
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, { name: '', description: '', driver: '' }]);
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tags);
        // Aquí puedes enviar los datos del formulario a tu backend, si es necesario.
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10}>
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
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                {tags.map((tag, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Nombre"
                                                    name="name"
                                                    value={tag.name}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Descripción"
                                                    name="description"
                                                    value={tag.description}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                    multiline
                                                    rows={2}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Driver</InputLabel>
                                                    <Select
                                                        label="Driver"
                                                        name="driver"
                                                        value={tag.driver}
                                                        onChange={(e) => handleChange(e, index)}
                                                        required
                                                    >
                                                        {/* Aquí puedes reemplazar los valores de MenuItem con tus propios drivers */}
                                                        <MenuItem value="driver1">Driver 1</MenuItem>
                                                        <MenuItem value="driver2">Driver 2</MenuItem>
                                                        <MenuItem value="driver3">Driver 3</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleRemoveTag(index)}
                                                    disabled={tags.length === 1}
                                                >
                                                    Eliminar tag
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>

                        </form>
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
                    <Button type="submit" variant="contained" fullWidth>
                        Guardar tags
                    </Button>
                </Paper>
            </Grid>
        </Grid>

    );
}
