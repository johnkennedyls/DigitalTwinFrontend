import { useEffect, useState } from 'react';

const Bioreactor = () => {
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
            .then((svgText) => setSvgContent(svgText));
    }, []);
    return (
        <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default Bioreactor;
