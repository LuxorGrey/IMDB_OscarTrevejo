import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TVIcon from "@mui/icons-material/Tv";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mainNav.css";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/", { replace: true });
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  return (
    <BottomNavigation
      className="navigation"
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#2d313a",
        zIndex: 100,
      }}
      value={value}
      onChange={(event: any, newValue: number) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Trending"
        icon={<FavoriteIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Movies"
        icon={<MovieIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="TV Series"
        icon={<TVIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        style={{ color: "white" }}
      />
    </BottomNavigation>
  );
}
