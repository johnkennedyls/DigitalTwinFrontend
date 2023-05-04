import * as React from 'react';
import { makeStyles } from '@mui/styles';
import CommentBox  from '../../components/CommentBox';
import ListAvatar  from '../../components/ListAvatar';
import { TextField,Select,FormControl,InputLabel,MenuItem,Button,Typography} from '@mui/material';
import ChipState  from '../../components/ChipState.jsx'; 

const useStyles = makeStyles({
    root: {
      display: 'flex',
      '& > *': {
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 100px 60px 100px',
        textAlign: 'left',
        '& > *': {
          width: '100%', // Cambiar el ancho al 100% para que los elementos ocupen todo el ancho disponible
        },
      },
    },
    left: {
      width: '40%',
      '& > *': {
        height: '50%',
        flexGrow: 1,
      },
    },
    right: {
      width: '60%',
      flexGrow: 1,
    },
    commentsSection: {
      height: '70%',
    },
    firstElement: {
      width: '100%',
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '10px', 
      },
    button: {   
        width: '100px', 
        height:'40px', 
      },
      buttonWrapper: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
      },
  });
  
  
  
  const dummyData = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Alice Brown' },
  ];

const comments = [
    {
      id: 1,
      title: "Brunch this weekend?",
      author: "Ali Connors",
      comment: "I'll be in your neighborhood doing errands this…",
    },
    {
      id: 2,
      title: "Summer BBQ",
      author: "Scott",
      comment: "Wish I could come, but I'm out of town this…",
    },
   
  ];

const DetailAlarmGenerate = () => {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
          <div className={classes.left}>
            <div className={classes.leftContainer}>
            <Typography variant="body1" gutterBottom>
                    Tipo de Alarma:
            </Typography>
            <Typography variant="body1" gutterBottom>
                    Fecha de Activación:
            </Typography>
            <Typography variant="body1" gutterBottom>
                    Estado:
            </Typography>
            <FormControl >      
        <Select>
          <MenuItem value="Sin revisar">Sin revisar</MenuItem>
          <MenuItem value="En revision">En revision</MenuItem>
          <MenuItem value="Cerrada">Cerrada</MenuItem>
        </Select>
        </FormControl>
            </div>
            <div>
            <Typography variant="body1" gutterBottom>
                    Usuarios Asignados 
            </Typography>
              <ListAvatar items={dummyData} />
            </div>
          </div>
          <div className={`${classes.right} ${classes.commentsSection}`}>
          <Typography variant="body1" gutterBottom>
                Comentarios 
            </Typography>
            <CommentBox comments={comments} />
          </div>
        </div>
      );
    };
export default DetailAlarmGenerate;