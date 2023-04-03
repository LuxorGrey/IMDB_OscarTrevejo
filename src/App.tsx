import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/mainNav/MainNav";
import Movies from "./pages/movies/Movies";
import Search from "./pages/search/Search";
import Series from "./pages/series/Series";
import Trending from "./pages/trending/Trending";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" Component={Trending} />
            <Route path="/movies" Component={Movies} />
            <Route path="/series" Component={Series} />
            <Route path="/search" Component={Search} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
