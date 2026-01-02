import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './components/MovieCard';
import { getPopularMovies, searchMovies } from './services/api';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch popular movies
  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err?.message || 'Failed to fetch popular movies.');
    } finally {
      setLoading(false);
    }
  };

  // Search movies (used by button or debounce)
  const fetchSearchMovies = useCallback(async (term) => {
    setLoading(true);
    setError(null);

    try {
      if (!term.trim()) {
        await fetchPopularMovies();
        return;
      }
      const data = await searchMovies(term);
      setMovies(data);
    } catch (err) {
      setError(err?.message || 'Failed to search movies.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchMovies(searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, fetchSearchMovies]);

  // Initial load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Handle search button click
  const handleSearchButton = (e) => {
    e.preventDefault();
    fetchSearchMovies(searchTerm); // force search immediately
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearchButton}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
