import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import getAvatarColor from '../../services/utils/ColorsAvatar';
import {formatDate} from '../../services/utils/FormatterDate';

const useStyles = makeStyles({
    commentContainer: {
      height: 'auto',
      overflowY: 'auto',
      width: '100%',
      maxWidth: 'none',
  
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
    commentList: {  
      margin: '0 -16px',
      border: '1px solid #f1f1f1', 
      height: 230,
      width: 460,
    },
    comment: {
      marginBottom: 16,
      transition: '0.3s',
      padding: '8px 16px', 
      borderBottom: '1px solid #f1f1f1',
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
    },
    divider: {
      marginTop: 8,
      marginBottom: 8,
    },
    button: {
        width: '240px', // Establece un ancho fijo para el botón
      },
      buttonWrapper: {
        display: 'flex',
        justifyContent: 'center', // Centra el botón horizontalmente
        alignItems: 'center', // Centra el botón verticalmente
        height: '60px', // Altura del contenedor del botón
      },
      emptyCommentMessage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ajusta la altura según tus necesidades
      },
  });
  
    
  function CommentBox({ comments }) {
      const classes = useStyles();

      const [currentComment, setCurrentComment] = useState('');
      const [commentList, setCommentList] = useState(comments || []); 
      const [isButtonEnabled, setIsButtonEnabled] = useState(false);

      const handleCommentChange = (event) => {
        const value = event.target.value;
        setCurrentComment(value);
        setIsButtonEnabled(value !== '');
      };

      useEffect(() => {
        setCommentList(comments || []);
      }, [comments]);

      const handleAddComment = () => {
        if (currentComment !== '') {
          const newComment = {
            id: commentList.length + 1,
            title: '',
            author: 'Guest',
            comment: currentComment,
          };
          setCommentList([...commentList, newComment]);
          setCurrentComment('');
        }
      };

      return (
        <>
          <div className={classes.commentContainer}>
            <List className={classes.commentList}>
              {commentList.length === 0 ? (
                <Typography variant="body1" className={classes.emptyCommentMessage}><em>Aún no hay acciones</em></Typography>
              ) : (
                commentList.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start" className={classes.comment}>
                      <ListItemAvatar>
                        <Avatar
                          style={{ backgroundColor: getAvatarColor(comment.actionHistoryUsername.charAt(0)) }}
                        >
                          {comment.actionHistoryUsername.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.actionHistoryUsername}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {formatDate(comment.actionHistoryDate)}
                            </Typography>
                            <br />
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {comment.actionHistoryDescription}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" className={classes.divider} />
                  </React.Fragment>
                ))
              )}
            </List>
          </div>
          <TextField
            value={currentComment}
            onChange={handleCommentChange}
            label="Agrega una acción"
            variant="outlined"
            margin="dense"
          />
          <div className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              startIcon={<Add />}
              size="large"
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!isButtonEnabled}
            >
              Añadir acción
            </Button>
          </div>
        </>
      );
}

export default CommentBox;