
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import Header from "./components/uiLayout/Header";
import Footer from "./components/uiLayout/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RepositoryPage from "./pages/RepositoryPage";

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/repository/:owner/:repo"
                element={<RepositoryPage />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
