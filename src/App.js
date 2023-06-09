import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from'./Todo';
import { Button, FormControl, InputLabel, Input, Typography, Box } from "@mui/material";
import db from "./firebase";
import firebase from "firebase/compat/app";



function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [todoTextStyles, setTodoTextStyles] = useState ({

    fontSize:'10px',
    fontWeight:'bolder',
    fontFamily: 'Arial'
  });

  // we need to listen to database and fetch new todos as the get added/removed whenever the app loads
  useEffect(() => {
 //this code fires when the app.js load
   db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id : doc.id ,todo: doc.data().todo})))
  })
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  console.log("🔥", input);
  
  const addTodo = (event) => {
    // this will add to the list after we hit the button
    event.preventDefault();
    
    db.collection('todos').add({

      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setTodoTextStyles({
      fontSize: '60px',
      fontWeight: 'bolder',
    });
    
    setInput(""); //sets the input to empty after hitting the submit button
    
  };
  return (
    
    <div className="App">
      <Box sx={{ bgcolor: 'primary.main', border: 1}} display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={4}>
        <Typography variant="h2" gutterBottom>TODO APP</Typography>
        <Box display="flex" alignItems="center" marginTop={4}>
          <form onSubmit={addTodo}>
            <FormControl>
              <InputLabel htmlFor="todo-input" sx={{ fontWeight: 'bolder' }}>✅ WRITE A TODO</InputLabel>
              <Input id="todo-input" value={input} onChange={handleInputChange} />
            </FormControl>
            <Button type="submit" variant="contained" disabled={!input}>ADD TODO</Button>
          </form>
        </Box>

        <Box component="div" sx={{ display: 'inline'}}>QUOTE</Box>

        <Box mt={4}>

          
        </Box>
        <ul>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
        <Typography style={todoTextStyles}>{input}</Typography>
      </Box>
    </div>
  );
}
export default App;
