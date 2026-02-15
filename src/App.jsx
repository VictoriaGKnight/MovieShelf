import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import './App.css';
import { useState } from "react";
import { searchMovies } from "./services/movieService";
import { MovieProvider } from './contexts/MovieContext';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.warn("Search failed:", error);
      setSearchResults([]); 
    }
  };

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />

          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} /> 
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;