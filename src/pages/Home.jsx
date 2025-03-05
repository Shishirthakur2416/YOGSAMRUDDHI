import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#3477eb', // Blue background
  padding: theme.spacing(5, 5),
  color: 'white', // White text color
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: 'white', // Dark blue card background
  color: 'black', // White text color inside cards
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
    backgroundColor: 'white', // Darker blue on hover
  },
  height: '100%', // Ensures the card's height stays fixed
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '200px', // Fixed height for images
  objectFit: 'cover', // Ensures the image is cropped to fit the size
}));

const Home = () => {
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

  return (
    <StyledContainer>
      <Box maxWidth="lg" mx="auto">
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} lg={4} key={blog._id}>
              <Link to={`/blogs/${blog.slug}`} style={{ textDecoration: 'none' }}>
                <StyledCard>
                  <StyledCardMedia
                    component="img"
                    image={blog.blogImg ? `http://localhost:5000/${blog.blogImg}` : 'https://via.placeholder.com/300x200'}
                    alt="Blog Image"
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {blog.excerpt || blog.body.substring(0, 100)}...
                    </Typography>
                    <Button variant="contained" color="primary" fullWidth>
                      Read More
                    </Button>
                  </CardContent>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledContainer>
  );
};

export default Home;
