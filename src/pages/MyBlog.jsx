import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#3477eb', // Yellow background gradient
  padding: theme.spacing(5, 5),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: 'white', // Card background
  color: 'black', // Text color inside cards
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
  height: '100%', // Ensures the card's height stays fixed
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '200px', // Fixed height for images
  objectFit: 'cover', // Ensures the image is cropped to fit the size
}));

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/blogs/myblogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(
          err.response?.data?.msg || 'Failed to fetch blogs. Please try again later.'
        );
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <StyledContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h5" color="textPrimary">
            Loading...
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Box maxWidth="lg" mx="auto">
        {blogs.length === 0 ? (
          <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
            No blogs found for this user.
          </Typography>
        ) : (
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
        )}
      </Box>
    </StyledContainer>
  );
};

export default MyBlog;
