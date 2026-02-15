import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovies must be used inside a MovieProvider");
  }

  return context;
}

export function MovieProvider({ children }) {

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("movieshelf-watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
        "movieshelf-watchlist",
        JSON.stringify(watchlist)
    );
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev =>
      prev.filter(movie => movie.id !== movieId)
    );
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}
