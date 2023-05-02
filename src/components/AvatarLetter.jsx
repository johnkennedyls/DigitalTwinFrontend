import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { deepOrange, deepPurple, blue, green, pink, red, teal, yellow, indigo } from '@mui/material/colors';

const COLORS = [
  deepOrange[500],
  deepPurple[500],
  blue[500],
  green[500],
  pink[500],
  red[500],
  teal[500],
  yellow[500],
  indigo[500]
];

function AvatarLetter({ names }) {
    return (
        <AvatarGroup max={3}>
          {names.map((avatar, index) => {
            const letter = avatar.name[0];
            const color = COLORS[index % COLORS.length];
            
    
            return (
              <Avatar key={name} sx={{ bgcolor: color }}>
                {letter}
              </Avatar>
            );
          })}
        </AvatarGroup>
      );
}

export default AvatarLetter