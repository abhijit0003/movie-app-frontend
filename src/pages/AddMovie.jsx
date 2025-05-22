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
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/movies', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Movie added successfully!');
      setForm({
        title: '',
        description: '',
        rating: '',
        releaseDate: '',
        duration: ''
      });
    } catch (err) {
      setMessage('❌ Failed to add movie.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(to right, #e3f2fd, #ffffff)'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          🎥 Add New Movie
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={form.rating}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Release Date"
            name="releaseDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.releaseDate}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Duration (mins)"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: 'linear-gradient(to right, #1976d2, #42a5f5)',
              fontWeight: 'bold'
            }}
          >
            Add Movie
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

export default AddMovie;
