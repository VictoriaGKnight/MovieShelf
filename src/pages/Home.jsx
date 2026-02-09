import MovieGrid from '../components/MovieGrid';
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);     
        setError(null);        

        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later."); 
        setMovies([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchMovies();
  }, []);

  const displayMovies = searchResults ?? movies;

  
  if (loading && !searchResults) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error && !searchResults) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? "Search Results" : "Popular Movies"}</h2>
        <p>Discover what’s trending now</p>
      </div>

      <MovieGrid movies={displayMovies} />
    </main>
  );
}

export default Home;