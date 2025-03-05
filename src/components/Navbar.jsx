import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#4000ff',
  color: 'white',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
});

const NavLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: '#bbbbbb',
  },
  transition: 'color 0.3s',
});

const MobileMenuButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const DesktopMenu = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));

const MobileMenu = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: '#4000ff',
  color: 'white',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

function Navbar({ token }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/myprofile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.user);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <NavbarContainer>
      <LogoLink to="/">
        <img src="WhiteLogoWidecopy.png" alt="Logo" style={{ height: '28px' }} />
      </LogoLink>

      <DesktopMenu>
        {!token ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            {profile?.userType === 'Admin' && <NavLink to="/adminpanel">Admin Panel</NavLink>}
            <NavLink to="/createBlog">Create Blog</NavLink>
            <NavLink to="/myBlog">My Blogs</NavLink>
            <NavLink to="/myprofile">My Profile</NavLink>
          </>
        )}
      </DesktopMenu>

      <MobileMenuButton onClick={handleMenuToggle}>
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </MobileMenuButton>

      {isMobileMenuOpen && (
        <MobileMenu>
          {!token ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              {profile?.userType === 'Admin' && <NavLink to="/adminpanel">Admin Panel</NavLink>}
              <NavLink to="/createBlog">Create Blog</NavLink>
              <NavLink to="/myBlog">My Blogs</NavLink>
              <NavLink to="/myprofile">My Profile</NavLink>
              <NavLink to="/logout">Logout</NavLink>
            </>
          )}
        </MobileMenu>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
