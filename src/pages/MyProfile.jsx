import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Input,
    Paper,
    Typography,
} from '@mui/material';

const MyProfile = ({ setToken }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/');
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }
            const response = await axios.get('http://localhost:5000/users/myprofile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data.user);
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError(err.response?.data?.msg || 'Error fetching profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.delete("http://localhost:5000/users/myprofile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToken(null);
            navigate("/");
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <CircularProgress color="secondary" />;

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ backgroundColor: '#3477eb',alignContent:'center', minHeight: '100vh' }}>
            <Container maxWidth="sm" sx={{ mt:0, mb: 3 }}>
                <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>MY PROFILE</Typography>
                    {profile ? (
                        <Box sx={{ mt: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Username:</Typography>
                                <Input
                                    value={profile.username}
                                    readOnly
                                    sx={{ flexGrow: 1, ml: 2 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Email:</Typography>
                                <Input
                                    value={profile.email}
                                    readOnly
                                    sx={{ flexGrow: 1, ml: 2 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Password:</Typography>
                                <Input
                                    type="password"
                                    value={profile.password}
                                    readOnly
                                    sx={{ flexGrow: 1, ml: 2 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Description:</Typography>
                                <Input
                                    value={profile.desc}
                                    readOnly
                                    sx={{ flexGrow: 1, ml: 2 }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">User Type:</Typography>
                                <Input
                                    value={profile.userType}
                                    readOnly
                                    sx={{ flexGrow: 1, ml: 2 }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            <br />
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ mt: 3 }}
                                onClick={handleDeleteUserProfile}
                            >
                                Delete profile
                            </Button>
                        </Box>
                    ) : (
                        <Typography>No profile data available</Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default MyProfile;
