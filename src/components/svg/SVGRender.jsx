import { useEffect, useState } from 'react';
import './SVGRender.css';
import { Box } from '@mui/material';

const PlantSVG = () => {
    const [svgContent, setSvgContent] = useState(null);

    const updateRandomValues = () => {
        const textElements = document.querySelectorAll('text[id^="text_"]');
    
        textElements.forEach((element) => {
            if(element.id.includes('on')){
                return
            }

            element.textContent = (Math.random() * 100).toFixed(2);
            element.setAttribute('text-anchor', 'middle');
        });
    };

    useEffect(() => {
        const interval = setInterval(updateRandomValues, 1500);
    
        return () => {
            clearInterval(interval);
        };
    }, []);
    
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

export default PlantSVG;
