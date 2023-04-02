import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/mainNav/MainNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Trending from "./pages/trending/Trending";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
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
            {/* <Route path="/search" component={Search} /> */}
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
