import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #1976d2, #42a5f5)',
        mb: 4,
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            color: '#fff',
          }}
        >
          🎬 MovieHub
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" sx={{ color: '#fff', fontWeight: 500 }}>
            Home
          </Button>

          {!token && (
            <Button component={Link} to="/login" sx={{ color: '#fff', fontWeight: 500 }}>
              Login
            </Button>
          )}

          {token && role === 'admin' && (
            <Button component={Link} to="/admin/add" sx={{ color: '#fff', fontWeight: 500 }}>
              Add Movie
            </Button>
          )}

          {token && (
            <Button onClick={handleLogout} sx={{ color: '#fff', fontWeight: 500 }}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
