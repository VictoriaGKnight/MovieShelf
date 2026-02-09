import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { useState } from "react";
import { searchMovies } from "./services/movieService";

function App() {
  // 1) Search results state lives in App (so Header + Home can both use it)
  const [searchResults, setSearchResults] = useState(null);

  // 2) Handler function that calls your service + stores results in state
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.warn("Search failed:", error);
      setSearchResults([]); // optional: show empty results instead of crashing
    }
  };

  return (
    <Router>
      <div className="app">
        {/* 3) Pass the function down to Header */}
        <Header onSearch={handleSearch} />

        <Routes>
          {/* 4) Pass the results down to Home */}
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;