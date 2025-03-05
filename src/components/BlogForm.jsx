import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, TextField, Typography, CircularProgress } from '@mui/material';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#3477eb', // Blue background
  padding: theme.spacing(5, 5),
  color: 'white', // White text color
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  padding: theme.spacing(4),
  backgroundColor: 'white', // Card background
  color: 'black', // Text color inside cards
  boxShadow: theme.shadows[3],
}));

const BlogForm = ({ isEdit = false, data = {} }) => {
  const [title, setTitle] = useState(isEdit ? data.title : '');
  const [excerpt, setExcerpt] = useState(isEdit ? data.excerpt : '');
  const [blogImg, setBlogImg] = useState(isEdit ? data.blogImg : null);
  const [body, setBody] = useState(isEdit ? data.body : '');
  const [slug, setSlug] = useState(isEdit ? data.slug : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    setBlogImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const fd = new FormData();
    fd.append('title', title);
    fd.append('excerpt', excerpt);
    fd.append('blogImg', blogImg);
    fd.append('body', body);
    fd.append('slug', slug);

    try {
      const token = localStorage.getItem('token');
      const url = isEdit
        ? `http://localhost:5000/blogs/${slug}`
        : 'http://localhost:5000/blogs';
      const method = isEdit ? 'patch' : 'post';

      await axios({
        method,
        url,
        data: fd,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(isEdit ? 'Blog updated successfully!' : 'Blog created successfully!');
      setTitle('');
      setExcerpt('');
      setBody('');
      setSlug('');
      setBlogImg(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Blog' : 'Create Blog'}
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" gutterBottom>
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="file"
              onChange={handleImage}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="body2" gutterBottom>
              Body:
            </Typography>
            <ReactQuill theme="snow" value={body} onChange={setBody} />
            <TextField
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              fullWidth
              margin="normal"
              disabled={isEdit}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </CardContent>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};

export default BlogForm;
