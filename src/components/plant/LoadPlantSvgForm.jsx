import { useState } from 'react';
import { Button, Typography, Grid, Paper, Box } from '@mui/material';

import PropTypes from "prop-types";

import './styles/LoadPlantSvg.css'

export default function LoadPlantSvgForm({onNext, onBack}) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textIds, setTextIds] = useState([{ svgId:'', tagName:''}]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
                parseTextIds();
            };
            reader.readAsText(file);
        } else {
            setPreviewUrl(null);
            setTextIds([]);
        }
    };

    const handleSubmit = (e) => {
        onNext({svg:previewUrl, mapSvgTag:textIds});
        e.preventDefault();
    }

    const parseTextIds = () => {
        const textElements = document.querySelectorAll('text[id^="text_"]');
        const ids = Array.from(textElements).map((textElement) => {
            let id = textElement.getAttribute('id');
            if (id.startsWith('text_')) {
                id = id.slice(5);
            }
            return {svgId: id, tagName:''};
        });
        setTextIds(ids);
    };



    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={6} textAlign={'center'}>
                <form onSubmit={handleSubmit}>
                <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Cargar archivo SVG
                    </Typography>
                    <Grid item>
                        <input
                            required
                            accept="image/svg+xml"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            id="upload-svg"
                        />
                        <label htmlFor="upload-svg">
                            <Button variant="contained" color="primary" component="span">
                                Subir archivo SVG
                            </Button>
                        </label>
                        {previewUrl && (
                            <Box
                                className="svg-container"
                                dangerouslySetInnerHTML={{ __html: previewUrl }}
                            />
                        )}
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '2rem' }}>
                        <Grid item xs={12} md={6}>
                            <Button variant="outlined" color="secondary" fullWidth onClick={onBack}>
                                Atras
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button disabled={!previewUrl} type="submit" variant="contained" fullWidth>
                                Siguiente
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                </form>
            </Grid>
        </Grid>
    )
}

LoadPlantSvgForm.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};
