export function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateRandomDarkColor(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      // Genera solo números bajos para los componentes R, G y B (entre 0 y 7)
      color += letters[Math.floor(Math.random() * 8)];
    } else {
      // Asegura que la componente sea oscura (entre 0 y 7)
      color += letters[Math.floor(Math.random() * 8)];
    }
  }
  return color;
}

export function generateRandomDarkColorsArray(numColors) {
  const colorsArray = [];
  for (let i = 0; i < numColors; i++) {
    colorsArray.push(generateRandomDarkColor());
  }
  return colorsArray;
}

export function deepCopy(oldObject){
    return JSON.parse(JSON.stringify(oldObject));
}