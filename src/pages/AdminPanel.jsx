import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#3477eb', // Blue background similar to home.js theme
  padding: theme.spacing(6),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: '200px',
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function AdminPanel() {
  const navigate = useNavigate();

  const DisplayAllBlogs = () => {
    navigate('/allblogs');
  };

  const DisplayAllUsers = () => {
    navigate('/allusers');
  };

  return (
    <StyledContainer>
      <StyledButton variant="contained" onClick={DisplayAllBlogs}>
        All Blogs
      </StyledButton>
      <StyledButton variant="contained" onClick={DisplayAllUsers}>
        All Users
      </StyledButton>
    </StyledContainer>
  );
}

export default AdminPanel;
