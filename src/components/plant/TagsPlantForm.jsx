import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Paper, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { InfoAlert } from '../utils/Alert';

import DynamicTable from './editComponents/DynamicTable';
import ImportDialog from './editComponents/ImportDialog';

export default function TagsPlantForm ({
  onNext, onBack, currentTags = [{ name: '', description: '' }],
  svgIds, mapSvgTagPrev = null, processLabel = 'add'
}) {
  const [tags, setTags] = useState(currentTags);
  const [removedTags, setRemovedTags] = useState([]);
  const [mapSvgTag, setMapSvgTag] = useState(mapSvgTagPrev == null ? svgIds : mapSvgTagPrev);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log(mapSvgTag);
    console.log(tags);
  }, [mapSvgTag]);

  const handleChangeSvgId = (value) => {
    const svgIdExists = mapSvgTag.some((tag) => tag.svgId === value);
    if (svgIdExists) {
      const tagNameBeingEdited = tags.find((tag) => tag.metadata.svgId === value)?.name;
      console.log(tagNameBeingEdited);
      const newTags = mapSvgTag.map((tag) =>
        tag.svgId === value
          ? {
            ...tag,
            svgId: value,
            idAsset: tags.find((tag) => tag.metadata && tag.metadata.svgId === value)?.assetId || '',
            tagName: tags.find((tag) => tag.metadata && tag.metadata.svgId === value)?.name || ''
          }
          : tag.tagName === tagNameBeingEdited
            ? {
              ...tag, idAsset: null, tagName: ''
            }
            : tag
      );
      setMapSvgTag(newTags);
    } else {
      console.log(`SvgId ${value} no existe en la lista.`);
    }
  };

  const handleAddTag = useCallback(() => {
    const hasEmptyTag = tags.some(tag => tag.name === '');
    if (!hasEmptyTag) {
      setTags((prevTags) => [...prevTags, { name: '', description: '' }]);
    } else {
      InfoAlert('Asegurate de no tener un tag vacio.');
    }
  }, [tags, setTags]);

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
    onNext({ tags: nonEmptyTags, removedTags, mapSvgTag }, true);
  }, [tags, removedTags, onNext]);

  const validateForm = useCallback(() => {
    setIsValid(tags.every(tag =>
      (tag.name === '' || tag.name === undefined || tag.name === null) &&
                (tag.description === '' || tag.description === undefined || tag.description === null) ||
                (tag.name !== '' && tag.name !== undefined && tag.name !== null) &&
                (tag.description !== '' && tag.description !== undefined && tag.description !== null)
    ));
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
                            En esta sección se puede
              {processLabel === 'add' ? 'agregar' : 'editar'}
                            los tags que se han exportado desde el PLC de la planta.
            </Typography>
            <Box
              sx={{
                maxHeight: '60vh',
                overflowY: 'scroll',
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '0.6em'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
              }}
            >
              <Grid>
                <DynamicTable tags={tags} setTags={setTags} mapSvgTag={mapSvgTag} handleRemoveTag={handleRemoveTag} handleChangeSvgId={handleChangeSvgId}/>
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
                  justifyContent: 'flex-end'
                }}
              >
                <ImportDialog tags={tags} setTags={setTags}/>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" color="secondary" fullWidth onClick={() => { onBack({ tags }); }}>
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
  processLabel: PropTypes.string
};
