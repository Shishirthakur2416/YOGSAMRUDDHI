import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // To track which user is being edited
  const [newUserType, setNewUserType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/allprofile');
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setNewUserType(user.userType); // Initialize the userType for editing
  };

  const handleSave = async (userId) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, { userType: newUserType });
      setUsers(users.map(user => user.id === userId ? { ...user, userType: newUserType } : user));
      setEditingUser(null); // Close the edit mode
    } catch (error) {
      console.log('Error updating user type:', error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null); // Cancel the edit mode and reset the form
    setNewUserType('');
  };

  return (
    <Box sx={{ backgroundColor: '#3477eb' }}>
      <Container maxWidth="lg" sx={{ paddingTop: 4, minHeight: '100vh' }}>
        <Grid container spacing={4}>
          {users.map(user => (
            <Grid item xs={12} key={user.id}>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, boxShadow: 3, backgroundColor: '#ffffff' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h7">
                        <strong>Username:</strong> {user.username}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {editingUser === user.id ? (
                        <FormControl variant="outlined" size="small">
                          <InputLabel>User Type</InputLabel>
                          <Select
                            value={newUserType}
                            onChange={(e) => setNewUserType(e.target.value)}
                            label="User Type"
                          >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Editor">Editor</MenuItem>
                            <MenuItem value="Subscriber">Subscriber</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <Typography variant="h7" color="textSecondary">
                          <strong>UserType:</strong> {user.userType}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      {editingUser === user.id ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSave(user.id)}
                            sx={{ textTransform: 'none', marginLeft: 2 }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                            sx={{ textTransform: 'none', marginLeft: 2 }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(user)}
                          sx={{ textTransform: 'none', marginLeft: 2 }}
                        >
                          <EditIcon />
                        </Button>
                      )}
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        sx={{ textTransform: 'none', marginLeft: 2 }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AllUsers;
