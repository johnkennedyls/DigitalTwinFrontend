import { useState } from 'react';
import { Button, Typography, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
import DOMParser from 'dom-parser';

export default function LoadPlantSvgForm() {
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textIds, setTextIds] = useState([]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageFile(file);
                setPreviewUrl(e.target.result);
                parseTextIds(e.target.result);
            };
            reader.readAsText(file);
        } else {
            setImageFile(null);
            setPreviewUrl(null);
            setTextIds([]);
        }

        console.log(imageFile)
    };

    const parseTextIds = (svgString) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const textElements = svgDoc.getElementsByTagName('text');
        const ids = Array.from(textElements).map((textElement) => {
            const id = textElement.getAttribute('id');
            if (id.startsWith('text_')) {
                return id.slice(5);
            }
            return id;
        });
        setTextIds(ids);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={10}>
                <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Cargar archivo SVG
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <input
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
    <embed src={previewUrl} type="image/svg+xml"/>
)}


                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Elementos de la planta</Typography>
                            <List>
                                {textIds.map((id, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={id} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>


    )
}
