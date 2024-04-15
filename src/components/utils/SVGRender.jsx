import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PlantSVG = ({ mapSvgTag, svgImage }) => {
  const [svgContent, setSvgContent] = useState(null);

  const tags = useSelector(state => state.tags);

  const updateValues = () => {
    mapSvgTag.forEach(({ svgId, idAsset }) => {
      const element = document.getElementById(svgId);
      if (!element) return;

      const assetStates = tags[idAsset];
      if (!assetStates || assetStates.length === 0) return;
      const x = assetStates[assetStates.length - 1][1];
      const newValue = Number.parseFloat(x).toFixed(2);
      element.textContent = newValue;
      element.setAttribute('text-anchor', 'middle');
    });
  };

  useEffect(() => {
    updateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgImage, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    svgElement.setAttribute('id', 'bioreactor-svg');
    setSvgContent(svgElement.outerHTML);
  }, [mapSvgTag, tags, svgImage]);

  useEffect(() => {
    if (svgContent) {
      const svgElement = document.getElementById('bioreactor-svg');
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
    }
  }, [svgContent]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid gray',
        borderRadius: '8px',
        marginTop: '2em'
      }}
      className="svg-container"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

PlantSVG.propTypes = {
  mapSvgTag: PropTypes.arrayOf(PropTypes.shape({
    svgId: PropTypes.string.isRequired,
    idAsset: PropTypes.number.isRequired,
    tagName: PropTypes.string.isRequired
  })).isRequired,
  updateInterval: PropTypes.number.isRequired,
  svgImage: PropTypes.string.isRequired
};

export default PlantSVG;

