import jwtDecode from 'jwt-decode';

export function generateRandomColor () {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateRandomDarkColor () {
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

export function generateRandomDarkColorsArray (numColors) {
  const colorsArray = [];
  for (let i = 0; i < numColors; i++) {
    colorsArray.push(generateRandomDarkColor());
  }
  return colorsArray;
}

export function deepCopy (oldObject) {
  return JSON.parse(JSON.stringify(oldObject));
}
export function hasAnyRole (rolesToCheck) {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const userRoles = decodedToken.role.split(',');

  // Elimina "ROLE_" y convierte los roles a minúsculas para ignorar el case
  const lowerCaseUserRoles = userRoles.map(role => role.replace('ROLE_', '').toLowerCase());

  // Verifica si al menos uno de los roles buscados está en la lista de roles
  return rolesToCheck.some(roleToCheck => lowerCaseUserRoles.includes(roleToCheck.toLowerCase()));
}

export function isValidSVG (svgText) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgText, 'image/svg+xml');

    // Verificamos si se ha producido algún error de análisis
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Error de análisis SVG');
    }

    // Comprueba si el primer elemento es un SVG
    if (xmlDoc.documentElement.nodeName.toLowerCase() !== 'svg') {
      throw new Error('No es un archivo SVG válido');
    }

    // Si llegamos hasta aquí, es probable que sea un SVG válido
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
