import { useState, useEffect } from 'react';

export const useIncrementalIndexEffect = (maxIndex, intervalDuration) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [currentIndex]);

  return currentIndex;
};
