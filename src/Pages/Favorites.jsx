import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className="favorite-empty">
          <p>Your Favorites List is Empty</p>
          <p>Add movies ❤️</p>
        </div>
      ) : (
        <div className="movies-grid favorites-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
