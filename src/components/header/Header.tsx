import { ExitToApp } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "./header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      <img src="/logo.png" alt="Logo" height="50" />

      <div style={{ textAlign: "center" }} className="headerText">
        <img
          style={{
            width: "200px",
          }}
          src="/otr.png"
          alt="Logo"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", float: "right" }}>
        <Avatar
          sx={{ bgcolor: "#39445a" }}
          alt="Avatar"
          src="/broken-image.jpg"
          style={{ marginRight: 5 }}
        />
        <IconButton color="inherit" size="small">
          <ExitToApp />
        </IconButton>
      </div>
    </span>
  );
};

export default Header;
