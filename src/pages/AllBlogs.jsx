import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#3477eb', // Blue background similar to home.js theme
  padding: theme.spacing(6),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  height: '150px',
  marginBottom: theme.spacing(2),
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  aspectRatio: '7 / 3',
}));

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs/');
      setBlogs(response.data.blogs);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
  };

  


  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  return (
    <StyledContainer>
      <Box maxWidth="lg" mx="auto">
        {error && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog._id}>
              <StyledPaper>
                <Box flex={1}>
                  <Typography variant="h6" color="textPrimary">
                    {blog.createdBy?.username || 'Unknown'}
                  </Typography>
                </Box>
                <Box width="25%" height="100%">
                  <StyledImage
                    src={blog.blogImg ? `http://localhost:5000/${blog.blogImg}` : 'https://via.placeholder.com/150'}
                    alt="Blog Img"
                  />
                </Box>
                <Box flex={2} px={2}>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {blog.excerpt || `${blog.body.substring(0, 100)}...`}
                  </Typography>
                </Box>
                <Box>
                  <Link to={`/edit/${blog.slug}`}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton color="error" onClick={() => handleDelete(blog._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledContainer>
  );
};

export default AllBlog;
