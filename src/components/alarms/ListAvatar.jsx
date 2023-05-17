import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import getAvatarColor from '../../services/utils/ColorsAvatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid #f1f1f1', // Agrega un borde alrededor de la lista
        boxSizing: 'border-box',
      },
    listItem: {
      marginBottom: '8px',
      padding: '8px 10px',
      transition: '0.3s',
      borderBottom: '1px solid #f1f1f1', // Agrega un borde inferior a los elementos de la lista
    },
    usersContainer: {
      maxHeight: (props) => props.maxHeight,
      overflowY: 'auto',
      width: '100%',
  
      // Personaliza el estilo del scrollbar
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        borderRadius: '10px',
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        background: '#888',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
    listItemAvatar: {
        marginLeft: 10, 
        marginRight: 10, 
      },
  });

  function ListAvatar({ items, maxHeight }) {
    const classes = useStyles({ maxHeight });
  
    return (
      <div className={classes.usersContainer}>
        <List dense className={classes.root}>
          {items && items.map((item) => (
            <ListItem
              key={item}
              disablePadding
              className={classes.listItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#f1f1f1')
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
            >
              <ListItemAvatar className={classes.listItemAvatar}>
                <Avatar
                  style={{ backgroundColor: getAvatarColor(item.charAt(0)) }}
                >
                  {item.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

export default ListAvatar;