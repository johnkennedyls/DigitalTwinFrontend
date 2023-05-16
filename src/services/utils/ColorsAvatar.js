import { deepOrange, deepPurple, blue, green, pink, red, teal, yellow, indigo, lightBlue, amber, purple, blueGrey, lightGreen, grey, cyan } from '@mui/material/colors';

const colors = {
    a: deepOrange[500],
    b: deepPurple[500],
    c: blue[500],
    d: green[500],
    e: pink[500],
    f: red[500],
    g: teal[500],
    h: yellow[500],
    i: indigo[500],
    j: lightBlue[500],
    k: amber[500],
    l: deepOrange[900],
    m: purple[500],
    n: blueGrey[500],
    o: lightGreen[500],
    p: pink[300],
    q: grey[500],
    r: teal[300],
    s: amber[300],
    t: red[300],
    u: purple[300],
    v: cyan[500],
    w: blue[300],
    x: indigo[300],
    y: green[300],
    z: deepPurple[300],
  };
  
  function getAvatarColor(letter) {
    return colors[letter.toLowerCase()] || blue[500];
  }
  
  export default getAvatarColor;