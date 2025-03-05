import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography, Paper, Container } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    desc: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/users/register`, formData);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error registering user');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#3477eb', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Create an Account
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Join us and start your journey!
          </Typography>
          
          {message && <Typography color="success" variant="body2" sx={{ mt: 2 }}>{message}</Typography>}
          
          <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 2, mb: 2 }}
              type="submit"
            >
              Register
            </Button>

            <Typography variant="body2" color="textSecondary" align="center">
              Already have an Account?{' '}
              <Link to="/login" style={{ color: '#3477eb' }}>
                Login
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
