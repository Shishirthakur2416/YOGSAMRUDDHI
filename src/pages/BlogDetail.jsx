import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Divider,
    CircularProgress,
} from '@mui/material';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState('');

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${slug}`);
            setBlog(response.data.blog);
        } catch (err) {
            setError('Failed to fetch blog details. Please try again later.');
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#3477eb', py: 8 }}>
            <Container maxWidth="md">
                {error && (
                    <Typography color="error" align="center" variant="h6" gutterBottom>
                        {error}
                    </Typography>
                )}
                {blog ? (
                    <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={`http://localhost:5000/${blog.blogImg}`}
                            alt="Blog Image"
                            sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                        />
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                {blog.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                dangerouslySetInnerHTML={{ __html: blog.body }}
                                sx={{ mb: 4, lineHeight: 1.8 }}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ mt: 2, color: '#555' }}>
                                <Typography variant="body2">
                                    <strong>Slug:</strong> {blog.slug}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Author:</strong> {blog.createdBy?.username || 'Unknown'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Created on:</strong> {new Date(blog.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    !error && <CircularProgress color="primary" sx={{ display: 'block', mx: 'auto', mt: 6 }} />
                )}
            </Container>
        </Box>
    );
};

export default BlogDetail;
