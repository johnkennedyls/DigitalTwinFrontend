import { useEffect, useState } from 'react';
import './SVGRender.css';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PlantSVG = ({ mapSvgTag, updateInterval }) => {
    const [svgContent, setSvgContent] = useState(null);

    // Selecciona el estado 'tags' desde Redux
    const tags = useSelector(state => state.tags);

    const updateValues = () => {
        mapSvgTag.forEach(({ svgId, idAsset }) => {
            const element = document.getElementById(svgId);
            if (!element) return;

            const assetStates = tags[idAsset];
            if (!assetStates || assetStates.length === 0) return;

            const newValue = assetStates[assetStates.length - 1]; // Obtiene el último valor del array
            element.textContent = newValue;
            element.setAttribute('text-anchor', 'middle');
        });
    };

    useEffect(() => {
        const interval = setInterval(updateValues, updateInterval);

        return () => {
            clearInterval(interval);
        };
    }, [mapSvgTag, tags, updateInterval]);

    useEffect(() => {
        fetch('/src/assets/Biorreactor40L.svg')
            .then((response) => response.text())
            .then((svgText) => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');
                svgElement.setAttribute('id', 'bioreactor-svg');
                setSvgContent(svgElement.outerHTML);
            });
    }, []);

    useEffect(() => {
        if (svgContent) {
            const svgElement = document.getElementById('bioreactor-svg');
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
        }
    }, [svgContent]);

    return (
        <Box
            className="svg-container"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

PlantSVG.propTypes = {
    mapSvgTag: PropTypes.arrayOf(PropTypes.shape({
        svgId: PropTypes.string.isRequired,
        idAsset: PropTypes.number.isRequired,
        tagName: PropTypes.string.isRequired,
    })).isRequired,
    updateInterval: PropTypes.number.isRequired,
};

export default PlantSVG;


