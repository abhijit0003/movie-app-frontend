import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  const isAdmin = localStorage.getItem('role') === 'admin';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return fetchMovies();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/movies/search?query=${search}`
      );
      setMovies(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleSort = async (sortKey) => {
    setSortBy(sortKey);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/movies/sorted?sortBy=${sortKey}`
      );
      setMovies(res.data);
    } catch (err) {
      console.error('Sorting failed:', err);
    }
  };

  const handleEdit = (id) => navigate(`/admin/edit/${id}`);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this movie?');
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert('Delete failed ❌');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 8 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        🎬 Movie Library
      </Typography>

      {/* 🔍 Search + 🔽 Sort Controls */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={4}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'white',
            borderRadius: 1
          }}
        />

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SortIcon />
              </InputAdornment>
            )
          }}
          sx={{
            width: 160,
            backgroundColor: 'white',
            borderRadius: 1
          }}
        >
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </TextField>
      </Box>

      {/* Movie Cards */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="primary" />
        </Box>
      ) : movies.length === 0 ? (
        <Typography align="center" variant="h6" sx={{ mt: 4 }}>
          No movies found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            mt: 2
          }}
        >
          {movies.map((movie) => (
            <Card
              key={movie._id}
              sx={{
                width: '18%',
                minWidth: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description || 'No description available.'}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2">⭐ Rating: {movie.rating}/10</Typography>
                  <Typography variant="body2">⏱ Duration: {movie.duration} mins</Typography>
                  <Typography variant="body2">
                    📅 Release: {movie.releaseDate?.substring(0, 10)}
                  </Typography>
                </Box>
              </CardContent>

              {isAdmin && (
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
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
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home;
