import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link, Alert, Container, Paper } from '@mui/material';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', formData);
      setMessage(response.data.msg);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/myblog');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#3477eb', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Login to your account
          </Typography>

          {message && <Alert severity="error">{message}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#3477eb',
                color: 'white',
                '&:hover': { backgroundColor: '#3477eb' },
                mt: 2,
              }}
            >
              Login
            </Button>

            <Typography mt={2} color="textSecondary">
              Not registered yet?{' '}
              <Link component={RouterLink} to="/register" sx={{ color: '#3477eb' }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
