import * as React from 'react';
import { makeStyles } from '@mui/styles';
import CommentBox  from '../../components/CommentBox';
import ListAvatar  from '../../components/ListAvatar';
import { Select,FormControl,MenuItem,Typography} from '@mui/material';
import validate from "validate.js";
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      flexDirection: 'column',
      padding: '10px 10px',
      textAlign: 'left',
      '& > *': {
        width: '100%', 
      },
    },
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  left: {
    width: '40%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
      margin: '15px 10px 10px 0px',
    }
  },
  right: {
    width: '60%',
    height: '70%',
    '& > *': {
      height: 'auto',
      flexGrow: 1,
    },
  },
    commentsSection: {
      height: '70%',
    },
    firstElement: {
      width: '100%',
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
    {
      id: 4,
      title: "Summer BBQ",
      author: "Scott",
      comment: "Wish I could come, but I'm out of town this…",
    },
    {
      id: 4,
      title: "Summer BBQ",
      author: "Scott",
      comment: "Wish I could come, but I'm out of town this…",
    },
   
  ];

const DetailAlarmGenerate = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.paperContainer}>
        <Paper elevation={3} style={{ width: '800px', height: '450px',margin: '10px' }}>
        <div className={classes.root}>
          <div className={classes.left}>
          <Typography variant="body1" gutterBottom>
                    Planta:
            </Typography>
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
            <div>
            <Typography variant="body1" gutterBottom>
                    Usuarios Asignados 
            </Typography>
              <ListAvatar items={dummyData} />
            </div>
          </div>
          <div className={`${classes.right} ${classes.commentsSection}`}>
          <Typography variant="body1" gutterBottom>
                Historial de Acciones 
            </Typography>
            <CommentBox comments={comments} />
          </div>
        </div>
        </Paper>
      </div>
      );
    };
export default DetailAlarmGenerate;