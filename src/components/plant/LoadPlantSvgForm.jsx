import { useState } from 'react';
import { Button, Typography, Grid, Paper, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';

import { isValidSVG } from '../../services/utils/funtions';

import 'react-mde/lib/styles/css/react-mde-all.css';

import './styles/LoadPlantSvg.css';

export default function LoadPlantSvgForm ({ onNext, onBack, svgImageUrl = null, conventions = '', prevMapSvgTag = {} }) {
  const [previewUrl, setPreviewUrl] = useState(svgImageUrl);
  const [value, setValue] = useState(conventions);
  const [selectedTab, setSelectedTab] = useState('write');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!isValidSVG(e.target.result)) {
          alert('El archivo no es un SVG válido');
          return;
        }
        setPreviewUrl(e.target.result);
        parseTextIds();
      };
      reader.readAsText(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    console.log('SDAD');
    onNext({ svgImage: previewUrl, mapSvgTag: parseTextIds(), conventions: value });
    e.preventDefault();
  };

  const handleBack = () => {
    onBack({ svgImage: previewUrl, mapSvgTag: parseTextIds(), conventions: value });
  };

  const parseTextIds = () => {
    const textElements = document.querySelectorAll('text[id^="text_"]');
    const ids = Array.from(textElements).map((textElement) => {
      const id = textElement.getAttribute('id');
      if (prevMapSvgTag && prevMapSvgTag.some(tag => tag.svgId === id)) {
        const matchingTag = prevMapSvgTag.find(tag => tag.svgId === id);
        return { svgId: `${id}`, idAsset: matchingTag.idAsset, tagName: matchingTag.tagName };
      } else return { svgId: id, tagName: '' };
    });
    return ids;
  };

  return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={6} >
                <form >
                    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                        <Typography variant="h6" gutterBottom textAlign={'center'}>
                            Cargar archivo SVG*
                        </Typography>
                        <Grid item textAlign={'center'} justifyContent="center">
                            <input
                                required
                                accept="image/svg+xml"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="upload-svg"
                            />
                            <label htmlFor="upload-svg">
                                <Button variant="contained" color="primary" component="span" >
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
                        <Typography variant="h6" gutterBottom textAlign={'center'} style={{ marginTop: '2rem' }}>
                            Convenciones
                        </Typography>
                        <Grid container spacing={2} style={{ marginTop: '1rem' }} justifyContent="center">
                            <ReactMde

                                value={value}
                                onChange={setValue}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={markdown =>
                                  Promise.resolve(<ReactMarkdown >{markdown}</ReactMarkdown>)
                                }
                            />
                        </Grid>
                        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" color="secondary" fullWidth onClick={handleBack}>
                                    Atras
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button disabled={!previewUrl} onClick={handleSubmit} type="submit" variant="contained" fullWidth>
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

LoadPlantSvgForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  svgImageUrl: PropTypes.string,
  conventions: PropTypes.string,
  processLabel: PropTypes.string,
  prevMapSvgTag: PropTypes.object
};
