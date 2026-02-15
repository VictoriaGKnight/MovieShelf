import MovieGrid from "../components/MovieGrid";
import { useMovieContext } from "../contexts/MovieContext";

function Watchlist() {
  const { watchlist } = useMovieContext();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you’ve saved to watch later</p>
      </div>

      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Add movies from the Home page!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
