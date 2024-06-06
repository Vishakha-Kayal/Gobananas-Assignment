import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, TextField } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData(); //fnc call
  }, []);

  //creating fnc to fetch data from api
  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=50');
      setUsers(response.data.results);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            GoBananas App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <List>
          {filteredUsers.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${user.name.first} ${user.name.last}`} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
