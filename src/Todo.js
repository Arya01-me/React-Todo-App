
import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import './Todo.css';
import db from './firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';


const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '200px',
    margin: 'auto',
    background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 50%)',
    border: '2px solid',
    borderRadius: '10px',
    padding: '16px',
    color: 'white',
  },
});



function Todo({ todo }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const [ done, setDone ] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = () => {
    db.collection('todos')
      .doc(todo.id)
      .delete()
      .then(() => {
        console.log('Todo deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const markAsDone = () => {

    setDone(true);
    //HERE, I can also delete the todo item from the database once its done
  };

  const updateTodo = () => {

    db.collection('todos')
    
    .doc(todo.id)
    
    
    .update({

      todo: input,
    })

    .then(()  => {

      console.log('Todo updated successfully');
      setOpen(false);
    })

    .catch((error) => {
      console.error('Error updating todo:', error);

    });
  };

  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}>

        <div className={classes.paper}>
          <h1>EDIT TODO⬇️</h1>
          <input placeholder={todo.todo}  value={input} onChange={event => setInput(event.target.value)}/>
          <Button variant='contained' color='primary'  onClick={updateTodo}>Update Todo</Button>
        </div>
    </Modal>
    
    <List className='todo_list'>
      <ListItem  className='todo_item'>
        
        <ListItemText color='primary'  className='todo_text' primary={todo && todo.todo} secondary="Dummy deadline⏰"/>


        {!done ? (

          <Button variant='contained' startIcon={ <CheckCircleOutlinedIcon />} color='secondary' onClick={markAsDone}>
            DONE
          </Button>
        ) : (
          <CheckCircleOutlinedIcon  color="success" />
        )}
        
        <DeleteOutlineTwoToneIcon className='delete_button'  onClick={handleDelete}></DeleteOutlineTwoToneIcon>
      </ListItem>
      <Button  variant='contained' color='success' size='large' onClick={e => setOpen(true)}>Edit</Button>
    
    </List>
    </>
  )
}

export default Todo
