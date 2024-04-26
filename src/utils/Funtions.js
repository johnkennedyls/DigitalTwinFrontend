import jwtDecode from 'jwt-decode';

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

  const lowerCaseUserRoles = userRoles.map(role => role.replace('ROLE_', '').toLowerCase());

  return rolesToCheck.some(roleToCheck => lowerCaseUserRoles.includes(roleToCheck.toLowerCase()));
}

export function checkIfOwnUser (ownUser) {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  const username = jwtDecode(token).username;
  return username === ownUser;
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

export function exportToCsv(data, filename) {
  if (!data || data.length === 0) {
      console.log("No data to export");
      return;
  }

  // Primero, extrae todos los nombres únicos de los activos para usarlos como cabeceras.
  const assetNames = new Set();
  data.forEach(asset => {
      asset.measures.forEach(measure => {
          assetNames.add(measure.assetName);
      });
  });

  const headers = ["Date", "Time", "Millitm", ...assetNames];
  const csv = [headers.join(',')];

  // Crear un mapa para agrupar las medidas por timestamp
  const groupedByTimestamp = {};

  data.forEach(asset => {
      asset.measures.forEach(measure => {
          const date = new Date(measure.timeStamp);
          const dateKey = `${date.toLocaleDateString()},${date.toLocaleTimeString()},${date.getMilliseconds()}`;
          if (!groupedByTimestamp[dateKey]) {
              groupedByTimestamp[dateKey] = {};
          }
          groupedByTimestamp[dateKey][measure.assetName] = measure.value.toFixed(8);  // Asumiendo que deseas 8 decimales.
      });
  });

  // Convertir el mapa a filas CSV
  for (const [key, values] of Object.entries(groupedByTimestamp)) {
      const row = new Array(headers.length).fill('0.00000000');
      row[0] = key.split(',')[0];  // Date
      row[1] = key.split(',')[1];  // Time
      row[2] = key.split(',')[2];  // Millitm
      headers.forEach((header, index) => {
          if (values[header]) {
              row[index] = values[header];
          }
      });
      csv.push(row.join(','));
  }

  const csvContent = csv.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


