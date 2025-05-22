import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movies`);
        const movie = response.data.find((m) => m._id === id);
        if (movie) {
          setForm({
            ...movie,
            releaseDate: movie.releaseDate?.substring(0, 10) || ''
          });
        }
      } catch (err) {
        console.error('Error loading movie:', err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Movie updated successfully ✅');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Update failed ❌');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          backgroundColor: '#fefefe',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Edit Movie 🎬
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Title" name="title" value={form.title}
            onChange={handleChange} margin="normal" required
          />
          <TextField
            fullWidth label="Description" name="description" value={form.description}
            onChange={handleChange} margin="normal" multiline rows={3}
          />
          <TextField
            fullWidth label="Rating" name="rating" type="number"
            value={form.rating} onChange={handleChange} margin="normal"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
          />
          <TextField
            fullWidth label="Release Date" name="releaseDate" type="date"
            value={form.releaseDate} onChange={handleChange} margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth label="Duration (mins)" name="duration" type="number"
            value={form.duration} onChange={handleChange} margin="normal"
          />
          <Button
            type="submit" variant="contained" fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
          >
            Update Movie
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
  );
};

export default EditMovie;
