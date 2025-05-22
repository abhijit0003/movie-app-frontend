import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setMessage('Login successful ✅');
      navigate('/');
    } catch (error) {
      setMessage('Invalid email or password ❌');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2' }}
          >
            🚀 Welcome Back
          </Typography>

          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            Please login to your account
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Login
            </Button>
          </form>

          {message && (
            <Alert
              severity={message.includes('success') ? 'success' : 'error'}
              sx={{ mt: 3 }}
            >
              {message}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
