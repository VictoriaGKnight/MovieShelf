import { useEffect, useState } from "react";

function MovieCard({ movie }) {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const alreadyFavorited = favorites.some((fav) => fav.id === movie.id);
    setIsFavorite(alreadyFavorited);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

    if (isFavorite) {
      
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };


  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";


  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={posterUrl}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;