import { useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

import PropTypes from "prop-types";

export default function MapSvgAndTagsForm({ svgIds, tags, onNext, onBack, mapSvgTagPrev = null, processLabel = 'add' }) {
    const [mapSvgTag, setMapSvgTag] = useState(mapSvgTagPrev == null ? svgIds : mapSvgTagPrev);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newTags = mapSvgTag.map((tag, i) => (i === index ? { ...tag, [name]: value } : tag));
        setMapSvgTag(newTags);
    };

    const handleSubmit = (e) => {
        onNext({ mapSvgTag: mapSvgTag }, true)
        e.preventDefault();
    };

    const handleBack = () => {
        onBack({ mapSvgTag: mapSvgTag });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={6}>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {processLabel === 'add' ? 'Agregar tags a la planta' : 'Editar tags de la planta'}
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

                            <Grid container spacing={1}>
                                {mapSvgTag.map((svgIdTag, index) => (
                                    <Grid item xs={12} md={12} key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    label="SVG ID"
                                                    name="id"
                                                    disabled
                                                    value={svgIdTag.svgId}
                                                    onChange={(e) => handleChange(e, index)}
                                                    fullWidth
                                                >
                                                    {svgIdTag.svgId}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>TAG</InputLabel>
                                                    <Select
                                                        label="TAG "
                                                        name="tagName"
                                                        value={svgIdTag.tagName}
                                                        onChange={(e) => handleChange(e, index)}
                                                    >
                                                        {tags && tags.map((tag) => (
                                                            tag.state != 'R' &&
                                                            <MenuItem key={tag.name} value={tag.name}>
                                                                {tag.name}
                                                            </MenuItem>

                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Grid container spacing={2} style={{ marginTop: '2rem' }}>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" color="secondary" fullWidth onClick={handleBack}>
                                    Atras
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button type="submit" color="success" variant="contained" fullWidth>
                                    {processLabel === 'add' ? 'Agregar Planta' : 'Editar Planta'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>
        </Grid>

    );
}

MapSvgAndTagsForm.propTypes = {
    svgIds: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    processLabel: PropTypes.string,
    mapSvgTagPrev: PropTypes.array,
};