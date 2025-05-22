import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem('role') === 'admin';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert('Delete failed ❌');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        🎬 Movie Library
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="primary" />
        </Box>
      ) : movies.length === 0 ? (
        <Typography align="center" variant="h6" sx={{ mt: 4 }}>
          No movies found.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.description || 'No description available.'}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">⭐ Rating: {movie.rating}/10</Typography>
                    <Typography variant="body2">⏱ Duration: {movie.duration} mins</Typography>
                    <Typography variant="body2">📅 Release: {movie.releaseDate?.substring(0, 10)}</Typography>
                  </Box>
                </CardContent>

                {isAdmin && (
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(movie._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
