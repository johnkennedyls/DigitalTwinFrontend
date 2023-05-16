import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import getAvatarColor from '../../services/utils/ColorsAvatar';
import { blue} from '@mui/material/colors';


function AvatarLetter({ names }) {
  const displayedNames = names.slice(0, 2);
  const remainingNames = names.slice(2);
  return (
    <AvatarGroup max={3}>
      {displayedNames.map((avatar, index) => {
        console.log("OLAA",avatar)
        const letter = avatar[0];
        const color = getAvatarColor(avatar[0]);

        return (
          <Avatar 
            key={index} 
            sx={{ bgcolor: color }}
            title={avatar}
          >
            {letter}
          </Avatar>
        );
      })}
      {remainingNames.length > 0 && (
        <Avatar 
        sx={{ bgcolor: blue }}
          title={remainingNames.map(name => name).join(', ')}
        >
          +{remainingNames.length}
        </Avatar>
      )}
    </AvatarGroup>
  );
}

export default AvatarLetter