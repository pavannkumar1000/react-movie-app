import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    favorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie_poster">
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "favorited" : ""}`}
            onClick={handleFavoriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
